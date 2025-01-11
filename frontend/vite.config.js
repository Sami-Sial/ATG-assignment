import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api/v1/register": "https://atg-assignment-eight.vercel.app",
      "/api/v1/login": "https://atg-assignment-eight.vercel.app",
      "/api/v1/password/forgot": "https://atg-assignment-eight.vercel.app",
    }
  },
  plugins: [react()],
})
