import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/guide/build.html#library-mode
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      name: 'Pointerize',
      fileName: 'pointerize',
    },
    rollupOptions: {
      output: {
        banner: 
`/**
  * @license Pointerize
  * Copyright (c) 2022-present Abolfazl Faturechi
  * 
  * This source code is licensed under the MIT license found in the
  * LICENSE file at https://github.com/ize-er/pointerize.
  */`
      }
    }
  },
})
