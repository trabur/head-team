<svelte:head>
	<title>dashbaord ::: METAHEAP</title>
</svelte:head>

<div class="wrapper">
	<Navigation token={token} />
  <br />
  <br />
  <br />
  <div class="row">
    <div class="col s12 m1"></div>
    <div class="col s12 m10">
      <h1 style="font-size: 3em; font-weight: 700; margin: 0;">Welcome to METAHEAP</h1>
      <p style="font-size: 1.6em; font-weight: 700; margin: 0;">Choose a product below to get started.</p>
    </div>
    <div class="col s12 m1"></div>
  </div>
  <br />
  <br />
  <br />
</div>

<script>
  import { onMount, onDestroy } from 'svelte';
	import Navigation from '$components/Navigation';

  let token;

	onMount(() => {
    token = localStorage.getItem('token')
    
    // jump to login if not authenticated
    if (!token) {
      window.location = '/login'
    }
	})
</script>