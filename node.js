(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('phoenix-channels')) :
  typeof define === 'function' && define.amd ? define(['exports', 'phoenix-channels'], factory) :
  (global = global || self, factory(global.ht = {}, global.Socket));
}(this, (function (exports, phoenixChannels) { 'use strict';

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
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

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  var domain; // This constructor is used to store event handlers. Instantiating this is
  // faster than explicitly calling `Object.create(null)` to get a "clean" empty
  // object (tested with v8 v4.9).

  function EventHandlers() {}

  EventHandlers.prototype = Object.create(null);

  function EventEmitter() {
    EventEmitter.init.call(this);
  }
  // require('events') === require('events').EventEmitter

  EventEmitter.EventEmitter = EventEmitter;
  EventEmitter.usingDomains = false;
  EventEmitter.prototype.domain = undefined;
  EventEmitter.prototype._events = undefined;
  EventEmitter.prototype._maxListeners = undefined; // By default EventEmitters will print a warning if more than 10 listeners are
  // added to it. This is a useful default which helps finding memory leaks.

  EventEmitter.defaultMaxListeners = 10;

  EventEmitter.init = function () {
    this.domain = null;

    if (EventEmitter.usingDomains) {
      // if there is an active domain, then attach to it.
      if (domain.active ) ;
    }

    if (!this._events || this._events === Object.getPrototypeOf(this)._events) {
      this._events = new EventHandlers();
      this._eventsCount = 0;
    }

    this._maxListeners = this._maxListeners || undefined;
  }; // Obviously not all Emitters should be limited to 10. This function allows
  // that to be increased. Set to zero for unlimited.


  EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
    if (typeof n !== 'number' || n < 0 || isNaN(n)) throw new TypeError('"n" argument must be a positive number');
    this._maxListeners = n;
    return this;
  };

  function $getMaxListeners(that) {
    if (that._maxListeners === undefined) return EventEmitter.defaultMaxListeners;
    return that._maxListeners;
  }

  EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
    return $getMaxListeners(this);
  }; // These standalone emit* functions are used to optimize calling of event
  // handlers for fast cases because emit() itself often has a variable number of
  // arguments and can be deoptimized because of that. These functions always have
  // the same number of arguments and thus do not get deoptimized, so the code
  // inside them can execute faster.


  function emitNone(handler, isFn, self) {
    if (isFn) handler.call(self);else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);

      for (var i = 0; i < len; ++i) listeners[i].call(self);
    }
  }

  function emitOne(handler, isFn, self, arg1) {
    if (isFn) handler.call(self, arg1);else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);

      for (var i = 0; i < len; ++i) listeners[i].call(self, arg1);
    }
  }

  function emitTwo(handler, isFn, self, arg1, arg2) {
    if (isFn) handler.call(self, arg1, arg2);else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);

      for (var i = 0; i < len; ++i) listeners[i].call(self, arg1, arg2);
    }
  }

  function emitThree(handler, isFn, self, arg1, arg2, arg3) {
    if (isFn) handler.call(self, arg1, arg2, arg3);else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);

      for (var i = 0; i < len; ++i) listeners[i].call(self, arg1, arg2, arg3);
    }
  }

  function emitMany(handler, isFn, self, args) {
    if (isFn) handler.apply(self, args);else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);

      for (var i = 0; i < len; ++i) listeners[i].apply(self, args);
    }
  }

  EventEmitter.prototype.emit = function emit(type) {
    var er, handler, len, args, i, events, domain;
    var doError = type === 'error';
    events = this._events;
    if (events) doError = doError && events.error == null;else if (!doError) return false;
    domain = this.domain; // If there is no 'error' event listener then throw.

    if (doError) {
      er = arguments[1];

      if (domain) {
        if (!er) er = new Error('Uncaught, unspecified "error" event');
        er.domainEmitter = this;
        er.domain = domain;
        er.domainThrown = false;
        domain.emit('error', er);
      } else if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }

      return false;
    }

    handler = events[type];
    if (!handler) return false;
    var isFn = typeof handler === 'function';
    len = arguments.length;

    switch (len) {
      // fast cases
      case 1:
        emitNone(handler, isFn, this);
        break;

      case 2:
        emitOne(handler, isFn, this, arguments[1]);
        break;

      case 3:
        emitTwo(handler, isFn, this, arguments[1], arguments[2]);
        break;

      case 4:
        emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
        break;
      // slower

      default:
        args = new Array(len - 1);

        for (i = 1; i < len; i++) args[i - 1] = arguments[i];

        emitMany(handler, isFn, this, args);
    }
    return true;
  };

  function _addListener(target, type, listener, prepend) {
    var m;
    var events;
    var existing;
    if (typeof listener !== 'function') throw new TypeError('"listener" argument must be a function');
    events = target._events;

    if (!events) {
      events = target._events = new EventHandlers();
      target._eventsCount = 0;
    } else {
      // To avoid recursion in the case that type === "newListener"! Before
      // adding it to the listeners, first emit "newListener".
      if (events.newListener) {
        target.emit('newListener', type, listener.listener ? listener.listener : listener); // Re-assign `events` because a newListener handler could have caused the
        // this._events to be assigned to a new object

        events = target._events;
      }

      existing = events[type];
    }

    if (!existing) {
      // Optimize the case of one listener. Don't need the extra array object.
      existing = events[type] = listener;
      ++target._eventsCount;
    } else {
      if (typeof existing === 'function') {
        // Adding the second element, need to change to array.
        existing = events[type] = prepend ? [listener, existing] : [existing, listener];
      } else {
        // If we've already got an array, just append.
        if (prepend) {
          existing.unshift(listener);
        } else {
          existing.push(listener);
        }
      } // Check for listener leak


      if (!existing.warned) {
        m = $getMaxListeners(target);

        if (m && m > 0 && existing.length > m) {
          existing.warned = true;
          var w = new Error('Possible EventEmitter memory leak detected. ' + existing.length + ' ' + type + ' listeners added. ' + 'Use emitter.setMaxListeners() to increase limit');
          w.name = 'MaxListenersExceededWarning';
          w.emitter = target;
          w.type = type;
          w.count = existing.length;
          emitWarning(w);
        }
      }
    }

    return target;
  }

  function emitWarning(e) {
    typeof console.warn === 'function' ? console.warn(e) : console.log(e);
  }

  EventEmitter.prototype.addListener = function addListener(type, listener) {
    return _addListener(this, type, listener, false);
  };

  EventEmitter.prototype.on = EventEmitter.prototype.addListener;

  EventEmitter.prototype.prependListener = function prependListener(type, listener) {
    return _addListener(this, type, listener, true);
  };

  function _onceWrap(target, type, listener) {
    var fired = false;

    function g() {
      target.removeListener(type, g);

      if (!fired) {
        fired = true;
        listener.apply(target, arguments);
      }
    }

    g.listener = listener;
    return g;
  }

  EventEmitter.prototype.once = function once(type, listener) {
    if (typeof listener !== 'function') throw new TypeError('"listener" argument must be a function');
    this.on(type, _onceWrap(this, type, listener));
    return this;
  };

  EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
    if (typeof listener !== 'function') throw new TypeError('"listener" argument must be a function');
    this.prependListener(type, _onceWrap(this, type, listener));
    return this;
  }; // emits a 'removeListener' event iff the listener was removed


  EventEmitter.prototype.removeListener = function removeListener(type, listener) {
    var list, events, position, i, originalListener;
    if (typeof listener !== 'function') throw new TypeError('"listener" argument must be a function');
    events = this._events;
    if (!events) return this;
    list = events[type];
    if (!list) return this;

    if (list === listener || list.listener && list.listener === listener) {
      if (--this._eventsCount === 0) this._events = new EventHandlers();else {
        delete events[type];
        if (events.removeListener) this.emit('removeListener', type, list.listener || listener);
      }
    } else if (typeof list !== 'function') {
      position = -1;

      for (i = list.length; i-- > 0;) {
        if (list[i] === listener || list[i].listener && list[i].listener === listener) {
          originalListener = list[i].listener;
          position = i;
          break;
        }
      }

      if (position < 0) return this;

      if (list.length === 1) {
        list[0] = undefined;

        if (--this._eventsCount === 0) {
          this._events = new EventHandlers();
          return this;
        } else {
          delete events[type];
        }
      } else {
        spliceOne(list, position);
      }

      if (events.removeListener) this.emit('removeListener', type, originalListener || listener);
    }

    return this;
  };

  EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
    var listeners, events;
    events = this._events;
    if (!events) return this; // not listening for removeListener, no need to emit

    if (!events.removeListener) {
      if (arguments.length === 0) {
        this._events = new EventHandlers();
        this._eventsCount = 0;
      } else if (events[type]) {
        if (--this._eventsCount === 0) this._events = new EventHandlers();else delete events[type];
      }

      return this;
    } // emit removeListener for all listeners on all events


    if (arguments.length === 0) {
      var keys = Object.keys(events);

      for (var i = 0, key; i < keys.length; ++i) {
        key = keys[i];
        if (key === 'removeListener') continue;
        this.removeAllListeners(key);
      }

      this.removeAllListeners('removeListener');
      this._events = new EventHandlers();
      this._eventsCount = 0;
      return this;
    }

    listeners = events[type];

    if (typeof listeners === 'function') {
      this.removeListener(type, listeners);
    } else if (listeners) {
      // LIFO order
      do {
        this.removeListener(type, listeners[listeners.length - 1]);
      } while (listeners[0]);
    }

    return this;
  };

  EventEmitter.prototype.listeners = function listeners(type) {
    var evlistener;
    var ret;
    var events = this._events;
    if (!events) ret = [];else {
      evlistener = events[type];
      if (!evlistener) ret = [];else if (typeof evlistener === 'function') ret = [evlistener.listener || evlistener];else ret = unwrapListeners(evlistener);
    }
    return ret;
  };

  EventEmitter.listenerCount = function (emitter, type) {
    if (typeof emitter.listenerCount === 'function') {
      return emitter.listenerCount(type);
    } else {
      return listenerCount.call(emitter, type);
    }
  };

  EventEmitter.prototype.listenerCount = listenerCount;

  function listenerCount(type) {
    var events = this._events;

    if (events) {
      var evlistener = events[type];

      if (typeof evlistener === 'function') {
        return 1;
      } else if (evlistener) {
        return evlistener.length;
      }
    }

    return 0;
  }

  EventEmitter.prototype.eventNames = function eventNames() {
    return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
  }; // About 1.5x faster than the two-arg version of Array#splice().


  function spliceOne(list, index) {
    for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) list[i] = list[k];

    list.pop();
  }

  function arrayClone(arr, i) {
    var copy = new Array(i);

    while (i--) copy[i] = arr[i];

    return copy;
  }

  function unwrapListeners(arr) {
    var ret = new Array(arr.length);

    for (var i = 0; i < ret.length; ++i) {
      ret[i] = arr[i].listener || arr[i];
    }

    return ret;
  }

  var Tick = require('tick-tock'); // https://www.npmjs.com/package/tick-tock

  var ms = require('millisecond'); // const GUN = require('./gun') // TODO: use GUN for logging system (note: it will be passed in)
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
  var events = new EventEmitter.EventEmitter();

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
      socket: new phoenixChannels.Socket("wss://simple.fleetgrid.com/socket")
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

  Object.defineProperty(exports, '__esModule', { value: true });

})));
