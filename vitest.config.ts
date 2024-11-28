// vitest.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';


export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    server: {
      deps: {
        inline: ['vuetify'],
      },
    }, 
    css: true,            
  },
  plugins: [vue()], 
});
