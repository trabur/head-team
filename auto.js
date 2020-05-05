const Tick = require('tick-tock') // https://www.npmjs.com/package/tick-tock
const Events = require('events')
const ms = require('millisecond')

function nope() {}
export let nodes = []
export let state = ''
export let term = ''
export let address = ''
export let leader = ''
export let lp = ''
export let tock = new Tick(this)
export let events = new Events.EventEmitter()
export let election = {
  min: ms('150 ms'),
  max: ms('300 ms')
}
export let votes = {
  for: null,
  granted: 0
}

export function init (licensePlate, options) {
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
    that.heartbeat(that.LEADER === that.state ? that.beat : that.timeout())
    that.events.emit(that.states[state].toLowerCase())
  })

  // Receive incoming messages and process them.
  this.events.on('data', async (packet, write) => {
    write = write || nope;
    var reason;

    if ('object' !== this.type(packet)) {
      reason = 'Invalid packet received';
      that.events.emit('error', new Error(reason));

      return write(await that.packet('error', reason));
    }
  })


  return this
}

function join (address, write) {
  let { plateId, streetId } = splitAddress(address)

}

function leave (address) {
  let { plateId, streetId } = splitAddress(address)

}

function on (listen, callback) {

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
  when = when || nope;

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

// saves command to log and replicates to followers
function command(command) {
  // TODO: save entry to log
  const entry = { command, term: this.term }

  const appendPacket = this.appendPacket(entry)
  this.message(this.FOLLOWER, appendPacket)
}

function appendPacket (entry) {
  // TODO: grab most recent entry from log
  const last = {};
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
  };

  //
  // If we have logging and state replication enabled we also need to send this
  // additional data so we can use it determine the state of this raft.
  //
  // if (that.log) wrapped.last = {}; TODO: grab most recent entry from log
  if (arguments.length === 2) wrapped.data = that;

  return wrapped;
}

// Generate the various of timeouts.
function timeout() {
  var times = this.election;

  return Math.floor(Math.random() * (times.max - times.min + 1) + times.min);
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
  return Object.prototype.toString.call(of).slice(8, -1).toLowerCase();
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
export let states = 'STOPPED,LEADER,CANDIDATE,FOLLOWER,CHILD'.split(',');
for (var s = 0; s < states.length; s++) {
  this[states[s]] = s;
}