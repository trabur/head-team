const Tick = require('tick-tock') // https://www.npmjs.com/package/tick-tock
const Events = require('events')
const ms = require('millisecond')

// Generate a somewhat unique UUID.
// stackoverflow.com/q/105034
function UUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function gen(c) {
    var random = Math.random() * 16 | 0
      , value = c !== 'x'
        ? (random & 0x3 | 0x8)
        : random

    return value.toString(16)
  })
}

/*
 * A Raft can be in only one of the various states. The stopped state is not
 * something that is part of the Raft protocol but something we might want to
 * use internally while we're starting or shutting down our node. The following
 * states are generated:
 *
 * - STOPPED:   Assume we're dead.
 * - LEADER:    We're selected as leader process.
 * - CANDIDATE: We want to be promoted to leader.
 * - FOLLOWER:  We're just following a leader.
 * - CHILD:     A node that has been added using JOIN.
 */
export let states = 'STOPPED,LEADER,CANDIDATE,FOLLOWER,CHILD'.split(',')
let os = {} // operating state
for (let s = 0; s < states.length; s++) {
  os[states[s]] = s
}
// Emit when modifications are made.
const change = require('modification')(' change')
// A nope function for when people don't want message acknowledgements. Because
// they don't care about CAP.
function nope() {}
export let lp = ''
export let election = {
  min: ms('150 ms'),
  max: ms('300 ms')
}
export let beat = ms('50 ms')
export let votes = {
  for: null, // Who did we vote for in this current term.
  granted: 0 // How many votes we're granted to us.
}
export let threshold = 0.8
export let address = UUID()
export let tock = new Tick({})
export let events = new Events.EventEmitter()
export let latency = 0
export let log = null
export let nodes = []
export let state = os.FOLLOWER // Our current state.
export let leader = '' // Leader in our cluster.
export let term = 0 // Our current term.

export function initialize (licensePlate, options) {
  let that = this
  lp = licensePlate

  // Reset our vote as we're starting a new term. Votes only last one term.
  this.events.on('term change', () => {
    that.votes.for = null
    that.votes.granted = 0
  })

  // Reset our times and start the heartbeat again. If we're promoted to leader
  // the heartbeat will automatically be broadcasted to users as well.
  this.events.on('state change', (state) => {
    that.tock.clear('heartbeat, election')
    that.heartbeat(os.LEADER === that.state ? that.beat : that.timeout())
    that.events.emit(that.states[state].toLowerCase())
  })

  // Receive incoming messages and process them.
  this.events.on('data', async (packet, write) => {
    write = write || nope
    let reason;

    if ('object' !== this.type(packet)) {
      reason = 'Invalid packet received'
      that.events.emit('error', new Error(reason))

      return write(await that.packet('error', reason))
    }

    // Applies to all states. If a response contains a higher term then our
    // current term need to change our state to FOLLOWER and set the received
    // term.
    //
    // If the raft receives a request with a stale term number it should be
    // rejected.
    if (packet.term > that.term) {
      change({
        leader: os.LEADER === packet.state ? packet.address : packet.leader || that.leader,
        state: os.FOLLOWER,
        term: packet.term
      });
    } else if (packet.term < that.term) {
      reason = 'Stale term detected, received `'+ packet.term +'` we are at '+ that.term
      that.events.emit('error', new Error(reason))

      return write(that.packet('error', reason))
    }

    // If we receive a message from someone who claims to be leader and shares
    // our same term while we're in candidate mode we will recognize their
    // leadership and return as follower.
    //
    // If we got this far we already know that our terms are the same as it
    // would be changed or prevented above.
    if (os.LEADER === packet.state) {
      if (os.FOLLOWER !== that.state) {
        change({ state: os.FOLLOWER })
      }
      if (packet.address !== that.leader) {
        change({ leader: packet.address })
      }

      // Always when we receive a message from the Leader we need to reset our heartbeat.
      that.heartbeat(that.timeout())
    }

    packetType(that, packet, write)
  })

  return this
}

function on (listen, callback) {

}

function join (address, write) {
  let { plateId, streetId } = splitAddress(address)

}

function leave (address) {
  let { plateId, streetId } = splitAddress(address)

}

// saves command to log and replicates to followers
function command(command) {
  // TODO: save entry to log
  const entry = { command, term: this.term }

  const appendPacket = this.appendPacket(entry)
  this.message(this.FOLLOWER, appendPacket)
}

function write(address, packet, callback) {
  let { plateId, streetId } = splitAddress(address)

  this.lp.channel.push('SFS:raft', {
    plateId,
    room: streetId,
    packet
  })
  callback()
}

// who: LEADER, FOLLOWER, CHILD
// what: the data we need to send
// when: completion callback
function message(who, what, when) {
  when = when || nope

  let length = this.nodes.length
  let nodes = []
  let i = 0
  switch (who) {
    case this.LEADER: 
      for (; i < length; i++) {
        if (this.leader === this.nodes[i].address) {
          nodes.push(this.nodes[i])
        }
      }
      break;
    case this.FOLLOWER:
      for (; i < length; i++) {
        if (this.leader !== this.nodes[i].address) {
          nodes.push(this.nodes[i])
        }
      }
      break;
    case this.CHILD:
      Array.prototype.push.apply(nodes, this.nodes)
      break;
    default:
      for (; i < length; i++) {
        if (who === this.nodes[i].address) {
          nodes.push(this.nodes[i])
        }
      }
      break;
  }

  i = 0
  for (; i < nodes.length; i++) {
    this.write(nodes[i], what)
  }
}

function appendPacket (entry) {
  // TODO: grab most recent entry from log
  const last = {}
  return {
    state: this.state,     // Are we're a leader, candidate or follower.
    term: this.term,       // Our current term so we can find mis matches.
    address: this.address, // Address of the sender.
    type: 'append',        // Append message type.
    leader:  this.leader,  // Who is our leader.
    data: [entry],         // The command to send to the other nodes
    last,
  }
}

// Wrap the outgoing messages in an object with additional required data.
function packet(type, data) {
  let that = this
  let wrapped = {
    state:   that.state,    // Are we're a leader, candidate or follower.
    term:    that.term,     // Our current term so we can find mis matches.
    address: that.address,  // Address of the sender.
    type:    type,          // Message type.
    leader:  that.leader,   // Who is our leader.
  }

  // If we have logging and state replication enabled we also need to send this
  // additional data so we can use it determine the state of this raft.
  //
  // if (that.log) wrapped.last = {}; TODO: grab most recent entry from log
  if (arguments.length === 2) wrapped.data = that

  return wrapped
}

async function packetType(raft, packet, write) {
  let that = this
  switch (packet.type) {
    // A raft asked us to vote on them. We can only vote to them if they
    // represent a higher term (and last log term, last log index).
    case 'vote':
      // The term of the vote is bigger then ours so we need to update it. If
      // it's the same and we already voted, we need to deny the vote.
      if (raft.votes.for && raft.votes.for !== packet.address) {
        raft.emit('vote', packet, false)

        return write(await raft.packet('voted', { granted: false }))
      }

      // If we maintain a log, check if the candidates log is as up to date as
      // ours.
      if (raft.log) {
        const { index, term } = await raft.log.getLastInfo()

        if (index > packet.last.index && term > packet.last.term) {
          raft.emit('vote', packet, false)

          return write(await raft.packet('voted', { granted: false }))
        }
      }

      // We've made our decision, we haven't voted for this term yet and this
      // candidate came in first so it gets our vote as all requirements are
      // met.
      raft.votes.for = packet.address
      raft.emit('vote', packet, true)
      raft.change({ leader: packet.address, term: packet.term })
      write(await raft.packet('voted', { granted: true }))

      // We've accepted someone as potential new leader, so we should reset
      // our heartbeat to prevent this raft from timing out after voting.
      // Which would again increment the term causing us to be next CANDIDATE
      // and invalidates the request we just got, so that's silly willy.
      raft.heartbeat(raft.timeout())
      break;

    // A new incoming vote.
    case 'voted':
      // Only accepts votes while we're still in a CANDIDATE state.
      if (os.CANDIDATE !== raft.state) {
        return write(await raft.packet('error', 'No longer a candidate, ignoring vote'))
      }

      // Increment our received votes when our voting request has been
      // granted by the raft that received the data.
      if (packet.data.granted) {
        raft.votes.granted++
      }

      // Check if we've received the minimal amount of votes required for this
      // current voting round to be considered valid.
      if (raft.quorum(raft.votes.granted)) {
        raft.change({ leader: raft.address, state: os.LEADER })

        // Send a heartbeat message to all connected clients.
        raft.message(os.FOLLOWER, await raft.packet('append'))
      }

      // Empty write, nothing to do.
      write()
      break;

    case 'error':
      raft.emit('error', new Error(packet.data))
      break;

    case 'append':
      const {term, index} = await raft.log.getLastInfo()

      // We do not have the last index as our last entry
      // Look back in log in case we have it previously
      // if we do remove any bad uncommitted entries following it
      if (packet.last.index !== index && packet.last.index !== 0) {
        const hasIndex = await raft.log.has(packet.last.index)

        if (hasIndex) {
          raft.log.removeEntriesAfter(packet.last.index)
        } else {
          return raft.message(
            os.LEADER, 
            await raft.packet('append fail', {
              term: packet.last.term,
              index: packet.last.index
            })
          )  
        } 
      }

      if (packet.data) {
        const entry = packet.data[0]
        await raft.log.saveCommand(entry.command, entry.term, entry.index)

        raft.message(os.LEADER, await raft.packet('append ack', {
          term: entry.term,
          index: entry.index
        }))
      }

      // if packet commit index not the same. Commit commands
      if (raft.log.committedIndex < packet.last.committedIndex) {
        const entries = await raft.log.getUncommittedEntriesUpToIndex(packet.last.committedIndex, packet.last.term)
        raft.commitEntries(entries)
      }
      break;

    case 'append ack':
      const entry = await raft.log.commandAck(packet.data.index, packet.address)
      if (raft.quorum(entry.responses.length) && !entry.committed) {
        const entries = await raft.log.getUncommittedEntriesUpToIndex(entry.index, entry.term)
        raft.commitEntries(entries);
      }
      break;

    case 'append fail':
      const previousEntry = await raft.log.get(packet.data.index)
      const append = await raft.appendPacket(previousEntry)
      write(append)
      break;

    // RPC command
    case 'exec':
      break;

    // Unknown event, we have no idea how to process this so we're going to
    // return an error.
    default:
      if (raft.listeners('rpc').length) {
        raft.emit('rpc', packet, write)
      } else {
        write(await raft.packet('error', 'Unknown message type: ' + packet.type))
      }
  }
}

// Start or update the heartbeat of the Raft. If we detect that we've received
// a heartbeat timeout we will promote our selfs to a candidate to take over the
// leadership.
function heartbeat(duration) {
  let that = this
  duration = duration || that.beat

  if (that.timers.active('heartbeat')) {
    that.timers.adjust('heartbeat', duration)

    return that
  }

  that.timers.setTimeout('heartbeat', async () => {
    if (os.LEADER !== that.state) {
      that.emit('heartbeat timeout')

      return that.promote()
    }

    // According to the raft spec we should be sending empty append requests as
    // heartbeat. We want to emit an event so people can modify or inspect the
    // payload before we send it. It's also a good indication for when the
    // idle state of a LEADER as it didn't get any messages to append/commit to
    // the FOLLOWER'S.
    let packet = await that.packet('append')

    that.emit('heartbeat', packet)
    that.message(os.FOLLOWER, packet).heartbeat(that.beat)
  }, duration)

  return that
}

// Generate the various of timeouts.
function timeout() {
  let times = this.election

  return Math.floor(Math.random() * (times.max - times.min + 1) + times.min)
}

// in this system address is a combination of two keys
function splitAddress(address) {
  address = address.split('...') 
  return {
    plateId: address[0],
    streetId: address[1]
  }
}

// Proper type checking.
function type(of) {
  return Object.prototype.toString.call(of).slice(8, -1).toLowerCase()
}