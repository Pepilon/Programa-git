
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080/powergym',
        changeOrigin: true,
        secure: false,
        cookiePathRewrite: {
          '/powergym': '/',
        },
      },
    },
  },
})
