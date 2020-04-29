(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.ht = {}));
}(this, (function (exports) { 'use strict';

    var constants = {
      VSN: "1.0.0",
      SOCKET_STATES: {
        connecting: 0,
        open: 1,
        closing: 2,
        closed: 3
      },
      DEFAULT_TIMEOUT: 10000,
      WS_CLOSE_NORMAL: 1000,
      CHANNEL_STATES: {
        closed: "closed",
        errored: "errored",
        joined: "joined",
        joining: "joining",
        leaving: "leaving"
      },
      CHANNEL_EVENTS: {
        close: "phx_close",
        error: "phx_error",
        join: "phx_join",
        reply: "phx_reply",
        leave: "phx_leave"
      },
      TRANSPORTS: {
        websocket: "websocket"
      }
    };

    class Push {
      // Initializes the Push
      //
      // channel - The Channel
      // event - The event, for example `"phx_join"`
      // payload - The payload, for example `{user_id: 123}`
      // timeout - The push timeout in milliseconds
      //
      constructor(channel, event, payload, timeout) {
        this.channel = channel;
        this.event = event;
        this.payload = payload || {};
        this.receivedResp = null;
        this.timeout = timeout;
        this.timeoutTimer = null;
        this.recHooks = [];
        this.sent = false;
      }

      resend(timeout) {
        this.timeout = timeout;
        this.cancelRefEvent();
        this.ref = null;
        this.refEvent = null;
        this.receivedResp = null;
        this.sent = false;
        this.send();
      }

      send() {
        if (this.hasReceived("timeout")) {
          return;
        }

        this.startTimeout();
        this.sent = true;
        this.channel.socket.push({
          topic: this.channel.topic,
          event: this.event,
          payload: this.payload,
          ref: this.ref
        });
      }

      receive(status, callback) {
        if (this.hasReceived(status)) {
          callback(this.receivedResp.response);
        }

        this.recHooks.push({
          status,
          callback
        });
        return this;
      } // private


      matchReceive({
        status,
        response,
        ref
      }) {
        this.recHooks.filter(h => h.status === status).forEach(h => h.callback(response));
      }

      cancelRefEvent() {
        if (!this.refEvent) {
          return;
        }

        this.channel.off(this.refEvent);
      }

      cancelTimeout() {
        clearTimeout(this.timeoutTimer);
        this.timeoutTimer = null;
      }

      startTimeout() {
        if (this.timeoutTimer) {
          return;
        }

        this.ref = this.channel.socket.makeRef();
        this.refEvent = this.channel.replyEventName(this.ref);
        this.channel.on(this.refEvent, payload => {
          this.cancelRefEvent();
          this.cancelTimeout();
          this.receivedResp = payload;
          this.matchReceive(payload);
        });
        this.timeoutTimer = setTimeout(() => {
          this.trigger("timeout", {});
        }, this.timeout);
      }

      hasReceived(status) {
        return this.receivedResp && this.receivedResp.status === status;
      }

      trigger(status, response) {
        this.channel.trigger(this.refEvent, {
          status,
          response
        });
      }

    }

    var push = Push;

    // Creates a timer that accepts a `timerCalc` function to perform
    // calculated timeout retries, such as exponential backoff.
    //
    // ## Examples
    //
    //    let reconnectTimer = new Timer(() => this.connect(), function(tries){
    //      return [1000, 5000, 10000][tries - 1] || 10000
    //    })
    //    reconnectTimer.scheduleTimeout() // fires after 1000
    //    reconnectTimer.scheduleTimeout() // fires after 5000
    //    reconnectTimer.reset()
    //    reconnectTimer.scheduleTimeout() // fires after 1000
    //
    class Timer {
      constructor(callback, timerCalc) {
        this.callback = callback;
        this.timerCalc = timerCalc;
        this.timer = null;
        this.tries = 0;
      }

      reset() {
        this.tries = 0;
        clearTimeout(this.timer);
      } // Cancels any previous scheduleTimeout and schedules callback


      scheduleTimeout() {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.tries = this.tries + 1;
          this.callback();
        }, this.timerCalc(this.tries + 1));
      }

    }

    var timer = Timer;

    const {
      CHANNEL_EVENTS,
      CHANNEL_STATES
    } = constants;

    class Channel {
      constructor(topic, params, socket) {
        this.state = CHANNEL_STATES.closed;
        this.topic = topic;
        this.params = params || {};
        this.socket = socket;
        this.bindings = [];
        this.timeout = this.socket.timeout;
        this.joinedOnce = false;
        this.joinPush = new push(this, CHANNEL_EVENTS.join, this.params, this.timeout);
        this.pushBuffer = [];
        this.rejoinTimer = new timer(() => this.rejoinUntilConnected(), this.socket.reconnectAfterMs);
        this.joinPush.receive("ok", () => {
          this.state = CHANNEL_STATES.joined;
          this.rejoinTimer.reset();
          this.pushBuffer.forEach(pushEvent => pushEvent.send());
          this.pushBuffer = [];
        });
        this.onClose(() => {
          this.rejoinTimer.reset();
          this.socket.log("channel", `close ${this.topic} ${this.joinRef()}`);
          this.state = CHANNEL_STATES.closed;
          this.socket.remove(this);
        });
        this.onError(reason => {
          if (this.isLeaving() || this.isClosed()) {
            return;
          }

          this.socket.log("channel", `error ${this.topic}`, reason);
          this.state = CHANNEL_STATES.errored;
          this.rejoinTimer.scheduleTimeout();
        });
        this.joinPush.receive("timeout", () => {
          if (!this.isJoining()) {
            return;
          }

          this.socket.log("channel", `timeout ${this.topic}`, this.joinPush.timeout);
          this.state = CHANNEL_STATES.errored;
          this.rejoinTimer.scheduleTimeout();
        });
        this.on(CHANNEL_EVENTS.reply, (payload, ref) => {
          this.trigger(this.replyEventName(ref), payload);
        });
      }

      rejoinUntilConnected() {
        this.rejoinTimer.scheduleTimeout();

        if (this.socket.isConnected()) {
          this.rejoin();
        }
      }

      join(timeout = this.timeout) {
        if (this.joinedOnce) {
          throw `tried to join multiple times. 'join' can only be called a single time per channel instance`;
        } else {
          this.joinedOnce = true;
          this.rejoin(timeout);
          return this.joinPush;
        }
      }

      onClose(callback) {
        this.on(CHANNEL_EVENTS.close, callback);
      }

      onError(callback) {
        this.on(CHANNEL_EVENTS.error, reason => callback(reason));
      }

      on(event, callback) {
        this.bindings.push({
          event,
          callback
        });
      }

      off(event) {
        this.bindings = this.bindings.filter(bind => bind.event !== event);
      }

      canPush() {
        return this.socket.isConnected() && this.isJoined();
      }

      push(event, payload, timeout = this.timeout) {
        if (!this.joinedOnce) {
          throw `tried to push '${event}' to '${this.topic}' before joining. Use channel.join() before pushing events`;
        }

        let pushEvent = new push(this, event, payload, timeout);

        if (this.canPush()) {
          pushEvent.send();
        } else {
          pushEvent.startTimeout();
          this.pushBuffer.push(pushEvent);
        }

        return pushEvent;
      } // Leaves the channel
      //
      // Unsubscribes from server events, and
      // instructs channel to terminate on server
      //
      // Triggers onClose() hooks
      //
      // To receive leave acknowledgements, use the a `receive`
      // hook to bind to the server ack, ie:
      //
      //     channel.leave().receive("ok", () => alert("left!") )
      //


      leave(timeout = this.timeout) {
        this.state = CHANNEL_STATES.leaving;

        let onClose = () => {
          this.socket.log("channel", `leave ${this.topic}`);
          this.trigger(CHANNEL_EVENTS.close, "leave", this.joinRef());
        };

        let leavePush = new push(this, CHANNEL_EVENTS.leave, {}, timeout);
        leavePush.receive("ok", () => onClose()).receive("timeout", () => onClose());
        leavePush.send();

        if (!this.canPush()) {
          leavePush.trigger("ok", {});
        }

        return leavePush;
      } // Overridable message hook
      //
      // Receives all events for specialized message handling
      // before dispatching to the channel callbacks.
      //
      // Must return the payload, modified or unmodified


      onMessage(event, payload, ref) {
        return payload;
      } // private


      isMember(topic) {
        return this.topic === topic;
      }

      joinRef() {
        return this.joinPush.ref;
      }

      sendJoin(timeout) {
        this.state = CHANNEL_STATES.joining;
        this.joinPush.resend(timeout);
      }

      rejoin(timeout = this.timeout) {
        if (this.isLeaving()) {
          return;
        }

        this.sendJoin(timeout);
      }

      trigger(event, payload, ref) {
        let {
          close,
          error,
          leave,
          join
        } = CHANNEL_EVENTS;

        if (ref && [close, error, leave, join].indexOf(event) >= 0 && ref !== this.joinRef()) {
          return;
        }

        let handledPayload = this.onMessage(event, payload, ref);

        if (payload && !handledPayload) {
          throw "channel onMessage callbacks must return the payload, modified or unmodified";
        }

        this.bindings.filter(bind => bind.event === event).map(bind => bind.callback(handledPayload, ref));
      }

      replyEventName(ref) {
        return `chan_reply_${ref}`;
      }

      isClosed() {
        return this.state === CHANNEL_STATES.closed;
      }

      isErrored() {
        return this.state === CHANNEL_STATES.errored;
      }

      isJoined() {
        return this.state === CHANNEL_STATES.joined;
      }

      isJoining() {
        return this.state === CHANNEL_STATES.joining;
      }

      isLeaving() {
        return this.state === CHANNEL_STATES.leaving;
      }

    }

    var channel = Channel;

    // Copyright Joyent, Inc. and other Node contributors.
    //
    // Permission is hereby granted, free of charge, to any person obtaining a
    // copy of this software and associated documentation files (the
    // "Software"), to deal in the Software without restriction, including
    // without limitation the rights to use, copy, modify, merge, publish,
    // distribute, sublicense, and/or sell copies of the Software, and to permit
    // persons to whom the Software is furnished to do so, subject to the
    // following conditions:
    //
    // The above copyright notice and this permission notice shall be included
    // in all copies or substantial portions of the Software.
    //
    // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
    // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
    // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
    // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
    // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
    // USE OR OTHER DEALINGS IN THE SOFTWARE.
    // If obj.hasOwnProperty has been overridden, then calling
    // obj.hasOwnProperty(prop) will break.
    // See: https://github.com/joyent/node/issues/1707
    function hasOwnProperty(obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    }

    var isArray = Array.isArray || function (xs) {
      return Object.prototype.toString.call(xs) === '[object Array]';
    };

    function stringifyPrimitive(v) {
      switch (typeof v) {
        case 'string':
          return v;

        case 'boolean':
          return v ? 'true' : 'false';

        case 'number':
          return isFinite(v) ? v : '';

        default:
          return '';
      }
    }

    function stringify(obj, sep, eq, name) {
      sep = sep || '&';
      eq = eq || '=';

      if (obj === null) {
        obj = undefined;
      }

      if (typeof obj === 'object') {
        return map(objectKeys(obj), function (k) {
          var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;

          if (isArray(obj[k])) {
            return map(obj[k], function (v) {
              return ks + encodeURIComponent(stringifyPrimitive(v));
            }).join(sep);
          } else {
            return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
          }
        }).join(sep);
      }

      if (!name) return '';
      return encodeURIComponent(stringifyPrimitive(name)) + eq + encodeURIComponent(stringifyPrimitive(obj));
    }

    function map(xs, f) {
      if (xs.map) return xs.map(f);
      var res = [];

      for (var i = 0; i < xs.length; i++) {
        res.push(f(xs[i], i));
      }

      return res;
    }

    var objectKeys = Object.keys || function (obj) {
      var res = [];

      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
      }

      return res;
    };

    function parse(qs, sep, eq, options) {
      sep = sep || '&';
      eq = eq || '=';
      var obj = {};

      if (typeof qs !== 'string' || qs.length === 0) {
        return obj;
      }

      var regexp = /\+/g;
      qs = qs.split(sep);
      var maxKeys = 1000;

      if (options && typeof options.maxKeys === 'number') {
        maxKeys = options.maxKeys;
      }

      var len = qs.length; // maxKeys <= 0 means that we should not limit keys count

      if (maxKeys > 0 && len > maxKeys) {
        len = maxKeys;
      }

      for (var i = 0; i < len; ++i) {
        var x = qs[i].replace(regexp, '%20'),
            idx = x.indexOf(eq),
            kstr,
            vstr,
            k,
            v;

        if (idx >= 0) {
          kstr = x.substr(0, idx);
          vstr = x.substr(idx + 1);
        } else {
          kstr = x;
          vstr = '';
        }

        k = decodeURIComponent(kstr);
        v = decodeURIComponent(vstr);

        if (!hasOwnProperty(obj, k)) {
          obj[k] = v;
        } else if (isArray(obj[k])) {
          obj[k].push(v);
        } else {
          obj[k] = [obj[k], v];
        }
      }

      return obj;
    }
    var querystring = {
      encode: stringify,
      stringify: stringify,
      decode: parse,
      parse: parse
    };

    var naiveFallback = function () {
      if (typeof self === "object" && self) return self;
      if (typeof window === "object" && window) return window;
      throw new Error("Unable to resolve global `this`");
    };

    var global = function () {
      if (this) return this; // Unexpected strict mode (may happen if e.g. bundled into ESM module)
      // Fallback to standard globalThis if available

      if (typeof globalThis === "object" && globalThis) return globalThis; // Thanks @mathiasbynens -> https://mathiasbynens.be/notes/globalthis
      // In all ES5+ engines global object inherits from Object.prototype
      // (if you approached one that doesn't please report)

      try {
        Object.defineProperty(Object.prototype, "__global__", {
          get: function () {
            return this;
          },
          configurable: true
        });
      } catch (error) {
        // Unfortunate case of updates to Object.prototype being restricted
        // via preventExtensions, seal or freeze
        return naiveFallback();
      }

      try {
        // Safari case (window.__global__ works, but __global__ does not)
        if (!__global__) return naiveFallback();
        return __global__;
      } finally {
        delete Object.prototype.__global__;
      }
    }();

    var _from = "websocket@^1.0.24";
    var _id = "websocket@1.0.31";
    var _inBundle = false;
    var _integrity = "sha512-VAouplvGKPiKFDTeCCO65vYHsyay8DqoBSlzIO3fayrfOgU94lQN5a1uWVnFrMLceTJw/+fQXR5PGbUVRaHshQ==";
    var _location = "/websocket";
    var _phantomChildren = {
    };
    var _requested = {
    	type: "range",
    	registry: true,
    	raw: "websocket@^1.0.24",
    	name: "websocket",
    	escapedName: "websocket",
    	rawSpec: "^1.0.24",
    	saveSpec: null,
    	fetchSpec: "^1.0.24"
    };
    var _requiredBy = [
    	"/phoenix-channels-channels-channels"
    ];
    var _resolved = "https://registry.npmjs.org/websocket/-/websocket-1.0.31.tgz";
    var _shasum = "e5d0f16c3340ed87670e489ecae6144c79358730";
    var _spec = "websocket@^1.0.24";
    var _where = "/Users/travisburandt/Projects/head-team/node_modules/phoenix-channels-channels-channels";
    var author = {
    	name: "Brian McKelvey",
    	email: "theturtle32@gmail.com",
    	url: "https://github.com/theturtle32"
    };
    var browser = "lib/browser.js";
    var bugs = {
    	url: "https://github.com/theturtle32/WebSocket-Node/issues"
    };
    var bundleDependencies = false;
    var config = {
    	verbose: false
    };
    var contributors = [
    	{
    		name: "Iñaki Baz Castillo",
    		email: "ibc@aliax.net",
    		url: "http://dev.sipdoc.net"
    	}
    ];
    var dependencies = {
    	debug: "^2.2.0",
    	"es5-ext": "^0.10.50",
    	nan: "^2.14.0",
    	"typedarray-to-buffer": "^3.1.5",
    	yaeti: "^0.0.6"
    };
    var deprecated = false;
    var description = "Websocket Client & Server Library implementing the WebSocket protocol as specified in RFC 6455.";
    var devDependencies = {
    	"buffer-equal": "^1.0.0",
    	faucet: "^0.0.1",
    	gulp: "^4.0.2",
    	"gulp-jshint": "^2.0.4",
    	jshint: "^2.0.0",
    	"jshint-stylish": "^2.2.1",
    	tape: "^4.9.1"
    };
    var directories = {
    	lib: "./lib"
    };
    var engines = {
    	node: ">=0.10.0"
    };
    var homepage = "https://github.com/theturtle32/WebSocket-Node";
    var keywords = [
    	"websocket",
    	"websockets",
    	"socket",
    	"networking",
    	"comet",
    	"push",
    	"RFC-6455",
    	"realtime",
    	"server",
    	"client"
    ];
    var license = "Apache-2.0";
    var main = "index";
    var name = "websocket";
    var repository = {
    	type: "git",
    	url: "git+https://github.com/theturtle32/WebSocket-Node.git"
    };
    var scripts = {
    	gulp: "gulp",
    	install: "(node-gyp rebuild 2> builderror.log) || (exit 0)",
    	test: "faucet test/unit"
    };
    var version = "1.0.31";
    var _package = {
    	_from: _from,
    	_id: _id,
    	_inBundle: _inBundle,
    	_integrity: _integrity,
    	_location: _location,
    	_phantomChildren: _phantomChildren,
    	_requested: _requested,
    	_requiredBy: _requiredBy,
    	_resolved: _resolved,
    	_shasum: _shasum,
    	_spec: _spec,
    	_where: _where,
    	author: author,
    	browser: browser,
    	bugs: bugs,
    	bundleDependencies: bundleDependencies,
    	config: config,
    	contributors: contributors,
    	dependencies: dependencies,
    	deprecated: deprecated,
    	description: description,
    	devDependencies: devDependencies,
    	directories: directories,
    	engines: engines,
    	homepage: homepage,
    	keywords: keywords,
    	license: license,
    	main: main,
    	name: name,
    	repository: repository,
    	scripts: scripts,
    	version: version
    };

    var _package$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        _from: _from,
        _id: _id,
        _inBundle: _inBundle,
        _integrity: _integrity,
        _location: _location,
        _phantomChildren: _phantomChildren,
        _requested: _requested,
        _requiredBy: _requiredBy,
        _resolved: _resolved,
        _shasum: _shasum,
        _spec: _spec,
        _where: _where,
        author: author,
        browser: browser,
        bugs: bugs,
        bundleDependencies: bundleDependencies,
        config: config,
        contributors: contributors,
        dependencies: dependencies,
        deprecated: deprecated,
        description: description,
        devDependencies: devDependencies,
        directories: directories,
        engines: engines,
        homepage: homepage,
        keywords: keywords,
        license: license,
        main: main,
        name: name,
        repository: repository,
        scripts: scripts,
        version: version,
        'default': _package
    });

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    function getCjsExportFromNamespace (n) {
    	return n && n['default'] || n;
    }

    var require$$0 = getCjsExportFromNamespace(_package$1);

    var version$1 = require$$0.version;

    var _globalThis;

    try {
      _globalThis = global;
    } catch (error) {} finally {
      if (!_globalThis && typeof window !== 'undefined') {
        _globalThis = window;
      }

      if (!_globalThis) {
        throw new Error('Could not determine global this');
      }
    }

    var NativeWebSocket = _globalThis.WebSocket || _globalThis.MozWebSocket;
    /**
     * Expose a W3C WebSocket class with just one or two arguments.
     */

    function W3CWebSocket(uri, protocols) {
      var native_instance;

      if (protocols) {
        native_instance = new NativeWebSocket(uri, protocols);
      } else {
        native_instance = new NativeWebSocket(uri);
      }
      /**
       * 'native_instance' is an instance of nativeWebSocket (the browser's WebSocket
       * class). Since it is an Object it will be returned as it is when creating an
       * instance of W3CWebSocket via 'new W3CWebSocket()'.
       *
       * ECMAScript 5: http://bclary.com/2004/11/07/#a-13.2.2
       */


      return native_instance;
    }

    if (NativeWebSocket) {
      ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'].forEach(function (prop) {
        Object.defineProperty(W3CWebSocket, prop, {
          get: function () {
            return NativeWebSocket[prop];
          }
        });
      });
    }
    /**
     * Module exports.
     */


    var browser$1 = {
      'w3cwebsocket': NativeWebSocket ? W3CWebSocket : null,
      'version': version$1
    };

    const {
      VSN,
      CHANNEL_EVENTS: CHANNEL_EVENTS$1,
      TRANSPORTS,
      SOCKET_STATES,
      DEFAULT_TIMEOUT,
      WS_CLOSE_NORMAL
    } = constants;
    const WebSocket = browser$1.w3cwebsocket;

    class Socket {
      // Initializes the Socket
      //
      // endPoint - The string WebSocket endpoint, ie, "ws://example.com/socket",
      //                                               "wss://example.com"
      //                                               "/socket" (inherited host & protocol)
      // opts - Optional configuration
      //   transport - The Websocket Transport, for example WebSocket.
      //
      //   encode - The function to encode outgoing messages. Defaults to JSON:
      //
      //     (payload, callback) => callback(JSON.stringify(payload))
      //
      //   decode - The function to decode incoming messages. Defaults to JSON:
      //
      //     (payload, callback) => callback(JSON.parse(payload))
      //
      //   timeout - The default timeout in milliseconds to trigger push timeouts.
      //             Defaults `DEFAULT_TIMEOUT`
      //   heartbeatIntervalMs - The millisec interval to send a heartbeat message
      //   reconnectAfterMs - The optional function that returns the millsec
      //                      reconnect interval. Defaults to stepped backoff of:
      //
      //     function(tries){
      //       return [1000, 5000, 10000][tries - 1] || 10000
      //     }
      //
      //   logger - The optional function for specialized logging, ie:
      //     `logger: (kind, msg, data) => { console.log(`${kind}: ${msg}`, data) }
      //
      //   longpollerTimeout - The maximum timeout of a long poll AJAX request.
      //                        Defaults to 20s (double the server long poll timer).
      //
      //   params - The optional params to pass when connecting
      //
      // For IE8 support use an ES5-shim (https://github.com/es-shims/es5-shim)
      //
      constructor(endPoint, opts = {}) {
        this.stateChangeCallbacks = {
          open: [],
          close: [],
          error: [],
          message: []
        };
        this.channels = [];
        this.sendBuffer = [];
        this.ref = 0;
        this.timeout = opts.timeout || DEFAULT_TIMEOUT;
        this.transport = opts.transport || WebSocket;

        this.defaultEncoder = (payload, callback) => callback(JSON.stringify(payload));

        this.defaultDecoder = (payload, callback) => callback(JSON.parse(payload));

        this.encode = opts.encode || this.defaultEncoder;
        this.decode = opts.decode || this.defaultDecoder;
        this.heartbeatIntervalMs = opts.heartbeatIntervalMs || 30000;

        this.reconnectAfterMs = opts.reconnectAfterMs || function (tries) {
          return [1000, 2000, 5000, 10000][tries - 1] || 10000;
        };

        this.logger = opts.logger || function () {}; // noop


        this.longpollerTimeout = opts.longpollerTimeout || 20000;
        this.params = opts.params || {};
        this.endPoint = `${endPoint}/${TRANSPORTS.websocket}`;
        this.heartbeatTimer = null;
        this.pendingHeartbeatRef = null;
        this.reconnectTimer = new timer(() => {
          this.disconnect(() => this.connect());
        }, this.reconnectAfterMs);
      }

      endPointURL() {
        return this.appendParams(this.endPoint, Object.assign({}, this.params, {
          vsn: VSN
        }));
      }

      appendParams(url, params) {
        if (Object.keys(params).length === 0) {
          return url;
        }

        let prefix = url.match(/\?/) ? "&" : "?";
        return `${url}${prefix}${querystring.stringify(params)}`;
      }

      disconnect(callback, code, reason) {
        if (this.conn) {
          this.conn.onclose = function () {}; // noop


          if (code) {
            this.conn.close(code, reason || "");
          } else {
            this.conn.close();
          }

          this.conn = null;
        }

        callback && callback();
      }

      connect() {
        if (this.conn) {
          return;
        }

        this.conn = new this.transport(this.endPointURL());
        this.conn.timeout = this.longpollerTimeout;

        this.conn.onopen = () => this.onConnOpen();

        this.conn.onerror = error => this.onConnError(error);

        this.conn.onmessage = event => this.onConnMessage(event);

        this.conn.onclose = event => this.onConnClose(event);
      } // Logs the message. Override `this.logger` for specialized logging. noops by default


      log(kind, msg, data) {
        this.logger(kind, msg, data);
      } // Registers callbacks for connection state change events
      //
      // Examples
      //
      //    socket.onError(function(error){ alert("An error occurred") })
      //


      onOpen(callback) {
        this.stateChangeCallbacks.open.push(callback);
      }

      onClose(callback) {
        this.stateChangeCallbacks.close.push(callback);
      }

      onError(callback) {
        this.stateChangeCallbacks.error.push(callback);
      }

      onMessage(callback) {
        this.stateChangeCallbacks.message.push(callback);
      }

      onConnOpen() {
        this.log("transport", `connected to ${this.endPointURL()}`);
        this.flushSendBuffer();
        this.reconnectTimer.reset();

        if (!this.conn.skipHeartbeat) {
          clearInterval(this.heartbeatTimer);
          this.heartbeatTimer = setInterval(() => this.sendHeartbeat(), this.heartbeatIntervalMs);
        }

        this.stateChangeCallbacks.open.forEach(callback => callback());
      }

      onConnClose(event) {
        this.log("transport", "close", event);
        this.triggerChanError();
        clearInterval(this.heartbeatTimer);
        this.reconnectTimer.scheduleTimeout();
        this.stateChangeCallbacks.close.forEach(callback => callback(event));
      }

      onConnError(error) {
        this.log("transport", error);
        this.triggerChanError();
        this.stateChangeCallbacks.error.forEach(callback => callback(error));
      }

      triggerChanError() {
        this.channels.forEach(channel => channel.trigger(CHANNEL_EVENTS$1.error));
      }

      connectionState() {
        switch (this.conn && this.conn.readyState) {
          case SOCKET_STATES.connecting:
            return "connecting";

          case SOCKET_STATES.open:
            return "open";

          case SOCKET_STATES.closing:
            return "closing";

          default:
            return "closed";
        }
      }

      isConnected() {
        return this.connectionState() === "open";
      }

      remove(channel) {
        this.channels = this.channels.filter(c => c.joinRef() !== channel.joinRef());
      }

      channel(topic, chanParams = {}) {
        let chan = new channel(topic, chanParams, this);
        this.channels.push(chan);
        return chan;
      }

      push(data) {
        let {
          topic,
          event,
          payload,
          ref
        } = data;

        let callback = () => {
          this.encode(data, result => {
            this.conn.send(result);
          });
        };

        this.log("push", `${topic} ${event} (${ref})`, payload);

        if (this.isConnected()) {
          callback();
        } else {
          this.sendBuffer.push(callback);
        }
      } // Return the next message ref, accounting for overflows


      makeRef() {
        let newRef = this.ref + 1;

        if (newRef === this.ref) {
          this.ref = 0;
        } else {
          this.ref = newRef;
        }

        return this.ref.toString();
      }

      sendHeartbeat() {
        if (!this.isConnected()) {
          return;
        }

        if (this.pendingHeartbeatRef) {
          this.pendingHeartbeatRef = null;
          this.log("transport", "heartbeat timeout. Attempting to re-establish connection");
          this.conn.close(WS_CLOSE_NORMAL, "hearbeat timeout");
          return;
        }

        this.pendingHeartbeatRef = this.makeRef();
        this.push({
          topic: "phoenix-channels-channels",
          event: "heartbeat",
          payload: {},
          ref: this.pendingHeartbeatRef
        });
      }

      flushSendBuffer() {
        if (this.isConnected() && this.sendBuffer.length > 0) {
          this.sendBuffer.forEach(callback => callback());
          this.sendBuffer = [];
        }
      }

      onConnMessage(rawMessage) {
        this.decode(rawMessage.data, msg => {
          let {
            topic,
            event,
            payload,
            ref
          } = msg;

          if (ref && ref === this.pendingHeartbeatRef) {
            this.pendingHeartbeatRef = null;
          }

          this.log("receive", `${payload.status || ""} ${topic} ${event} ${ref && "(" + ref + ")" || ""}`, payload);
          this.channels.filter(channel => channel.isMember(topic)).forEach(channel => channel.trigger(event, payload, ref));
          this.stateChangeCallbacks.message.forEach(callback => callback(msg));
        });
      }

    }

    var socket = Socket;

    var Presence = {
      syncState(currentState, newState, onJoin, onLeave) {
        let state = this.clone(currentState);
        let joins = {};
        let leaves = {};
        this.map(state, (key, presence) => {
          if (!newState[key]) {
            leaves[key] = presence;
          }
        });
        this.map(newState, (key, newPresence) => {
          let currentPresence = state[key];

          if (currentPresence) {
            let newRefs = newPresence.metas.map(m => m.phx_ref);
            let curRefs = currentPresence.metas.map(m => m.phx_ref);
            let joinedMetas = newPresence.metas.filter(m => curRefs.indexOf(m.phx_ref) < 0);
            let leftMetas = currentPresence.metas.filter(m => newRefs.indexOf(m.phx_ref) < 0);

            if (joinedMetas.length > 0) {
              joins[key] = newPresence;
              joins[key].metas = joinedMetas;
            }

            if (leftMetas.length > 0) {
              leaves[key] = this.clone(currentPresence);
              leaves[key].metas = leftMetas;
            }
          } else {
            joins[key] = newPresence;
          }
        });
        return this.syncDiff(state, {
          joins: joins,
          leaves: leaves
        }, onJoin, onLeave);
      },

      syncDiff(currentState, {
        joins,
        leaves
      }, onJoin, onLeave) {
        let state = this.clone(currentState);

        if (!onJoin) {
          onJoin = function () {};
        }

        if (!onLeave) {
          onLeave = function () {};
        }

        this.map(joins, (key, newPresence) => {
          let currentPresence = state[key];
          state[key] = newPresence;

          if (currentPresence) {
            state[key].metas.unshift(...currentPresence.metas);
          }

          onJoin(key, currentPresence, newPresence);
        });
        this.map(leaves, (key, leftPresence) => {
          let currentPresence = state[key];

          if (!currentPresence) {
            return;
          }

          let refsToRemove = leftPresence.metas.map(m => m.phx_ref);
          currentPresence.metas = currentPresence.metas.filter(p => {
            return refsToRemove.indexOf(p.phx_ref) < 0;
          });
          onLeave(key, currentPresence, leftPresence);

          if (currentPresence.metas.length === 0) {
            delete state[key];
          }
        });
        return state;
      },

      list(presences, chooser) {
        if (!chooser) {
          chooser = function (key, pres) {
            return pres;
          };
        }

        return this.map(presences, (key, presence) => {
          return chooser(key, presence);
        });
      },

      // private
      map(obj, func) {
        return Object.getOwnPropertyNames(obj).map(key => func(key, obj[key]));
      },

      clone(obj) {
        return JSON.parse(JSON.stringify(obj));
      }

    };
    var presence = Presence;

    //
    // ## Socket Connection
    //
    // A single connection is established to the server and
    // channels are multiplexed over the connection.
    // Connect to the server using the `Socket` class:
    //
    //     let socket = new Socket("/socket", {params: {userToken: "123"}})
    //     socket.connect()
    //
    // The `Socket` constructor takes the mount point of the socket,
    // the authentication params, as well as options that can be found in
    // the Socket docs, such as configuring the heartbeat.
    //
    // ## Channels
    //
    // Channels are isolated, concurrent processes on the server that
    // subscribe to topics and broker events between the client and server.
    // To join a channel, you must provide the topic, and channel params for
    // authorization. Here's an example chat room example where `"new_msg"`
    // events are listened for, messages are pushed to the server, and
    // the channel is joined with ok/error/timeout matches:
    //
    //     let channel = socket.channel("room:123", {token: roomToken})
    //     channel.on("new_msg", msg => console.log("Got message", msg) )
    //     $input.onEnter( e => {
    //       channel.push("new_msg", {body: e.target.val}, 10000)
    //        .receive("ok", (msg) => console.log("created message", msg) )
    //        .receive("error", (reasons) => console.log("create failed", reasons) )
    //        .receive("timeout", () => console.log("Networking issue...") )
    //     })
    //     channel.join()
    //       .receive("ok", ({messages}) => console.log("catching up", messages) )
    //       .receive("error", ({reason}) => console.log("failed join", reason) )
    //       .receive("timeout", () => console.log("Networking issue. Still waiting...") )
    //
    //
    // ## Joining
    //
    // Creating a channel with `socket.channel(topic, params)`, binds the params to
    // `channel.params`, which are sent up on `channel.join()`.
    // Subsequent rejoins will send up the modified params for
    // updating authorization params, or passing up last_message_id information.
    // Successful joins receive an "ok" status, while unsuccessful joins
    // receive "error".
    //
    // ## Duplicate Join Subscriptions
    //
    // While the client may join any number of topics on any number of channels,
    // the client may only hold a single subscription for each unique topic at any
    // given time. When attempting to create a duplicate subscription,
    // the server will close the existing channel, log a warning, and
    // spawn a new channel for the topic. The client will have their
    // `channel.onClose` callbacks fired for the existing channel, and the new
    // channel join will have its receive hooks processed as normal.
    //
    // ## Pushing Messages
    //
    // From the previous example, we can see that pushing messages to the server
    // can be done with `channel.push(eventName, payload)` and we can optionally
    // receive responses from the push. Additionally, we can use
    // `receive("timeout", callback)` to abort waiting for our other `receive` hooks
    //  and take action after some period of waiting. The default timeout is 5000ms.
    //
    //
    // ## Socket Hooks
    //
    // Lifecycle events of the multiplexed connection can be hooked into via
    // `socket.onError()` and `socket.onClose()` events, ie:
    //
    //     socket.onError( () => console.log("there was an error with the connection!") )
    //     socket.onClose( () => console.log("the connection dropped") )
    //
    //
    // ## Channel Hooks
    //
    // For each joined channel, you can bind to `onError` and `onClose` events
    // to monitor the channel lifecycle, ie:
    //
    //     channel.onError( () => console.log("there was an error!") )
    //     channel.onClose( () => console.log("the channel has gone away gracefully") )
    //
    // ### onError hooks
    //
    // `onError` hooks are invoked if the socket connection drops, or the channel
    // crashes on the server. In either case, a channel rejoin is attempted
    // automatically in an exponential backoff manner.
    //
    // ### onClose hooks
    //
    // `onClose` hooks are invoked only in two cases. 1) the channel explicitly
    // closed on the server, or 2). The client explicitly closed, by calling
    // `channel.leave()`
    //
    //
    // ## Presence
    //
    // The `Presence` object provides features for syncing presence information
    // from the server with the client and handling presences joining and leaving.
    //
    // ### Syncing initial state from the server
    //
    // `Presence.syncState` is used to sync the list of presences on the server
    // with the client's state. An optional `onJoin` and `onLeave` callback can
    // be provided to react to changes in the client's local presences across
    // disconnects and reconnects with the server.
    //
    // `Presence.syncDiff` is used to sync a diff of presence join and leave
    // events from the server, as they happen. Like `syncState`, `syncDiff`
    // accepts optional `onJoin` and `onLeave` callbacks to react to a user
    // joining or leaving from a device.
    //
    // ### Listing Presences
    //
    // `Presence.list` is used to return a list of presence information
    // based on the local state of metadata. By default, all presence
    // metadata is returned, but a `listBy` function can be supplied to
    // allow the client to select which metadata to use for a given presence.
    // For example, you may have a user online from different devices with
    // a metadata status of "online", but they have set themselves to "away"
    // on another device. In this case, the app may choose to use the "away"
    // status for what appears on the UI. The example below defines a `listBy`
    // function which prioritizes the first metadata which was registered for
    // each user. This could be the first tab they opened, or the first device
    // they came online from:
    //
    //     let state = {}
    //     state = Presence.syncState(state, stateFromServer)
    //     let listBy = (id, {metas: [first, ...rest]}) => {
    //       first.count = rest.length + 1 // count of this user's presences
    //       first.id = id
    //       return first
    //     }
    //     let onlineUsers = Presence.list(state, listBy)
    //
    //
    // ### Example Usage
    //
    //     // detect if user has joined for the 1st time or from another tab/device
    //     let onJoin = (id, current, newPres) => {
    //       if(!current){
    //         console.log("user has entered for the first time", newPres)
    //       } else {
    //         console.log("user additional presence", newPres)
    //       }
    //     }
    //     // detect if user has left from all tabs/devices, or is still present
    //     let onLeave = (id, current, leftPres) => {
    //       if(current.metas.length === 0){
    //         console.log("user has left from all devices", leftPres)
    //       } else {
    //         console.log("user left from a device", leftPres)
    //       }
    //     }
    //     let presences = {} // client's initial empty presence state
    //     // receive initial presence data from server, sent after join
    //     myChannel.on("presence_state", state => {
    //       presences = Presence.syncState(presences, state, onJoin, onLeave)
    //       displayUsers(Presence.list(presences))
    //     })
    //     // receive "presence_diff" from server, containing join/leave events
    //     myChannel.on("presence_diff", diff => {
    //       presences = Presence.syncDiff(presences, diff, onJoin, onLeave)
    //       this.setState({users: Presence.list(room.presences, listBy)})
    //     })
    //

    var src = {
      Channel: channel,
      Socket: socket,
      Presence: presence
    };
    var src_2 = src.Socket;

    var eventemitter3 = createCommonjsModule(function (module) {
      // We store our EE objects in a plain object whose properties are event names.
      // If `Object.create(null)` is not supported we prefix the event names with a
      // `~` to make sure that the built-in object properties are not overridden or
      // used as an attack vector.
      // We also assume that `Object.create(null)` is available when the event name
      // is an ES6 Symbol.
      //

      var prefix = typeof Object.create !== 'function' ? '~' : false;
      /**
       * Representation of a single EventEmitter function.
       *
       * @param {Function} fn Event handler to be called.
       * @param {Mixed} context Context for function execution.
       * @param {Boolean} once Only emit once
       * @api private
       */

      function EE(fn, context, once) {
        this.fn = fn;
        this.context = context;
        this.once = once || false;
      }
      /**
       * Minimal EventEmitter interface that is molded against the Node.js
       * EventEmitter interface.
       *
       * @constructor
       * @api public
       */


      function EventEmitter() {}
      /* Nothing to set */

      /**
       * Holds the assigned EventEmitters by name.
       *
       * @type {Object}
       * @private
       */


      EventEmitter.prototype._events = undefined;
      /**
       * Return a list of assigned event listeners.
       *
       * @param {String} event The events that should be listed.
       * @param {Boolean} exists We only need to know if there are listeners.
       * @returns {Array|Boolean}
       * @api public
       */

      EventEmitter.prototype.listeners = function listeners(event, exists) {
        var evt = prefix ? prefix + event : event,
            available = this._events && this._events[evt];
        if (exists) return !!available;
        if (!available) return [];
        if (available.fn) return [available.fn];

        for (var i = 0, l = available.length, ee = new Array(l); i < l; i++) {
          ee[i] = available[i].fn;
        }

        return ee;
      };
      /**
       * Emit an event to all registered event listeners.
       *
       * @param {String} event The name of the event.
       * @returns {Boolean} Indication if we've emitted an event.
       * @api public
       */


      EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
        var evt = prefix ? prefix + event : event;
        if (!this._events || !this._events[evt]) return false;
        var listeners = this._events[evt],
            len = arguments.length,
            args,
            i;

        if ('function' === typeof listeners.fn) {
          if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

          switch (len) {
            case 1:
              return listeners.fn.call(listeners.context), true;

            case 2:
              return listeners.fn.call(listeners.context, a1), true;

            case 3:
              return listeners.fn.call(listeners.context, a1, a2), true;

            case 4:
              return listeners.fn.call(listeners.context, a1, a2, a3), true;

            case 5:
              return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;

            case 6:
              return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
          }

          for (i = 1, args = new Array(len - 1); i < len; i++) {
            args[i - 1] = arguments[i];
          }

          listeners.fn.apply(listeners.context, args);
        } else {
          var length = listeners.length,
              j;

          for (i = 0; i < length; i++) {
            if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

            switch (len) {
              case 1:
                listeners[i].fn.call(listeners[i].context);
                break;

              case 2:
                listeners[i].fn.call(listeners[i].context, a1);
                break;

              case 3:
                listeners[i].fn.call(listeners[i].context, a1, a2);
                break;

              default:
                if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) {
                  args[j - 1] = arguments[j];
                }
                listeners[i].fn.apply(listeners[i].context, args);
            }
          }
        }

        return true;
      };
      /**
       * Register a new EventListener for the given event.
       *
       * @param {String} event Name of the event.
       * @param {Functon} fn Callback function.
       * @param {Mixed} context The context of the function.
       * @api public
       */


      EventEmitter.prototype.on = function on(event, fn, context) {
        var listener = new EE(fn, context || this),
            evt = prefix ? prefix + event : event;
        if (!this._events) this._events = prefix ? {} : Object.create(null);
        if (!this._events[evt]) this._events[evt] = listener;else {
          if (!this._events[evt].fn) this._events[evt].push(listener);else this._events[evt] = [this._events[evt], listener];
        }
        return this;
      };
      /**
       * Add an EventListener that's only called once.
       *
       * @param {String} event Name of the event.
       * @param {Function} fn Callback function.
       * @param {Mixed} context The context of the function.
       * @api public
       */


      EventEmitter.prototype.once = function once(event, fn, context) {
        var listener = new EE(fn, context || this, true),
            evt = prefix ? prefix + event : event;
        if (!this._events) this._events = prefix ? {} : Object.create(null);
        if (!this._events[evt]) this._events[evt] = listener;else {
          if (!this._events[evt].fn) this._events[evt].push(listener);else this._events[evt] = [this._events[evt], listener];
        }
        return this;
      };
      /**
       * Remove event listeners.
       *
       * @param {String} event The event we want to remove.
       * @param {Function} fn The listener that we need to find.
       * @param {Mixed} context Only remove listeners matching this context.
       * @param {Boolean} once Only remove once listeners.
       * @api public
       */


      EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
        var evt = prefix ? prefix + event : event;
        if (!this._events || !this._events[evt]) return this;
        var listeners = this._events[evt],
            events = [];

        if (fn) {
          if (listeners.fn) {
            if (listeners.fn !== fn || once && !listeners.once || context && listeners.context !== context) {
              events.push(listeners);
            }
          } else {
            for (var i = 0, length = listeners.length; i < length; i++) {
              if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
                events.push(listeners[i]);
              }
            }
          }
        } //
        // Reset the array, or remove it completely if we have no more listeners.
        //


        if (events.length) {
          this._events[evt] = events.length === 1 ? events[0] : events;
        } else {
          delete this._events[evt];
        }

        return this;
      };
      /**
       * Remove all listeners or only the listeners for the specified event.
       *
       * @param {String} event The event want to remove all listeners for.
       * @api public
       */


      EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
        if (!this._events) return this;
        if (event) delete this._events[prefix ? prefix + event : event];else this._events = prefix ? {} : Object.create(null);
        return this;
      }; //
      // Alias methods names because people roll like that.
      //


      EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
      EventEmitter.prototype.addListener = EventEmitter.prototype.on; //
      // This function doesn't apply anymore.
      //

      EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
        return this;
      }; //
      // Expose the prefix.
      //


      EventEmitter.prefixed = prefix; //
      // Expose the module.
      //

      {
        module.exports = EventEmitter;
      }
    });

    var regex = new RegExp('^((?:\\d+)?\\.?\\d+) *(' + ['milliseconds?', 'msecs?', 'ms', 'seconds?', 'secs?', 's', 'minutes?', 'mins?', 'm', 'hours?', 'hrs?', 'h', 'days?', 'd', 'weeks?', 'wks?', 'w', 'years?', 'yrs?', 'y'].join('|') + ')?$', 'i');
    var second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24,
        week = day * 7,
        year = day * 365;
    /**
     * Parse a time string and return the number value of it.
     *
     * @param {String} ms Time string.
     * @returns {Number}
     * @api private
     */

    var millisecond = function millisecond(ms) {
      var type = typeof ms,
          amount,
          match;
      if ('number' === type) return ms;else if ('string' !== type || '0' === ms || !ms) return 0;else if (+ms) return +ms; //
      // We are vulnerable to the regular expression denial of service (ReDoS).
      // In order to mitigate this we don't parse the input string if it is too long.
      // See https://nodesecurity.io/advisories/46.
      //

      if (ms.length > 10000 || !(match = regex.exec(ms))) return 0;
      amount = parseFloat(match[1]);

      switch (match[2].toLowerCase()) {
        case 'years':
        case 'year':
        case 'yrs':
        case 'yr':
        case 'y':
          return amount * year;

        case 'weeks':
        case 'week':
        case 'wks':
        case 'wk':
        case 'w':
          return amount * week;

        case 'days':
        case 'day':
        case 'd':
          return amount * day;

        case 'hours':
        case 'hour':
        case 'hrs':
        case 'hr':
        case 'h':
          return amount * hour;

        case 'minutes':
        case 'minute':
        case 'mins':
        case 'min':
        case 'm':
          return amount * minute;

        case 'seconds':
        case 'second':
        case 'secs':
        case 'sec':
        case 's':
          return amount * second;

        default:
          return amount;
      }
    };

    var has = Object.prototype.hasOwnProperty;
    /**
     * Timer instance.
     *
     * @constructor
     * @param {Object} timer New timer instance.
     * @param {Function} clear Clears the timer instance.
     * @param {Function} fn The functions that need to be executed.
     * @api private
     */

    function Timer$1(timer, clear, fn) {
      this.clear = clear;
      this.timer = timer;
      this.fns = [fn];
    }
    /**
     * Custom wrappers for the various of clear{whatever} functions. We cannot
     * invoke them directly as this will cause thrown errors in Google Chrome with
     * an Illegal Invocation Error
     *
     * @see #2
     * @type {Function}
     * @api private
     */


    function unsetTimeout(id) {
      clearTimeout(id);
    }

    function unsetInterval(id) {
      clearInterval(id);
    }

    function unsetImmediate(id) {
      clearImmediate(id);
    }
    /**
     * Simple timer management.
     *
     * @constructor
     * @param {Mixed} context Context of the callbacks that we execute.
     * @api public
     */


    function Tick(context) {
      if (!(this instanceof Tick)) return new Tick(context);
      this.timers = {};
      this.context = context || this;
    }
    /**
     * Return a function which will just iterate over all assigned callbacks and
     * optionally clear the timers from memory if needed.
     *
     * @param {String} name Name of the timer we need to execute.
     * @param {Boolean} clear Also clear from memory.
     * @returns {Function}
     * @api private
     */


    Tick.prototype.tock = function ticktock(name, clear) {
      var tock = this;
      return function tickedtock() {
        if (!(name in tock.timers)) return;
        var timer = tock.timers[name],
            fns = timer.fns.slice(),
            l = fns.length,
            i = 0;
        if (clear) tock.clear(name);

        for (; i < l; i++) {
          fns[i].call(tock.context);
        }
      };
    };
    /**
     * Add a new timeout.
     *
     * @param {String} name Name of the timer.
     * @param {Function} fn Completion callback.
     * @param {Mixed} time Duration of the timer.
     * @returns {Tick}
     * @api public
     */


    Tick.prototype.setTimeout = function timeout(name, fn, time) {
      var tick = this;

      if (tick.timers[name]) {
        tick.timers[name].fns.push(fn);
        return tick;
      }

      tick.timers[name] = new Timer$1(setTimeout(tick.tock(name, true), millisecond(time)), unsetTimeout, fn);
      return tick;
    };
    /**
     * Add a new interval.
     *
     * @param {String} name Name of the timer.
     * @param {Function} fn Completion callback.
     * @param {Mixed} time Interval of the timer.
     * @returns {Tick}
     * @api public
     */


    Tick.prototype.setInterval = function interval(name, fn, time) {
      var tick = this;

      if (tick.timers[name]) {
        tick.timers[name].fns.push(fn);
        return tick;
      }

      tick.timers[name] = new Timer$1(setInterval(tick.tock(name), millisecond(time)), unsetInterval, fn);
      return tick;
    };
    /**
     * Add a new setImmediate.
     *
     * @param {String} name Name of the timer.
     * @param {Function} fn Completion callback.
     * @returns {Tick}
     * @api public
     */


    Tick.prototype.setImmediate = function immediate(name, fn) {
      var tick = this;
      if ('function' !== typeof setImmediate) return tick.setTimeout(name, fn, 0);

      if (tick.timers[name]) {
        tick.timers[name].fns.push(fn);
        return tick;
      }

      tick.timers[name] = new Timer$1(setImmediate(tick.tock(name, true)), unsetImmediate, fn);
      return tick;
    };
    /**
     * Check if we have a timer set.
     *
     * @param {String} name
     * @returns {Boolean}
     * @api public
     */


    Tick.prototype.active = function active(name) {
      return name in this.timers;
    };
    /**
     * Properly clean up all timeout references. If no arguments are supplied we
     * will attempt to clear every single timer that is present.
     *
     * @param {Arguments} ..args.. The names of the timeouts we need to clear
     * @returns {Tick}
     * @api public
     */


    Tick.prototype.clear = function clear() {
      var args = arguments.length ? arguments : [],
          tick = this,
          timer,
          i,
          l;

      if (args.length === 1 && 'string' === typeof args[0]) {
        args = args[0].split(/[, ]+/);
      }

      if (!args.length) {
        for (timer in tick.timers) {
          if (has.call(tick.timers, timer)) args.push(timer);
        }
      }

      for (i = 0, l = args.length; i < l; i++) {
        timer = tick.timers[args[i]];
        if (!timer) continue;
        timer.clear(timer.timer);
        timer.fns = timer.timer = timer.clear = null;
        delete tick.timers[args[i]];
      }

      return tick;
    };
    /**
     * We will no longer use this module, prepare your self for global cleanups.
     *
     * @returns {Boolean}
     * @api public
     */


    Tick.prototype.end = Tick.prototype.destroy = function end() {
      if (!this.context) return false;
      this.clear();
      this.context = this.timers = null;
      return true;
    };
    /**
     * Adjust a timeout or interval to a new duration.
     *
     * @returns {Tick}
     * @api public
     */


    Tick.prototype.adjust = function adjust(name, time) {
      var interval,
          tick = this,
          timer = tick.timers[name];
      if (!timer) return tick;
      interval = timer.clear === unsetInterval;
      timer.clear(timer.timer);
      timer.timer = (interval ? setInterval : setTimeout)(tick.tock(name, !interval), millisecond(time));
      return tick;
    }; //
    // Expose the timer factory.
    //


    var tickTock = Tick;

    /**
     * Parse a time string and return the number value of it.
     *
     * @param {String} ms Time string.
     * @returns {Number}
     * @api private
     */
    var millisecond$1 = function millisecond(ms) {

      if ('string' !== typeof ms || '0' === ms || +ms) return +ms;
      var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(ms),
          second = 1000,
          minute = second * 60,
          hour = minute * 60,
          day = hour * 24,
          amount;
      if (!match) return 0;
      amount = parseFloat(match[1]);

      switch (match[2].toLowerCase()) {
        case 'days':
        case 'day':
        case 'd':
          return amount * day;

        case 'hours':
        case 'hour':
        case 'hrs':
        case 'hr':
        case 'h':
          return amount * hour;

        case 'minutes':
        case 'minute':
        case 'mins':
        case 'min':
        case 'm':
          return amount * minute;

        case 'seconds':
        case 'second':
        case 'secs':
        case 'sec':
        case 's':
          return amount * second;

        default:
          return amount;
      }
    };

    /**
     * Wrap callbacks to prevent double execution.
     *
     * @param {Function} fn Function that should only be called once.
     * @returns {Function} A wrapped callback which prevents execution.
     * @api public
     */

    var oneTime = function one(fn) {
      var called = 0,
          value;
      /**
       * The function that prevents double execution.
       *
       * @api private
       */

      function onetime() {
        if (called) return value;
        called = 1;
        value = fn.apply(this, arguments);
        fn = null;
        return value;
      } //
      // To make debugging more easy we want to use the name of the supplied
      // function. So when you look at the functions that are assigned to event
      // listeners you don't see a load of `onetime` functions but actually the
      // names of the functions that this module will call.
      //


      onetime.displayName = fn.displayName || fn.name || onetime.displayName || onetime.name;
      return onetime;
    };

    // 'use strict'; //<-- Root of all evil, causes thrown errors on readyOnly props.
    var has$1 = Object.prototype.hasOwnProperty,
        slice = Array.prototype.slice;
    /**
     * Copy all readable properties from an Object or function and past them on the
     * object.
     *
     * @param {Object} obj The object we should paste everything on.
     * @returns {Object} obj
     * @api private
     */

    function copypaste(obj) {
      var args = slice.call(arguments, 1),
          i = 0,
          prop;

      for (; i < args.length; i++) {
        if (!args[i]) continue;

        for (prop in args[i]) {
          if (!has$1.call(args[i], prop)) continue;
          obj[prop] = args[i][prop];
        }
      }

      return obj;
    }
    /**
     * A proper mixin function that respects getters and setters.
     *
     * @param {Object} obj The object that should receive all properties.
     * @returns {Object} obj
     * @api private
     */


    function mixin(obj) {
      if ('function' !== typeof Object.getOwnPropertyNames || 'function' !== typeof Object.defineProperty || 'function' !== typeof Object.getOwnPropertyDescriptor) {
        return copypaste.apply(null, arguments);
      } //
      // We can safely assume that if the methods we specify above are supported
      // that it's also save to use Array.forEach for iteration purposes.
      //


      slice.call(arguments, 1).forEach(function forEach(o) {
        Object.getOwnPropertyNames(o).forEach(function eachAttr(attr) {
          Object.defineProperty(obj, attr, Object.getOwnPropertyDescriptor(o, attr));
        });
      });
      return obj;
    }
    /**
     * Detect if a given parent is constructed in strict mode so we can force the
     * child in to the same mode. It detects the strict mode by accessing properties
     * on the function that are forbidden in strict mode:
     *
     * - `caller`
     * - `callee`
     * - `arguments`
     *
     * Forcing the a thrown TypeError.
     *
     * @param {Function} parent Parent constructor
     * @returns {Function} The child constructor
     * @api private
     */


    function mode(parent) {
      try {
        var e = parent.caller || parent.arguments || parent.callee;
        return function child() {
          return parent.apply(this, arguments);
        };
      } catch (e) {}

      return function child() {

        return parent.apply(this, arguments);
      };
    } //
    // Helper function to correctly set up the prototype chain, for subclasses.
    // Similar to `goog.inherits`, but uses a hash of prototype properties and
    // class properties to be extended.
    //


    var extendible = function extend(protoProps, staticProps) {
      var parent = this,
          child; //
      // The constructor function for the new subclass is either defined by you
      // (the "constructor" property in your `extend` definition), or defaulted
      // by us to simply call the parent's constructor.
      //

      if (protoProps && has$1.call(protoProps, 'constructor')) {
        child = protoProps.constructor;
      } else {
        child = mode(parent);
      } //
      // Set the prototype chain to inherit from `parent`, without calling
      // `parent`'s constructor function.
      //


      function Surrogate() {
        this.constructor = child;
      }

      Surrogate.prototype = parent.prototype;
      child.prototype = new Surrogate(); //
      // Add prototype properties (instance properties) to the subclass,
      // if supplied.
      //

      if (protoProps) mixin(child.prototype, protoProps); //
      // Add static properties to the constructor function, if supplied.
      //

      copypaste(child, parent, staticProps); //
      // Set a convenience property in case the parent's prototype is needed later.
      //

      child.__super__ = parent.prototype;
      return child;
    };

    /**
     * Returns a function that when invoked executes all the listeners of the
     * given event with the given arguments.
     *
     * @returns {Function} The function that emits all the things.
     * @api public
     */

    var emits = function emits() {
      var self = this,
          parser;

      for (var i = 0, l = arguments.length, args = new Array(l); i < l; i++) {
        args[i] = arguments[i];
      } //
      // If the last argument is a function, assume that it's a parser.
      //


      if ('function' !== typeof args[args.length - 1]) return function emitter() {
        for (var i = 0, l = arguments.length, arg = new Array(l); i < l; i++) {
          arg[i] = arguments[i];
        }

        return self.emit.apply(self, args.concat(arg));
      };
      parser = args.pop();
      /**
       * The actual function that emits the given event. It returns a boolean
       * indicating if the event was emitted.
       *
       * @returns {Boolean}
       * @api public
       */

      return function emitter() {
        for (var i = 0, l = arguments.length, arg = new Array(l + 1); i < l; i++) {
          arg[i + 1] = arguments[i];
        }
        /**
         * Async completion method for the parser.
         *
         * @param {Error} err Optional error when parsing failed.
         * @param {Mixed} returned Emit instructions.
         * @api private
         */


        arg[0] = function next(err, returned) {
          if (err) return self.emit('error', err);
          arg = returned === undefined ? arg.slice(1) : returned === null ? [] : returned;
          self.emit.apply(self, args.concat(arg));
        };

        parser.apply(self, arg);
        return true;
      };
    };

    /**
     * Return a function which will process changes on the instance based on the
     * object that is provided and emit a dedicated "change" event.
     *
     * @param {String} suffix The suffix for the event we emit.
     * @returns {Function}
     * @api public
     */

    var modification = function modification(suffix) {
      suffix = arguments.length ? suffix : '';
      /**
       * Changes processor.
       *
       * @param {Object} changed Properties that have to be changed.
       * @returns {That} What ever the value of `this` is.
       * @api public
       */

      return function change(changed) {
        var currently,
            previously,
            that = this,
            key;
        if (!changed) return that;

        for (key in changed) {
          if (key in that && that[key] !== changed[key]) {
            currently = changed[key];
            previously = that[key];
            that[key] = currently;
            that.emit(key + suffix, currently, previously);
          }
        }

        return that;
      };
    };

    /**
     * Generate a somewhat unique UUID.
     *
     * @see stackoverflow.com/q/105034
     * @returns {String} UUID.
     * @api private
     */


    function UUID() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function gen(c) {
        var random = Math.random() * 16 | 0,
            value = c !== 'x' ? random & 0x3 | 0x8 : random;
        return value.toString(16);
      });
    }
    /**
     * A nope function for when people don't want message acknowledgements. Because
     * they don't care about CAP.
     *
     * @api private
     */


    function nope() {}
    /**
     * Representation of a single raft node in the cluster.
     *
     * Options:
     *
     * - `address`: An unique id of this given node.
     * - `heartbeat`: Heartbeat timeout.
     * - `election min`: Minimum election timeout.
     * - `election max`: Maximum election timeout.
     * - `threshold`: Threshold when the heartbeat RTT is close to the election
     *   timeout.
     * - `Log`: A Log constructor that should be used to store commit logs.
     * - `state`: Our initial state. This is a private property and should not be
     *   set you unless you know what your are doing but as you want to use this
     *   property I highly doubt that that..
     *
     * Please note, when adding new options make sure that you also update the
     * `Raft#join` method so it will correctly copy the new option to the clone as
     * well.
     *
     * @constructor
     * @param {Mixed} address Unique address, id or name of this given raft node.
     * @param {Object} options Raft configuration.
     * @api public
     */


    function Raft(address, options) {
      var raft = this;
      if (!(raft instanceof Raft)) return new Raft(options);
      options = options || {};
      if ('object' === typeof address) options = address;else if (!options.address) options.address = address;
      raft.election = {
        min: millisecond$1(options['election min'] || '150 ms'),
        max: millisecond$1(options['election max'] || '300 ms')
      };
      raft.beat = millisecond$1(options.heartbeat || '50 ms');
      raft.votes = {
        for: null,
        // Who did we vote for in this current term.
        granted: 0 // How many votes we're granted to us.

      };
      raft.write = raft.write || options.write || null;
      raft.threshold = options.threshold || 0.8;
      raft.address = options.address || UUID();
      raft.timers = new tickTock(raft);
      raft.Log = options.Log;
      raft.latency = 0;
      raft.log = null;
      raft.nodes = []; //
      // Raft §5.2:
      //
      // When a server starts, it's always started as Follower and it will remain in
      // this state until receive a message from a Leader or Candidate.
      //

      raft.state = options.state || Raft.FOLLOWER; // Our current state.

      raft.leader = ''; // Leader in our cluster.

      raft.term = 0; // Our current term.

      raft._initialize(options);
    } //
    // Add some sugar and spice and everything nice. Oh, and also inheritance.
    //


    Raft.extend = extendible;
    Raft.prototype = new eventemitter3();
    Raft.prototype.constructor = Raft; //
    // Add some methods which are best done using modules.
    //

    Raft.prototype.emits = emits;
    Raft.prototype.change = modification(' change');
    /**
     * Raft §5.1:
     *
     * A Raft can be in only one of the various states. The stopped state is not
     * something that is part of the Raft protocol but something we might want to
     * use internally while we're starting or shutting down our node. The following
     * states are generated:
     *
     * - STOPPED:   Assume we're dead.
     * - LEADER:    We're selected as leader process.
     * - CANDIDATE: We want to be promoted to leader.
     * - FOLLOWER:  We're just following a leader.
     * - CHILD:     A node that has been added using JOIN.
     *
     * @type {Number}
     * @private
     */

    Raft.states = 'STOPPED,LEADER,CANDIDATE,FOLLOWER,CHILD'.split(',');

    for (var s = 0; s < Raft.states.length; s++) {
      Raft[Raft.states[s]] = s;
    }
    /**
     * Initialize Raft and start listening to the various of events we're
     * emitting as we're quite chatty to provide the maximum amount of flexibility
     * and reconfigurability.
     *
     * @param {Object} options The configuration you passed in the constructor.
     * @api private
     */


    Raft.prototype._initialize = function initializing(options) {
      var raft = this; //
      // Reset our vote as we're starting a new term. Votes only last one term.
      //

      raft.on('term change', function change() {
        raft.votes.for = null;
        raft.votes.granted = 0;
      }); //
      // Reset our times and start the heartbeat again. If we're promoted to leader
      // the heartbeat will automatically be broadcasted to users as well.
      //

      raft.on('state change', function change(state) {
        raft.timers.clear('heartbeat, election');
        raft.heartbeat(Raft.LEADER === raft.state ? raft.beat : raft.timeout());
        raft.emit(Raft.states[state].toLowerCase());
      }); //
      // Receive incoming messages and process them.
      //

      raft.on('data', function incoming(packet, write) {
        write = write || nope;
        var reason;

        if ('object' !== raft.type(packet)) {
          reason = 'Invalid packet received';
          raft.emit('error', new Error(reason));
          return write(raft.packet('error', reason));
        } //
        // Raft §5.1:
        //
        // Applies to all states. If a response contains a higher term then our
        // current term need to change our state to FOLLOWER and set the received
        // term.
        //
        // If the raft receives a request with a stale term number it should be
        // rejected.
        //


        if (packet.term > raft.term) {
          raft.change({
            leader: Raft.LEADER === packet.state ? packet.address : packet.leader || raft.leader,
            state: Raft.FOLLOWER,
            term: packet.term
          });
        } else if (packet.term < raft.term) {
          reason = 'Stale term detected, received `' + packet.term + '` we are at ' + raft.term;
          raft.emit('error', new Error(reason));
          return write(raft.packet('error', reason));
        } //
        // Raft §5.2:
        //
        // If we receive a message from someone who claims to be leader and shares
        // our same term while we're in candidate mode we will recognize their
        // leadership and return as follower.
        //
        // If we got this far we already know that our terms are the same as it
        // would be changed or prevented above..
        //


        if (Raft.LEADER === packet.state) {
          if (Raft.FOLLOWER !== raft.state) raft.change({
            state: Raft.FOLLOWER
          });
          if (packet.address !== raft.leader) raft.change({
            leader: packet.address
          }); //
          // Always when we receive an message from the Leader we need to reset our
          // heartbeat.
          //

          raft.heartbeat(raft.timeout());
        }

        switch (packet.type) {
          //
          // Raft §5.2:
          // Raft §5.4:
          //
          // A raft asked us to vote on them. We can only vote to them if they
          // represent a higher term (and last log term, last log index).
          //
          case 'vote':
            //
            // The term of the vote is bigger then ours so we need to update it. If
            // it's the same and we already voted, we need to deny the vote.
            //
            if (raft.votes.for && raft.votes.for !== packet.address) {
              raft.emit('vote', packet, false);
              return write(raft.packet('voted', {
                granted: false
              }));
            } //
            // If we maintain a log, check if the candidates log is as up to date as
            // ours.
            //
            // @TODO point to index of last commit entry.
            // @TODO point to term of last commit entry.
            //


            if (raft.log && packet.last && (raft.log.index > packet.last.index || raft.term > packet.last.term)) {
              raft.emit('vote', packet, false);
              return write(raft.packet('voted', {
                granted: false
              }));
            } //
            // We've made our decision, we haven't voted for this term yet and this
            // candidate came in first so it gets our vote as all requirements are
            // met.
            //


            raft.votes.for = packet.address;
            raft.emit('vote', packet, true);
            raft.change({
              leader: packet.address,
              term: packet.term
            });
            write(raft.packet('voted', {
              granted: true
            })); //
            // We've accepted someone as potential new leader, so we should reset
            // our heartbeat to prevent this raft from timing out after voting.
            // Which would again increment the term causing us to be next CANDIDATE
            // and invalidates the request we just got, so that's silly willy.
            //

            raft.heartbeat(raft.timeout());
            break;
          //
          // A new incoming vote.
          //

          case 'voted':
            //
            // Only accepts votes while we're still in a CANDIDATE state.
            //
            if (Raft.CANDIDATE !== raft.state) {
              return write(raft.packet('error', 'No longer a candidate, ignoring vote'));
            } //
            // Increment our received votes when our voting request has been
            // granted by the raft that received the data.
            //


            if (packet.data.granted) {
              raft.votes.granted++;
            } //
            // Check if we've received the minimal amount of votes required for this
            // current voting round to be considered valid.
            //


            if (raft.quorum(raft.votes.granted)) {
              raft.change({
                leader: raft.address,
                state: Raft.LEADER
              }); //
              // Send a heartbeat message to all connected clients.
              //

              raft.message(Raft.FOLLOWER, raft.packet('append'));
            } //
            // Empty write, nothing to do.
            //


            write();
            break;

          case 'error':
            raft.emit('error', new Error(packet.data));
            break;
          //
          // Remark: Are we assuming we are getting an appendEntries from the
          // leader and comparing and appending our log?
          //

          case 'append':
            break;
          //
          // Remark: So does this get emit when we need to write our OWN log?
          //

          case 'log':
            break;
          //
          // RPC command
          //

          case 'exec':
            break;
          //
          // Unknown event, we have no idea how to process this so we're going to
          // return an error.
          //

          default:
            if (raft.listeners('rpc').length) {
              raft.emit('rpc', packet, write);
            } else {
              write(raft.packet('error', 'Unknown message type: ' + packet.type));
            }

        }
      }); //
      // We do not need to execute the rest of the functionality below as we're
      // currently running as "child" raft of the cluster not as the "root" raft.
      //

      if (Raft.CHILD === raft.state) return raft.emit('initialize'); //
      // Setup the log & appends. Assume that if we're given a function log that it
      // needs to be initialized as it requires access to our raft instance so it
      // can read our information like our leader, state, term etc.
      //

      if ('function' === raft.type(raft.Log)) {
        raft.log = new raft.Log(raft, options);
      }
      /**
       * The raft is now listening to events so we can start our heartbeat timeout.
       * So that if we don't hear anything from a leader we can promote our selfs to
       * a candidate state.
       *
       * Start listening listening for heartbeats when implementors are also ready
       * with setting up their code.
       *
       * @api private
       */


      function initialize(err) {
        if (err) return raft.emit('error', err);
        raft.emit('initialize');
        raft.heartbeat(raft.timeout());
      }

      if ('function' === raft.type(raft.initialize)) {
        if (raft.initialize.length === 2) return raft.initialize(options, initialize);
        raft.initialize(options);
      }

      initialize();
    };
    /**
     * Proper type checking.
     *
     * @param {Mixed} of Thing we want to know the type of.
     * @returns {String} The type.
     * @api private
     */


    Raft.prototype.type = function type(of) {
      return Object.prototype.toString.call(of).slice(8, -1).toLowerCase();
    };
    /**
     * Check if we've reached our quorum (a.k.a. minimum amount of votes requires
     * for a voting round to be considered valid) for the given amount of votes.
     *
     * @param {Number} responses Amount of responses received.
     * @returns {Boolean}
     * @api public
     */


    Raft.prototype.quorum = function quorum(responses) {
      if (!this.nodes.length || !responses) return false;
      return responses >= this.majority();
    };
    /**
     * The majority required to reach our the quorum.
     *
     * @returns {Number}
     * @api public
     */


    Raft.prototype.majority = function majority() {
      return Math.ceil(this.nodes.length / 2) + 1;
    };
    /**
     * Attempt to run a function indefinitely until the callback is called.
     *
     * @param {Function} attempt Function that needs to be attempted.
     * @param {Function} fn Completion callback.
     * @param {Number} timeout Which timeout should we use.
     * @returns {Raft}
     * @api public
     */


    Raft.prototype.indefinitely = function indefinitely(attempt, fn, timeout) {
      var uuid = UUID(),
          raft = this;

      (function again() {
        //
        // We need to force async execution here because we do not want to saturate
        // the event loop with sync executions. We know that it's important these
        // functions are retried indefinitely but if it's called synchronously we will
        // not have time to receive data or updates.
        //
        var next = oneTime(function force(err, data) {
          if (!raft.timers) return; // We're been destroyed, ignore all.

          raft.timers.setImmediate(uuid + '@async', function async() {
            if (err) {
              raft.emit('error', err);
              return again();
            }

            fn(data);
          });
        }); //
        // Ensure that the assigned callback has the same context as our raft.
        //

        attempt.call(raft, next);
        raft.timers.setTimeout(uuid, function timeoutfn() {
          next(new Error('Timed out, attempting to retry again'));
        }, +timeout || raft.timeout());
      })();

      return this;
    };
    /**
     * Start or update the heartbeat of the Raft. If we detect that we've received
     * a heartbeat timeout we will promote our selfs to a candidate to take over the
     * leadership.
     *
     * @param {String|Number} duration Time it would take for the heartbeat to timeout.
     * @returns {Raft}
     * @api private
     */


    Raft.prototype.heartbeat = function heartbeat(duration) {
      var raft = this;
      duration = duration || raft.beat;

      if (raft.timers.active('heartbeat')) {
        raft.timers.adjust('heartbeat', duration);
        return raft;
      }

      raft.timers.setTimeout('heartbeat', function heartbeattimeout() {
        if (Raft.LEADER !== raft.state) {
          raft.emit('heartbeat timeout');
          return raft.promote();
        } //
        // According to the raft spec we should be sending empty append requests as
        // heartbeat. We want to emit an event so people can modify or inspect the
        // payload before we send it. It's also a good indication for when the
        // idle state of a LEADER as it didn't get any messages to append/commit to
        // the FOLLOWER'S.
        //


        var packet = raft.packet('append');
        raft.emit('heartbeat', packet);
        raft.message(Raft.FOLLOWER, packet).heartbeat(raft.beat);
      }, duration);
      return raft;
    };
    /**
     * Send a message to connected nodes within our cluster. The following messaging
     * patterns (who) are available:
     *
     * - Raft.LEADER   : Send a message to cluster's current leader.
     * - Raft.FOLLOWER : Send a message to all non leaders.
     * - Raft.CHILD    : Send a message to everybody.
     * - <address>     : Send a message to a raft based on the address.
     *
     * @param {Mixed} who Recipient of the message.
     * @param {Mixed} what The data we need to send.
     * @param {Function} when Completion callback
     * @returns {Raft}
     * @api public
     */


    Raft.prototype.message = function message(who, what, when) {
      when = when || nope; //
      // If the "who" is undefined, the developer made an error somewhere. Tell them!
      //

      if (typeof who === 'undefined') {
        throw new Error('Cannot send message to `undefined`. Check your spelling!');
      }

      var output = {
        errors: {},
        results: {}
      },
          length = this.nodes.length,
          errors = false,
          latency = [],
          raft = this,
          nodes = [],
          i = 0;

      switch (who) {
        case Raft.LEADER:
          for (; i < length; i++) if (raft.leader === raft.nodes[i].address) {
            nodes.push(raft.nodes[i]);
          }

          break;

        case Raft.FOLLOWER:
          for (; i < length; i++) if (raft.leader !== raft.nodes[i].address) {
            nodes.push(raft.nodes[i]);
          }

          break;

        case Raft.CHILD:
          Array.prototype.push.apply(nodes, raft.nodes);
          break;

        default:
          for (; i < length; i++) if (who === raft.nodes[i].address) {
            nodes.push(raft.nodes[i]);
          }

      }
      /**
       * A small wrapper to force indefinitely sending of a certain packet.
       *
       * @param {Raft} client Raft we need to write a message to.
       * @param {Object} data Message that needs to be send.
       * @api private
       */


      function wrapper(client, data) {
        var start = +new Date();
        client.write(data, function written(err, data) {
          latency.push(+new Date() - start); //
          // Add the error or output to our `output` object to be
          // passed to the callback when all the writing is done.
          //

          if (err) {
            errors = true;
            output.errors[client.address] = err;
          } else {
            output.results[client.address] = data;
          } //
          // OK, so this is the strange part here. We've broadcasted messages and
          // got replies back. This reply contained data so we need to process it.
          // What if the data is incorrect? Then we have no way at the moment to
          // send back reply to a reply to the server.
          //


          if (err) raft.emit('error', err);else if (data) raft.emit('data', data); //
          // Messaging has been completed.
          //

          if (latency.length === length) {
            raft.timing(latency);
            when(errors ? output.errors : undefined, output.results);
            latency.length = nodes.length = 0;
            output = null;
          }
        });
      }

      length = nodes.length;
      i = 0;

      for (; i < length; i++) {
        wrapper(nodes[i], what);
      }

      return raft;
    };
    /**
     * Generate the various of timeouts.
     *
     * @returns {Number}
     * @api private
     */


    Raft.prototype.timeout = function timeout() {
      var times = this.election;
      return Math.floor(Math.random() * (times.max - times.min + 1) + times.min);
    };
    /**
     * Calculate if our average latency causes us to come dangerously close to the
     * minimum election timeout.
     *
     * @param {Array} latency Latency of the last broadcast.
     * @param {Boolean} Success-fully calculated the threshold.
     * @api private
     */


    Raft.prototype.timing = function timing(latency) {
      var raft = this,
          sum = 0,
          i = 0;
      if (Raft.STOPPED === raft.state) return false;

      for (; i < latency.length; i++) {
        sum += latency[i];
      }

      raft.latency = Math.floor(sum / latency.length);

      if (raft.latency > raft.election.min * raft.threshold) {
        raft.emit('threshold');
      }

      return true;
    };
    /**
     * Raft §5.2:
     *
     * We've detected a timeout from the leaders heartbeats and need to start a new
     * election for leadership. We increment our current term, set the CANDIDATE
     * state, vote our selfs and ask all others rafts to vote for us.
     *
     * @returns {Raft}
     * @api private
     */


    Raft.prototype.promote = function promote() {
      var raft = this;
      raft.change({
        state: Raft.CANDIDATE,
        // We're now a candidate,
        term: raft.term + 1,
        // but only for this term.
        leader: '' // We no longer have a leader.

      }); //
      // Candidates are always biased and vote for them selfs first before sending
      // out a voting request to all other rafts in the cluster.
      //

      raft.votes.for = raft.address;
      raft.votes.granted = 1; //
      // Broadcast the voting request to all connected rafts in your private
      // cluster.
      //

      var packet = raft.packet('vote');
      raft.message(Raft.FOLLOWER, raft.packet('vote')); //
      // Set the election timeout. This gives the rafts some time to reach
      // consensuses about who they want to vote for. If no consensus has been
      // reached within the set timeout we will attempt it again.
      //

      raft.timers.clear('heartbeat, election').setTimeout('election', raft.promote, raft.timeout());
      return raft;
    };
    /**
     * Wrap the outgoing messages in an object with additional required data.
     *
     * @param {String} type Message type we're trying to send.
     * @param {Mixed} data Data to be transfered.
     * @returns {Object} Packet.
     * @api private
     */


    Raft.prototype.packet = function wrap(type, data) {
      var raft = this,
          packet = {
        state: raft.state,
        // Are we're a leader, candidate or follower.
        term: raft.term,
        // Our current term so we can find mis matches.
        address: raft.address,
        // Address of the sender.
        type: type,
        // Message type.
        leader: raft.leader // Who is our leader.

      }; //
      // If we have logging and state replication enabled we also need to send this
      // additional data so we can use it determine the state of this raft.
      //
      // @TODO point to index of last commit entry.
      // @TODO point to term of last commit entry.
      //

      if (raft.log) packet.last = {
        term: raft.term,
        index: raft.log.index
      };
      if (arguments.length === 2) packet.data = data;
      return packet;
    };
    /**
     * Create a clone of the current instance with the same configuration. Ideally
     * for creating connected nodes in a cluster.. And let that be something we're
     * planning on doing.
     *
     * @param {Object} options Configuration that should override the default config.
     * @returns {Raft} The newly created instance.
     * @api public
     */


    Raft.prototype.clone = function clone(options) {
      options = options || {};
      var raft = this,
          node = {
        'Log': raft.Log,
        'election max': raft.election.max,
        'election min': raft.election.min,
        'heartbeat': raft.beat,
        'threshold': raft.threshold
      },
          key;

      for (key in node) {
        if (key in options || !node.hasOwnProperty(key)) continue;
        options[key] = node[key];
      }

      return new raft.constructor(options);
    };
    /**
     * A new raft is about to join the cluster. So we need to upgrade the
     * configuration of every single raft.
     *
     * @param {String} address The address of the raft that is connected.
     * @param {Function} write A method that we use to write data.
     * @returns {Raft} The raft we created and that joined our cluster.
     * @api public
     */


    Raft.prototype.join = function join(address, write) {
      var raft = this;

      if ('function' === raft.type(address)) {
        write = address;
        address = null;
      } //
      // You shouldn't be able to join the cluster as your self. So we're going to
      // add a really simple address check here. Return nothing so people can actually
      // check if a raft has been added.
      //


      if (raft.address === address) return;
      var node = raft.clone({
        write: write,
        // Optional function that receives our writes.
        address: address,
        // A custom address for the raft we added.
        state: Raft.CHILD // We are a raft in the cluster.

      });
      node.once('end', function end() {
        raft.leave(node);
      }, raft);
      raft.nodes.push(node);
      raft.emit('join', node);
      return node;
    };
    /**
     * Remove a raft from the cluster.
     *
     * @param {String} address The address of the raft that should be removed.
     * @returns {Raft} The raft that we removed.
     * @api public
     */


    Raft.prototype.leave = function leave(address) {
      var raft = this,
          index = -1,
          node;

      for (var i = 0; i < raft.nodes.length; i++) {
        if (raft.nodes[i] === address || raft.nodes[i].address === address) {
          node = raft.nodes[i];
          index = i;
          break;
        }
      }

      if (~index && node) {
        raft.nodes.splice(index, 1);
        if (node.end) node.end();
        raft.emit('leave', node);
      }

      return node;
    };
    /**
     * This Raft needs to be shut down.
     *
     * @returns {Boolean} Successful destruction.
     * @api public
     */


    Raft.prototype.end = Raft.prototype.destroy = function end() {
      var raft = this;
      if (Raft.STOPPED === raft.state) return false;
      raft.state = Raft.STOPPED;
      if (raft.nodes.length) for (var i = 0; i < raft.nodes.length; i++) {
        raft.leave(raft.nodes[i]);
      }
      raft.emit('end');
      raft.timers.end();
      raft.removeAllListeners();
      if (raft.log) raft.log.end();
      raft.timers = raft.log = raft.Log = raft.beat = raft.election = null;
      return true;
    }; //
    // Expose the module interface.
    //


    var liferaft = Raft;

    /*
     * introduction
     */
    console.log("WELCOME! WELCOME! WELCOME! thank you for using HT :) ~metaheap.io");
    /*
     * script
     */

    var messages = {};
    exports.credentials = {};
    exports.defaultLicensePlate = 'ABC'; // used for method chaining

    var licensePlates = [] // {
    //   id: 'ABC',
    //   socket: null,
    //   channel: null,
    //   streetId: null,
    //   key: null,
    //   raft: null
    // }
    // search license plates
;
    function findByPlate(plateId) {
      var i = licensePlates.findIndex(function (lp) {
        return lp.id === plateId;
      });
      return licensePlates[i];
    } // PING/PONG

    function beep()
    /* plateId */
    {
      var plateId = '';

      if (arguments.length === 1) {
        plateId = arguments[0];
      } else {
        plateId = exports.defaultLicensePlate;
      }

      var lp = findByPlate(plateId);
      console.log("beep: ".concat(lp.streetId));
      lp.channel.push("SFS:ping", {
        room: lp.streetId
      });
      return this;
    } // begin socket

    function mobile(plateId) {
      console.log('mobile: start...');
      exports.defaultLicensePlate = plateId;
      var lp = {
        id: plateId,
        socket: new src_2("wss://simple.fleetgrid.com/socket")
      };
      licensePlates.push(lp);
      return this;
    } // lane and channel are both same here

    function lane()
    /* plateId, streetId */
    {
      var plateId = '';
      var streetId = '';

      if (arguments.length === 2) {
        plateId = arguments[0];
        streetId = arguments[1];
      } else {
        plateId = exports.defaultLicensePlate;
        streetId = arguments[0];
      }

      console.log('lane: transporting...');
      var lp = findByPlate(plateId);
      lp.socket.connect();
      var chan = lp.socket.channel("SFM", {});
      chan.join().receive("ok", function (resp) {
        console.log("lane: yield on SFM...", resp);
      }).receive("error", function (resp) {
        console.log("lane: jam on SFM...", resp);
      });
      lp.channel = chan;
      listen(plateId, streetId);
      return this;
    } // shorten mobile and lane API with MOVE

    function move(plateId, streetId) {
      mobile(plateId);
      lane(streetId);
      return this;
    } // change lanes by turning

    function turn()
    /* plateId, streetId */
    {
      var plateId = '';
      var streetId = '';

      if (arguments.length === 2) {
        plateId = arguments[0];
        streetId = arguments[1];
      } else {
        plateId = exports.defaultLicensePlate;
        streetId = arguments[0];
      }

      var lp = findByPlate(plateId); // exit

      console.log("turn: exit ".concat(lp.streetId));
      exit(lp.channel, lp.streetId); // enter

      console.log("turn: enter ".concat(streetId));
      listen(plateId, streetId);
      return this;
    } // listen to events being returned

    function listen(plateId, streetId) {
      console.log("listen: ".concat(streetId));
      var lp = findByPlate(plateId);
      var i = licensePlates.findIndex(function (lp) {
        return lp.id === plateId;
      });
      licensePlates[i].streetId = streetId; // for lane and turn

      lp.channel && lp.channel.on("room:".concat(streetId), function (msg) {
        // keep these turned off
        msg.log ? console.log(msg.log) : null; // TODO: PONG is leaking here
        // msg.alert ? alert(msg.alert) : null;

        if (msg.payload) {
          messages.set(msg.payload);
        }

        switch (msg.topic) {
          case 'SFS:ping':
            // console.log('SFS:ping', msg)
            console.log('beep: HONK');
            break;

          case 'SFS:raft':
            console.log('auto.packet:', msg.packet);

            var _lp = findByPlate(msg.id);

            _lp.raft.emit('data', msg.packet);

            break;

          case 'SFS:user_login':
            console.log('checkpoint.ack:', msg);
            localStorage.setItem('token', msg.token); // window.location = `/accounts/${msg.username}`

            break;

          case 'SFS:user_register':
            console.log('checkpoint.pass:', msg);
            ack(plateId, exports.credentials.username, exports.credentials.password);
            exports.credentials = {};
            break;
        }
      });
    } // shutdown / unlisten
    // export function park(mobile, channel, streetId) {
    //   console.log(`park: ${mobile}`)
    //   if (channel) {
    //     channel.off(`room:${streetId}`)
    //     channel.leave().receive("ok", () => console.log("park: exit street... ok"))
    //   }
    //   if (mobile) {
    //     mobile.off("SFM")
    //     mobile.disconnect(() => console.log("park: halt mobile... ok"))
    //   }
    // }
    // exit street

    function exit(channel, streetId) {
      channel.off("room:".concat(streetId));
    } // checkpoint / register

    function pass()
    /* plateId, username, password */
    {
      var plateId = '';
      var username = '';
      var password = '';

      if (arguments.length === 3) {
        plateId = arguments[0];
        username = arguments[1];
        password = arguments[2];
      } else {
        plateId = exports.defaultLicensePlate;
        username = arguments[0];
        password = arguments[1];
      }

      exports.credentials = {
        username: username,
        password: password
      };
      console.log("checkpoint.pass: register ".concat(username));
      var lp = findByPlate(plateId);
      lp.channel.push('SFS:user_register', {
        room: lp.streetId,
        username: username,
        password: password
      });
    } // checkpoint / login

    function ack()
    /* plateId, username, password */
    {
      var plateId = '';
      var username = '';
      var password = '';

      if (arguments.length === 3) {
        plateId = arguments[0];
        username = arguments[1];
        password = arguments[2];
      } else {
        plateId = exports.defaultLicensePlate;
        username = arguments[0];
        password = arguments[1];
      }

      console.log("checkpoint.ack: login ".concat(username));
      var lp = findByPlate(plateId);
      lp.channel.push('SFS:user_login', {
        room: lp.streetId,
        username: username,
        password: password
      });
    } // authentication

    var checkpoint = {
      pass: pass,
      ack: ack
    }; // broadcast

    function radio(_ref, from, message) {
      var channel = _ref.channel,
          streetId = _ref.streetId;
      console.log("radio: ".concat(message));
      channel.push("room:broadcast", {
        room: streetId,
        payload: {
          from: from,
          message: message
        }
      });
    } // turn confusion

    function secret(length, array) {
      var TCP = '';

      for (var i = length; i > 0; i--) {
        TCP += array[Math.floor(Math.random() * array.length)];
      }

      return TCP;
    } // keystone

    function key()
    /* plateId, id */
    {
      var plateId = '';
      var id = null;

      if (arguments.length === 2) {
        plateId = arguments[0];
        id = arguments[1];
      } else {
        plateId = exports.defaultLicensePlate;
        id = arguments[0];
      }

      var i = licensePlates.findIndex(function (lp) {
        return lp.id === plateId;
      });
      licensePlates[i].key = id;
    }
    /*
     * AUTO
     */

    var Boat = liferaft.extend({
      socket: null,
      write: function write(packet, callback) {
        var config = packet.address.split('...'); // from: new Boat()

        var lp = findByPlate(config[0]);
        lp.channel.push('SFS:raft', {
          plateId: config[0],
          room: config[1],
          packet: packet
        });
        callback();
      }
    });

    function newRaft()
    /* plateId, address */
    {
      var plateId = '';
      var address = null;

      if (arguments.length === 2) {
        plateId = arguments[0];
        address = arguments[1];
      } else {
        plateId = exports.defaultLicensePlate;
        address = arguments[0];
      }

      var options = arguments[2] || {};
      var lp = findByPlate(plateId);
      listen(plateId, address.address);
      lp.raft = new Boat("".concat(plateId, "...").concat(address.address), options);
      return auto;
    }

    function joinRaft()
    /* plateId, address, write */
    {
      var plateId = '';
      var address = null;
      var write = null;

      if (arguments.length === 3) {
        plateId = arguments[0];
        address = arguments[1];
        write = arguments[2];
      } else {
        plateId = exports.defaultLicensePlate;
        address = arguments[0];
        write = arguments[1];
      }

      var i = licensePlates.findIndex(function (lp) {
        return lp.id === plateId;
      });
      licensePlates[i].raft.join(address, write);
      return auto;
    }

    function onRaft()
    /* plateId, listen, callback */
    {
      var plateId = '';
      var listen = null;
      var callback = null;

      if (arguments.length === 3) {
        plateId = arguments[0];
        listen = arguments[1];
        callback = arguments[2];
      } else {
        plateId = exports.defaultLicensePlate;
        listen = arguments[0];
        callback = arguments[1];
      }

      var lp = findByPlate(plateId);
      lp.raft.on(listen, callback);
      return auto;
    } // consensus algorithm


    var auto = {
      "new": newRaft,
      join: joinRaft,
      on: onRaft
    };

    exports.ack = ack;
    exports.auto = auto;
    exports.beep = beep;
    exports.checkpoint = checkpoint;
    exports.exit = exit;
    exports.findByPlate = findByPlate;
    exports.key = key;
    exports.lane = lane;
    exports.licensePlates = licensePlates;
    exports.listen = listen;
    exports.messages = messages;
    exports.mobile = mobile;
    exports.move = move;
    exports.pass = pass;
    exports.radio = radio;
    exports.secret = secret;
    exports.turn = turn;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
