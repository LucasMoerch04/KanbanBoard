// vitest.config.ts
import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  test: {
    environment: 'jsdom',  // Use jsdom for DOM manipulation
    globals: true,         // Enable global test functions (describe, it, expect)
    css: true,             // Allow CSS handling in tests
  },
  plugins: [vue()], // Include vue plugin to handle .vue files
});
