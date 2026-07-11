import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // '/' — custom domain (webfixxies.me) so no subdirectory prefix needed
  base: '/',
  build: {
    outDir: 'dist',
    // Generate sourcemaps for production debugging (can disable for smaller builds)
    sourcemap: false,
    // Chunk size warning threshold
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('three')) return 'three';
          if (id.includes('@react-three')) return 'react-three';
          if (id.includes('framer-motion')) return 'motion';
          if (id.includes('react-icons')) return 'icons';
        },
      },
    },
  },
})
