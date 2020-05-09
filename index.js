/*
 * introduction
 */
console.log("WELCOME! WELCOME! WELCOME! thank you for using HT :) ~metaheap.io")

/*
 * includes
 */
import { Socket } from 'phoenix-channels'
import { initialize } from './source/peer.js'

/*
 * script
 */
export let messages = {}
export let credentials = {}
export let defaultLicensePlate = 'ABC' // used for method chaining
export let licensePlates = [
  // {
  //   id: 'ABC',
  //   socket: null,
  //   channel: null,
  //   streetId: null,
  //   key: null,
  //   boat: null
  // }
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
  console.log('mobile: start...')
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

// shorten mobile and lane API with MOVE
export function move(plateId, streetId) {
  mobile(plateId)
  lane(streetId)
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
    // keep these turned off
    msg.log ? console.log(msg.log) : null; // TODO: PONG is leaking here
    // msg.alert ? alert(msg.alert) : null;

    if (msg.payload) {
      messages.set(msg.payload)
    }

    switch (msg.topic) {
      case 'SFS:ping':
        // console.log('SFS:ping', msg)
        console.log('beep: HONK')
        break;
      case 'SFS:raft':
        console.log('auto.packet:', msg.packet)
        let lp = findByPlate(msg.id)
        lp.raft.emit('data', msg.packet)
        break;
      case 'SFS:user_login':
        console.log('checkpoint.ack:', msg)
        localStorage.setItem('token', msg.token)
        // window.location = `/accounts/${msg.username}`
        break;
      case 'SFS:user_register':
        console.log('checkpoint.pass:', msg)
        ack(plateId, credentials.username, credentials.password)
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

// checkpoint / register
export function pass(/* plateId, username, password */) {
  let plateId = ''
  let username = ''
  let password = ''
  if (arguments.length === 3) {
    plateId = arguments[0]
    username = arguments[1]
    password = arguments[2]
  } else {
    plateId = defaultLicensePlate
    username = arguments[0]
    password = arguments[1]
  }
  credentials = { username, password }
  console.log(`checkpoint.pass: register ${username}`)
  let lp = findByPlate(plateId)
  lp.channel.push('SFS:user_register', { room: lp.streetId, username, password })
}

// checkpoint / login
export function ack(/* plateId, username, password */) {
  let plateId = ''
  let username = ''
  let password = ''
  if (arguments.length === 3) {
    plateId = arguments[0]
    username = arguments[1]
    password = arguments[2]
  } else {
    plateId = defaultLicensePlate
    username = arguments[0]
    password = arguments[1]
  }
  console.log(`checkpoint.ack: login ${username}`)
  let lp = findByPlate(plateId)
  lp.channel.push('SFS:user_login', { room: lp.streetId, username, password })
}

// authentication
export let checkpoint = {
  pass,
  ack
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

// keystone
export function key(/* plateId, id */) {
  let plateId = ''
  let id = null
  if (arguments.length === 2) {
    plateId = arguments[0]
    id = arguments[1]
  } else {
    plateId = defaultLicensePlate
    id = arguments[0]
  }
  let i = licensePlates.findIndex((lp) => {
    return lp.id === plateId
  })
  licensePlates[i].key = id
}

/*
 * AUTO
 */
export function init(/* plateId, streetId */) {
  let plateId = ''
  let streetId = null
  if (arguments.length === 2) {
    plateId = arguments[0]
    streetId = arguments[1]
  } else {
    plateId = defaultLicensePlate
    streetId = arguments[0]
  }
  let options = arguments[2] || {}
  let lp = findByPlate(plateId)
  listen(plateId, streetId)
  lp.boat = initialize(lp, options);
  return auto
}

function onRaft(/* plateId, listen, callback */) {
  let plateId = ''
  let listen = null
  let callback = null
  if (arguments.length === 3) {
    plateId = arguments[0]
    listen = arguments[1]
    callback = arguments[2]
  } else {
    plateId = defaultLicensePlate
    listen = arguments[0]
    callback = arguments[1]
  }
  let lp = findByPlate(plateId)
  lp.boat.on(listen, callback)
  return auto
}

function joinRaft(/* plateId, streetId, write */) {
  let plateId = ''
  let streetId = null
  let write = null
  if (arguments.length === 3) {
    plateId = arguments[0]
    streetId = arguments[1]
    write = arguments[2]
  } else {
    plateId = defaultLicensePlate
    streetId = arguments[0]
    write = arguments[1]
  }
  let i = licensePlates.findIndex((lp) => {
    return lp.id === plateId
  })

  licensePlates[i].boat.join(`${plateId}...${streetId}`, write)
  return auto
}

function leaveRaft(/* plateId, streetId, write */) {

}

function commandRaft(/* plateId, json */) {
  let plateId = ''
  let json = null
  if (arguments.length === 2) {
    plateId = arguments[0]
    json = arguments[1]
  } else {
    plateId = defaultLicensePlate
    json = arguments[0]
  }
  let lp = findByPlate(plateId)
  lp.boat.command(json)
  return auto
}

// consensus algorithm
export let auto = {
  init: init,
  on: onRaft,
  join: joinRaft,
  leave: leaveRaft,
  command: commandRaft
}