// import UUID from './uuid.js'

function noop() { return null }

// tooth & gear are tradable like space & time are
// for us gears are high level and teeth are low level
// so we use teeth lingo in code and use gear lingo outside
// gear/gears <-- tooth/teeth --> gear/gears ... cassette
let teeth = [
  // {
  //   id: UUID(),
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
  let amount = arguments.length
  for (let i = 1; i < amount; i++) {
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
export async function rotate(count) {
  // check: do we even need to rotate
  if (count === 0 || count === null) {
    return 0
  }

  let complete = 0 // counter to keep track of the number of times the biggest tooth has rotated
  let first = new Date().getTime() // 10
  let now = new Date().getTime() // 11
  let last = new Date().getTime() // 12
  let offset = now - first // 1 = 11 - 10
  let spin = 0 // counter to keep track of the number of times the smallest tooth has rotated

  // spinning
  do {
    now = new Date().getTime() // 13
    offset = now - last // 1 = 13 - 12

    // find the smallest duration so we can sleep our loop and wake back up when needed
    let tick = smallestDuration(teeth) // 10 ms
    let tock = biggestDuration(teeth) // 100 ms

    // rule: interval gears are executed first
    let intervalGears = filterByType(teeth, 'interval')
    // rule: check if it should run during this spin cycle
    let durationIntervalGears = filterByDuration(intervalGears, now, offset, tick, tock) 
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
    let durationTimeoutGears = filterByDuration(timeoutGears, now, offset, tick, tock) 
    // rule: local functions take priority
    let spacedTimeoutGears = sortByDistance(durationTimeoutGears) 

    // make sure we have at least one tooth
    if (spacedTimeoutGears.length) {
      spacedTimeoutGears.forEach((tooth) => {
        run(tooth)
      })
    }

    spin = spin + 1 // 1 = 0 + 1
    complete = (spin * tick) / tock // 1/10 = (1 * 10) / 100
    last = new Date().getTime() // 14
  } while (complete !== count)

  // finish
  return complete
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

function filterByDuration(teeth, now, offset, tick, tock) {

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

/**
 * ========
 * // everything under this block of code is expiramental
 * ========
 */
// function calculate (gear) {
//   // this method inserts a new gear into the gears array by offsetting
//   // it's placement so that when it hits the top of the stack 
//   // it is able to execute on time.

//   // each gear has a turnAt ... stopAt so the timing can be figured out
//   // for timeout gears: we loop over the stack of gears adding up their
//   // run times. when we reach the end of the stack or the point when
//   // our timeout gear needs to execute --> then we insert.

//   let now = new Date().getTime()

//   // is the stack of gears is empty?
//   if (gears.length === 0) {
//     // add our new gear to it anyways
//     gears.push(gear)
//     return gear
//   }

//   // what type of gear is this?
//   if (gear.type === 'interval') {
//     // put gear right on top of the stack
//     gears.unshift(gear)

//   } else {
//     // this is a timeout gear:
//     // counter keeps track of offset on our stack of gears in ms 
//     // as we loop though it
//     let firstCounter = 0
//     let counter = 0
//     let nextCounter = 0
//     let insertAt = gears.length - 1 // by default insert new gear at the end
//     gears.forEach((value, index) => {
//       // figure out when is this gear going to run, for how long, then tally up counter
//       let distance = getDistance(value)

//       // increase run time offset
//       firstCounter = counter
//       counter = counter + distance

//       // will this gear be in the proper order if inserted here?
//       if (gear.duration <= counter) {
//         // we need this gear to run under the counter so when it executes it is on time
//         // is this index better than the previous insertAt?
//         if (true) {
//           // yes
//           insertAt = index 
//         }
//       }
//     })
    
//     // at position insertAt, remove 0 elements, then add gear to that position
//     gears.splice(insertAt, 0, gear)
//     return gear
//   }
// }

// function getDistance(gear) {
//   let distance = 0
//   if (gear.type === 'interval') {
//     // it's going to run emediately; how long did it take to execute last time?
//     distance = gear.stopAt - gear.turnAt // 12 - 10 = 2
//   } else {
//     // this is a timeout gear:
//     // it's going to run later; how long did it take to execute last time?
//     distance = gear.stopAt - gear.turnAt + gear.duration // 12 - 10 + 1 = 3
//   }
//   return distance
// }

// async function offset(gear) {
//   let now = new Date().getTime()
//   let when = now - gear.turnAt + gear.duration // 11 - 10 + 1 = 2
//   if (when <= 0) {
//     // it needs to run now // false
//     return execute(gear)
//   } else {
//     // it needs to run later // true
//     await sleep(when)
//     return execute(gear)
//   }
// }

// export default function run() {
//   // every time we insert a new gear into the system we make sure
//   // it is in the proper order by run time.

//   // calling this method will loop through our gears array.
//   // after grabbing the first gear off the top of the stack run
//   // will then decide if it needs to execute it's function right
//   // now or create a setTimeout and then execute it later.
  
//   // if turnAt is set to null that means look at the type
//   // timeout: we wait for the given duration then run emidiately and finish
//   // interval: we run emidiately and then again after the given duration

//   // rule: place interval gears before timeout gears

//   // when run decides to shift a gear it will log turnAt,
//   // then execute, and then log stopAt.

//   // after a gear has been shifted off the top of the stack run
//   // will then loop back around to the --> next --> gear ... 
//   // calculate // execute and repeat

//   // start with one gear at a time.
//   let first = gears[0]
//   // have we been here before?
//   if (first.turn === null) {
//     // this gear has never been turned before
//     if (first.type === 'interval') {
//       // execute it emediately
//       let gear = execute(first)
//       // add our new gear to the bottom
//       gears.push(gear)
//       // remove first gear from the top
//       gears = gears.slice(1)
//       // again
//       return gear
//     } else {
//       // this is a timeout gear:
//       if (first.turnAt === null) {
//         // it needs to run now if not sooner
//         return execute(first)
//       } else {
//         // it might need to run later or maybe now
//         return offset(first)
//       }
//     }
//   } else {
//     // this gear has been turned before
//     return offset(first)
//   }
// }