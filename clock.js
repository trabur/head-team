// import UUID from './uuid.js'

function noop() { return null }

let gearId = null // active gear
let gears = [
  // {
  //   id: UUID(),
  //   type: 'interval' || 'timeout',
  //   function: noop(),
  //   duration: 100, // ms
  //   turnAt: null, // new Date(), // start
  //   stopAt: null, // new Date() // finish
  // }
]

export function setInterval(name, fn, interval) {

}

export function setTimeout(name, fn, timeout) {

}

export function clear(/* gear, gear, ... */) {
  let amount = arguments.length
  for (let index = 1; index < amount; index++) {
    let remove = arguments[index]

  }
}

export function active(name) {
  return gearId === name
}

export function adjust(name, duration) {

}

export function findById(gearId) {
  let i = gears.findIndex((g) => {
    return g.id === gearId
  })
  return gears[i]
}

function calculate (gear) {
  // this method inserts a new gear into the gears array by offsetting
  // it's placement so that when it hits the top of the stack 
  // it is able to execute on time.

  // each gear has a turnAt ... stopAt so the timing can be figured out
  // for timeout gears: we loop over the stack of gears adding up their
  // run times. when we reach the end of the stack or the point when
  // our timeout gear needs to execute --> then we insert.

  let now = new Date().getTime()

  // is the stack of gears is empty?
  if (gears.length === 0) {
    // add our new gear to it anyways
    gears.push(gear)
    return gear
  }

  // what type of gear is this?
  if (gear.type === 'interval') {
    // put gear right on top of the stack
    gears.unshift(gear)

  } else {
    // this is a timeout gear:
    // counter keeps track of offset on our stack of gears in ms 
    // as we loop though it
    let firstCounter = 0
    let counter = 0
    let nextCounter = 0
    let insertAt = gears.length - 1 // by default insert new gear at the end
    gears.forEach((value, index) => {
      // figure out when is this gear going to run, for how long, then tally up counter
      let distance = getDistance(value)

      // increase run time offset
      firstCounter = counter
      counter = counter + distance

      // will this gear be in the proper order if inserted here?
      if (gear.duration <= counter) {
        // we need this gear to run under the counter so when it executes it is on time
        // is this index better than the previous insertAt?
        if () {
          // yes
          insertAt = index 
        }
      }
    })
    
    // at position insertAt, remove 0 elements, then add gear to that position
    gears.splice(insertAt, 0, gear)
    return gear
  }
}

function getDistance(gear) {
  let distance = 0
  if (gear.type === 'interval') {
    // it's going to run emediately; how long did it take to execute last time?
    distance = gear.stopAt - gear.turnAt // 12 - 10 = 2
  } else {
    // this is a timeout gear:
    // it's going to run later; how long did it take to execute last time?
    distance = gear.stopAt - gear.turnAt + gear.duration // 12 - 10 + 1 = 3
  }
  return distance
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function execute(gear) {
  gearId = gear.id
  gear.turnAt = new Date().getTime()
  gear.function()
  gear.stopAt = new Date().getTime()
  return gear
}

async function offset(gear) {
  let now = new Date().getTime()
  let when = now - gear.turnAt + gear.duration // 11 - 10 + 1 = 2
  if (when <= 0) {
    // it needs to run now // false
    return execute(gear)
  } else {
    // it needs to run later // true
    await sleep(when)
    return execute(gear)
  }
}

export default function run() {
  // every time we insert a new gear into the system we make sure
  // it is in the proper order by run time.

  // calling this method will loop through our gears array.
  // after grabbing the first gear off the top of the stack run
  // will then decide if it needs to execute it's function right
  // now or create a setTimeout and then execute it later.
  
  // if turnAt is set to null that means look at the type
  // timeout: we wait for the given duration then run emidiately and finish
  // interval: we run emidiately and then again after the given duration

  // rule: place interval gears before timeout gears

  // when run decides to shift a gear it will log turnAt,
  // then execute, and then log stopAt.

  // after a gear has been shifted off the top of the stack run
  // will then loop back around to the --> next --> gear ... 
  // calculate // execute and repeat

  // start with one gear at a time.
  let first = gears[0]
  // have we been here before?
  if (first.turn === null) {
    // this gear has never been turned before
    if (first.type === 'interval') {
      // execute it emediately
      let gear = execute(first)
      // add our new gear to the bottom
      gears.push(gear)
      // remove first gear from the top
      gears = gears.slice(1)
      // again
      return gear
    } else {
      // this is a timeout gear:
      if (first.turnAt === null) {
        // it needs to run now if not sooner
        return execute(first)
      } else {
        // it might need to run later or maybe now
        return offset(first)
      }
    }
  } else {
    // this gear has been turned before
    return offset(first)
  }
}