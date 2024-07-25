import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/React-Projects/MemoryGlassPuzzle",
  root: "./",
  build: {
    outDir: "../gh-page/MemoryGlassPuzzle",
    emptyOutDir: true,
  }
})
