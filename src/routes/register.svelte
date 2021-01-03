<svelte:head>
	<title>Register ::: METAHEAP</title>
</svelte:head>

<Navigation />
<div style="height: 100%; width: 100%;">
  <div style="width: 100%; min-height: 100%; background: #eee;">
    <br />
    <br />
    <br />
    <br />
    <br />
    <div class="row">
      <div class="col s12 m4"></div>
      <div class="col s12 m4">
        <h1 style="margin: 0; text-align: center;">Register</h1>
        <div class="card" style="padding: 1em;">
          <div class="row">
            <div class="input-field col s12">
              <input id="email" type="text" bind:value={email}>
              <label for="email">Email</label>
            </div>
            <div class="input-field col s12">
              <input id="username" type="text" bind:value={username}>
              <label for="username">Username</label>
            </div>
            <div class="input-field col s12">
              <input id="password" type="password" bind:value={secretPassword}>
              <label for="password">Secret Password</label>
            </div>
            <div class="input-field col s12">
              <input id="passwordConfirm" type="password" bind:value={confirmPassword}>
              <label for="passwordConfirm">Confirm Password</label>
            </div>
            <br />
            <button style="margin-left: 1em;" class="waves-effect btn" on:click={() => auth()}>Submit</button>
          </div>
        </div>
        <div style="text-align: right;">
          <a href="/login" class="waves-effect red lighten-2 btn">LOGIN</a>
        </div>
      </div>
      <div class="col s12 m4"></div>
    </div>
  </div>
</div>

<script>
	import Navigation from '$components/Navigation';
	import { onMount, onDestroy } from 'svelte';

	import { TYU } from 'object-relational-mapping'
  import Phoenix from 'phoenix'

	let email = '';
	let username = '';
	let secretPassword = '';
	let confirmPassword = '';
	let lostYourKey = false;

	function auth() {
    if (email === '') return alert('Email must be defined.')
    if (username === '') return alert('Username must be defined.')
    if (secretPassword === '') return alert('Secret Password must be defined.')
    if (confirmPassword === '') return alert('Confirm Password must be defined.')
    if (secretPassword !== confirmPassword) {
      alert('The value of Secret Password must be the same as the value of Confirm Password.')
      return;
    }

		var socket = new Phoenix.Socket("wss://printedbasics.gigalixirapp.com/socket")
    let tyu = window.tyu = new TYU(socket)
    
    tyu.users.register(email, username, confirmPassword, function ({ message }) {
      if (message.error) return alert(message.reason)
      console.log('users.register :::', message)

      localStorage.setItem('token', message.token)
      window.location.href = `/profile/${message.account.id}`
    })
  }
</script>