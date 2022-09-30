import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dotenv from 'dotenv';
import { resolve } from 'path'

// https://vitejs.dev/config/
export default ({mode}) => {
  dotenv.config(
      { path: './.env' }
  );
  return defineConfig({
    resolve:{
      alias:{
        '@' : resolve(__dirname, './src')
      },
    },
    plugins: [vue()],
    define: {
      'process.env': {
        homePage: process.env.HOMEPAGE,
        webmyphamapi: process.env.WEBMYPHAMAPI,
      }
    },
    server: {
      host: 'webthucpham-dev.vn', //domain chạy dưới local
      // https: true,
      port: 2222
    },
    build: {
      chunkSizeWarningLimit: 3000,
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
        },
      }
    },
    host: "webthucpham-dev.vn",
    port: 2222,
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "src/assets/scss/_variables.scss";`
        }
      }
    },

    publicPath: '/webthucpham/'
    
  })
}