import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/naver': {
        target: 'https://openapi.naver.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/naver/, '')
      },
      '/api/opinet': {
        target: 'http://www.opinet.co.kr',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/opinet/, '')
      }
    }
  }
})
