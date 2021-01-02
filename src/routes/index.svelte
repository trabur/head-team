<svelte:head>
	<title>METAHEAP ::: channels (publish & subscribe)</title>
</svelte:head>

<div class="wrapper">
	<Navigation />
	<Application />
	<WhatCanYou />
	<Platform />
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
	<Contact />
</div>

<script>
	import { onMount, onDestroy } from 'svelte';
	import RunnerWelcome from '../components/RunnerWelcome';
	import Welcome from '$components/Welcome';
	import Navigation from '$components/Navigation';
	import Platform from '$components/Platform';
	import WhatCanYou from '$components/WhatCanYou';
	import Application from '$components/Application';
	import Contact from '$components/Contact';

	import { TYU } from 'object-relational-mapping'
	import Phoenix from 'phoenix'

	onMount(() => {
		// var Socket = require("phoenix").Socket
		var socket = new Phoenix.Socket("wss://printedbasics.gigalixirapp.com/socket")
		let tyu = window.tyu = new TYU(socket)
	
		tyu.users.all(function ({ message }) {
			console.log('users.all :::', message)
		})
	})
</script>