import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/e1vibe/',
  plugins: [react()],
  server: {
    port: 5180,
    strictPort: true,
    proxy: {
      '/api/news': {
        target: 'https://news.google.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/news/, '/rss/search')
      },
      '/api/opinet': {
        target: 'https://www.opinet.co.kr',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/opinet/, '/api')
      },
      '/api/accuweather': {
        target: 'http://dataservice.accuweather.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/accuweather/, '')
      }
    }
  }
})
