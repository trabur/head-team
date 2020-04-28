var ht = (function (exports) {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var phoenix = createCommonjsModule(function (module, exports) {
	  !function (e, t) {
	     module.exports = t() ;
	  }(commonjsGlobal, function () {
	    return function (e) {
	      var t = {};

	      function n(i) {
	        if (t[i]) return t[i].exports;
	        var o = t[i] = {
	          i: i,
	          l: !1,
	          exports: {}
	        };
	        return e[i].call(o.exports, o, o.exports, n), o.l = !0, o.exports;
	      }

	      return n.m = e, n.c = t, n.d = function (e, t, i) {
	        n.o(e, t) || Object.defineProperty(e, t, {
	          enumerable: !0,
	          get: i
	        });
	      }, n.r = function (e) {
	        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
	          value: "Module"
	        }), Object.defineProperty(e, "__esModule", {
	          value: !0
	        });
	      }, n.t = function (e, t) {
	        if (1 & t && (e = n(e)), 8 & t) return e;
	        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
	        var i = Object.create(null);
	        if (n.r(i), Object.defineProperty(i, "default", {
	          enumerable: !0,
	          value: e
	        }), 2 & t && "string" != typeof e) for (var o in e) n.d(i, o, function (t) {
	          return e[t];
	        }.bind(null, o));
	        return i;
	      }, n.n = function (e) {
	        var t = e && e.__esModule ? function () {
	          return e.default;
	        } : function () {
	          return e;
	        };
	        return n.d(t, "a", t), t;
	      }, n.o = function (e, t) {
	        return Object.prototype.hasOwnProperty.call(e, t);
	      }, n.p = "", n(n.s = 0);
	    }([function (e, t, n) {
	      (function (t) {
	        e.exports = t.Phoenix = n(2);
	      }).call(this, n(1));
	    }, function (e, t) {
	      var n;

	      n = function () {
	        return this;
	      }();

	      try {
	        n = n || new Function("return this")();
	      } catch (e) {
	        "object" == typeof window && (n = window);
	      }

	      e.exports = n;
	    }, function (e, t, n) {

	      function i(e) {
	        return function (e) {
	          if (Array.isArray(e)) return a(e);
	        }(e) || function (e) {
	          if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) return Array.from(e);
	        }(e) || s(e) || function () {
	          throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	        }();
	      }

	      function o(e) {
	        return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
	          return typeof e;
	        } : function (e) {
	          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	        })(e);
	      }

	      function r(e, t) {
	        return function (e) {
	          if (Array.isArray(e)) return e;
	        }(e) || function (e, t) {
	          if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(e))) return;
	          var n = [],
	              i = !0,
	              o = !1,
	              r = void 0;

	          try {
	            for (var s, a = e[Symbol.iterator](); !(i = (s = a.next()).done) && (n.push(s.value), !t || n.length !== t); i = !0);
	          } catch (e) {
	            o = !0, r = e;
	          } finally {
	            try {
	              i || null == a.return || a.return();
	            } finally {
	              if (o) throw r;
	            }
	          }

	          return n;
	        }(e, t) || s(e, t) || function () {
	          throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	        }();
	      }

	      function s(e, t) {
	        if (e) {
	          if ("string" == typeof e) return a(e, t);
	          var n = Object.prototype.toString.call(e).slice(8, -1);
	          return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(n) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? a(e, t) : void 0;
	        }
	      }

	      function a(e, t) {
	        (null == t || t > e.length) && (t = e.length);

	        for (var n = 0, i = new Array(t); n < t; n++) i[n] = e[n];

	        return i;
	      }

	      function c(e, t) {
	        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
	      }

	      function u(e, t) {
	        for (var n = 0; n < t.length; n++) {
	          var i = t[n];
	          i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
	        }
	      }

	      function h(e, t, n) {
	        return t && u(e.prototype, t), n && u(e, n), e;
	      }

	      n.r(t), n.d(t, "Channel", function () {
	        return A;
	      }), n.d(t, "Serializer", function () {
	        return M;
	      }), n.d(t, "Socket", function () {
	        return J;
	      }), n.d(t, "LongPoll", function () {
	        return H;
	      }), n.d(t, "Ajax", function () {
	        return D;
	      }), n.d(t, "Presence", function () {
	        return B;
	      });

	      var l = "undefined" != typeof self ? self : null,
	          f = "undefined" != typeof window ? window : null,
	          d = l || f || void 0,
	          p = 0,
	          v = 1,
	          y = 2,
	          m = 3,
	          g = "closed",
	          k = "errored",
	          b = "joined",
	          j = "joining",
	          C = "leaving",
	          R = "phx_close",
	          S = "phx_error",
	          T = "phx_join",
	          w = "phx_reply",
	          E = "phx_leave",
	          x = [R, S, T, w, E],
	          O = "longpoll",
	          P = "websocket",
	          L = function (e) {
	        if ("function" == typeof e) return e;
	        return function () {
	          return e;
	        };
	      },
	          _ = function () {
	        function e(t, n, i, o) {
	          c(this, e), this.channel = t, this.event = n, this.payload = i || function () {
	            return {};
	          }, this.receivedResp = null, this.timeout = o, this.timeoutTimer = null, this.recHooks = [], this.sent = !1;
	        }

	        return h(e, [{
	          key: "resend",
	          value: function (e) {
	            this.timeout = e, this.reset(), this.send();
	          }
	        }, {
	          key: "send",
	          value: function () {
	            this.hasReceived("timeout") || (this.startTimeout(), this.sent = !0, this.channel.socket.push({
	              topic: this.channel.topic,
	              event: this.event,
	              payload: this.payload(),
	              ref: this.ref,
	              join_ref: this.channel.joinRef()
	            }));
	          }
	        }, {
	          key: "receive",
	          value: function (e, t) {
	            return this.hasReceived(e) && t(this.receivedResp.response), this.recHooks.push({
	              status: e,
	              callback: t
	            }), this;
	          }
	        }, {
	          key: "reset",
	          value: function () {
	            this.cancelRefEvent(), this.ref = null, this.refEvent = null, this.receivedResp = null, this.sent = !1;
	          }
	        }, {
	          key: "matchReceive",
	          value: function (e) {
	            var t = e.status,
	                n = e.response;
	            e.ref;
	            this.recHooks.filter(function (e) {
	              return e.status === t;
	            }).forEach(function (e) {
	              return e.callback(n);
	            });
	          }
	        }, {
	          key: "cancelRefEvent",
	          value: function () {
	            this.refEvent && this.channel.off(this.refEvent);
	          }
	        }, {
	          key: "cancelTimeout",
	          value: function () {
	            clearTimeout(this.timeoutTimer), this.timeoutTimer = null;
	          }
	        }, {
	          key: "startTimeout",
	          value: function () {
	            var e = this;
	            this.timeoutTimer && this.cancelTimeout(), this.ref = this.channel.socket.makeRef(), this.refEvent = this.channel.replyEventName(this.ref), this.channel.on(this.refEvent, function (t) {
	              e.cancelRefEvent(), e.cancelTimeout(), e.receivedResp = t, e.matchReceive(t);
	            }), this.timeoutTimer = setTimeout(function () {
	              e.trigger("timeout", {});
	            }, this.timeout);
	          }
	        }, {
	          key: "hasReceived",
	          value: function (e) {
	            return this.receivedResp && this.receivedResp.status === e;
	          }
	        }, {
	          key: "trigger",
	          value: function (e, t) {
	            this.channel.trigger(this.refEvent, {
	              status: e,
	              response: t
	            });
	          }
	        }]), e;
	      }(),
	          A = function () {
	        function e(t, n, i) {
	          var o = this;
	          c(this, e), this.state = g, this.topic = t, this.params = L(n || {}), this.socket = i, this.bindings = [], this.bindingRef = 0, this.timeout = this.socket.timeout, this.joinedOnce = !1, this.joinPush = new _(this, T, this.params, this.timeout), this.pushBuffer = [], this.stateChangeRefs = [], this.rejoinTimer = new I(function () {
	            o.socket.isConnected() && o.rejoin();
	          }, this.socket.rejoinAfterMs), this.stateChangeRefs.push(this.socket.onError(function () {
	            return o.rejoinTimer.reset();
	          })), this.stateChangeRefs.push(this.socket.onOpen(function () {
	            o.rejoinTimer.reset(), o.isErrored() && o.rejoin();
	          })), this.joinPush.receive("ok", function () {
	            o.state = b, o.rejoinTimer.reset(), o.pushBuffer.forEach(function (e) {
	              return e.send();
	            }), o.pushBuffer = [];
	          }), this.joinPush.receive("error", function () {
	            o.state = k, o.socket.isConnected() && o.rejoinTimer.scheduleTimeout();
	          }), this.onClose(function () {
	            o.rejoinTimer.reset(), o.socket.hasLogger() && o.socket.log("channel", "close ".concat(o.topic, " ").concat(o.joinRef())), o.state = g, o.socket.remove(o);
	          }), this.onError(function (e) {
	            o.socket.hasLogger() && o.socket.log("channel", "error ".concat(o.topic), e), o.isJoining() && o.joinPush.reset(), o.state = k, o.socket.isConnected() && o.rejoinTimer.scheduleTimeout();
	          }), this.joinPush.receive("timeout", function () {
	            o.socket.hasLogger() && o.socket.log("channel", "timeout ".concat(o.topic, " (").concat(o.joinRef(), ")"), o.joinPush.timeout), new _(o, E, L({}), o.timeout).send(), o.state = k, o.joinPush.reset(), o.socket.isConnected() && o.rejoinTimer.scheduleTimeout();
	          }), this.on(w, function (e, t) {
	            o.trigger(o.replyEventName(t), e);
	          });
	        }

	        return h(e, [{
	          key: "join",
	          value: function () {
	            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.timeout;
	            if (this.joinedOnce) throw new Error("tried to join multiple times. 'join' can only be called a single time per channel instance");
	            return this.timeout = e, this.joinedOnce = !0, this.rejoin(), this.joinPush;
	          }
	        }, {
	          key: "onClose",
	          value: function (e) {
	            this.on(R, e);
	          }
	        }, {
	          key: "onError",
	          value: function (e) {
	            return this.on(S, function (t) {
	              return e(t);
	            });
	          }
	        }, {
	          key: "on",
	          value: function (e, t) {
	            var n = this.bindingRef++;
	            return this.bindings.push({
	              event: e,
	              ref: n,
	              callback: t
	            }), n;
	          }
	        }, {
	          key: "off",
	          value: function (e, t) {
	            this.bindings = this.bindings.filter(function (n) {
	              return !(n.event === e && (void 0 === t || t === n.ref));
	            });
	          }
	        }, {
	          key: "canPush",
	          value: function () {
	            return this.socket.isConnected() && this.isJoined();
	          }
	        }, {
	          key: "push",
	          value: function (e, t) {
	            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : this.timeout;
	            if (!this.joinedOnce) throw new Error("tried to push '".concat(e, "' to '").concat(this.topic, "' before joining. Use channel.join() before pushing events"));
	            var i = new _(this, e, function () {
	              return t;
	            }, n);
	            return this.canPush() ? i.send() : (i.startTimeout(), this.pushBuffer.push(i)), i;
	          }
	        }, {
	          key: "leave",
	          value: function () {
	            var e = this,
	                t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.timeout;
	            this.rejoinTimer.reset(), this.joinPush.cancelTimeout(), this.state = C;

	            var n = function () {
	              e.socket.hasLogger() && e.socket.log("channel", "leave ".concat(e.topic)), e.trigger(R, "leave");
	            },
	                i = new _(this, E, L({}), t);

	            return i.receive("ok", function () {
	              return n();
	            }).receive("timeout", function () {
	              return n();
	            }), i.send(), this.canPush() || i.trigger("ok", {}), i;
	          }
	        }, {
	          key: "onMessage",
	          value: function (e, t, n) {
	            return t;
	          }
	        }, {
	          key: "isLifecycleEvent",
	          value: function (e) {
	            return x.indexOf(e) >= 0;
	          }
	        }, {
	          key: "isMember",
	          value: function (e, t, n, i) {
	            return this.topic === e && (!i || i === this.joinRef() || !this.isLifecycleEvent(t) || (this.socket.hasLogger() && this.socket.log("channel", "dropping outdated message", {
	              topic: e,
	              event: t,
	              payload: n,
	              joinRef: i
	            }), !1));
	          }
	        }, {
	          key: "joinRef",
	          value: function () {
	            return this.joinPush.ref;
	          }
	        }, {
	          key: "rejoin",
	          value: function () {
	            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.timeout;
	            this.isLeaving() || (this.socket.leaveOpenTopic(this.topic), this.state = j, this.joinPush.resend(e));
	          }
	        }, {
	          key: "trigger",
	          value: function (e, t, n, i) {
	            var o = this.onMessage(e, t, n, i);
	            if (t && !o) throw new Error("channel onMessage callbacks must return the payload, modified or unmodified");

	            for (var r = this.bindings.filter(function (t) {
	              return t.event === e;
	            }), s = 0; s < r.length; s++) {
	              r[s].callback(o, n, i || this.joinRef());
	            }
	          }
	        }, {
	          key: "replyEventName",
	          value: function (e) {
	            return "chan_reply_".concat(e);
	          }
	        }, {
	          key: "isClosed",
	          value: function () {
	            return this.state === g;
	          }
	        }, {
	          key: "isErrored",
	          value: function () {
	            return this.state === k;
	          }
	        }, {
	          key: "isJoined",
	          value: function () {
	            return this.state === b;
	          }
	        }, {
	          key: "isJoining",
	          value: function () {
	            return this.state === j;
	          }
	        }, {
	          key: "isLeaving",
	          value: function () {
	            return this.state === C;
	          }
	        }]), e;
	      }(),
	          M = {
	        encode: function (e, t) {
	          var n = [e.join_ref, e.ref, e.topic, e.event, e.payload];
	          return t(JSON.stringify(n));
	        },
	        decode: function (e, t) {
	          var n = r(JSON.parse(e), 5);
	          return t({
	            join_ref: n[0],
	            ref: n[1],
	            topic: n[2],
	            event: n[3],
	            payload: n[4]
	          });
	        }
	      },
	          J = function () {
	        function e(t) {
	          var n = this,
	              i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
	          c(this, e), this.stateChangeCallbacks = {
	            open: [],
	            close: [],
	            error: [],
	            message: []
	          }, this.channels = [], this.sendBuffer = [], this.ref = 0, this.timeout = i.timeout || 1e4, this.transport = i.transport || d.WebSocket || H, this.defaultEncoder = M.encode, this.defaultDecoder = M.decode, this.closeWasClean = !1, this.unloaded = !1, this.binaryType = i.binaryType || "arraybuffer", this.transport !== H ? (this.encode = i.encode || this.defaultEncoder, this.decode = i.decode || this.defaultDecoder) : (this.encode = this.defaultEncoder, this.decode = this.defaultDecoder), f && f.addEventListener && f.addEventListener("unload", function (e) {
	            n.conn && (n.unloaded = !0, n.abnormalClose("unloaded"));
	          }), this.heartbeatIntervalMs = i.heartbeatIntervalMs || 3e4, this.rejoinAfterMs = function (e) {
	            return i.rejoinAfterMs ? i.rejoinAfterMs(e) : [1e3, 2e3, 5e3][e - 1] || 1e4;
	          }, this.reconnectAfterMs = function (e) {
	            return n.unloaded ? 100 : i.reconnectAfterMs ? i.reconnectAfterMs(e) : [10, 50, 100, 150, 200, 250, 500, 1e3, 2e3][e - 1] || 5e3;
	          }, this.logger = i.logger || null, this.longpollerTimeout = i.longpollerTimeout || 2e4, this.params = L(i.params || {}), this.endPoint = "".concat(t, "/").concat(P), this.vsn = i.vsn || "2.0.0", this.heartbeatTimer = null, this.pendingHeartbeatRef = null, this.reconnectTimer = new I(function () {
	            n.teardown(function () {
	              return n.connect();
	            });
	          }, this.reconnectAfterMs);
	        }

	        return h(e, [{
	          key: "protocol",
	          value: function () {
	            return location.protocol.match(/^https/) ? "wss" : "ws";
	          }
	        }, {
	          key: "endPointURL",
	          value: function () {
	            var e = D.appendParams(D.appendParams(this.endPoint, this.params()), {
	              vsn: this.vsn
	            });
	            return "/" !== e.charAt(0) ? e : "/" === e.charAt(1) ? "".concat(this.protocol(), ":").concat(e) : "".concat(this.protocol(), "://").concat(location.host).concat(e);
	          }
	        }, {
	          key: "disconnect",
	          value: function (e, t, n) {
	            this.closeWasClean = !0, this.reconnectTimer.reset(), this.teardown(e, t, n);
	          }
	        }, {
	          key: "connect",
	          value: function (e) {
	            var t = this;
	            e && (console && console.log("passing params to connect is deprecated. Instead pass :params to the Socket constructor"), this.params = L(e)), this.conn || (this.closeWasClean = !1, this.conn = new this.transport(this.endPointURL()), this.conn.binaryType = this.binaryType, this.conn.timeout = this.longpollerTimeout, this.conn.onopen = function () {
	              return t.onConnOpen();
	            }, this.conn.onerror = function (e) {
	              return t.onConnError(e);
	            }, this.conn.onmessage = function (e) {
	              return t.onConnMessage(e);
	            }, this.conn.onclose = function (e) {
	              return t.onConnClose(e);
	            });
	          }
	        }, {
	          key: "log",
	          value: function (e, t, n) {
	            this.logger(e, t, n);
	          }
	        }, {
	          key: "hasLogger",
	          value: function () {
	            return null !== this.logger;
	          }
	        }, {
	          key: "onOpen",
	          value: function (e) {
	            var t = this.makeRef();
	            return this.stateChangeCallbacks.open.push([t, e]), t;
	          }
	        }, {
	          key: "onClose",
	          value: function (e) {
	            var t = this.makeRef();
	            return this.stateChangeCallbacks.close.push([t, e]), t;
	          }
	        }, {
	          key: "onError",
	          value: function (e) {
	            var t = this.makeRef();
	            return this.stateChangeCallbacks.error.push([t, e]), t;
	          }
	        }, {
	          key: "onMessage",
	          value: function (e) {
	            var t = this.makeRef();
	            return this.stateChangeCallbacks.message.push([t, e]), t;
	          }
	        }, {
	          key: "onConnOpen",
	          value: function () {
	            this.hasLogger() && this.log("transport", "connected to ".concat(this.endPointURL())), this.unloaded = !1, this.closeWasClean = !1, this.flushSendBuffer(), this.reconnectTimer.reset(), this.resetHeartbeat(), this.stateChangeCallbacks.open.forEach(function (e) {
	              return (0, r(e, 2)[1])();
	            });
	          }
	        }, {
	          key: "resetHeartbeat",
	          value: function () {
	            var e = this;
	            this.conn && this.conn.skipHeartbeat || (this.pendingHeartbeatRef = null, clearInterval(this.heartbeatTimer), this.heartbeatTimer = setInterval(function () {
	              return e.sendHeartbeat();
	            }, this.heartbeatIntervalMs));
	          }
	        }, {
	          key: "teardown",
	          value: function (e, t, n) {
	            var i = this;
	            if (!this.conn) return e && e();
	            this.waitForBufferDone(function () {
	              i.conn && (t ? i.conn.close(t, n || "") : i.conn.close()), i.waitForSocketClosed(function () {
	                i.conn && (i.conn.onclose = function () {}, i.conn = null), e && e();
	              });
	            });
	          }
	        }, {
	          key: "waitForBufferDone",
	          value: function (e) {
	            var t = this,
	                n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
	            5 === n || !this.conn || this.conn.bufferedAmount && 0 === this.conn.bufferedAmount ? e() : setTimeout(function () {
	              t.waitForBufferDone(e, n + 1);
	            }, 150 * n);
	          }
	        }, {
	          key: "waitForSocketClosed",
	          value: function (e) {
	            var t = this,
	                n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
	            5 !== n && this.conn && this.conn.readyState !== m ? setTimeout(function () {
	              t.waitForSocketClosed(e, n + 1);
	            }, 150 * n) : e();
	          }
	        }, {
	          key: "onConnClose",
	          value: function (e) {
	            this.hasLogger() && this.log("transport", "close", e), this.triggerChanError(), clearInterval(this.heartbeatTimer), this.closeWasClean || this.reconnectTimer.scheduleTimeout(), this.stateChangeCallbacks.close.forEach(function (t) {
	              return (0, r(t, 2)[1])(e);
	            });
	          }
	        }, {
	          key: "onConnError",
	          value: function (e) {
	            this.hasLogger() && this.log("transport", e), this.triggerChanError(), this.stateChangeCallbacks.error.forEach(function (t) {
	              return (0, r(t, 2)[1])(e);
	            });
	          }
	        }, {
	          key: "triggerChanError",
	          value: function () {
	            this.channels.forEach(function (e) {
	              e.isErrored() || e.isLeaving() || e.isClosed() || e.trigger(S);
	            });
	          }
	        }, {
	          key: "connectionState",
	          value: function () {
	            switch (this.conn && this.conn.readyState) {
	              case p:
	                return "connecting";

	              case v:
	                return "open";

	              case y:
	                return "closing";

	              default:
	                return "closed";
	            }
	          }
	        }, {
	          key: "isConnected",
	          value: function () {
	            return "open" === this.connectionState();
	          }
	        }, {
	          key: "remove",
	          value: function (e) {
	            this.off(e.stateChangeRefs), this.channels = this.channels.filter(function (t) {
	              return t.joinRef() !== e.joinRef();
	            });
	          }
	        }, {
	          key: "off",
	          value: function (e) {
	            for (var t in this.stateChangeCallbacks) this.stateChangeCallbacks[t] = this.stateChangeCallbacks[t].filter(function (t) {
	              var n = r(t, 1)[0];
	              return -1 === e.indexOf(n);
	            });
	          }
	        }, {
	          key: "channel",
	          value: function (e) {
	            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
	                n = new A(e, t, this);
	            return this.channels.push(n), n;
	          }
	        }, {
	          key: "push",
	          value: function (e) {
	            var t = this;

	            if (this.hasLogger()) {
	              var n = e.topic,
	                  i = e.event,
	                  o = e.payload,
	                  r = e.ref,
	                  s = e.join_ref;
	              this.log("push", "".concat(n, " ").concat(i, " (").concat(s, ", ").concat(r, ")"), o);
	            }

	            this.isConnected() ? this.encode(e, function (e) {
	              return t.conn.send(e);
	            }) : this.sendBuffer.push(function () {
	              return t.encode(e, function (e) {
	                return t.conn.send(e);
	              });
	            });
	          }
	        }, {
	          key: "makeRef",
	          value: function () {
	            var e = this.ref + 1;
	            return e === this.ref ? this.ref = 0 : this.ref = e, this.ref.toString();
	          }
	        }, {
	          key: "sendHeartbeat",
	          value: function () {
	            if (this.isConnected()) {
	              if (this.pendingHeartbeatRef) return this.pendingHeartbeatRef = null, this.hasLogger() && this.log("transport", "heartbeat timeout. Attempting to re-establish connection"), void this.abnormalClose("heartbeat timeout");
	              this.pendingHeartbeatRef = this.makeRef(), this.push({
	                topic: "phoenix",
	                event: "heartbeat",
	                payload: {},
	                ref: this.pendingHeartbeatRef
	              });
	            }
	          }
	        }, {
	          key: "abnormalClose",
	          value: function (e) {
	            this.closeWasClean = !1, this.conn.close(1e3, e);
	          }
	        }, {
	          key: "flushSendBuffer",
	          value: function () {
	            this.isConnected() && this.sendBuffer.length > 0 && (this.sendBuffer.forEach(function (e) {
	              return e();
	            }), this.sendBuffer = []);
	          }
	        }, {
	          key: "onConnMessage",
	          value: function (e) {
	            var t = this;
	            this.decode(e.data, function (e) {
	              var n = e.topic,
	                  i = e.event,
	                  o = e.payload,
	                  s = e.ref,
	                  a = e.join_ref;
	              s && s === t.pendingHeartbeatRef && (t.pendingHeartbeatRef = null), t.hasLogger() && t.log("receive", "".concat(o.status || "", " ").concat(n, " ").concat(i, " ").concat(s && "(" + s + ")" || ""), o);

	              for (var c = 0; c < t.channels.length; c++) {
	                var u = t.channels[c];
	                u.isMember(n, i, o, a) && u.trigger(i, o, s, a);
	              }

	              for (var h = 0; h < t.stateChangeCallbacks.message.length; h++) {
	                (0, r(t.stateChangeCallbacks.message[h], 2)[1])(e);
	              }
	            });
	          }
	        }, {
	          key: "leaveOpenTopic",
	          value: function (e) {
	            var t = this.channels.find(function (t) {
	              return t.topic === e && (t.isJoined() || t.isJoining());
	            });
	            t && (this.hasLogger() && this.log("transport", 'leaving duplicate topic "'.concat(e, '"')), t.leave());
	          }
	        }]), e;
	      }(),
	          H = function () {
	        function e(t) {
	          c(this, e), this.endPoint = null, this.token = null, this.skipHeartbeat = !0, this.onopen = function () {}, this.onerror = function () {}, this.onmessage = function () {}, this.onclose = function () {}, this.pollEndpoint = this.normalizeEndpoint(t), this.readyState = p, this.poll();
	        }

	        return h(e, [{
	          key: "normalizeEndpoint",
	          value: function (e) {
	            return e.replace("ws://", "http://").replace("wss://", "https://").replace(new RegExp("(.*)/" + P), "$1/" + O);
	          }
	        }, {
	          key: "endpointURL",
	          value: function () {
	            return D.appendParams(this.pollEndpoint, {
	              token: this.token
	            });
	          }
	        }, {
	          key: "closeAndRetry",
	          value: function () {
	            this.close(), this.readyState = p;
	          }
	        }, {
	          key: "ontimeout",
	          value: function () {
	            this.onerror("timeout"), this.closeAndRetry();
	          }
	        }, {
	          key: "poll",
	          value: function () {
	            var e = this;
	            this.readyState !== v && this.readyState !== p || D.request("GET", this.endpointURL(), "application/json", null, this.timeout, this.ontimeout.bind(this), function (t) {
	              if (t) {
	                var n = t.status,
	                    i = t.token,
	                    o = t.messages;
	                e.token = i;
	              } else n = 0;

	              switch (n) {
	                case 200:
	                  o.forEach(function (t) {
	                    return e.onmessage({
	                      data: t
	                    });
	                  }), e.poll();
	                  break;

	                case 204:
	                  e.poll();
	                  break;

	                case 410:
	                  e.readyState = v, e.onopen(), e.poll();
	                  break;

	                case 403:
	                  e.onerror(), e.close();
	                  break;

	                case 0:
	                case 500:
	                  e.onerror(), e.closeAndRetry();
	                  break;

	                default:
	                  throw new Error("unhandled poll status ".concat(n));
	              }
	            });
	          }
	        }, {
	          key: "send",
	          value: function (e) {
	            var t = this;
	            D.request("POST", this.endpointURL(), "application/json", e, this.timeout, this.onerror.bind(this, "timeout"), function (e) {
	              e && 200 === e.status || (t.onerror(e && e.status), t.closeAndRetry());
	            });
	          }
	        }, {
	          key: "close",
	          value: function (e, t) {
	            this.readyState = m, this.onclose();
	          }
	        }]), e;
	      }(),
	          D = function () {
	        function e() {
	          c(this, e);
	        }

	        return h(e, null, [{
	          key: "request",
	          value: function (e, t, n, i, o, r, s) {
	            if (d.XDomainRequest) {
	              var a = new XDomainRequest();
	              this.xdomainRequest(a, e, t, i, o, r, s);
	            } else {
	              var c = new d.XMLHttpRequest();
	              this.xhrRequest(c, e, t, n, i, o, r, s);
	            }
	          }
	        }, {
	          key: "xdomainRequest",
	          value: function (e, t, n, i, o, r, s) {
	            var a = this;
	            e.timeout = o, e.open(t, n), e.onload = function () {
	              var t = a.parseJSON(e.responseText);
	              s && s(t);
	            }, r && (e.ontimeout = r), e.onprogress = function () {}, e.send(i);
	          }
	        }, {
	          key: "xhrRequest",
	          value: function (e, t, n, i, o, r, s, a) {
	            var c = this;
	            e.open(t, n, !0), e.timeout = r, e.setRequestHeader("Content-Type", i), e.onerror = function () {
	              a && a(null);
	            }, e.onreadystatechange = function () {
	              if (e.readyState === c.states.complete && a) {
	                var t = c.parseJSON(e.responseText);
	                a(t);
	              }
	            }, s && (e.ontimeout = s), e.send(o);
	          }
	        }, {
	          key: "parseJSON",
	          value: function (e) {
	            if (!e || "" === e) return null;

	            try {
	              return JSON.parse(e);
	            } catch (t) {
	              return console && console.log("failed to parse JSON response", e), null;
	            }
	          }
	        }, {
	          key: "serialize",
	          value: function (e, t) {
	            var n = [];

	            for (var i in e) if (e.hasOwnProperty(i)) {
	              var r = t ? "".concat(t, "[").concat(i, "]") : i,
	                  s = e[i];
	              "object" === o(s) ? n.push(this.serialize(s, r)) : n.push(encodeURIComponent(r) + "=" + encodeURIComponent(s));
	            }

	            return n.join("&");
	          }
	        }, {
	          key: "appendParams",
	          value: function (e, t) {
	            if (0 === Object.keys(t).length) return e;
	            var n = e.match(/\?/) ? "&" : "?";
	            return "".concat(e).concat(n).concat(this.serialize(t));
	          }
	        }]), e;
	      }();

	      D.states = {
	        complete: 4
	      };

	      var B = function () {
	        function e(t) {
	          var n = this,
	              i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
	          c(this, e);
	          var o = i.events || {
	            state: "presence_state",
	            diff: "presence_diff"
	          };
	          this.state = {}, this.pendingDiffs = [], this.channel = t, this.joinRef = null, this.caller = {
	            onJoin: function () {},
	            onLeave: function () {},
	            onSync: function () {}
	          }, this.channel.on(o.state, function (t) {
	            var i = n.caller,
	                o = i.onJoin,
	                r = i.onLeave,
	                s = i.onSync;
	            n.joinRef = n.channel.joinRef(), n.state = e.syncState(n.state, t, o, r), n.pendingDiffs.forEach(function (t) {
	              n.state = e.syncDiff(n.state, t, o, r);
	            }), n.pendingDiffs = [], s();
	          }), this.channel.on(o.diff, function (t) {
	            var i = n.caller,
	                o = i.onJoin,
	                r = i.onLeave,
	                s = i.onSync;
	            n.inPendingSyncState() ? n.pendingDiffs.push(t) : (n.state = e.syncDiff(n.state, t, o, r), s());
	          });
	        }

	        return h(e, [{
	          key: "onJoin",
	          value: function (e) {
	            this.caller.onJoin = e;
	          }
	        }, {
	          key: "onLeave",
	          value: function (e) {
	            this.caller.onLeave = e;
	          }
	        }, {
	          key: "onSync",
	          value: function (e) {
	            this.caller.onSync = e;
	          }
	        }, {
	          key: "list",
	          value: function (t) {
	            return e.list(this.state, t);
	          }
	        }, {
	          key: "inPendingSyncState",
	          value: function () {
	            return !this.joinRef || this.joinRef !== this.channel.joinRef();
	          }
	        }], [{
	          key: "syncState",
	          value: function (e, t, n, i) {
	            var o = this,
	                r = this.clone(e),
	                s = {},
	                a = {};
	            return this.map(r, function (e, n) {
	              t[e] || (a[e] = n);
	            }), this.map(t, function (e, t) {
	              var n = r[e];

	              if (n) {
	                var i = t.metas.map(function (e) {
	                  return e.phx_ref;
	                }),
	                    c = n.metas.map(function (e) {
	                  return e.phx_ref;
	                }),
	                    u = t.metas.filter(function (e) {
	                  return c.indexOf(e.phx_ref) < 0;
	                }),
	                    h = n.metas.filter(function (e) {
	                  return i.indexOf(e.phx_ref) < 0;
	                });
	                u.length > 0 && (s[e] = t, s[e].metas = u), h.length > 0 && (a[e] = o.clone(n), a[e].metas = h);
	              } else s[e] = t;
	            }), this.syncDiff(r, {
	              joins: s,
	              leaves: a
	            }, n, i);
	          }
	        }, {
	          key: "syncDiff",
	          value: function (e, t, n, o) {
	            var r = t.joins,
	                s = t.leaves,
	                a = this.clone(e);
	            return n || (n = function () {}), o || (o = function () {}), this.map(r, function (e, t) {
	              var o = a[e];

	              if (a[e] = t, o) {
	                var r,
	                    s = a[e].metas.map(function (e) {
	                  return e.phx_ref;
	                }),
	                    c = o.metas.filter(function (e) {
	                  return s.indexOf(e.phx_ref) < 0;
	                });
	                (r = a[e].metas).unshift.apply(r, i(c));
	              }

	              n(e, o, t);
	            }), this.map(s, function (e, t) {
	              var n = a[e];

	              if (n) {
	                var i = t.metas.map(function (e) {
	                  return e.phx_ref;
	                });
	                n.metas = n.metas.filter(function (e) {
	                  return i.indexOf(e.phx_ref) < 0;
	                }), o(e, n, t), 0 === n.metas.length && delete a[e];
	              }
	            }), a;
	          }
	        }, {
	          key: "list",
	          value: function (e, t) {
	            return t || (t = function (e, t) {
	              return t;
	            }), this.map(e, function (e, n) {
	              return t(e, n);
	            });
	          }
	        }, {
	          key: "map",
	          value: function (e, t) {
	            return Object.getOwnPropertyNames(e).map(function (n) {
	              return t(n, e[n]);
	            });
	          }
	        }, {
	          key: "clone",
	          value: function (e) {
	            return JSON.parse(JSON.stringify(e));
	          }
	        }]), e;
	      }(),
	          I = function () {
	        function e(t, n) {
	          c(this, e), this.callback = t, this.timerCalc = n, this.timer = null, this.tries = 0;
	        }

	        return h(e, [{
	          key: "reset",
	          value: function () {
	            this.tries = 0, clearTimeout(this.timer);
	          }
	        }, {
	          key: "scheduleTimeout",
	          value: function () {
	            var e = this;
	            clearTimeout(this.timer), this.timer = setTimeout(function () {
	              e.tries = e.tries + 1, e.callback();
	            }, this.timerCalc(this.tries + 1));
	          }
	        }]), e;
	      }();
	    }]);
	  });
	});
	unwrapExports(phoenix);
	var phoenix_1 = phoenix.Socket;
	var phoenix_2 = phoenix.Phoenix;

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

	function Timer(timer, clear, fn) {
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

	  tick.timers[name] = new Timer(setTimeout(tick.tock(name, true), millisecond(time)), unsetTimeout, fn);
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

	  tick.timers[name] = new Timer(setInterval(tick.tock(name), millisecond(time)), unsetInterval, fn);
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

	  tick.timers[name] = new Timer(setImmediate(tick.tock(name, true)), unsetImmediate, fn);
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
	    socket: new phoenix_1("wss://simple.fleetgrid.com/socket")
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
	var metaheap = undefined;

	exports.ack = ack;
	exports.auto = auto;
	exports.beep = beep;
	exports.checkpoint = checkpoint;
	exports.default = metaheap;
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

	return exports;

}({}));
