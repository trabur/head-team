(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('phoenix')) :
  typeof define === 'function' && define.amd ? define(['exports', 'phoenix'], factory) :
  (global = global || self, factory(global.ht = {}, global.phoenix));
}(this, (function (exports, phoenix) { 'use strict';

  console.log("WELCOME! WELCOME! WELCOME! thank you for using HT :) ~metaheap.io");

  let messages = {};
  exports.credentials = {};

  function boot(channel, roomId) {
    channel.on && channel.on(`room:${roomId}`, msg => {
      msg.log ? console.log(msg.log) : null;
      msg.alert ? alert(msg.alert) : null;

      if (msg.payload) {
        messages.set(msg.payload);
      }

      switch (msg.topic) {
        case 'SFS:user_login':
          console.log('SFS:user_login', msg);
          localStorage.setItem('token', msg.token);
          // window.location = `/accounts/${msg.username}`
          break;
        case 'SFS:user_register':
          console.log('SFS:user_register', msg);
          login(channel, roomId, exports.credentials.username, exports.credentials.password);
          exports.credentials = {};
          break;
        case 'SFS:employee_companies':
          console.log('SFS:employee_companies', msg);
          // employeeCompanies.set(msg)
          break;
        default:
          console.log('hotfix or coldbreak', msg.topic);
          break;
      }
    });

    return channel
  }

  function begin() {
    // production or development?
    if (window.location.host == 'localhost:3000') {
      return new phoenix.Socket(`ws://localhost:4000/socket`)
    } else {
      return new phoenix.Socket(`wss://simple.${window.location.host}/socket`)
    }
  }

  function start(socket, slug) {
    let channel = socket.channel(`SFM`, {});
    socket.connect();
    
    channel.join()
      .receive("ok", resp => {
        console.log("Joined SFM successfully.", resp);
        boot(channel, slug);
      })
      .receive("error", resp => { console.log("Unable to join SFM.", resp); });
    
    return channel
  }

  function shutdown(socket, channel, roomId) {
    console.log('shutdown');
    if (channel) {
      channel.off(`room:${roomId}`);
      channel.leave().receive("ok", () => console.log("Channel leave... ok"));
    }
    if (socket) {
      socket.off("SFM");
      socket.disconnect(() => console.log("Socket disconnect... ok"));
    }
  }

  function login(channel, roomId, username, password) {
    console.log('login', username);
    channel.push('SFS:user_login', { room: roomId, username, password });
  }

  function register(channel, roomId, username, password) {
    console.log('register', username);
    exports.credentials = { username, password };
    channel.push('SFS:user_register', { room: roomId, username, password });
  }

  function broadcast(channel, roomId, from, message) {
    console.log('broadcast', message);
    channel.push(`room:broadcast`, { room: roomId, payload: { from, message }});
  }

  exports.begin = begin;
  exports.boot = boot;
  exports.broadcast = broadcast;
  exports.login = login;
  exports.messages = messages;
  exports.register = register;
  exports.shutdown = shutdown;
  exports.start = start;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
