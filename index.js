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

// boot
export function space(lane, streetId) {
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

// begin
export function mobile() {
  return new Socket(`wss://simple.fleetgrid.com/socket`)
}

// start
export function ramp(mobile, street) {
  let lane = mobile.channel(`SFM`, {})
  lane.connect()
  
  lane.join()
    .receive("ok", resp => {
      console.log("successfully joined SFM...", resp)
      space(lane, street)
    })
    .receive("error", resp => { console.log("unable to join SFM...", resp) })
  
  return lane
}

// shutdown
export function park(mobile, lane, streetId) {
  console.log('park')
  if (lane) {
    lane.off(`room:${streetId}`)
    lane.leave().receive("ok", () => console.log("exit street... ok"))
  }
  if (mobile) {
    mobile.off("SFM")
    mobile.disconnect(() => console.log("park mobile... ok"))
  }
}

// pass
export function register(lane, streetId, username, password) {
  console.log('pass: ', username)
  credentials = { username, password }
  lane.push('SFS:user_register', { room: streetId, username, password })
}

// ack
export function login(lane, streetId, username, password) {
  console.log('ack: ', username)
  lane.push('SFS:user_login', { room: streetId, username, password })
}

// authentication
export let checkpoint = {
  pass: register,
  ack: login
}

// broadcast
export function radio(lane, streetId, from, message) {
  console.log('broadcast', message)
  lane.push(`room:broadcast`, { room: streetId, payload: { from, message }})
}
