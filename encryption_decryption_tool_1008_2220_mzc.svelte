// 代码生成时间: 2025-10-08 22:20:51
  import { onMount, writable } from 'svelte/store';
  import { browser } from '$app/environment';
  import CryptoJS from 'crypto-js'; // Assuming CryptoJS library is used for encryption

  // Stores
  const mode = writable('');     // Encryption or Decryption mode
  const inputText = writable('');  // Input text for encryption or decryption
  const encryptedText = writable(''); // Encrypted/Decrypted text
  const key = writable('');      // Encryption key

  // Function to encrypt the input text
  function encryptText() {
    try {
      const encrypted = CryptoJS.AES.encrypt(inputText, key);
      encryptedText.set(encrypted.toString());
    } catch (error) {
      console.error('Encryption failed:', error);
    }
  }

  // Function to decrypt the input text
  function decryptText() {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedText, key);
      const originalText = bytes.toString(CryptoJS.enc.Utf8);
      encryptedText.set(originalText);
    } catch (error) {
      console.error('Decryption failed:', error);
    }
  }

  onMount(() => {
    // Initialization code can be added here if needed
  });
</script>

<!-- UI -->
<div class="container">
  <h2>File Encryption Decryption Tool</h2>

  <div class="mode-selector">
    <label for="encrypt">Encrypt</label>
    <input type="radio" id="encrypt" name="mode" bind:group={mode} value=""/>
    <label for="decrypt">Decrypt</label>
    <input type="radio" id="decrypt" name="mode" bind:group={mode} value="decrypt"/>
  </div>

  <div class="input-section">
    <textarea bind:value={inputText} placeholder="Enter text here..." rows="10" cols="50"></textarea>
  </div>

  <div class="key-section" aria-label="Encryption Key">
    <label for="key">Encryption Key:</label>
    <input type="password" bind:value={key} placeholder="Enter encryption key..." />
  </div>

  <div class="action-buttons">
    <button on:click={() => mode === '' ? encryptText() : decryptText() }>
      {mode === '' ? 'Encrypt' : 'Decrypt'}
    </button>
  </div>

  <div class="output-section" aria-label="Output">
    <textarea bind:value={encryptedText} readonly rows="10" cols="50"></textarea>
  </div>
</div>
