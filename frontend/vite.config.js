import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api/v1/register": "htp://localhost:8080",
      "/api/v1/login": "htp://localhost:8080",
      "/api/v1/password/forgot": "htp://localhost:8080",
    }
  },
  plugins: [react()],
})
