// 代码生成时间: 2025-09-18 03:49:49
  import { onMount, writable } from 'svelte';
  import JSZip from 'jszip';
  import { saveAs } from 'file-saver';

  // State for selected file and files to extract
  const selectedFile = writable(null);
  const filesToExtract = writable([]);

  // Function to read a file and extract content
  async function readFile(file) {
    const zip = new JSZip();
    try {
      const zipContent = await zip.loadAsync(file);
      filesToExtract.set(Object.keys(zipContent.files));
    } catch (error) {
      console.error('Error reading zip file:', error);
      alert('Failed to read zip file.');
    }
  }

  // Function to extract selected files and save them
  function extractFiles() {
    const selectedFileData = selectedFile.get();
    const zip = new JSZip();
    filesToExtract.get().forEach(fileName => {
      zip.file(fileName, zipContent.files[fileName].asNodeBuffer());
    });
    zip.generateAsync({ type: 'blob' }).then((content) => {
      saveAs(content, 'extracted_files.zip');
    });
  }

  onMount(() => {
    // Initialize any required resources
  });
</script>

<!-- UI for the decompression tool -->
<div class="decompression-tool">
  <input type="file" accept=".zip" on:change={(event) => {
    const file = event.target.files[0];
    if (file) {
      readFile(file);
      selectedFile.set(file);
    }
  }} />
  {#if $filesToExtract.length > 0}
    <button on:click={extractFiles}>Extract Selected Files</button>
  {/if}
</div>

<!-- Style for the decompression tool (optional) -->
<style>
  .decompression-tool input, .decompression-tool button {
    margin: 10px;
  }
</style>
