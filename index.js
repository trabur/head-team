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

// begin
export function mobile() {
  console.log('enter mobile...')
  return new Socket(`wss://simple.fleetgrid.com/socket`)
}

// start
export function lane(mobile, street) {
  console.log('lane: transporting...')
  mobile.connect()
  let road = mobile.channel(`SFM`, {})
  
  road.join()
    .receive("ok", resp => {
      console.log("lane: yielding ramp SFM...", resp)
      move(lane, street)
    })
    .receive("error", resp => { console.log("lane: jammed ramp SFM...", resp) })
  
  return road
}

// boot
export function move(lane, streetId) {
  console.log('moving...')
  lane.on && lane.on(`room:${streetId}`, msg => {
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
        login(lane, streetId, credentials.username, credentials.password)
        credentials = {}
        break;
      default:
        console.log('hotfix or coldbreak', msg.topic)
        break;
    }
  })

  return lane
}

// shutdown
export function park(mobile, lane, streetId) {
  console.log('parking...')
  if (lane) {
    lane.off(`room:${streetId}`)
    lane.leave().receive("ok", () => console.log("park: exit street... ok"))
  }
  if (mobile) {
    mobile.off("SFM")
    mobile.disconnect(() => console.log("lane: halt mobile... ok"))
  }
}

// pass
export function register(lane, streetId, username, password) {
  console.log('passing...', username)
  credentials = { username, password }
  lane.push('SFS:user_register', { room: streetId, username, password })
}

// ack
export function login(lane, streetId, username, password) {
  console.log('acking...', username)
  lane.push('SFS:user_login', { room: streetId, username, password })
}

// authentication
export let checkpoint = {
  pass: register,
  ack: login
}

// broadcast
export function radio(lane, streetId, from, message) {
  console.log('broadcasting...', message)
  lane.push(`room:broadcast`, { room: streetId, payload: { from, message }})
}
