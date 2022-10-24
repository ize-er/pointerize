// import Pointerize from '../lib/pointerize'
import { jest } from '@jest/globals'
// import type { IOptions } from '../lib/types'

// matchMedia doesn't exist in jsdom so we define it with jest
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: true,
    media: query,
    onchange: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

describe('Pointerize options', () => {
  /* 
    provide as much options to class instance as possible, and test them all.
    then, with a difference instance, provide the different values that options may have and test the changed values only.
    repeat ...
  */

  document.body.innerHTML = `<div class="pointerize_root">
       <div class="interaction_target">
         <div></div>
       </div> 
     </div>`
  // TODO: needs a big refactor, it's not correct
  test('temporary empty test', () => {
    expect(true).toBe(true)
  })
  // // instance 0
  // const options_0: IOptions = {} // defaults
  // describe('instance 0', () => {
  //   const pointerize = new Pointerize(options_0)
  //   pointerize.start()

  //   test('general things', () => {
  //     expect(pointerize.element__svg_container).toBeInstanceOf(HTMLElement)
  //     expect(pointerize.element__svg_container?.tagName).toBe('DIV')
  //     expect(pointerize.element__svg_container?.firstElementChild?.tagName).toBe('svg')
  //   })
  // })

  // // instance 1
  // const options_1: IOptions = {
  //   css_selector__root: 'body',
  //   element__svg: {
  //     svg_attributes: {
  //       width: '222',
  //     },
  //     css_properties: {
  //       height: '222px',
  //     },
  //   },
  //   element__svg_container: {
  //     css_properties: {
  //       width: '333px',
  //       left: '10px',
  //       top: '100px',
  //     },
  //   },
  //   interactions: [
  //     {
  //       type: 'pointer',
  //       options: {
  //         css_selector__root: '.pointerize_root',
  //         // default_pointer: false,
  //         start_criteria: {
  //           criteria: '(pointer: fine)',
  //           frequency: 'once',
  //         },
  //       },
  //     },
  //     {
  //       type: 'pointer__scale',
  //       options: {
  //         elements: ['.interaction_target'],
  //       },
  //     },
  //   ],
  //   // not using `size` because the dimensions stated above need to be tested here
  //   shapes: [
  //     // 7 basic shapes
  //     {
  //       name: 'circle',
  //       size: 10,
  //       guide: [
  //         {
  //           type: 'position',
  //         },
  //         {
  //           type: 'pattern',
  //           options: {
  //             preset: 'circle',
  //             area: 'fill',
  //             ratio: {
  //               tile: 10,
  //               gap: {
  //                 row: 10,
  //                 column: 10,
  //               },
  //             },
  //           },
  //         },
  //       ],
  //       svg_attributes: {
  //         'stroke-width': '2',
  //         stroke: 'red',
  //         // not using `fill` because a pattern is assigned to it
  //       },
  //       animations: [
  //         {
  //           preset: 'rotate',
  //           direction: 'clockwise',
  //           css_properties: {
  //             'animation-direction': 'reverse',
  //           },
  //         },
  //       ],
  //       effects: [
  //         {
  //           preset: 'glow',
  //         },
  //       ],
  //     },
  //     {
  //       name: 'ellipse',
  //       size: 10,
  //       ratio: [
  //         {
  //           type: 'radius',
  //           options: {
  //             value: 0.4,
  //           },
  //         },
  //       ],
  //       animations: [
  //         {
  //           preset: 'rotate',
  //           direction: 'anticlockwise',
  //         },
  //       ],
  //       effects: [
  //         {
  //           preset: 'glow',
  //         },
  //       ],
  //     },
  //     {
  //       name: 'rectangle',
  //       size: 20,
  //       svg_attributes: {
  //         width: '10',
  //         height: '18',
  //         transform: 'skewY(10)',
  //       },
  //     },
  //     {
  //       name: 'polygon',
  //       size: 30,
  //       sides: 6,
  //       ratio: [
  //         {
  //           type: 'radius',
  //           options: {
  //             type: 'accumulate',
  //             value: 0.4,
  //           },
  //         },
  //       ],
  //     },
  //     {
  //       name: 'line',
  //     },
  //     {
  //       name: 'polyline',
  //     },
  //     {
  //       name: 'path',
  //     },
  //   ],
  // }
  // describe('instance 1', () => {
  //   const pointerize = new Pointerize(options_1)
  //   pointerize.start()

  //   test('root element', () => {
  //     expect(pointerize.element__root).toBe(document.body)
  //   })

  //   test('svg element', () => {
  //     expect(pointerize.element__svg?.getAttribute('width')).toBe('222')
  //     expect(pointerize.element__svg?.style.getPropertyValue('height')).toBe('222px')
  //   })

  //   test('svg container element', () => {
  //     expect(pointerize.element__svg_container?.style.getPropertyValue('width')).toBe('333px')
  //     expect(pointerize.element__svg_container?.style.getPropertyValue('left')).toBe('10px')
  //     expect(pointerize.element__svg_container?.style.getPropertyValue('top')).toBe('100px')
  //   })

  //   test('interactions', () => {
  //     //0 pointer interaction
  //     //1 check if start criteria passes and pointerize is rendered
  //     expect(pointerize.element__svg_container).toBeInstanceOf(HTMLElement)
  //     //1 check if no default pointer class is on the root element
  //     expect(pointerize.element__root.classList).toContain('-_pointerize__pointer_default__non')
  //     //1 check if `pointer__scale` related classes are on target element and it's children
  //     expect(document.querySelector<HTMLElement>('.interaction_target')?.dataset.pointerize).toBe('pointer__scale')
  //     expect(
  //       (<HTMLElement>document.querySelector<HTMLElement>('.interaction_target')?.firstElementChild).dataset.pointerize
  //     ).toBe('pointer__scale__child')
  //   })

  //   test('shapes', () => {
  //     // the existence of elements and in right order
  //     expect(document.querySelector('#-_pointerize__container_1th > svg > circle')).not.toBe(null)
  //     expect(document.querySelector('#-_pointerize__container_1th > svg > path')).not.toBe(null)
  //     // svg attributes
  //     expect(document.querySelector('#-_pointerize__container_1th > svg > circle')?.getAttribute('stroke')).toBe('red')
  //     // animations
  //     expect(
  //       document
  //         .querySelector('#-_pointerize__container_1th > svg > style')
  //         ?.textContent?.match(/#shape_0th_circle\{[^{]*?animation-direction:reverse[^}]*?\}/)
  //     )
  //     expect(
  //       document
  //         .querySelector('#-_pointerize__container_1th > svg > style')
  //         ?.textContent?.match(/#shape_1th_ellipse\{[^{]*?animation-name:rotate[^}]*?\}/)
  //     )
  //     // effects
  //     expect(document.querySelectorAll('#-_pointerize__container_1th > svg > filter')[0].getAttribute('id')).toBe(
  //       '-_1th__filter_glow_1th_0th'
  //     )
  //     expect(document.querySelectorAll('#-_pointerize__container_1th > svg > filter')[1].getAttribute('id')).toBe(
  //       '-_1th__filter_glow_0th_0th'
  //     )
  //   })
  // })

  // // instance 2
  // const options_2: IOptions = {
  //   css_selector__root: '.pointerize_root',
  //   size: {
  //     inner: 40,
  //     outer: 60,
  //   },
  //   shapes: [
  //     {
  //       name: 'circle',
  //       animations: [
  //         {
  //           preset: 'rotate',
  //         },
  //       ],
  //     },
  //   ],
  //   system_preferences: {
  //     respect_reduced_motion: true,
  //   },
  // }
  // describe('instance 2', () => {
  //   const pointerize = new Pointerize(options_2)
  //   pointerize.start()

  //   test('root element', () => {
  //     expect(pointerize.element__root.classList).toContain('pointerize_root')
  //   })

  //   test('size', () => {
  //     expect(pointerize.element__svg_container?.style.getPropertyValue('width')).toBe('60px')
  //     expect(pointerize.element__svg?.getAttribute('viewBox')).toBe('0 0 40 40')
  //   })

  //   test('system preferences', () => {
  //     // there shouldn't be animations (they go inside style element)
  //     expect(document.querySelector('#-_pointerize__container_2th > svg > style')).toBe(null)
  //   })
  // })
})

export {}
