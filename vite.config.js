import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  base: process.env.PUBLIC_URL || '/',
  build: {
    outDir: 'build',
    sourcemap: false,
    target: ['es2015'],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
}) 