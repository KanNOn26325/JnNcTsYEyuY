// 代码生成时间: 2025-09-20 17:46:20
import { writable } from 'svelte/store';

// 定义缓存存储
const cacheStore = writable({});

// 缓存策略类
class CachePolicy {
  // 构造函数
  constructor() {
    this.cache = cacheStore;
  }

  // 设置缓存数据
  set(key, value, ttl = 0) {
    try {
      const now = new Date().getTime();
      const expires = ttl > 0 ? now + ttl : 0;
      this.cache.update((cache) => ({ ...cache, [key]: { value, expires } }));
    } catch (error) {
      console.error('Error setting cache:', error);
    }
  }

  // 获取缓存数据
  get(key) {
    try {
      const cache = this.cache;
      const data = cache();
      const item = data[key];
      if (!item) return null;
      const now = new Date().getTime();
      if (item.expires > 0 && now >= item.expires) {
        // 缓存过期，从缓存中移除
        this.remove(key);
        return null;
      }
      return item.value;
    } catch (error) {
      console.error('Error getting cache:', error);
      return null;
    }
  }

  // 移除缓存数据
  remove(key) {
    try {
      this.cache.update((cache) => {
        const { [key]: omit, ...rest } = cache;
        return rest;
      });
    } catch (error) {
      console.error('Error removing cache:', error);
    }
  }

  // 清除所有缓存数据
  clear() {
    try {
      this.cache.set({});
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  }
}

// 导出缓存策略类和缓存store
export { CachePolicy, cacheStore };
