var ht = (function (exports) {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    return function () {
      var Super = _getPrototypeOf(Derived),
          result;

      if (_isNativeReflectConstruct()) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

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

    var has = Object.prototype.hasOwnProperty,
        prefix = '~';
    /**
     * Constructor to create a storage for our `EE` objects.
     * An `Events` instance is a plain object whose properties are event names.
     *
     * @constructor
     * @api private
     */

    function Events() {} //
    // We try to not inherit from `Object.prototype`. In some engines creating an
    // instance in this way is faster than calling `Object.create(null)` directly.
    // If `Object.create(null)` is not supported we prefix the event names with a
    // character to make sure that the built-in object properties are not
    // overridden or used as an attack vector.
    //


    if (Object.create) {
      Events.prototype = Object.create(null); //
      // This hack is needed because the `__proto__` property is still inherited in
      // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
      //

      if (!new Events().__proto__) prefix = false;
    }
    /**
     * Representation of a single event listener.
     *
     * @param {Function} fn The listener function.
     * @param {Mixed} context The context to invoke the listener with.
     * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
     * @constructor
     * @api private
     */


    function EE(fn, context, once) {
      this.fn = fn;
      this.context = context;
      this.once = once || false;
    }
    /**
     * Minimal `EventEmitter` interface that is molded against the Node.js
     * `EventEmitter` interface.
     *
     * @constructor
     * @api public
     */


    function EventEmitter() {
      this._events = new Events();
      this._eventsCount = 0;
    }
    /**
     * Return an array listing the events for which the emitter has registered
     * listeners.
     *
     * @returns {Array}
     * @api public
     */


    EventEmitter.prototype.eventNames = function eventNames() {
      var names = [],
          events,
          name;
      if (this._eventsCount === 0) return names;

      for (name in events = this._events) {
        if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
      }

      if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events));
      }

      return names;
    };
    /**
     * Return the listeners registered for a given event.
     *
     * @param {String|Symbol} event The event name.
     * @param {Boolean} exists Only check if there are listeners.
     * @returns {Array|Boolean}
     * @api public
     */


    EventEmitter.prototype.listeners = function listeners(event, exists) {
      var evt = prefix ? prefix + event : event,
          available = this._events[evt];
      if (exists) return !!available;
      if (!available) return [];
      if (available.fn) return [available.fn];

      for (var i = 0, l = available.length, ee = new Array(l); i < l; i++) {
        ee[i] = available[i].fn;
      }

      return ee;
    };
    /**
     * Calls each of the listeners registered for a given event.
     *
     * @param {String|Symbol} event The event name.
     * @returns {Boolean} `true` if the event had listeners, else `false`.
     * @api public
     */


    EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return false;
      var listeners = this._events[evt],
          len = arguments.length,
          args,
          i;

      if (listeners.fn) {
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

            case 4:
              listeners[i].fn.call(listeners[i].context, a1, a2, a3);
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
     * Add a listener for a given event.
     *
     * @param {String|Symbol} event The event name.
     * @param {Function} fn The listener function.
     * @param {Mixed} [context=this] The context to invoke the listener with.
     * @returns {EventEmitter} `this`.
     * @api public
     */


    EventEmitter.prototype.on = function on(event, fn, context) {
      var listener = new EE(fn, context || this),
          evt = prefix ? prefix + event : event;
      if (!this._events[evt]) this._events[evt] = listener, this._eventsCount++;else if (!this._events[evt].fn) this._events[evt].push(listener);else this._events[evt] = [this._events[evt], listener];
      return this;
    };
    /**
     * Add a one-time listener for a given event.
     *
     * @param {String|Symbol} event The event name.
     * @param {Function} fn The listener function.
     * @param {Mixed} [context=this] The context to invoke the listener with.
     * @returns {EventEmitter} `this`.
     * @api public
     */


    EventEmitter.prototype.once = function once(event, fn, context) {
      var listener = new EE(fn, context || this, true),
          evt = prefix ? prefix + event : event;
      if (!this._events[evt]) this._events[evt] = listener, this._eventsCount++;else if (!this._events[evt].fn) this._events[evt].push(listener);else this._events[evt] = [this._events[evt], listener];
      return this;
    };
    /**
     * Remove the listeners of a given event.
     *
     * @param {String|Symbol} event The event name.
     * @param {Function} fn Only remove the listeners that match this function.
     * @param {Mixed} context Only remove the listeners that have this context.
     * @param {Boolean} once Only remove one-time listeners.
     * @returns {EventEmitter} `this`.
     * @api public
     */


    EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return this;

      if (!fn) {
        if (--this._eventsCount === 0) this._events = new Events();else delete this._events[evt];
        return this;
      }

      var listeners = this._events[evt];

      if (listeners.fn) {
        if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
          if (--this._eventsCount === 0) this._events = new Events();else delete this._events[evt];
        }
      } else {
        for (var i = 0, events = [], length = listeners.length; i < length; i++) {
          if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
            events.push(listeners[i]);
          }
        } //
        // Reset the array, or remove it completely if we have no more listeners.
        //


        if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;else if (--this._eventsCount === 0) this._events = new Events();else delete this._events[evt];
      }

      return this;
    };
    /**
     * Remove all listeners, or those of the specified event.
     *
     * @param {String|Symbol} [event] The event name.
     * @returns {EventEmitter} `this`.
     * @api public
     */


    EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
      var evt;

      if (event) {
        evt = prefix ? prefix + event : event;

        if (this._events[evt]) {
          if (--this._eventsCount === 0) this._events = new Events();else delete this._events[evt];
        }
      } else {
        this._events = new Events();
        this._eventsCount = 0;
      }

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
    // Allow `EventEmitter` to be imported as module namespace.
    //

    EventEmitter.EventEmitter = EventEmitter; //
    // Expose the module.
    //

    {
      module.exports = EventEmitter;
    }
  });

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
   * @param {Function} duration Duration of the timer.
   * @param {Function} fn The functions that need to be executed.
   * @api private
   */

  function Timer(timer, clear, duration, fn) {
    this.start = +new Date();
    this.duration = duration;
    this.clear = clear;
    this.timer = timer;
    this.fns = [fn];
  }
  /**
   * Calculate the time left for a given timer.
   *
   * @returns {Number} Time in milliseconds.
   * @api public
   */


  Timer.prototype.remaining = function remaining() {
    return this.duration - this.taken();
  };
  /**
   * Calculate the amount of time it has taken since we've set the timer.
   *
   * @returns {Number}
   * @api public
   */


  Timer.prototype.taken = function taken() {
    return +new Date() - this.start;
  };
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
      if (clear) tock.clear(name);else tock.start = +new Date();

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
    var tick = this,
        tock;

    if (tick.timers[name]) {
      tick.timers[name].fns.push(fn);
      return tick;
    }

    tock = millisecond(time);
    tick.timers[name] = new Timer(setTimeout(tick.tock(name, true), millisecond(time)), unsetTimeout, tock, fn);
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
    var tick = this,
        tock;

    if (tick.timers[name]) {
      tick.timers[name].fns.push(fn);
      return tick;
    }

    tock = millisecond(time);
    tick.timers[name] = new Timer(setInterval(tick.tock(name), millisecond(time)), unsetInterval, tock, fn);
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

    tick.timers[name] = new Timer(setImmediate(tick.tock(name, true)), unsetImmediate, 0, fn);
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
   * Adjust a timeout or interval to a new duration.
   *
   * @returns {Tick}
   * @api public
   */


  Tick.prototype.adjust = function adjust(name, time) {
    var interval,
        tick = this,
        tock = millisecond(time),
        timer = tick.timers[name];
    if (!timer) return tick;
    interval = timer.clear === unsetInterval;
    timer.clear(timer.timer);
    timer.start = +new Date();
    timer.duration = tock;
    timer.timer = (interval ? setInterval : setTimeout)(tick.tock(name, !interval), tock);
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
  }; //
  // Expose the timer factory.
  //


  Tick.Timer = Timer;
  var tickTock = Tick;

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

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            Promise.resolve(value).then(_next, _throw);
          }
        }

        function _next(value) {
          step("next", value);
        }

        function _throw(err) {
          step("throw", err);
        }

        _next();
      });
    };
  }

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck$1(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties$1(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass$1(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties$1(Constructor, staticProps);
    return Constructor;
  }

  function _possibleConstructorReturn$1(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    }

    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _inherits$1(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  function _assertThisInitialized$1(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }
  /**
   * Generate a somewhat unique UUID.
   *
   * @see stackoverflow.com/q/105034
   * @returns {String} UUID.
   * @private
   */


  function UUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function gen(c) {
      var random = Math.random() * 16 | 0,
          value = c !== 'x' ? random & 0x3 | 0x8 : random;
      return value.toString(16);
    });
  }
  /**
   * Emit when modifications are made.
   *
   * @type {Fucntion}
   * @private
   */


  var change = modification(' change');
  /**
   * A nope function for when people don't want message acknowledgements. Because
   * they don't care about CAP.
   *
   * @private
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
   * @public
   */


  var Raft = /*#__PURE__*/function (_EventEmitter) {
    _inherits$1(Raft, _EventEmitter);

    function Raft(address) {
      var _this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck$1(this, Raft);

      _this = _possibleConstructorReturn$1(this, (Raft.__proto__ || Object.getPrototypeOf(Raft)).call(this));

      var raft = _assertThisInitialized$1(_this);

      if ('object' === _typeof(address)) options = address;else if (!options.address) options.address = address;
      raft.election = {
        min: millisecond(options['election min'] || '150 ms'),
        max: millisecond(options['election max'] || '300 ms')
      };
      raft.beat = millisecond(options.heartbeat || '50 ms');
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
      raft.change = change;
      raft.emits = emits;
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

      return _this;
    }
    /**
     * Initialize Raft and start listening to the various of events we're
     * emitting as we're quite chatty to provide the maximum amount of flexibility
     * and reconfigurability.
     *
     * @param {Object} options The configuration you passed in the constructor.
     * @private
     */


    _createClass$1(Raft, [{
      key: "_initialize",
      value: function _initialize(options) {
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

        raft.on('data', /*#__PURE__*/function () {
          var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(packet, write) {
            var reason, _ref2, _index, _term, _ref3, term, index, hasIndex, _entry, entries, entry, _entries, previousEntry, append;

            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    write = write || nope;

                    if (!('object' !== raft.type(packet))) {
                      _context.next = 9;
                      break;
                    }

                    reason = 'Invalid packet received';
                    raft.emit('error', new Error(reason));
                    _context.t0 = write;
                    _context.next = 7;
                    return raft.packet('error', reason);

                  case 7:
                    _context.t1 = _context.sent;
                    return _context.abrupt("return", (0, _context.t0)(_context.t1));

                  case 9:
                    if (!(packet.term > raft.term)) {
                      _context.next = 13;
                      break;
                    }

                    raft.change({
                      leader: Raft.LEADER === packet.state ? packet.address : packet.leader || raft.leader,
                      state: Raft.FOLLOWER,
                      term: packet.term
                    });
                    _context.next = 17;
                    break;

                  case 13:
                    if (!(packet.term < raft.term)) {
                      _context.next = 17;
                      break;
                    }

                    reason = 'Stale term detected, received `' + packet.term + '` we are at ' + raft.term;
                    raft.emit('error', new Error(reason));
                    return _context.abrupt("return", write(raft.packet('error', reason)));

                  case 17:
                    //
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

                    _context.t2 = packet.type;
                    _context.next = _context.t2 === 'vote' ? 21 : _context.t2 === 'voted' ? 51 : _context.t2 === 'error' ? 68 : _context.t2 === 'append' ? 70 : _context.t2 === 'append ack' ? 105 : _context.t2 === 'append fail' ? 114 : _context.t2 === 'exec' ? 122 : 123;
                    break;

                  case 21:
                    if (!(raft.votes.for && raft.votes.for !== packet.address)) {
                      _context.next = 28;
                      break;
                    }

                    raft.emit('vote', packet, false);
                    _context.t3 = write;
                    _context.next = 26;
                    return raft.packet('voted', {
                      granted: false
                    });

                  case 26:
                    _context.t4 = _context.sent;
                    return _context.abrupt("return", (0, _context.t3)(_context.t4));

                  case 28:
                    if (!raft.log) {
                      _context.next = 41;
                      break;
                    }

                    _context.next = 31;
                    return raft.log.getLastInfo();

                  case 31:
                    _ref2 = _context.sent;
                    _index = _ref2.index;
                    _term = _ref2.term;

                    if (!(_index > packet.last.index && _term > packet.last.term)) {
                      _context.next = 41;
                      break;
                    }

                    raft.emit('vote', packet, false);
                    _context.t5 = write;
                    _context.next = 39;
                    return raft.packet('voted', {
                      granted: false
                    });

                  case 39:
                    _context.t6 = _context.sent;
                    return _context.abrupt("return", (0, _context.t5)(_context.t6));

                  case 41:
                    //
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
                    _context.t7 = write;
                    _context.next = 47;
                    return raft.packet('voted', {
                      granted: true
                    });

                  case 47:
                    _context.t8 = _context.sent;
                    (0, _context.t7)(_context.t8); //
                    // We've accepted someone as potential new leader, so we should reset
                    // our heartbeat to prevent this raft from timing out after voting.
                    // Which would again increment the term causing us to be next CANDIDATE
                    // and invalidates the request we just got, so that's silly willy.
                    //

                    raft.heartbeat(raft.timeout());
                    return _context.abrupt("break", 132);

                  case 51:
                    if (!(Raft.CANDIDATE !== raft.state)) {
                      _context.next = 57;
                      break;
                    }

                    _context.t9 = write;
                    _context.next = 55;
                    return raft.packet('error', 'No longer a candidate, ignoring vote');

                  case 55:
                    _context.t10 = _context.sent;
                    return _context.abrupt("return", (0, _context.t9)(_context.t10));

                  case 57:
                    //
                    // Increment our received votes when our voting request has been
                    // granted by the raft that received the data.
                    //
                    if (packet.data.granted) {
                      raft.votes.granted++;
                    } //
                    // Check if we've received the minimal amount of votes required for this
                    // current voting round to be considered valid.
                    //


                    if (!raft.quorum(raft.votes.granted)) {
                      _context.next = 66;
                      break;
                    }

                    raft.change({
                      leader: raft.address,
                      state: Raft.LEADER
                    }); //
                    // Send a heartbeat message to all connected clients.
                    //

                    _context.t11 = raft;
                    _context.t12 = Raft.FOLLOWER;
                    _context.next = 64;
                    return raft.packet('append');

                  case 64:
                    _context.t13 = _context.sent;

                    _context.t11.message.call(_context.t11, _context.t12, _context.t13);

                  case 66:
                    //
                    // Empty write, nothing to do.
                    //
                    write();
                    return _context.abrupt("break", 132);

                  case 68:
                    raft.emit('error', new Error(packet.data));
                    return _context.abrupt("break", 132);

                  case 70:
                    _context.next = 72;
                    return raft.log.getLastInfo();

                  case 72:
                    _ref3 = _context.sent;
                    term = _ref3.term;
                    index = _ref3.index;

                    if (!(packet.last.index !== index && packet.last.index !== 0)) {
                      _context.next = 89;
                      break;
                    }

                    _context.next = 78;
                    return raft.log.has(packet.last.index);

                  case 78:
                    hasIndex = _context.sent;

                    if (!hasIndex) {
                      _context.next = 83;
                      break;
                    }

                    raft.log.removeEntriesAfter(packet.last.index);
                    _context.next = 89;
                    break;

                  case 83:
                    _context.t14 = raft;
                    _context.t15 = Raft.LEADER;
                    _context.next = 87;
                    return raft.packet('append fail', {
                      term: packet.last.term,
                      index: packet.last.index
                    });

                  case 87:
                    _context.t16 = _context.sent;
                    return _context.abrupt("return", _context.t14.message.call(_context.t14, _context.t15, _context.t16));

                  case 89:
                    if (!packet.data) {
                      _context.next = 99;
                      break;
                    }

                    _entry = packet.data[0];
                    _context.next = 93;
                    return raft.log.saveCommand(_entry.command, _entry.term, _entry.index);

                  case 93:
                    _context.t17 = raft;
                    _context.t18 = Raft.LEADER;
                    _context.next = 97;
                    return raft.packet('append ack', {
                      term: _entry.term,
                      index: _entry.index
                    });

                  case 97:
                    _context.t19 = _context.sent;

                    _context.t17.message.call(_context.t17, _context.t18, _context.t19);

                  case 99:
                    if (!(raft.log.committedIndex < packet.last.committedIndex)) {
                      _context.next = 104;
                      break;
                    }

                    _context.next = 102;
                    return raft.log.getUncommittedEntriesUpToIndex(packet.last.committedIndex, packet.last.term);

                  case 102:
                    entries = _context.sent;
                    raft.commitEntries(entries);

                  case 104:
                    return _context.abrupt("break", 132);

                  case 105:
                    _context.next = 107;
                    return raft.log.commandAck(packet.data.index, packet.address);

                  case 107:
                    entry = _context.sent;

                    if (!(raft.quorum(entry.responses.length) && !entry.committed)) {
                      _context.next = 113;
                      break;
                    }

                    _context.next = 111;
                    return raft.log.getUncommittedEntriesUpToIndex(entry.index, entry.term);

                  case 111:
                    _entries = _context.sent;
                    raft.commitEntries(_entries);

                  case 113:
                    return _context.abrupt("break", 132);

                  case 114:
                    _context.next = 116;
                    return raft.log.get(packet.data.index);

                  case 116:
                    previousEntry = _context.sent;
                    _context.next = 119;
                    return raft.appendPacket(previousEntry);

                  case 119:
                    append = _context.sent;
                    write(append);
                    return _context.abrupt("break", 132);

                  case 122:
                    return _context.abrupt("break", 132);

                  case 123:
                    if (!raft.listeners('rpc').length) {
                      _context.next = 127;
                      break;
                    }

                    raft.emit('rpc', packet, write);
                    _context.next = 132;
                    break;

                  case 127:
                    _context.t20 = write;
                    _context.next = 130;
                    return raft.packet('error', 'Unknown message type: ' + packet.type);

                  case 130:
                    _context.t21 = _context.sent;
                    (0, _context.t20)(_context.t21);

                  case 132:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));

          return function (_x, _x2) {
            return _ref.apply(this, arguments);
          };
        }()); //
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
      }
      /**
       * Proper type checking.
       *
       * @param {Mixed} of Thing we want to know the type of.
       * @returns {String} The type.
       * @private
       */

    }, {
      key: "type",
      value: function type(of) {
        return Object.prototype.toString.call(of).slice(8, -1).toLowerCase();
      }
      /**
       * Check if we've reached our quorum (a.k.a. minimum amount of votes requires
       * for a voting round to be considered valid) for the given amount of votes.
       *
       * @param {Number} responses Amount of responses received.
       * @returns {Boolean}
       * @public
       */

    }, {
      key: "quorum",
      value: function quorum(responses) {
        if (!this.nodes.length || !responses) return false;
        return responses >= this.majority();
      }
      /**
       * The majority required to reach our the quorum.
       *
       * @returns {Number}
       * @public
       */

    }, {
      key: "majority",
      value: function majority() {
        return Math.ceil(this.nodes.length / 2) + 1;
      }
      /**
       * Attempt to run a function indefinitely until the callback is called.
       *
       * @param {Function} attempt Function that needs to be attempted.
       * @param {Function} fn Completion callback.
       * @param {Number} timeout Which timeout should we use.
       * @returns {Raft}
       * @public
       */

    }, {
      key: "indefinitely",
      value: function indefinitely(attempt, fn, timeout) {
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
      }
      /**
       * Start or update the heartbeat of the Raft. If we detect that we've received
       * a heartbeat timeout we will promote our selfs to a candidate to take over the
       * leadership.
       *
       * @param {String|Number} duration Time it would take for the heartbeat to timeout.
       * @returns {Raft}
       * @private
       */

    }, {
      key: "heartbeat",
      value: function heartbeat(duration) {
        var raft = this;
        duration = duration || raft.beat;

        if (raft.timers.active('heartbeat')) {
          raft.timers.adjust('heartbeat', duration);
          return raft;
        }

        raft.timers.setTimeout('heartbeat', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
          var packet;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (!(Raft.LEADER !== raft.state)) {
                    _context2.next = 3;
                    break;
                  }

                  raft.emit('heartbeat timeout');
                  return _context2.abrupt("return", raft.promote());

                case 3:
                  _context2.next = 5;
                  return raft.packet('append');

                case 5:
                  packet = _context2.sent;
                  raft.emit('heartbeat', packet);
                  raft.message(Raft.FOLLOWER, packet).heartbeat(raft.beat);

                case 8:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        })), duration);
        return raft;
      }
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
       * @public
       */

    }, {
      key: "message",
      value: function message(who, what, when) {
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
            for (; i < length; i++) {
              if (raft.leader === raft.nodes[i].address) {
                nodes.push(raft.nodes[i]);
              }
            }

            break;

          case Raft.FOLLOWER:
            for (; i < length; i++) {
              if (raft.leader !== raft.nodes[i].address) {
                nodes.push(raft.nodes[i]);
              }
            }

            break;

          case Raft.CHILD:
            Array.prototype.push.apply(nodes, raft.nodes);
            break;

          default:
            for (; i < length; i++) {
              if (who === raft.nodes[i].address) {
                nodes.push(raft.nodes[i]);
              }
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
      }
    }, {
      key: "timeout",

      /**
       * Generate the various of timeouts.
       *
       * @returns {Number}
       * @private
       */
      value: function timeout() {
        var times = this.election;
        return Math.floor(Math.random() * (times.max - times.min + 1) + times.min);
      }
      /**
       * Calculate if our average latency causes us to come dangerously close to the
       * minimum election timeout.
       *
       * @param {Array} latency Latency of the last broadcast.
       * @param {Boolean} Success-fully calculated the threshold.
       * @private
       */

    }, {
      key: "timing",
      value: function timing(latency) {
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
      }
      /**
       * Raft §5.2:
       *
       * We've detected a timeout from the leaders heartbeats and need to start a new
       * election for leadership. We increment our current term, set the CANDIDATE
       * state, vote our selfs and ask all others rafts to vote for us.
       *
       * @returns {Raft}
       * @private
       */

    }, {
      key: "promote",
      value: function () {
        var _promote = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
          var raft, packet;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  raft = this;
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

                  _context3.next = 6;
                  return raft.packet('vote');

                case 6:
                  packet = _context3.sent;
                  raft.message(Raft.FOLLOWER, packet); //
                  // Set the election timeout. This gives the rafts some time to reach
                  // consensuses about who they want to vote for. If no consensus has been
                  // reached within the set timeout we will attempt it again.
                  //

                  raft.timers.clear('heartbeat, election').setTimeout('election', raft.promote, raft.timeout());
                  return _context3.abrupt("return", raft);

                case 10:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));

        return function promote() {
          return _promote.apply(this, arguments);
        };
      }()
      /**
       * Wrap the outgoing messages in an object with additional required data.
       *
       * @async
       * @param {String} type Message type we're trying to send.
       * @param {Mixed} data Data to be transfered.
       * @returns {Promise<Object>} Packet.
       * @private
       */

    }, {
      key: "packet",
      value: function () {
        var _packet = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(type, data) {
          var raft,
              wrapped,
              _args4 = arguments;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  raft = this, wrapped = {
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

                  if (!raft.log) {
                    _context4.next = 5;
                    break;
                  }

                  _context4.next = 4;
                  return raft.log.getLastInfo();

                case 4:
                  wrapped.last = _context4.sent;

                case 5:
                  if (_args4.length === 2) wrapped.data = data;
                  return _context4.abrupt("return", wrapped);

                case 7:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4, this);
        }));

        return function packet(_x3, _x4) {
          return _packet.apply(this, arguments);
        };
      }()
      /**
       * appendPacket - Send append message with entry and using the previous entry as the last.index and last.term
       *
       * @param {Entry} entry Entry to send as data
       *
       * @return {Promise<object>} Description
       * @private
       */

    }, {
      key: "appendPacket",
      value: function () {
        var _appendPacket = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(entry) {
          var raft, last;
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  raft = this;
                  _context5.next = 3;
                  return raft.log.getEntryInfoBefore(entry);

                case 3:
                  last = _context5.sent;
                  return _context5.abrupt("return", {
                    state: raft.state,
                    // Are we're a leader, candidate or follower.
                    term: raft.term,
                    // Our current term so we can find mis matches.
                    address: raft.address,
                    // Address of the sender.
                    type: 'append',
                    // Append message type .
                    leader: raft.leader,
                    // Who is our leader.
                    data: [entry],
                    // The command to send to the other nodes
                    last: last
                  });

                case 5:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5, this);
        }));

        return function appendPacket(_x5) {
          return _appendPacket.apply(this, arguments);
        };
      }()
      /**
       * Create a clone of the current instance with the same configuration. Ideally
       * for creating connected nodes in a cluster.. And let that be something we're
       * planning on doing.
       *
       * @param {Object} options Configuration that should override the default config.
       * @returns {Raft} The newly created instance.
       * @public
       */

    }, {
      key: "clone",
      value: function clone(options) {
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
      }
      /**
       * A new raft is about to join the cluster. So we need to upgrade the
       * configuration of every single raft.
       *
       * @param {String} address The address of the raft that is connected.
       * @param {Function} write A method that we use to write data.
       * @returns {Raft} The raft we created and that joined our cluster.
       * @public
       */

    }, {
      key: "join",
      value: function join(address, write) {
        var raft = this; // can be function or asyncfunction

        if (/function/.test(raft.type(address))) {
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
      }
      /**
       * Remove a raft from the cluster.
       *
       * @param {String} address The address of the raft that should be removed.
       * @returns {Raft} The raft that we removed.
       * @public
       */

    }, {
      key: "leave",
      value: function leave(address) {
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
      }
      /**
       * This Raft needs to be shut down.
       *
       * @returns {Boolean} Successful destruction.
       * @public
       */

    }, {
      key: "end",
      value: function end() {
        var raft = this;
        if (Raft.STOPPED === raft.state) return false;
        raft.change({
          state: Raft.STOPPED
        });
        if (raft.nodes.length) for (var i = 0; i < raft.nodes.length; i++) {
          raft.leave(raft.nodes[i]);
        }
        raft.emit('end');
        raft.timers.end();
        raft.removeAllListeners();
        if (raft.log) raft.log.end();
        raft.timers = raft.Log = raft.beat = raft.election = null;
        return true;
      }
      /**
       * Raft §5.3:
       * command - Saves command to log and replicates to followers
       *
       * @param {type} command Json command to be stored in the log
       *
       * @return {Promise<void>} Description
       */

    }, {
      key: "command",
      value: function () {
        var _command2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(_command) {
          var raft, entry, appendPacket;
          return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  raft = this;

                  if (!(raft.state !== Raft.LEADER)) {
                    _context6.next = 3;
                    break;
                  }

                  return _context6.abrupt("return", fn({
                    message: 'NOTLEADER',
                    leaderAddress: raft.leader
                  }));

                case 3:
                  _context6.next = 5;
                  return raft.log.saveCommand(_command, raft.term);

                case 5:
                  entry = _context6.sent;
                  _context6.next = 8;
                  return raft.appendPacket(entry);

                case 8:
                  appendPacket = _context6.sent;
                  raft.message(Raft.FOLLOWER, appendPacket);

                case 10:
                case "end":
                  return _context6.stop();
              }
            }
          }, _callee6, this);
        }));

        return function command(_x6) {
          return _command2.apply(this, arguments);
        };
      }()
      /**
       * commitEntries - Commites entries in log and emits commited entries
       *
       * @param {Entry[]} entries Entries to commit
       * @return {Promise<void>}
       */

    }, {
      key: "commitEntries",
      value: function () {
        var _commitEntries = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(entries) {
          var _this2 = this;

          return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  entries.forEach( /*#__PURE__*/function () {
                    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(entry) {
                      return regeneratorRuntime.wrap(function _callee7$(_context7) {
                        while (1) {
                          switch (_context7.prev = _context7.next) {
                            case 0:
                              _context7.next = 2;
                              return _this2.log.commit(entry.index);

                            case 2:
                              _this2.emit('commit', entry.command);

                            case 3:
                            case "end":
                              return _context7.stop();
                          }
                        }
                      }, _callee7, this);
                    }));

                    return function (_x8) {
                      return _ref5.apply(this, arguments);
                    };
                  }());

                case 1:
                case "end":
                  return _context8.stop();
              }
            }
          }, _callee8, this);
        }));

        return function commitEntries(_x7) {
          return _commitEntries.apply(this, arguments);
        };
      }()
    }]);

    return Raft;
  }(eventemitter3);
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

  var lib = Raft;

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

  var Boat = /*#__PURE__*/function (_Raft) {
    _inherits(Boat, _Raft);

    var _super = _createSuper(Boat);

    function Boat() {
      _classCallCheck(this, Boat);

      return _super.apply(this, arguments);
    }

    _createClass(Boat, [{
      key: "write",
      value: function write(packet, callback) {
        var config = packet.address.split('...'); // from: new Boat()

        var lp = findByPlate(config[0]);
        lp.channel.push('SFS:raft', {
          plateId: config[0],
          room: config[1],
          packet: packet
        });
        callback();
      }
    }]);

    return Boat;
  }(lib); // var Boat = Raft.extend({
  //   socket: null,
  //   write: function write(packet, callback) {
  //     let config = packet.address.split('...') // from: new Boat()
  //     let lp = findByPlate(config[0])
  //     lp.channel.push('SFS:raft', {
  //       plateId: config[0],
  //       room: config[1],
  //       packet
  //     })
  //     callback()
  //   }
  // })


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
  }

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
    lp.raft.command(json);
    return auto;
  } // consensus algorithm


  var auto = {
    "new": newRaft,
    join: joinRaft,
    on: onRaft,
    command: commandRaft
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

  return exports;

}({}));
