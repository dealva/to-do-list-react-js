import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production'

  return {
    base: './',
    plugins: [
      react(),
      viteStaticCopy({
        targets: [
          {
            src: 'build/index.html',
            dest: '.', 
            rename: '404.html'
          }
        ]
      })
    ],
    build: {
      outDir: 'build', // same as webpack output.path
      emptyOutDir: true, // clean: true
      rollupOptions: {
        output: {
          entryFileNames: isProduction ? 'assets/[name]-[hash].js' : 'assets/[name].js',
          chunkFileNames: isProduction ? 'assets/[name]-[hash].js' : 'assets/[name].js',
          assetFileNames: isProduction ? 'assets/[name]-[hash][extname]' : 'assets/[name][extname]',
        }
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'), // Optional: cleaner import paths
      }
    }
  }
})