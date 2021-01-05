<svelte:head>
	<title>channels (publish & subscribe) ::: METAHEAP</title>
</svelte:head>

<div class="wrapper">
	<Navigation token={token} />
	<Application token={token} />
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
	<Contact token={token} />
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

	import { ORM } from 'object-relational-mapping'
	import Phoenix from 'phoenix'

	let token = null

	onMount(() => {
		var socket = new Phoenix.Socket("wss://printedbasics.gigalixirapp.com/socket")
		let orm = window.orm = new ORM(socket)
	
		// orm.users.all(function ({ message }) {
		// 	console.log('users.all :::', message)
		// })

		token = localStorage.getItem('token')
	})
</script>