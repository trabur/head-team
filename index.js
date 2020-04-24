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

// PING/PONG
export function beep(transport) {
  console.log(`beep: ${transport.streetId}`)
  transport.lane.push(`SFS:ping`, { room: transport.streetId })
}

// begin socket
export function mobile() {
  console.log('mobile: enter...')
  return new Socket(`wss://simple.fleetgrid.com/socket`)
}

// start channel
export function lane(mobile, streetId) {
  console.log('lane: transporting...')
  mobile.connect()
  let l = mobile.channel(`SFM`, {})
  
  l.join()
    .receive("ok", resp => {
      console.log("lane: yield on SFM...", resp)
    })
    .receive("error", resp => { console.log("lane: jam on SFM...", resp) })
  
  return { lane: l, streetId }
}

// change lanes by turning
export function turn(transport, streetId) {
  // exit
  console.log(`turn: exit ${transport.streetId}`)
  exit(transport.lane, transport.streetId)
  // enter
  console.log(`turn: enter ${streetId}`)
  let laneChange = listen({ lane: transport.lane, streetId })

  return { lane: laneChange, streetId }
}

// listen to events being returned
export function listen({ lane, streetId }) {
  console.log(`listen: ${streetId}`)
  lane && lane.on(`room:${streetId}`, msg => {
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
        login(lane, streetId, credentials.username, credentials.password)
        credentials = {}
        break;
      default:
        // console.log('hotfix or coldbreak', msg.topic)
        break;
    }
  })

  return lane
}

// shutdown / unlisten
export function park(mobile, lane, streetId) {
  console.log(`park: ${mobile}`)
  if (lane) {
    lane.off(`room:${streetId}`)
    lane.leave().receive("ok", () => console.log("park: exit street... ok"))
  }
  if (mobile) {
    mobile.off("SFM")
    mobile.disconnect(() => console.log("park: halt mobile... ok"))
  }
}

// exit lane
export function exit(lane, streetId) {
  lane.off(`room:${streetId}`)
  lane.leave().receive("ok", () => console.log("exit: leave lane... ok"))
}

// pass
export function register({ lane, streetId }, username, password) {
  console.log(`checkpoint.pass: register ${username}`)
  credentials = { username, password }
  lane.push('SFS:user_register', { room: streetId, username, password })
}

// ack
export function login({ lane, streetId }, username, password) {
  console.log(`checkpoint.ack: login ${username}`)
  lane.push('SFS:user_login', { room: streetId, username, password })
}

// authentication
export let checkpoint = {
  pass: register,
  ack: login
}

// broadcast
export function radio({ lane, streetId }, from, message) {
  console.log(`radio: ${message}`)
  lane.push(`room:broadcast`, { room: streetId, payload: { from, message }})
}

// turn confusion
export function secret(length, array) { 
  let TCP = ''
  for (let i = length; i > 0; i--) { 
    TCP += array[Math.floor(Math.random() * array.length)]
  }
  return TCP
}