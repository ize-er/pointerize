import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/guide/build.html#library-mode
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/presets/misc.ts'),
      fileName: '[name]',
      formats: ['es']
    },
    emptyOutDir: false,
    rollupOptions: {
      input: {
        animations: resolve(__dirname, 'lib/presets/animations'),
        effects: resolve(__dirname, 'lib/presets/effects'),
        patterns: resolve(__dirname, 'lib/presets/patterns'),
        defaults: resolve(__dirname, 'lib/make_defaults'),
      },
      output: {
        banner: 
`/**
  * @license Pointerize
  * Copyright (c) 2022-present Abolfazl Faturechi
  * 
  * This source code is licensed under the MIT license found in the
  * LICENSE file at https://github.com/ize-er/pointerize.
  */`,
      dir: 'dist/presets'
      },
    }
  }
})
