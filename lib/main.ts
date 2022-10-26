import './style_pointerize.css'
import Pointerize from './pointerize'
export default Pointerize

/*
  For testing with a local server:
  This file is the entry file for the library and anything imported here will be included in the built files so
  If you want to use this with the local testing server:
    - Uncomment the code bellow.
    - In case you want to make commits after you're done testing here, remember to not add this file to them.
*/

// import type { IOptions } from './types'
// // you can use these presets if you want
// import {
//         presetBasic1,
//          presetBasic2,
//          presetBasic3,
//          presetAdvanced1,
//          presetAdvanced2,
//          presetAdvanced3,
//          presetAdvanced4,
//          presetAdvanced5
//         } from './presets/full'

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <h1>Pointerize</h1>
// `

//   // uncomment and use this if you want to specify the options yourself and pass it to `Pointerize()`
//   // const options: IOptions = {
//   // }

//   const p = new Pointerize(presetBasic3())
//   p.start()
