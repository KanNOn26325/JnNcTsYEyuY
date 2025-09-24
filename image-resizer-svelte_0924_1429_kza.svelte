// 代码生成时间: 2025-09-24 14:29:44
  // 导入Svelte组件和必要的库
  import { onMount, writable } from 'svelte/store';
  import { browser } from '$app/env';
  import Resizer from './resizer.js';

  // 状态存储
  const imageList = writable([]);
  const selectedSize = writable('');
  const maxSize = writable(1024);
  const resizedImages = writable([]);
  const error = writable(null);

  // 函数：添加图片
  function addImage(files) {
    const images = Array.from(files).map(file => ({
      name: file.name,
      file: file,
      preview: URL.createObjectURL(file)
    }));
    imageList.update(list => [...list, ...images]);
  }

  // 函数：选择尺寸
  function selectSize(size) {
    selectedSize.set(size);
  }

  // 函数：调整图片尺寸
  async function resizeImages() {
    try {
      resizedImages.set([]);
      const selectedSize = this.selectedSize;
      const maxSize = this.maxSize;
      for (const image of imageList) {
        const resized = await Resizer.resizeImage(image.file, selectedSize, maxSize);
        resizedImages.update(list => [...list, resized]);
      }
    } catch (e) {
      error.set(e.message);
    }
  }

  // 函数：清除错误信息
  function clearError() {
    error.set(null);
  }

  // 组件挂载时初始化
  onMount(() => {
    // 可以在这里执行一些初始化操作，例如加载配置等
  });
</script>

<!-- UI部分 -->
<div class="image-resizer">
  <!-- 文件选择器 -->
  <input type="file" multiple accept="image/*" on:change={(event) => addImage(event.target.files)} />

  <!-- 预览图片列表 -->
  <div class="previews">
    {#each $imageList as image}
      <img src="{image.preview}" alt="{image.name}" />
    {/each}
  </div>

  <!-- 尺寸选择器 -->
  <select bind:value={selectedSize} on:change={() => resizeImages()} class="size-selector">
    <option value="">Select Size</option>
    <option value="small">Small</option>
    <option value="medium">Medium</option>
    <option value="large">Large</option>
  </select>

  <!-- 最大尺寸输入框 -->
  <input type="number" bind:value={maxSize} min="1" class="max-size-input" />

  <!-- 调整图片按钮 -->
  <button on:click={resizeImages} class="resize-button">Resize Images</button>

  <!-- 错误信息显示 -->
  {#if $error}
    <p class="error-message">{$error}</p>
    <button on:click={clearError} class="clear-error">Clear Error</button>
  {/if}

  <!-- 已调整尺寸的图片列表 -->
  <div class="resized-previews">
    {#each $resizedImages as resizedImage}
      <img src="{resizedImage.preview}" alt="Resized Image" />
    {/}
  </div>
</div>