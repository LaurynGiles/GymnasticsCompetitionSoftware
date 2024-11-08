import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://backend:5000",
        secure : false,
        changeOrigin : true,
      }
    },
  },
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['pg-hstore'],
    },
    input: {
      // Specify the main entry point of your frontend
      main: './src/main.jsx'
    },
    output: {
      // Output settings
      dir: 'dist'
    },
    onwarn: (warning, warn) => {
      // Ignore certain warnings that might be triggered by backend files
      if (warning.code !== 'UNUSED_EXTERNAL_IMPORT') {
        warn(warning);
      }
    },
  },
  commonjsOptions: {
    include: /node_modules/
  }
});