<svelte:head>
	<title>Login ::: METAHEAP</title>
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
        <h1 style="margin: 0; text-align: center;">Log in</h1>
        <div class="card" style="padding: 1em;">
          <div class="row">
            <div class="input-field col s12">
              <input id="username" type="text" class="validate" bind:value={username}>
              <label for="username">Username</label>
            </div>
            <div class="input-field col s12">
              <input id="password" type="password" class="validate" bind:value={password}>
              <label for="password">Password</label>
            </div>
            <br />
            <button style="margin-left: 1em;" type='submit' class="waves-effect btn" on:click={() => auth()}>Submit</button>
          </div>
        </div>
        <div style="text-align: right;">
          <a href="/register" class="waves-effect red lighten-2 btn">REGISTER</a>
        </div>
      </div>
      <div class="col s12 m4"></div>
    </div>
  </div>
</div>

<script>
	import Navigation from '$components/Navigation';
	import { onMount, onDestroy } from 'svelte';

	let username = '';
	let password = '';
	let lostYourKey = false;

	function auth() {
    if (username === '') return alert('Username must be defined.')
    if (password === '') return alert('Password must be defined.')

    let gun = new Gun(['https://gunjs.herokuapp.com/gun']);
    var user = gun.user().recall({sessionStorage: true});
    
		user.auth(username, password, (ack) => {
			console.log('ack', ack)
      if (ack.err) return alert(ack.err)
      
      window.location.href = `/profile/${username}#id=${ack.sea.pub}`
		})
  }
</script>