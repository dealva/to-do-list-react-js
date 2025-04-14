import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production'

  return {
    plugins: [react()],
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