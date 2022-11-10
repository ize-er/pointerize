import './style_pointerize.css'
import Pointerize from './pointerize'
export default Pointerize

/*
  For testing with a local server:
  This file is the entry file for the library and anything imported here is included in the built files so
  If you want to use this with the local testing server:
    - In `../index.html` uncomment this `script`: `<script type="module" src="lib/main.ts"></script>` to be 
      able to use this file (if you want to change styles, comment the `link` to css file in the head too).
    - Uncomment the code bellow.
    - In case you want to make commits after you're done testing here, remember to not add this file
      or `index.html` to them.
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

// window.addEventListener('DOMContentLoaded', () => {

//   // removes stuff, ignore it
//   document.querySelector('#app')?.remove()
//   document.querySelector('style')?.remove()
//   for (const el of Array.from(document.querySelectorAll('[id*=-_pointerize]'))) {
//     el.remove()
//   }
  
//   // let's go
//   document.body.style.minHeight = `100vh`
//   document.body.innerHTML = 
//   ` 
//     <h1 style="text-align: center;">Testing</h1>
//   `

//   // uncomment and use this if you want to specify the options yourself and pass it to Pointerize
//   // const options: IOptions = {
//   // }

//   const p = new Pointerize(presetBasic3())
//   p.start()

// });

