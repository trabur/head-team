(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('phoenix-channels'), require('liferaft')) :
  typeof define === 'function' && define.amd ? define(['exports', 'phoenix-channels', 'liferaft'], factory) :
  (global = global || self, factory(global.ht = {}, global.Phoenix, global.Raft));
}(this, (function (exports, phoenixChannels, Raft) { 'use strict';

  Raft = Raft && Object.prototype.hasOwnProperty.call(Raft, 'default') ? Raft['default'] : Raft;

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

  var Boat = Raft.extend({
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
