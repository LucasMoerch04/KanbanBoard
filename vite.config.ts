import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify' // Import Vuetify plugin


// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vuetify()],
  base: '/KanbanBoard/',
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
  },
})