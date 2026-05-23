import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Web Awesome ships icons and other assets in dist/assets.
// We copy them into /assets/ so setBasePath('/assets') can find them.
export default defineConfig({
  plugins: [
    react()
  ],
})
