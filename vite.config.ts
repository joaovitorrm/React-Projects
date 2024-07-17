import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/React-Projects/SlidePuzzle",
  root: "./",
  build: {
    outDir: "../gh-page/SlidePuzzle",
    emptyOutDir: true,
  }
})
