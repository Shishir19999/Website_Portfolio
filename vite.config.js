import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Website_Portfolio/',
  plugins: [react()],
  test: {
    environment: 'node',
    include: ['tests/**/*.test.js'],
  },
})
