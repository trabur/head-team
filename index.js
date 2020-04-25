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
export let defaultLicensePlate = 'ABC' // used for method chaining
export let licensePlates = [
  {
    id: null,
    socket: null,
    channel: null,
    streetId: null
  }
]

// search license plates
export function findByPlate(plateId) {
  let i = licensePlates.findIndex((lp) => {
    return lp.id === plateId
  })
  return licensePlates[i]
}

// PING/PONG
export function beep(/* plateId */) {
  let plateId = ''
  if (arguments.length === 1) {
    plateId = arguments[0]
  } else {
    plateId = defaultLicensePlate
  }
  let lp = findByPlate(plateId)
  console.log(`beep: ${lp.streetId}`)

  lp.channel.push(`SFS:ping`, { room: lp.streetId })
  return this
}

// begin socket
export function mobile(plateId) {
  console.log('mobile: enter...')
  defaultLicensePlate = plateId
  let lp = {
    id: plateId,
    socket: new Socket(`wss://simple.fleetgrid.com/socket`)
  }
  licensePlates.push(lp)
  return this
}

// lane and channel are both same here
export function lane(/* plateId, streetId */) {
  let plateId = ''
  let streetId = ''
  if (arguments.length === 2) {
    plateId = arguments[0]
    streetId = arguments[1]
  } else {
    plateId = defaultLicensePlate
    streetId = arguments[0]
  }
  console.log('lane: transporting...')
  let lp = findByPlate(plateId)

  lp.socket.connect()
  let chan = lp.socket.channel(`SFM`, {})
  
  chan.join()
    .receive("ok", resp => {
      console.log("lane: yield on SFM...", resp)
    })
    .receive("error", resp => { console.log("lane: jam on SFM...", resp) })

  lp.channel = chan

  listen(plateId, streetId)
  return this
}

// change lanes by turning
export function turn(/* plateId, streetId */) {
  let plateId = ''
  let streetId = ''
  if (arguments.length === 2) {
    plateId = arguments[0]
    streetId = arguments[1]
  } else {
    plateId = defaultLicensePlate
    streetId = arguments[0]
  }
  let lp = findByPlate(plateId)

  // exit
  console.log(`turn: exit ${lp.streetId}`)
  exit(lp.channel, lp.streetId)
  // enter
  console.log(`turn: enter ${streetId}`)
  listen(plateId, streetId)
  return this
}

// listen to events being returned
export function listen(plateId, streetId) {
  console.log(`listen: ${streetId}`)
  let lp = findByPlate(plateId)
  let i = licensePlates.findIndex((lp) => {
    return lp.id === plateId
  })
  licensePlates[i].streetId = streetId // for lane and turn

  lp.channel && lp.channel.on(`room:${streetId}`, msg => {
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
export function exit(channel, streetId) {
  channel.off(`room:${streetId}`)
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