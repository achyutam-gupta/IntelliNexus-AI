import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/jira': {
        target: 'https://ailearning2026.atlassian.net',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/jira/, ''),
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req) => {
            // Remove custom header so Jira doesn't see it
            proxyReq.removeHeader('x-target-url');
          });
          proxy.on('error', (err) => {
            console.error('[Jira Proxy Error]', err.message);
          });
        }
      }
    }
  }
});
