console.log("WELCOME! WELCOME! WELCOME! thank you for using HT :) ~metaheap.io")

import { Socket } from 'phoenix'

export let messages = {}
export let credentials = {};

export function boot(channel, roomId) {
  channel.on && channel.on(`room:${roomId}`, msg => {
    msg.log ? console.log(msg.log) : null;
    msg.alert ? alert(msg.alert) : null;

    if (msg.payload) {
      messages.set(msg.payload)
    }

    switch (msg.topic) {
      case 'SFS:user_login':
        console.log('SFS:user_login', msg)
        localStorage.setItem('token', msg.token)
        // window.location = `/accounts/${msg.username}`
        break;
      case 'SFS:user_register':
        console.log('SFS:user_register', msg)
        login(channel, roomId, credentials.username, credentials.password)
        credentials = {}
        break;
      case 'SFS:employee_companies':
        console.log('SFS:employee_companies', msg)
        // employeeCompanies.set(msg)
        break;
      default:
        console.log('hotfix or coldbreak', msg.topic)
        break;
    }
  })

  return channel
}

export function begin() {
  // production or development?
  if (window.location.host == 'localhost:3000') {
    return new Socket(`ws://localhost:4000/socket`)
  } else {
    return new Socket(`wss://simple.${window.location.host}/socket`)
  }
}

export function start(socket, slug) {
  let channel = socket.channel(`SFM`, {})
  socket.connect()
  
  channel.join()
    .receive("ok", resp => {
      console.log("Joined SFM successfully.", resp)
      boot(channel, slug)
    })
    .receive("error", resp => { console.log("Unable to join SFM.", resp) })
  
  return channel
}

export function shutdown(socket, channel, roomId) {
  console.log('shutdown')
  if (channel) {
    channel.off(`room:${roomId}`)
    channel.leave().receive("ok", () => console.log("Channel leave... ok"))
  }
  if (socket) {
    socket.off("SFM")
    socket.disconnect(() => console.log("Socket disconnect... ok"))
  }
}

export function login(channel, roomId, username, password) {
  console.log('login', username)
  channel.push('SFS:user_login', { room: roomId, username, password })
}

export function register(channel, roomId, username, password) {
  console.log('register', username)
  credentials = { username, password }
  channel.push('SFS:user_register', { room: roomId, username, password })
}

export function broadcast(channel, roomId, from, message) {
  console.log('broadcast', message)
  channel.push(`room:broadcast`, { room: roomId, payload: { from, message }})
}
