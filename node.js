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

  var Tick = require('tick-tock'); // https://www.npmjs.com/package/tick-tock


  var Events = require('events');

  var ms = require('millisecond'); // Generate a somewhat unique UUID.
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
    }());
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
              _context3.next = _context3.t0 === 'vote' ? 4 : _context3.t0 === 'voted' ? 34 : _context3.t0 === 'error' ? 51 : _context3.t0 === 'append' ? 53 : _context3.t0 === 'append ack' ? 88 : _context3.t0 === 'append fail' ? 97 : _context3.t0 === 'exec' ? 105 : 106;
              break;

            case 4:
              if (!(raft.votes["for"] && raft.votes["for"] !== packet.address)) {
                _context3.next = 11;
                break;
              }

              raft.emit('vote', packet, false);
              _context3.t1 = write;
              _context3.next = 9;
              return raft.packet('voted', {
                granted: false
              });

            case 9:
              _context3.t2 = _context3.sent;
              return _context3.abrupt("return", (0, _context3.t1)(_context3.t2));

            case 11:
              if (!raft.log) {
                _context3.next = 24;
                break;
              }

              _context3.next = 14;
              return raft.log.getLastInfo();

            case 14:
              _yield$raft$log$getLa = _context3.sent;
              _index = _yield$raft$log$getLa.index;
              _term2 = _yield$raft$log$getLa.term;

              if (!(_index > packet.last.index && _term2 > packet.last.term)) {
                _context3.next = 24;
                break;
              }

              raft.emit('vote', packet, false);
              _context3.t3 = write;
              _context3.next = 22;
              return raft.packet('voted', {
                granted: false
              });

            case 22:
              _context3.t4 = _context3.sent;
              return _context3.abrupt("return", (0, _context3.t3)(_context3.t4));

            case 24:
              // We've made our decision, we haven't voted for this term yet and this
              // candidate came in first so it gets our vote as all requirements are
              // met.
              raft.votes["for"] = packet.address;
              raft.emit('vote', packet, true);
              raft.change({
                leader: packet.address,
                term: packet.term
              });
              _context3.t5 = write;
              _context3.next = 30;
              return raft.packet('voted', {
                granted: true
              });

            case 30:
              _context3.t6 = _context3.sent;
              (0, _context3.t5)(_context3.t6);
              // We've accepted someone as potential new leader, so we should reset
              // our heartbeat to prevent this raft from timing out after voting.
              // Which would again increment the term causing us to be next CANDIDATE
              // and invalidates the request we just got, so that's silly willy.
              raft.heartbeat(raft.timeout());
              return _context3.abrupt("break", 115);

            case 34:
              if (!(os.CANDIDATE !== raft.state)) {
                _context3.next = 40;
                break;
              }

              _context3.t7 = write;
              _context3.next = 38;
              return raft.packet('error', 'No longer a candidate, ignoring vote');

            case 38:
              _context3.t8 = _context3.sent;
              return _context3.abrupt("return", (0, _context3.t7)(_context3.t8));

            case 40:
              // Increment our received votes when our voting request has been
              // granted by the raft that received the data.
              if (packet.data.granted) {
                raft.votes.granted++;
              } // Check if we've received the minimal amount of votes required for this
              // current voting round to be considered valid.


              if (!raft.quorum(raft.votes.granted)) {
                _context3.next = 49;
                break;
              }

              raft.change({
                leader: raft.address,
                state: os.LEADER
              }); // Send a heartbeat message to all connected clients.

              _context3.t9 = raft;
              _context3.t10 = os.FOLLOWER;
              _context3.next = 47;
              return raft.packet('append');

            case 47:
              _context3.t11 = _context3.sent;

              _context3.t9.message.call(_context3.t9, _context3.t10, _context3.t11);

            case 49:
              // Empty write, nothing to do.
              write();
              return _context3.abrupt("break", 115);

            case 51:
              raft.emit('error', new Error(packet.data));
              return _context3.abrupt("break", 115);

            case 53:
              _context3.next = 55;
              return raft.log.getLastInfo();

            case 55:
              _yield$raft$log$getLa2 = _context3.sent;
              _term = _yield$raft$log$getLa2.term;
              index = _yield$raft$log$getLa2.index;

              if (!(packet.last.index !== index && packet.last.index !== 0)) {
                _context3.next = 72;
                break;
              }

              _context3.next = 61;
              return raft.log.has(packet.last.index);

            case 61:
              hasIndex = _context3.sent;

              if (!hasIndex) {
                _context3.next = 66;
                break;
              }

              raft.log.removeEntriesAfter(packet.last.index);
              _context3.next = 72;
              break;

            case 66:
              _context3.t12 = raft;
              _context3.t13 = os.LEADER;
              _context3.next = 70;
              return raft.packet('append fail', {
                term: packet.last.term,
                index: packet.last.index
              });

            case 70:
              _context3.t14 = _context3.sent;
              return _context3.abrupt("return", _context3.t12.message.call(_context3.t12, _context3.t13, _context3.t14));

            case 72:
              if (!packet.data) {
                _context3.next = 82;
                break;
              }

              _entry = packet.data[0];
              _context3.next = 76;
              return raft.log.saveCommand(_entry.command, _entry.term, _entry.index);

            case 76:
              _context3.t15 = raft;
              _context3.t16 = os.LEADER;
              _context3.next = 80;
              return raft.packet('append ack', {
                term: _entry.term,
                index: _entry.index
              });

            case 80:
              _context3.t17 = _context3.sent;

              _context3.t15.message.call(_context3.t15, _context3.t16, _context3.t17);

            case 82:
              if (!(raft.log.committedIndex < packet.last.committedIndex)) {
                _context3.next = 87;
                break;
              }

              _context3.next = 85;
              return raft.log.getUncommittedEntriesUpToIndex(packet.last.committedIndex, packet.last.term);

            case 85:
              entries = _context3.sent;
              raft.commitEntries(entries);

            case 87:
              return _context3.abrupt("break", 115);

            case 88:
              _context3.next = 90;
              return raft.log.commandAck(packet.data.index, packet.address);

            case 90:
              entry = _context3.sent;

              if (!(raft.quorum(entry.responses.length) && !entry.committed)) {
                _context3.next = 96;
                break;
              }

              _context3.next = 94;
              return raft.log.getUncommittedEntriesUpToIndex(entry.index, entry.term);

            case 94:
              _entries = _context3.sent;
              raft.commitEntries(_entries);

            case 96:
              return _context3.abrupt("break", 115);

            case 97:
              _context3.next = 99;
              return raft.log.get(packet.data.index);

            case 99:
              previousEntry = _context3.sent;
              _context3.next = 102;
              return raft.appendPacket(previousEntry);

            case 102:
              append = _context3.sent;
              write(append);
              return _context3.abrupt("break", 115);

            case 105:
              return _context3.abrupt("break", 115);

            case 106:
              if (!raft.listeners('rpc').length) {
                _context3.next = 110;
                break;
              }

              raft.emit('rpc', packet, write);
              _context3.next = 115;
              break;

            case 110:
              _context3.t18 = write;
              _context3.next = 113;
              return raft.packet('error', 'Unknown message type: ' + packet.type);

            case 113:
              _context3.t19 = _context3.sent;
              (0, _context3.t18)(_context3.t19);

            case 115:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));
    return _packetType.apply(this, arguments);
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
    var lp = findByPlate(plateId);
    listen(plateId, streetId);
    lp.boat = initialize();
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
