// 代码生成时间: 2025-10-06 02:05:25
  // CDNContentDelivery.svelte component
  import { onMount } from 'svelte';

  // CDN service URLs
  const cdnUrls = {
    'jsdelivr': 'https://cdn.jsdelivr.net/npm/',
    'unpkg': 'https://unpkg.com/'
  };

  // State to store selected CDN
  let selectedCdn = 'jsdelivr';
  let packageName = '';
  let packageVersion = '';
  let cdnLink = '';
  let error = null;

  // Function to update CDN link based on selected CDN, package name and version
  function updateCdnLink() {
    if (!packageName) {
      error = 'Package name is required.';
      cdnLink = '';
      return;
    }
    if (!packageVersion) {
      error = 'Package version is required.';
      cdnLink = '';
      return;
    }
    try {
      error = null;
      cdnLink = `${cdnUrls[selectedCdn]}${packageName}@${packageVersion}`;
    } catch (e) {
      error = 'Failed to generate CDN link.';
      cdnLink = '';
    }
  }

  // Event handler for when the component mounts
  onMount(() => {
    updateCdnLink();
  });
</script>

<!-- Template for the CDN Content Delivery tool -->
<div class="cdn-content-delivery">
  <h1>CDN Content Delivery Tool</h1>
  <p>Choose a CDN provider and enter package details to generate a CDN link.</p>

  <!-- CDN provider selection dropdown -->
  <label for="cdn-provider">CDN Provider:</label>
  <select id="cdn-provider" bind:value={selectedCdn} on:change={updateCdnLink}>
    {#each cdnUrls as value, key}
      <option value={key}>{key}</option>
    {/each}
  </select>

  <!-- Package name input field -->
  <label for="package-name">Package Name:</label>
  <input id="package-name" type="text" bind:value={packageName} placeholder="Enter package name" on:input={updateCdnLink} />

  <!-- Package version input field -->
  <label for="package-version">Package Version:</label>
  <input id="package-version" type="text" bind:value={packageVersion} placeholder="Enter package version" on:input={updateCdnLink} />

  <!-- Display the generated CDN link -->
  <div>
    <label for="cdn-link">CDN Link:</label>
    <input id="cdn-link" type="text" value={cdnLink} readonly />
  </div>

  <!-- Display any error messages -->
  {#if error}
    <p class="error">{error}</p>
  {/if}
</div>

<style>
  /* Basic styles for the CDN Content Delivery tool */
  .cdn-content-delivery {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }

  label,
  input,
  select {
    display: block;
    margin-bottom: 10px;
  }

  .error {
    color: red;
  }
</style>
