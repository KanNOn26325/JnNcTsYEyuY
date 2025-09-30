// 代码生成时间: 2025-10-01 03:02:56
// version_control_system.svelte
// A simple version control system using JS and Svelte framework

<script>
  // State to hold the current version data
  export let currentVersion = '';

  // State to hold the commit history
  let commitHistory = [];

  // Function to add a commit to the version history
  function addCommit(version) {
    if (!version.trim()) {
      throw new Error('Commit message is required');
    }
    commitHistory.push({ version: version, timestamp: new Date().toISOString() });
    currentVersion = version;
  }

  // Function to revert to a previous version
  function revertToPreviousVersion(versionId) {
    if (versionId < 0 || versionId >= commitHistory.length) {
      throw new Error('Invalid version ID');
    }
    const targetVersion = commitHistory[versionId].version;
    currentVersion = targetVersion;
  }
</script>

<main>
  <h1>Version Control System</h1>

  <label for="commitInput">Commit Message:</label>
  <input type="text" id="commitInput" bind:value={currentVersion} placeholder="Enter commit message" />

  <button on:click={addCommit}>Commit Changes</button>

  <h2>Commit History</h2>
  <ul>
    {#each commitHistory as entry, index}
      <li>
        <strong>Version {index + 1}:</strong> {entry.version} - {entry.timestamp}
        <button on:click={() => revertToPreviousVersion(index)}>Revert</button>
      </li>
    {/each}
  </ul>
</main>
