import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/guide/build.html#library-mode
// this config is only for site-related files
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'presets/full.ts'),
      formats: ['es'],
      fileName: '[name]',
    },
    rollupOptions: {
      input: {
        tokens: resolve(__dirname, 'lib/brand/tokens.ts'),
        presets: resolve(__dirname, 'lib/presets/full.ts'),
      },
      output: {
        dir: 'dist__site',
      },
    },
  },
})
