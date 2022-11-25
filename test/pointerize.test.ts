import Pointerize from '../lib/pointerize'
import { jest } from '@jest/globals'
import type { IOptions } from '../lib/types'

//TODO: instance 1 and 2 need more refactoring and tests
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
    Specify options on an instance and test. specify the remaining options on another instance and so on ...
  */

  document.body.innerHTML = `
     <div class="pointerize_root">
       <div class="interaction_target">
         <div></div>
       </div> 
     </div>`

  // instance 0
  const options_0: IOptions = {} // defaults
  describe('instance 0', () => {
    const pointerize = new Pointerize(options_0)
    pointerize.start()

    test('general things', () => {
      expect(pointerize.id).toBe('-_pointerize__container_0th')
      expect(pointerize.element__root?.tagName).toBe('BODY')
      expect(pointerize.element__svg_container?.tagName).toBe('DIV')
      expect(pointerize.element__svg?.tagName).toBe('svg')
    })
  })

  // instance 1
  const options_1: IOptions = {
    css_selector__root: 'body',
    element__svg: {
      svg_attributes: {
        width: '222',
      },
      css_properties: {
        height: '222px',
      },
    },
    element__svg_container: {
      css_properties: {
        width: '333px',
        left: '10px',
        top: '100px',
      },
    },
    interactions: [
      {
        type: 'pointer',
        options: {
          start_criteria: {
            criteria: '(pointer: fine)',
            frequency: 'once',
          },
        },
      },
      {
        type: 'pointer__scale',
        options: {
          elements: ['.interaction_target'],
        },
      },
    ],
    // not using `size` because the dimensions stated above need to be tested here
    shapes: [
      // 7 basic shapes and `make_multiple`
      {
        type: 'circle',
        guides: [
          {
            type: 'position',
            options: {
              shapes: [
                {
                  type: 'rectangle',
                },
              ],
            },
          },
          {
            type: 'pattern',
            options: {
              preset: 'circle',
              area: 'fill',
              ratios: {
                tile: 0.1,
                gap: {
                  row: 0.2,
                  column: 0.3,
                },
              },
            },
          },
        ],
        ratios: [
          {
            type: 'size',
            options: {
              value: 0.6,
            },
          },
        ],
        svg_attributes: {
          'stroke-width': '2',
          stroke: 'red',
          // not using `fill` because a pattern is assigned to it
        },
        animations: [
          {
            preset: 'rotate',
            css_properties: {
              'animation-direction': 'reverse',
            },
          },
        ],
        effects: [
          {
            preset: 'glow',
          },
        ],
      },
      {
        type: 'ellipse',
        ratios: [
          {
            type: 'radius',
            options: {
              value: 0.4,
            },
          },
          {
            type: 'size',
            options: {
              value: 0.8,
            },
          },
        ],
        animations: [
          {
            preset: 'rotate',
          },
        ],
        effects: [
          {
            preset: 'glow',
          },
        ],
      },
      {
        type: 'rectangle',
        svg_attributes: {
          width: '10',
          height: '18',
          transform: 'skewY(10)',
        },
      },
      {
        type: 'polygon',
        sides: 6,
        ratios: [
          {
            type: 'radius',
            options: {
              type: 'accumulate',
              value: 0.4,
            },
          },
        ],
      },
      {
        type: 'line',
      },
      {
        type: 'polyline',
      },
      {
        type: 'path',
      },
      {
        make_multiple: [
          {
            type: 'shapes',
            options: {
              number: 2,
              value: {
                type: ['circle', 'square'],
                ratios: [
                  [
                    {
                      type: 'size',
                      options: {
                        value: 0.5,
                      },
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
    ],
  }
  describe('instance 1', () => {
    const pointerize = new Pointerize(options_1)
    pointerize.start()

    test('root element', () => {
      expect(pointerize.element__root).toBe(document.body)
    })

    test('svg element', () => {
      expect(pointerize.element__svg?.getAttribute('width')).toBe('222')
      expect(pointerize.element__svg?.style.getPropertyValue('height')).toBe('222px')
    })

    test('svg container element', () => {
      expect(pointerize.element__svg_container?.style.getPropertyValue('width')).toBe('333px')
      expect(pointerize.element__svg_container?.style.getPropertyValue('left')).toBe('10px')
      expect(pointerize.element__svg_container?.style.getPropertyValue('top')).toBe('100px')
    })

    test('interactions', () => {
      //0 pointer interaction
      //1 check if start criteria passes and pointerize is rendered
      expect(pointerize.element__svg_container).toBeInstanceOf(HTMLElement)
      //1 check if no default pointer class is on the root element
      expect(pointerize.element__root.classList).toContain('-_pointerize__pointer_default__non')
      //1 check if `pointer__scale` related classes are on target element and it's children
      expect(document.querySelector<HTMLElement>('.interaction_target')?.dataset.pointerize).toBe('pointer__scale')
      expect(
        (<HTMLElement>document.querySelector<HTMLElement>('.interaction_target')?.firstElementChild).dataset.pointerize
      ).toBe('pointer__scale__child')
    })

    test('shapes', () => {
      //0 the existence of elements and in right order
      expect(document.querySelector('#-_pointerize__container_1th > svg > circle')).not.toBe(null)
      expect(document.querySelector('#-_pointerize__container_1th > svg > path')).not.toBe(null)
      //1 `make_multiple`
      expect(document.querySelector('#-_pointerize__container_1th > svg > *:last-child')?.tagName).toBe('rect')
      // svg attributes
      expect(document.querySelector('#-_pointerize__container_1th > svg > circle')?.getAttribute('stroke')).toBe('red')
      //0 ratios
      //1 `make_multiple`
      expect(document.querySelector('#-_pointerize__container_1th > svg > *:last-child')?.getAttribute('width')).toBe(
        String(32 / 2 - 32 / 20)
      )
      // animations
      expect(
        document
          .querySelector('#-_pointerize__container_1th > svg > style')
          ?.textContent?.match(/#shape_0th_circle\{[^{]*?animation-direction:reverse[^}]*?\}/)
      )
      expect(
        document
          .querySelector('#-_pointerize__container_1th > svg > style')
          ?.textContent?.match(/#shape_1th_ellipse\{[^{]*?animation-name:rotate[^}]*?\}/)
      )
      // effects
      expect(document.querySelectorAll('#-_pointerize__container_1th > svg > filter')[0].getAttribute('id')).toBe(
        '-_1th__filter_glow_1th_0th'
      )
      expect(document.querySelectorAll('#-_pointerize__container_1th > svg > filter')[1].getAttribute('id')).toBe(
        '-_1th__filter_glow_0th_0th'
      )
    })
  })
})

export {}
