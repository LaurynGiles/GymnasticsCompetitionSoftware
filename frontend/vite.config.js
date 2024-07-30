import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import rollupNodePolyFill from 'rollup-plugin-node-polyfills';
import vitePluginNode from 'vite-plugin-node';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target : "http://localhost:8000",
        secure : false,
        changeOrigin : true,
      }
    },
    watch: {
      ignored: ['**/backend/**'], // Ignore the backend directory
    },
  },
  plugins: [
    react(),
    vitePluginNode({
      adapter: 'express',
      appPath: './backend/app.js', // specify your server entry point
      export: 'default',
      tsCompiler: 'esbuild',
    }),
  ],
  build: {
    rollupOptions: {
      external: ['pg-hstore'],
      plugins: [
        rollupNodePolyFill(),
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
  resolve: {
    alias: {
      process: 'rollup-plugin-node-polyfills/polyfills/process-es6',
      buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6',
    },
  },
});
