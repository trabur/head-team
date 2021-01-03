
<div class="platform">
  <div class="card teal" style="margin: 0;">
    <div class="card-content">
      <br />
      <br />
      <br />
      <span class="card-title">
        <h1 style="text-align: center; margin: 1em 0 0.5em 0; line-height: 1em; font-size: 2em; font-weight: bold;">METAHEAP</h1>
        <h2 style="text-align: center;">a high performance Real-Time system<br />with (publish & subscribe) channels.</h2>
        <div style="text-align: center; max-width: 750px; margin: 0 auto;">
          {#if token}
            <a href={`/dashboard`} style="margin: 0.2em; height: 3.6em;" class="waves-effect waves-light black-text red lighten-2 btn-large">DASHBOARD</a>
          {:else}
            <a href={`/login`} style="margin: 0.2em; height: 3.6em;" class="waves-effect waves-light black-text red lighten-2 btn-large">LOGIN</a>
            <a href={`/register`} style="margin: 0.2em; height: 3.6em;" class="waves-effect waves-light black-text red lighten-2 btn-large">REGISTER</a>
          {/if}
        </div>
      </span>
      <br />
      <br />
      <br />        
    </div>
  </div>
</div>

<script>
  export let token;
</script>