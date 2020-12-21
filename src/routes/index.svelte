<svelte:head>
	<title>METAHEAP ::: TYU67</title>
</svelte:head>

<Navigation />
<br />
<br />
<br />
<div class="row">
  <div class="col s12 m2"></div>
  <div class="col s12 m8">
    <Welcome />
    <RunnerWelcome />
  </div>
  <div class="col s12 m2"></div>
</div>
<br />
<br />
<br />

<script>
	// import { onMount, onDestroy } from 'svelte';
	import RunnerWelcome from '../components/RunnerWelcome';
	import Welcome from '$components/Welcome';
	import Navigation from '$components/Navigation';

	// onMount(() => {
  //   // let gun = new Gun(['https://gunjs.herokuapp.com/gun']);
	// 	// let user = gun.user();
	// 	// user.recall({ sessionStorage: true }, (user) => {
	// 	// 	console.log('hello,', user.put.alias)
	// 	// 	console.log(user)
	// 	// 	username = user.put.alias
	// 	// 	pub = user.put.pub
	// 	// })

  //   // google analytics
  //   gtag('config', 'UA-161516824-1', {
  //     'page_path': window.location.pathname
  //   });
	// })
</script>