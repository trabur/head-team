<svelte:head>
	<title>METAHEAP ::: TYU67</title>
</svelte:head>

<div class="wrapper">
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
	<Platform />
	<WhatCanYou />
</div>

<script>
	// import { onMount, onDestroy } from 'svelte';
	import RunnerWelcome from '../components/RunnerWelcome';
	import Welcome from '$components/Welcome';
	import Navigation from '$components/Navigation';
	import Platform from '$components/Platform';
	import WhatCanYou from '$components/WhatCanYou';

</script>