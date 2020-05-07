// import UUID from './uuid.js'

function noop() { return null }

// tooth & gear are tradable like space & time are
// for us gears are high level and teeth are low level
// so we use teeth lingo in code and use gear lingo outside
// gear/gears <-- tooth/teeth --> gear/gears ... cassette
let teeth = [
  // {
  //   id: UUID(),
  //   gearId: UUID(), // cassette
  //   type: 'interval' || 'timeout',
  //   function: noop(),
  //   duration: 100, // ms
  //   turnAt: null, // new Date(), // start
  //   isActive: null,              // bite: true/false
  //   stopAt: null, // new Date(), // finish
  //   distance: 1,                 // result
  // }
]

// do run then delay while forever
export function setInterval(name, fn, interval) {

}

// do set a delay run then finish
export function setTimeout(name, fn, timeout) {

}

// remove one or more teeth
export function clear(/* name, name, ... */) {
  let amount = arguments.length - 1
  for (let i = 0; i <= amount; i++) {
    let remove = arguments[i]
    let index = findIndexById(remove)
    delete teeth[index]
  }
}

// check to see if a tooth is active
export function active(name) {
  return findById(name).isActive
}

// realign a tooth
export function adjust(name, duration) {
  let index = findIndexById(name)
  let tooth = teeth[index]
  tooth.duration = duration
  teeth[index] = tooth
  return tooth
}

// make sure every tooth in the teeth array is fired at least once as per rotation
export async function rotate(/* amount */) {
  let amount = arguments[0] || 0
  // check: do we even need to rotate
  if (amount === 0) {
    return { spin: 0, turn: 0 }
  }

  let spin = 0 // counter to keep track of the number of times the smallest tooth has rotated
  let turn = 0 // counter to keep track of the number of times the biggest tooth has rotated
  let first = new Date().getTime() // 10
  let now = new Date().getTime() // 11
  let last = new Date().getTime() // 12
  let offset = now - first // 1 = 11 - 10

  // rotation
  do {
    now = new Date().getTime() // 13
    offset = now - last // 1 = 13 - 12

    // find the smallest duration so we can sleep our loop and wake back up when needed
    let tick = smallestDuration(teeth) // 10 ms
    let tock = biggestDuration(teeth) // 100 ms

    // rule: interval gears are executed first
    let intervalGears = filterByType(teeth, 'interval')
    // rule: check if it should run during this spin cycle
    let durationIntervalGears = filterByDuration(intervalGears, offset, spin, turn, tick, tock) 
    // rule: local functions take priority
    let spacedIntervalGears = sortByDistance(durationIntervalGears) 

    // make sure we have at least one tooth
    if (spacedIntervalGears.length) {
      spacedIntervalGears.forEach((tooth) => {
        run(tooth)
      })
    }

    //
    // sleep
    //
    await sleep(tick) // setTimeout()

    // rule: timeout gears are executed second
    let timeoutGears = filterByType(teeth, 'timeout')
    // rule: check if it should run during this spin cycle
    let durationTimeoutGears = filterByDuration(timeoutGears, offset, spin, turn, tick, tock) 
    // rule: local functions take priority
    let spacedTimeoutGears = sortByDistance(durationTimeoutGears) 

    // make sure we have at least one tooth
    if (spacedTimeoutGears.length) {
      spacedTimeoutGears.forEach((tooth) => {
        run(tooth)
      })
    }

    spin = spin + 1 // 1 = 0 + 1
    turn = (spin * tick) / tock // 1/10 = (1 * 10) / 100
    last = new Date().getTime() // 14
  } while (turn !== amount)

  // finish
  return { spin: spin, turn: turn }
}

// manually execute a tooth
export function run(name) {
  let tooth = findById(name)
  return execute(tooth)
}

// Sort numerically because default is lexicographical sort:
// [3, 8, -10, 23, 19, -4, -14, 27].sort((a,b)=>a-b)
// Output: Array(8)  [ -14, -10, -4, 3, 8, 19, 23, 27 ]
function sortByDistance(teeth) {
  return teeth.sort((a, b) => {
    return a.distance - b.distance
  })
}

function filterByType(teeth, type) {
  return teeth.filter((tooth) => {
    return tooth.type === type
  })
}

function filterByDuration(teeth, offset, spin, turn, tick, tock) {
  // first: 10       // ms from start
  // now: 11         // ms this instant
  // spin: 1         // small rotation
  // turn: .1        // large rotation
  // tick: 10        // spin sleep cycle in ms
  // tock: 100       // turn sleep cycle in ms

  // offset is how long it's been sense the last time around
  // tooth.duration is how long we want this tooth to sleep for
  // we want to find every tooth that fits within this time frame
  // between: now and the next time around
  return teeth.filter((tooth) => {
    return tick <= (offset + tooth.duration) <= tock // if true then tooth will run
  })
}

function smallestDuration(teeth) {
  let tick = Infinity
  teeth.forEach((tooth) => {
    if (tooth.duration < tick) {
      tick = tooth.duration
    }
  })
  return tick
}

function biggestDuration(teeth) {
  let tock = 0
  teeth.forEach((tooth) => {
    if (tooth.duration > tock) {
      tock = tooth.duration
    }
  })
  return tock
}

// this private method looks through the teeth array and returns
// the tooth that matches the given name
function findById(name) {
  let index = findIndexById(name)
  return teeth[index]
}

// this private method supports findById at a lower level
function findIndexById(name) {
  let index = teeth.findIndex((tooth) => {
    return tooth.id === name
  })
  return index
}

// if there is nothing left to do for some time we'll just wait
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// this private method supports run at a lower level
function execute(bite) {
  bite.isActive = true
  bite.turnAt = new Date().getTime() // 10
  update(bite)
  bite.function()                    // 11
  bite.stopAt = new Date().getTime() // 12
  bite.isActive = false
  bite.distance = bite.stopAt - bite.turnAt // 12 - 10 = 2
  update(bite)
  return bite
}

// this private method keeps the teeth array up to date
function update(gear) {
  let index = findIndexById(gear.id)
  teeth[index] = gear
}