/*
 * introduction
 */
console.log("WELCOME! WELCOME! WELCOME! thank you for using HT :) ~metaheap.io")

/*
 * includes
 */
import { Socket } from 'phoenix'

/*
 * script
 */
export let messages = {}
export let credentials = {}
export let licensePlates = [
  {
    id: null,
    socket: null,
    channel: null,
    streetId: null
  }
]

// PING/PONG
export function beep(transport) {
  console.log(`beep: ${transport.streetId}`)
  transport.channel.push(`SFS:ping`, { room: transport.streetId })
}

// begin socket
export function mobile(plateId) {
  console.log('mobile: enter...')
  let lp = {
    id: plateId,
    socket: new Socket(`wss://simple.fleetgrid.com/socket`)
  }
  licensePlates.push(lp)
  return lp
}

// lane and channel are both same here
export function lane(mobile, streetId) {
  console.log('lane: transporting...')
  mobile.connect()
  let chan = mobile.channel(`SFM`, {})
  
  chan.join()
    .receive("ok", resp => {
      console.log("lane: yield on SFM...", resp)
    })
    .receive("error", resp => { console.log("lane: jam on SFM...", resp) })

  listen({ channel: chan, streetId })


  
  return { channel: chan, streetId }
}

// change lanes by turning
export function turn(transport, streetId) {
  // exit
  console.log(`turn: exit ${transport.streetId}`)
  exit(transport.channel, transport.streetId)
  // enter
  console.log(`turn: enter ${streetId}`)
  listen({ channel: transport.channel, streetId })
}

// listen to events being returned
export function listen({ channel, streetId }) {
  console.log(`listen: ${streetId}`)
  channel && channel.on(`room:${streetId}`, msg => {
    msg.log ? console.log(msg.log) : null;
    msg.alert ? alert(msg.alert) : null;

    if (msg.payload) {
      messages.set(msg.payload)
    }

    switch (msg.topic) {
      case 'SFS:ping':
        // console.log('SFS:ping', msg)
        console.log('beep: HONK')
        break;
      case 'SFS:user_login':
        console.log('SFS:user_login', msg)
        localStorage.setItem('token', msg.token)
        // window.location = `/accounts/${msg.username}`
        break;
      case 'SFS:user_register':
        console.log('SFS:user_register', msg)
        login(channel, streetId, credentials.username, credentials.password)
        credentials = {}
        break;
      default:
        // console.log('hotfix or coldbreak', msg.topic)
        break;
    }
  })
}

// shutdown / unlisten
export function park(mobile, channel, streetId) {
  console.log(`park: ${mobile}`)
  if (channel) {
    channel.off(`room:${streetId}`)
    channel.leave().receive("ok", () => console.log("park: exit street... ok"))
  }
  if (mobile) {
    mobile.off("SFM")
    mobile.disconnect(() => console.log("park: halt mobile... ok"))
  }
}

// exit lane
export function exit(channel, streetId) {
  channel.off(`room:${streetId}`)
  channel.leave().receive("ok", () => console.log("exit: leave lane... ok"))
}

// pass
export function register({ channel, streetId }, username, password) {
  console.log(`checkpoint.pass: register ${username}`)
  credentials = { username, password }
  channel.push('SFS:user_register', { room: streetId, username, password })
}

// ack
export function login({ channel, streetId }, username, password) {
  console.log(`checkpoint.ack: login ${username}`)
  channel.push('SFS:user_login', { room: streetId, username, password })
}

// authentication
export let checkpoint = {
  pass: register,
  ack: login
}

// broadcast
export function radio({ channel, streetId }, from, message) {
  console.log(`radio: ${message}`)
  channel.push(`room:broadcast`, { room: streetId, payload: { from, message }})
}

// turn confusion
export function secret(length, array) { 
  let TCP = ''
  for (let i = length; i > 0; i--) { 
    TCP += array[Math.floor(Math.random() * array.length)]
  }
  return TCP
}