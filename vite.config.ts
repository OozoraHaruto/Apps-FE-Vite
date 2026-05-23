import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Web Awesome ships icons and other assets in dist/assets.
// We copy them into /assets/ so setBasePath('/assets') can find them.
export default defineConfig({
  plugins: [
    react()
  ],
  build: {
    target: ['chrome88', 'edge88', 'firefox78', 'safari14'],
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('@web.awesome.me/webawesome-pro')) return 'webawesome'
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router')) return 'react'
          if (id.includes('node_modules/')) return 'vendor'
        },
      },
    },
  },
})
