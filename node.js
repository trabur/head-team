(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('phoenix-channels')) :
  typeof define === 'function' && define.amd ? define(['exports', 'phoenix-channels'], factory) :
  (global = global || self, factory(global.ht = {}, global.Socket));
}(this, (function (exports, phoenixChannels) { 'use strict';

  /*
   * introduction
   */
  console.log("WELCOME! WELCOME! WELCOME! thank you for using HT :) ~metaheap.io");

  /*
   * script
   */

  var that = undefined;
  exports.credentials = {};
  exports.defaultLicensePlate = 'ABC'; // used for method chaining

  var licensePlates = [] // {
  //   id: 'ABC',
  //   socket: null,
  //   channel: null,
  //   streetId: null,
  //   key: null,   // pointer
  //   value: null, // store
  //   findCallbacks: [
  //     {
  //       id: lp.key,
  //       fun: cb 
  //     }
  //   ],
  //   postCallbacks: [],
  //   boat: null
  // }
  // find license plate
;
  function findPlate(plateId) {
    var i = findPlateIndex(plateId);
    return licensePlates[i];
  } // find license plate index

  function findPlateIndex(plateId) {
    var i = licensePlates.findIndex(function (lp) {
      return lp.id === plateId;
    });
    return i;
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

    var lp = findPlate(plateId);
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
      socket: new phoenixChannels.Socket("wss://simple.fleetgrid.com/socket"),
      postCallbacks: [],
      findCallbacks: []
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
    var lp = findPlate(plateId);
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

    var lp = findPlate(plateId); // exit

    console.log("turn: exit ".concat(lp.streetId));
    exit(lp.channel, lp.streetId); // enter

    console.log("turn: enter ".concat(streetId));
    listen(plateId, streetId);
    return this;
  } // listen to events being returned

  function listen(plateId, streetId) {
    console.log("listen: ".concat(streetId));
    var lp = findPlate(plateId);
    var i = findPlateIndex(plateId);
    licensePlates[i].streetId = streetId; // for lane and turn

    lp.channel && lp.channel.on("room:".concat(streetId), function (msg) {
      // keep these turned off
      msg.log ? console.log('log', msg.log) : null; // msg.alert ? alert(msg.alert) : null;

      switch (msg.topic) {
        case 'SFS:ping':
          // console.log('SFS:ping', msg)
          console.log('beep: HONK');
          break;

        case 'SFS:public_get':
          console.log('SFS:public_get', msg);
          licensePlates.forEach(function (licensePlate) {
            licensePlate.findCallbacks.forEach(function (findCallback, index) {
              if (findCallback.id === msg.key) {
                findCallback.fun(msg);
                licensePlate.findCallbacks.splice(index, 1);
              }
            });
          });
          break;

        case 'SFS:public_set':
          console.log('SFS:public_set', msg);
          licensePlates.forEach(function (licensePlate) {
            licensePlate.postCallbacks.forEach(function (postCallback, index) {
              if (postCallback.id === msg.key) {
                postCallback.fun(msg);
                licensePlate.postCallbacks.splice(index, 1);
              }
            });
          });
          break;

        case 'SFS:raft':
          console.log('auto.packet:', msg.packet);

          var _lp = findPlate(msg.id);

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
    var lp = findPlate(plateId);
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
    var lp = findPlate(plateId);
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
  } // pointer

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

    var i = findPlateIndex(plateId);
    licensePlates[i].key = id;
    return this;
  } // store

  function value()
  /* plateId, temp */
  {
    var plateId = '';
    var temp = null;

    if (arguments.length === 2) {
      plateId = arguments[0];
      temp = arguments[1];
    } else {
      plateId = exports.defaultLicensePlate;
      temp = arguments[0];
    }

    var i = findPlateIndex(plateId);
    licensePlates[i].value = temp;
    return this;
  }
  /*
   * AUTO
   */
  // export function init(/* plateId, streetId */) {
  //   let plateId = ''
  //   let streetId = null
  //   if (arguments.length === 2) {
  //     plateId = arguments[0]
  //     streetId = arguments[1]
  //   } else {
  //     plateId = defaultLicensePlate
  //     streetId = arguments[0]
  //   }
  //   let options = arguments[2] || {}
  //   let lp = findPlate(plateId)
  //   listen(plateId, streetId)
  //   lp.boat = initialize(lp, options);
  //   return auto
  // }
  // function onRaft(/* plateId, listen, callback */) {
  //   let plateId = ''
  //   let listen = null
  //   let callback = null
  //   if (arguments.length === 3) {
  //     plateId = arguments[0]
  //     listen = arguments[1]
  //     callback = arguments[2]
  //   } else {
  //     plateId = defaultLicensePlate
  //     listen = arguments[0]
  //     callback = arguments[1]
  //   }
  //   let lp = findPlate(plateId)
  //   lp.boat.on(listen, callback)
  //   return auto
  // }
  // function joinRaft(/* plateId, streetId, write */) {
  //   let plateId = ''
  //   let streetId = null
  //   let write = null
  //   if (arguments.length === 3) {
  //     plateId = arguments[0]
  //     streetId = arguments[1]
  //     write = arguments[2]
  //   } else {
  //     plateId = defaultLicensePlate
  //     streetId = arguments[0]
  //     write = arguments[1]
  //   }
  //   let i = findPlateIndex(plateId)
  //   licensePlates[i].boat.join(`${plateId}...${streetId}`, write)
  //   return auto
  // }
  // function leaveRaft(/* plateId, streetId, write */) {
  // }
  // function commandRaft(/* plateId, json */) {
  //   let plateId = ''
  //   let json = null
  //   if (arguments.length === 2) {
  //     plateId = arguments[0]
  //     json = arguments[1]
  //   } else {
  //     plateId = defaultLicensePlate
  //     json = arguments[0]
  //   }
  //   let lp = findPlate(plateId)
  //   lp.boat.command(json)
  //   return auto
  // }
  // // consensus algorithm
  // export let auto = {
  //   init: init,
  //   on: onRaft,
  //   join: joinRaft,
  //   leave: leaveRaft,
  //   command: commandRaft
  // }

  /*
   * FRONTEND LOOP
   */

  function find()
  /* plateId, cb */
  {
    var cb = null;

    if (arguments.length === 2) {
      cb = arguments[1];
    } else {
      cb = arguments[0];
    }

    var lp = findPlate(exports.defaultLicensePlate);
    lp.findCallbacks.push({
      id: lp.key,
      fun: cb
    });
    lp.channel.push("SFS:public_get", {
      room: lp.streetId,
      key: lp.key
    });
    return that;
  }
  function post()
  /* plateId, cb */
  {
    var cb = null;

    if (arguments.length === 2) {
      cb = arguments[1];
    } else {
      cb = arguments[0];
    }

    var lp = findPlate(exports.defaultLicensePlate);
    lp.postCallbacks.push({
      id: lp.key,
      fun: cb
    });
    lp.channel.push("SFS:public_set", {
      room: lp.streetId,
      key: lp.key,
      // word
      value: lp.value,
      // definition
      echo: true // return back

    });
    return that;
  }
  var highway = {
    find: find,
    post: post
  };
  function get() {}
  function put() {}
  var driveway = {
    get: get,
    put: put
  };

  exports.ack = ack;
  exports.beep = beep;
  exports.checkpoint = checkpoint;
  exports.driveway = driveway;
  exports.exit = exit;
  exports.find = find;
  exports.findPlate = findPlate;
  exports.findPlateIndex = findPlateIndex;
  exports.get = get;
  exports.highway = highway;
  exports.key = key;
  exports.lane = lane;
  exports.licensePlates = licensePlates;
  exports.listen = listen;
  exports.mobile = mobile;
  exports.move = move;
  exports.pass = pass;
  exports.post = post;
  exports.put = put;
  exports.radio = radio;
  exports.secret = secret;
  exports.turn = turn;
  exports.value = value;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
