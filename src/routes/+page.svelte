<script lang='ts'>
  /**
   * Submit fetch request with user input as origin header.
   */
  let clientSideHeader = ``; 
  async function handleClientSideFetch (e: SubmitEvent & {
    currentTarget: EventTarget & HTMLFormElement;
  }) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await fetch('/', { headers: 
      { 'origin': formData.get('origin') as string }
    }); 
    const data = await response.json();
    clientSideHeader = data.origin || `none.`;
  }
  
  /**
   * Submit fetch request with user input as body. Server will then make above fetch request using user input as origin header.
   */
  let serverSideHeader = ``; 
  async function handleServerSideFetch (e: SubmitEvent & {
    currentTarget: EventTarget & HTMLFormElement;
  }) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await fetch('/', { 
      method: 'POST', 
      headers: { 'origin': formData.get('origin') as string, 'content-type': 'application/json' }, 
      body: JSON.stringify({ origin: formData.get('origin') })
    }); 
    const data = await response.json();
    serverSideHeader = data.origin || `none.`;
  }
</script>

<div>
  <h2>Client Side Fetch</h2>
  <p>Sends a fetch request with your input below as the origin header. The API listening for this request will check the request for an origin header, and echo back what it saw. The browser disallows JS code to set the origin header because that's very unsafe.</p>
  <form on:submit={handleClientSideFetch}>
    <input type="text" name="origin" placeholder="Origin" />
    <button type="submit">Submit</button>
  </form>
  {#if clientSideHeader}
    <p class="result">The server saw this origin header: {clientSideHeader}</p>
  {/if}
</div>

<br/>

<div>
  <h2>Server Side Fetch</h2>
  <p>Sends a POST request to the server with your input below. The server then does the same thing as the above form, but on the server instead. On the server, you code just runs - there is no browser layer to stop you from setting headers. The response should then reflect what you input.</p>
  <form on:submit={handleServerSideFetch}>
    <input type="text" name="origin" placeholder="Origin" />
    <button type="submit">Submit</button>
  </form>
  {#if serverSideHeader}
    <p class="result">The server saw this origin header: {serverSideHeader}</p>
  {/if}
</div>

<style>
  .result {
    background-color: rgba(0,0,0,0.1);
    font-family: monospace;
    padding: 5px 8px;
  }
</style>