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
        tokens: resolve(__dirname, 'brand/tokens.ts'),
        presets: resolve(__dirname, 'lib/presets/full.ts'),
      },
      output: {
        dir: 'dist__site',
        banner: 
`/**
  * @license Pointerize
  * Copyright (c) 2022-present Abolfazl Faturechi
  * 
  * This source code is licensed under the MIT license found in the
  * LICENSE file at https://github.com/ize-er/pointerize.
  */`
      },
    },
  },
})
