// 代码生成时间: 2025-09-19 19:06:40
import { onMount } from 'svelte';
import sanitizeHtml from 'sanitize-html';

// 一个简单的Svelte组件，用于演示XSS攻击防护
export default function XssProtectionComponent({ userInput }) {
  // 将用户提供的输入进行清理，以避免XSS攻击
  const cleanInput = sanitizeHtml(userInput, {
    // 允许的标签列表
    allowedTags: ['b', 'i', 'u', 'p', 'strong', 'em'],
    // 允许的属性列表
    allowedAttributes: {
      '*': ['style'],
      'a': ['href', 'name', 'target']
    },
    // 允许的样式属性列表
    allowedStyles: {
      '*': ['color', 'font-size', 'font-family']
    },
    // 转义标签，而不是移除
    exclusiveFilter: function(frame) {
      // 如果标签不在允许的标签列表中，转义标签而不是移除它们
      return (frame.tag === 'iframe' || frame.tag === 'script') ? false : frame;
    }
  });

  // 组件挂载时打印清理后的输入
  onMount(() => {
    console.log('Cleaned Input:', cleanInput);
  });

  // Svelte模板
  return {
    // 显示清理后的输入
    cleanInput
  };
}

// 用法：
// <script>
//   import XssProtectionComponent from './xss_protection_svelte.js';
// </script>
// <XssProtectionComponent {userInput="$userInput"/>
