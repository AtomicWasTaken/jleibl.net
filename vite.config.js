import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    allowedHosts: 'jleibl.net',
    port: 4321
  },
  preview: {
    allowedHosts: 'jleibl.net',
    port: 4321
  }
})