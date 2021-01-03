<svelte:head>
	<title>dashbaord ::: METAHEAP</title>
</svelte:head>

<div class="wrapper">
	<Navigation token={token} />
  hello dashboard
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