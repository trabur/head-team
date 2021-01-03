<svelte:head>
	<title>Logout ::: METAHEAP</title>
</svelte:head>

<script>
  localStorage.removeItem('token')
  window.location.href = `/`
</script>