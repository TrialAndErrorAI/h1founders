import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    // Enable bundle analysis when needed
    // visualizer({
    //   filename: 'dist/stats.html',
    //   open: false,
    //   gzipSize: true,
    //   brotliSize: false,
    // })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('firebase')) {
            return 'firebase';
          }
          if (id.includes('react') && !id.includes('router')) {
            return 'react';
          }
          if (id.includes('react-router')) {
            return 'router';
          }
          if (id.includes('@headlessui') || id.includes('@heroicons')) {
            return 'ui';
          }
          
          // Data chunks - these are loaded only when needed
          if (id.includes('src/data/successStories')) {
            return 'data-stories';
          }
          if (id.includes('src/data/mockThreads')) {
            return 'data-threads';
          }
          if (id.includes('src/data/events')) {
            return 'data-events';
          }
          if (id.includes('src/data/blogPosts')) {
            return 'data-blog';
          }
          
          // Page chunks - separate each major page  
          if (id.includes('src/pages/forum')) {
            return 'page-forum';
          }
          if (id.includes('src/pages/tools')) {
            return 'page-tools';
          }
          if (id.includes('src/pages/stories')) {
            return 'page-stories';
          }
          if (id.includes('src/pages/events')) {
            return 'page-events';
          }
          if (id.includes('src/pages/network')) {
            return 'page-network';
          }
          if (id.includes('src/pages/resources')) {
            return 'page-resources';
          }
          if (id.includes('src/contexts/AuthContext')) {
            return 'firebase'; // AuthContext is Firebase-heavy
          }
        }
      }
    },
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: false,
    chunkSizeWarningLimit: 300, // Lower warning limit to 300KB
  },
})
