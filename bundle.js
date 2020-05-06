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

	function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

	function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

	var Tick = require('tick-tock'); // https://www.npmjs.com/package/tick-tock


	var Events = require('events');

	var ms = require('millisecond');

	var GUN = require('./gun'); // TODO: use GUN for logging system
	// Generate a somewhat unique UUID.
	// stackoverflow.com/q/105034


	function UUID() {
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function gen(c) {
	    var random = Math.random() * 16 | 0,
	        value = c !== 'x' ? random & 0x3 | 0x8 : random;
	    return value.toString(16);
	  });
	}
	/*
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
	 */


	var states = 'STOPPED,LEADER,CANDIDATE,FOLLOWER,CHILD'.split(',');
	var os = {}; // operating state

	for (var s = 0; s < states.length; s++) {
	  os[states[s]] = s;
	} // Emit when modifications are made.


	var change = require('modification')(' change'); // A nope function for when people don't want message acknowledgements. Because
	// they don't care about CAP.


	function nope() {}
	var election = {
	  min: ms('150 ms'),
	  max: ms('300 ms')
	};
	var beat = ms('50 ms');
	var address = UUID();
	var tock = new Tick({});
	var events = new Events.EventEmitter();

	function initialize(licensePlate, options) {
	  var _this = this;

	  var that = this;

	  this.events.on('term change', function () {
	    that.votes["for"] = null;
	    that.votes.granted = 0;
	  }); // Reset our times and start the heartbeat again. If we're promoted to leader
	  // the heartbeat will automatically be broadcasted to users as well.

	  this.events.on('state change', function (state) {
	    that.tock.clear('heartbeat, election');
	    that.heartbeat(os.LEADER === that.state ? that.beat : that.timeout());
	    that.events.emit(that.states[state].toLowerCase());
	  }); // Receive incoming messages and process them.

	  this.events.on('data', /*#__PURE__*/function () {
	    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(packet, write) {
	      var reason;
	      return regeneratorRuntime.wrap(function _callee$(_context) {
	        while (1) {
	          switch (_context.prev = _context.next) {
	            case 0:
	              write = write || nope;

	              if (!('object' !== _this.type(packet))) {
	                _context.next = 9;
	                break;
	              }

	              reason = 'Invalid packet received';
	              that.events.emit('error', new Error(reason));
	              _context.t0 = write;
	              _context.next = 7;
	              return that.packet('error', reason);

	            case 7:
	              _context.t1 = _context.sent;
	              return _context.abrupt("return", (0, _context.t0)(_context.t1));

	            case 9:
	              if (!(packet.term > that.term)) {
	                _context.next = 13;
	                break;
	              }

	              change({
	                leader: os.LEADER === packet.state ? packet.address : packet.leader || that.leader,
	                state: os.FOLLOWER,
	                term: packet.term
	              });
	              _context.next = 17;
	              break;

	            case 13:
	              if (!(packet.term < that.term)) {
	                _context.next = 17;
	                break;
	              }

	              reason = 'Stale term detected, received `' + packet.term + '` we are at ' + that.term;
	              that.events.emit('error', new Error(reason));
	              return _context.abrupt("return", write(that.packet('error', reason)));

	            case 17:
	              // If we receive a message from someone who claims to be leader and shares
	              // our same term while we're in candidate mode we will recognize their
	              // leadership and return as follower.
	              //
	              // If we got this far we already know that our terms are the same as it
	              // would be changed or prevented above.
	              if (os.LEADER === packet.state) {
	                if (os.FOLLOWER !== that.state) {
	                  change({
	                    state: os.FOLLOWER
	                  });
	                }

	                if (packet.address !== that.leader) {
	                  change({
	                    leader: packet.address
	                  });
	                } // Always when we receive a message from the Leader we need to reset our heartbeat.


	                that.heartbeat(that.timeout());
	              }

	              packetType(that, packet, write);

	            case 19:
	            case "end":
	              return _context.stop();
	          }
	        }
	      }, _callee);
	    }));

	    return function (_x, _x2) {
	      return _ref.apply(this, arguments);
	    };
	  }()); // We do not need to execute the rest of the functionality below as we're
	  // currently running as "child" raft of the cluster not as the "root" raft.

	  if (os.CHILD === that.state) return that.events.emit('initialize'); // Setup the log & appends. Assume that if we're given a function log that it
	  // needs to be initialized as it requires access to our raft instance so it
	  // can read our information like our leader, state, term etc.

	  if ('function' === type(that.Log)) {
	    that.log = new that.Log(that, options);
	  }
	  /**
	   * The raft is now listening to events so we can start our heartbeat timeout.
	   * So that if we don't hear anything from a leader we can promote our selfs to
	   * a candidate state.
	   *
	   * Start listening for heartbeats when implementors are also ready
	   * with setting up their code.
	   */


	  function init(err) {
	    if (err) {
	      return that.events.emit('error', err);
	    }

	    that.events.emit('initialize');
	    that.heartbeat(that.timeout());
	  }

	  if ('function' === type(init)) {
	    if (that.init.length === 2) {
	      return that.init(options, initialize);
	    }

	    that.init(options);
	  }

	  init();
	  return this;
	}

	function packetType(_x3, _x4, _x5) {
	  return _packetType.apply(this, arguments);
	} // Start or update the heartbeat of the Raft. If we detect that we've received
	// a heartbeat timeout we will promote our selfs to a candidate to take over the
	// leadership.


	function _packetType() {
	  _packetType = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(raft, packet, write) {
	    var _yield$raft$log$getLa, _index, _term2, _yield$raft$log$getLa2, _term, index, hasIndex, _entry, entries, entry, _entries, previousEntry, append;

	    return regeneratorRuntime.wrap(function _callee3$(_context3) {
	      while (1) {
	        switch (_context3.prev = _context3.next) {
	          case 0:
	            _context3.t0 = packet.type;
	            _context3.next = _context3.t0 === 'vote' ? 3 : _context3.t0 === 'voted' ? 33 : _context3.t0 === 'error' ? 50 : _context3.t0 === 'append' ? 52 : _context3.t0 === 'append ack' ? 87 : _context3.t0 === 'append fail' ? 96 : _context3.t0 === 'exec' ? 104 : 105;
	            break;

	          case 3:
	            if (!(raft.votes["for"] && raft.votes["for"] !== packet.address)) {
	              _context3.next = 10;
	              break;
	            }

	            raft.events.emit('vote', packet, false);
	            _context3.t1 = write;
	            _context3.next = 8;
	            return raft.packet('voted', {
	              granted: false
	            });

	          case 8:
	            _context3.t2 = _context3.sent;
	            return _context3.abrupt("return", (0, _context3.t1)(_context3.t2));

	          case 10:
	            if (!raft.log) {
	              _context3.next = 23;
	              break;
	            }

	            _context3.next = 13;
	            return raft.log.getLastInfo();

	          case 13:
	            _yield$raft$log$getLa = _context3.sent;
	            _index = _yield$raft$log$getLa.index;
	            _term2 = _yield$raft$log$getLa.term;

	            if (!(_index > packet.last.index && _term2 > packet.last.term)) {
	              _context3.next = 23;
	              break;
	            }

	            raft.events.emit('vote', packet, false);
	            _context3.t3 = write;
	            _context3.next = 21;
	            return raft.packet('voted', {
	              granted: false
	            });

	          case 21:
	            _context3.t4 = _context3.sent;
	            return _context3.abrupt("return", (0, _context3.t3)(_context3.t4));

	          case 23:
	            // We've made our decision, we haven't voted for this term yet and this
	            // candidate came in first so it gets our vote as all requirements are
	            // met.
	            raft.votes["for"] = packet.address;
	            raft.events.emit('vote', packet, true);
	            change({
	              leader: packet.address,
	              term: packet.term
	            });
	            _context3.t5 = write;
	            _context3.next = 29;
	            return raft.packet('voted', {
	              granted: true
	            });

	          case 29:
	            _context3.t6 = _context3.sent;
	            (0, _context3.t5)(_context3.t6);
	            // We've accepted someone as potential new leader, so we should reset
	            // our heartbeat to prevent this raft from timing out after voting.
	            // Which would again increment the term causing us to be next CANDIDATE
	            // and invalidates the request we just got, so that's silly willy.
	            raft.heartbeat(raft.timeout());
	            return _context3.abrupt("break", 114);

	          case 33:
	            if (!(os.CANDIDATE !== raft.state)) {
	              _context3.next = 39;
	              break;
	            }

	            _context3.t7 = write;
	            _context3.next = 37;
	            return raft.packet('error', 'No longer a candidate, ignoring vote');

	          case 37:
	            _context3.t8 = _context3.sent;
	            return _context3.abrupt("return", (0, _context3.t7)(_context3.t8));

	          case 39:
	            // Increment our received votes when our voting request has been
	            // granted by the raft that received the data.
	            if (packet.data.granted) {
	              raft.votes.granted++;
	            } // Check if we've received the minimal amount of votes required for this
	            // current voting round to be considered valid.


	            if (!raft.quorum(raft.votes.granted)) {
	              _context3.next = 48;
	              break;
	            }

	            change({
	              leader: raft.address,
	              state: os.LEADER
	            }); // Send a heartbeat message to all connected clients.

	            _context3.t9 = raft;
	            _context3.t10 = os.FOLLOWER;
	            _context3.next = 46;
	            return raft.packet('append');

	          case 46:
	            _context3.t11 = _context3.sent;

	            _context3.t9.message.call(_context3.t9, _context3.t10, _context3.t11);

	          case 48:
	            // Empty write, nothing to do.
	            write();
	            return _context3.abrupt("break", 114);

	          case 50:
	            raft.events.emit('error', new Error(packet.data));
	            return _context3.abrupt("break", 114);

	          case 52:
	            _context3.next = 54;
	            return raft.log.getLastInfo();

	          case 54:
	            _yield$raft$log$getLa2 = _context3.sent;
	            _term = _yield$raft$log$getLa2.term;
	            index = _yield$raft$log$getLa2.index;

	            if (!(packet.last.index !== index && packet.last.index !== 0)) {
	              _context3.next = 71;
	              break;
	            }

	            _context3.next = 60;
	            return raft.log.has(packet.last.index);

	          case 60:
	            hasIndex = _context3.sent;

	            if (!hasIndex) {
	              _context3.next = 65;
	              break;
	            }

	            raft.log.removeEntriesAfter(packet.last.index);
	            _context3.next = 71;
	            break;

	          case 65:
	            _context3.t12 = raft;
	            _context3.t13 = os.LEADER;
	            _context3.next = 69;
	            return raft.packet('append fail', {
	              term: packet.last.term,
	              index: packet.last.index
	            });

	          case 69:
	            _context3.t14 = _context3.sent;
	            return _context3.abrupt("return", _context3.t12.message.call(_context3.t12, _context3.t13, _context3.t14));

	          case 71:
	            if (!packet.data) {
	              _context3.next = 81;
	              break;
	            }

	            _entry = packet.data[0];
	            _context3.next = 75;
	            return raft.log.saveCommand(_entry.command, _entry.term, _entry.index);

	          case 75:
	            _context3.t15 = raft;
	            _context3.t16 = os.LEADER;
	            _context3.next = 79;
	            return raft.packet('append ack', {
	              term: _entry.term,
	              index: _entry.index
	            });

	          case 79:
	            _context3.t17 = _context3.sent;

	            _context3.t15.message.call(_context3.t15, _context3.t16, _context3.t17);

	          case 81:
	            if (!(raft.log.committedIndex < packet.last.committedIndex)) {
	              _context3.next = 86;
	              break;
	            }

	            _context3.next = 84;
	            return raft.log.getUncommittedEntriesUpToIndex(packet.last.committedIndex, packet.last.term);

	          case 84:
	            entries = _context3.sent;
	            raft.commitEntries(entries);

	          case 86:
	            return _context3.abrupt("break", 114);

	          case 87:
	            _context3.next = 89;
	            return raft.log.commandAck(packet.data.index, packet.address);

	          case 89:
	            entry = _context3.sent;

	            if (!(raft.quorum(entry.responses.length) && !entry.committed)) {
	              _context3.next = 95;
	              break;
	            }

	            _context3.next = 93;
	            return raft.log.getUncommittedEntriesUpToIndex(entry.index, entry.term);

	          case 93:
	            _entries = _context3.sent;
	            raft.commitEntries(_entries);

	          case 95:
	            return _context3.abrupt("break", 114);

	          case 96:
	            _context3.next = 98;
	            return raft.log.get(packet.data.index);

	          case 98:
	            previousEntry = _context3.sent;
	            _context3.next = 101;
	            return raft.appendPacket(previousEntry);

	          case 101:
	            append = _context3.sent;
	            write(append);
	            return _context3.abrupt("break", 114);

	          case 104:
	            return _context3.abrupt("break", 114);

	          case 105:
	            if (!raft.listeners('rpc').length) {
	              _context3.next = 109;
	              break;
	            }

	            raft.events.emit('rpc', packet, write);
	            _context3.next = 114;
	            break;

	          case 109:
	            _context3.t18 = write;
	            _context3.next = 112;
	            return raft.packet('error', 'Unknown message type: ' + packet.type);

	          case 112:
	            _context3.t19 = _context3.sent;
	            (0, _context3.t18)(_context3.t19);

	          case 114:
	          case "end":
	            return _context3.stop();
	        }
	      }
	    }, _callee3);
	  }));
	  return _packetType.apply(this, arguments);
	}


	function type(of) {
	  return Object.prototype.toString.call(of).slice(8, -1).toLowerCase();
	}

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
	//   boat: null
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

	function init()
	/* plateId, streetId */
	{
	  var plateId = '';
	  var streetId = null;

	  if (arguments.length === 2) {
	    plateId = arguments[0];
	    streetId = arguments[1];
	  } else {
	    plateId = exports.defaultLicensePlate;
	    streetId = arguments[0];
	  }

	  var options = arguments[2] || {};
	  var lp = findByPlate(plateId);
	  listen(plateId, streetId);
	  lp.boat = initialize(lp, options);
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
	  lp.boat.on(listen, callback);
	  return auto;
	}

	function joinRaft()
	/* plateId, streetId, write */
	{
	  var plateId = '';
	  var streetId = null;
	  var write = null;

	  if (arguments.length === 3) {
	    plateId = arguments[0];
	    streetId = arguments[1];
	    write = arguments[2];
	  } else {
	    plateId = exports.defaultLicensePlate;
	    streetId = arguments[0];
	    write = arguments[1];
	  }

	  var i = licensePlates.findIndex(function (lp) {
	    return lp.id === plateId;
	  });
	  licensePlates[i].boat.join("".concat(plateId, "...").concat(streetId), write);
	  return auto;
	}

	function leaveRaft()
	/* plateId, streetId, write */
	{}

	function commandRaft()
	/* plateId, json */
	{
	  var plateId = '';
	  var json = null;

	  if (arguments.length === 2) {
	    plateId = arguments[0];
	    json = arguments[1];
	  } else {
	    plateId = exports.defaultLicensePlate;
	    json = arguments[0];
	  }

	  var lp = findByPlate(plateId);
	  lp.boat.command(json);
	  return auto;
	} // consensus algorithm


	var auto = {
	  init: init,
	  on: onRaft,
	  join: joinRaft,
	  leave: leaveRaft,
	  command: commandRaft
	};

	exports.ack = ack;
	exports.auto = auto;
	exports.beep = beep;
	exports.checkpoint = checkpoint;
	exports.exit = exit;
	exports.findByPlate = findByPlate;
	exports.init = init;
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
