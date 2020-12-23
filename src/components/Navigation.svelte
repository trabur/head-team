

<nav class="">
  <div class="nav-wrapper">
    <ul class="left hide-on-med-and-down">
      <li><a href="#" on:click={() => instance.open()} data-target="slide-out"><i class="material-icons">menu</i></a></li>
    </ul>
    <a href="/" class="brand-logo">METAHEAP</a>
    <ul class="right hide-on-med-and-down">
      <li><a href="/login"><i class="material-icons">circle</i></a></li>
      <li><a href="/register"><i class="material-icons">network_cell</i></a></li>
      <li><a href="/pricing"><i class="material-icons">grid_on</i></a></li>
      {#if pub === ''}
      {:else}
      {/if}
    </ul>
  </div>
</nav>


<ul id="main" class="sidenav">
  <li>
    <h5 style="text-align: center;">METAHEAP</h5>
  </li>
  <!-- <li><a href="#!"><i class="material-icons">cloud</i>First Link With Icon</a></li>
  <li><a href="#!">Second Link</a></li>
  <li><div class="divider"></div></li>
  <li><a class="subheader">Subheader</a></li> -->
  <li><a class="waves-effect" href="/" on:click={() => instance.close()}>Welcome</a></li>
  <li><a class="waves-effect" href="https://travis-burandt.gitbook.io/docs/" target="_blank" on:click={() => instance.close()}>Documentation</a></li>
  <li><a class="waves-effect" href="https://github.com/trabur/object-relational-mapping" target="_blank" on:click={() => instance.close()}>TypeScript Library</a></li>
  <li><a class="waves-effect" href="https://github.com/trabur/tyu-command-line" target="_blank" on:click={() => instance.close()}>Command Line Interface</a></li>
  <li><a class="waves-effect" href="/terms-and-conditions" on:click={() => instance.close()}>Terms & Conditions</a></li>
  <li><a class="waves-effect" href="/privacy-policy" on:click={() => instance.close()}>Privacy Policy</a></li>
</ul>

<script>
  import {onMount, onDestroy} from 'svelte';

  let username = '';
  let pub = '';

  let instance;
  // sidebar opts
  let options = {
    edge: 'left'
  }

	onMount(() => {
    var elem = document.querySelector('#main');
    instance = M.Sidenav.init(elem, options);
    // console.log('instance', instance)
  })
</script>