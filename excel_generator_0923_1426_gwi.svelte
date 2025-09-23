// 代码生成时间: 2025-09-23 14:26:43
// excel_generator.svelte
// A Svelte component that generates an Excel file based on user input.

<script>
  import SheetJS from 'xlsx';
  import { writable } from 'svelte/store';

  // Store to hold the user's data input
  const userData = writable([]);

  // Function to generate Excel file
  function generateExcel() {
    try {
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.aoa_to_sheet(userData());
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      const wbout = XLSX.write(wb, { type: 'binary', bookType: 'xlsx' });

      // Create a Blob object with the Excel file content
      const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });

      // Create a link to download the Excel file
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'generated_excel.xlsx';
      link.click();
    } catch (error) {
      console.error('Error generating Excel file:', error);
    }
  }

  // Helper function to convert string to ArrayBuffer
  function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) {
      view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
  }
</script>

<!-- UI for inputting data and generating the Excel file -->
<main>
  <h1>Excel Generator</h1>
  <input type="text" placeholder="Enter data, comma-separated" on:input="userData.set(event.target.value.split(/,\s*/))"/>
  <button on:click="generateExcel">Generate Excel</button>
</main>

<!-- Styling for the component -->
<style>
  main {
    text-align: center;
    padding: 2rem;
  }
  input, button {
    margin: 1rem;
    padding: 0.5rem;
    font-size: 1rem;
  }
</style>