import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),  // Thêm plugin hỗ trợ JSX
    // vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'https://0ea6-2405-4800-1f06-3200-9901-8c6d-f889-94e6.ngrok-free.app',
  //       changeOrigin: true,
  //       secure: false,  // Set to `true` if your backend uses HTTPS properly
  //       rewrite: (path) => path.replace(/^\/api/, ''), // Optional path rewrite
  //     },
  //   }
  // }
})
