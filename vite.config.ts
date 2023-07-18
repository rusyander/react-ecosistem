import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr({ exportAsDefault: true }), react()],
  resolve: {
    //   alias: [{ find: '@', replacement: '/src' }],
    // alias: {
    //   src: path.resolve('src/'),
    // },
  },

  define: {
    __IS_DEV__: JSON.stringify(true),
    __API__: JSON.stringify('http://192.168.30.16:8080'),
    __PROJECT__: JSON.stringify('frontend'),
  },
});
