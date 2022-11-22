import type { IOptions, IOptionsShape, TOptionsShapeMakeMulti } from '../types'
import tokens from '../../brand/tokens'

/**
 *
 * Here contains presets that can be passed directly to the library's main class as options.
 * If you're not familiar with typescript, in names, the stuff after `:` are types, ignore them.
 *
 */

// colors
const { color_gray_2 } = { ...tokens.colors }

//0 basic examples
//1 shapes for all basic examples
const shapes: IOptionsShape[] = [
  {
    type: 'circle',
    svg_attributes: {
      'stroke-width': '0',
      fill: color_gray_2,
    },
    ratios: [
      {
        type: 'size',
        options: {
          value: 0.2,
        },
      },
    ],
  },
  {
    type: 'polygon',
    sides: 8,
    svg_attributes: {
      stroke: color_gray_2,
    },
  },
]

export const presetBasic1 = () => {
  /**
   * simple example demonstrating shape creation
   */

  // options
  const options: IOptions = {
    element__svg_container: {
      css_properties: {
        width: '100%',
        height: '100%',
      },
    },
    shapes,
  }

  return options
}

export const presetBasic2 = () => {
  /**
   * Simple example demonstrating pattern creation and using it as background.
   * Note: you should also make `body`'s background at least slightly transparent so that
   * this background becomes visible
   */

  // the shape on which there is pattern, a simple square with a pattern fill
  const shapeTarget: IOptionsShape = {
    type: 'square',
    svg_attributes: {
      'stroke-width': '0',
    },
    guides: [
      {
        type: 'pattern',
        options: {
          area: 'fill',
          shapes,
        },
      },
    ],
  }

  // options
  const options: IOptions = {
    element__svg: {
      svg_attributes: {
        preserveAspectRatio: 'xMidYMid slice',
      },
    },
    element__svg_container: {
      css_properties: {
        width: '100%',
        height: '100%',
        'z-index': '-1',
      },
    },
    shapes: [shapeTarget],
  }

  return options
}

export const presetBasic3 = () => {
  /**
   * A simple example demonstrating a custom pointer(cursor)
   */

  // options
  const options: IOptions = {
    element__svg_container: {
      /* 
         We need `position: fixed` since event listeners change `left` and `top` properties
         to move the pointer, we are also specifying the initial `top` and `left` for the
         pointer based on its `width` and `height` to move it out of sight until the user
         moves the pointer and it becomes visible. z-index` is set to place the pointer above 
         other elements; change it if you need to.
      */
      css_properties: {
        position: 'fixed',
        top: '-48px',
        left: '-48px',
        width: '48px',
        height: '48px',
        'z-index': '10',
      },
    },
    shapes,
    interactions: [
      // this interaction turns the shapes into a custom pointer
      {
        type: 'pointer',
      },
    ],
  }

  return options
}

//0 advanced examples
//1 ratios and guides
//2 this first one has the explanations for the parts that are going to be repeated in later presets

export const presetAdvanced1 = () => {
  /**
   * An advanced example demonstrating the use of ratios and guides
   */

  // the number of shapes that are going to be positioned on the position guide
  const shapesPosNum = 60

  //0 make the shapes that are going to be positioned on the position guide
  //1 make some of the large properties for `make_multiple`
  const svgAttributes: TOptionsShapeMakeMulti['svg_attributes'] = []
  const ratios: TOptionsShapeMakeMulti['ratios'] = []
  for (let i = 0; i < shapesPosNum; i++) {
    /* 
       Using a loop with the number of shapes to make some properties.
       It's just easier this way than writing them in arrays one by one.
    */

    svgAttributes.push({
      'stroke-width': '0',
      fill: `hsl(${(360 / shapesPosNum) * i}, 100%, 40%)`,
    })

    ratios.push([
      {
        type: 'size',
        options: {
          value: (0.2 / shapesPosNum) * (i + 1),
        },
      },
      // this is turning a polygon with 4 sides (square) into a rhombus
      {
        type: 'radius',
        options: {
          type: 'alternate',
          value: 0.4,
        },
      },
    ])
  }

  //1 the final shapes that will be passed to position guide
  const shapesPos: IOptionsShape[] = [
    {
      make_multiple: [
        {
          type: 'shapes',
          options: {
            number: shapesPosNum,
            value: {
              type: ['polygon'],
              sides: [4],
              svg_attributes: svgAttributes,
              ratios: ratios,
            },
          },
        },
      ],
    },
  ]

  // the main shapes property
  const shapes: IOptionsShape[] = [
    {
      type: 'polygon',
      sides: shapesPosNum,
      svg_attributes: {
        'stroke-width': '0', // giving it no stroke because we don't want to see this shape
      },
      // this determines the ratio of of the radii
      ratios: [
        {
          type: 'radius',
          options: {
            type: 'accumulate',
            value: 0.99,
          },
        },
      ],
      // this turns this shape into a position guide
      guides: [
        {
          type: 'position',
          options: {
            // these shapes are positioned on the current shape's vertexes
            shapes: shapesPos,
          },
        },
      ],
    },
  ]

  // options
  const options: IOptions = {
    element__svg_container: {
      css_properties: {
        width: '100%',
        height: '100%',
      },
    },
    shapes,
  }

  return options
}

export const presetAdvanced2 = () => {
  /**
   * An advanced example demonstrating the use of ratios and guides
   */

  const shapesPosNum = 20

  const svgAttributes: TOptionsShapeMakeMulti['svg_attributes'] = []
  const ratios: TOptionsShapeMakeMulti['ratios'] = []
  for (let i = 0; i < shapesPosNum; i++) {
    svgAttributes.push({
      'stroke-width': '0',
      fill: `hsl(${(360 / shapesPosNum) * i}, 100%, 40%)`,
    })

    ratios.push([
      {
        type: 'size',
        options: {
          value: i % 2 === 0 ? 0.2 : 0.3,
        },
      },
      // this is turning a polygon with 8 sides into a 4 pointed star
      {
        type: 'radius',
        options: {
          type: 'alternate',
          value: 0.4,
        },
      },
    ])
  }

  const shapesPos: IOptionsShape[] = [
    {
      make_multiple: [
        {
          type: 'shapes',
          options: {
            number: shapesPosNum,
            value: {
              type: ['polygon'],
              sides: [8],
              svg_attributes: svgAttributes,
              ratios: ratios,
            },
          },
        },
      ],
    },
  ]

  const shapes: IOptionsShape[] = [
    {
      type: 'polygon',
      sides: shapesPosNum,
      svg_attributes: {
        'stroke-width': '0',
      },
      ratios: [
        {
          type: 'radius',
          options: {
            type: 'alternate',
            value: 0.8,
          },
        },
        {
          type: 'size',
          options: {
            value: 0.8,
          },
        },
      ],
      guides: [
        {
          type: 'position',
          options: {
            shapes: shapesPos,
          },
        },
      ],
    },
  ]

  const options: IOptions = {
    element__svg_container: {
      css_properties: {
        width: '100%',
        height: '100%',
      },
    },
    shapes,
  }

  return options
}

export const presetAdvanced3 = () => {
  /**
   * An advanced example demonstrating the use of ratios and guides
   */

  const shapesNum = 10

  const shapesPos: IOptionsShape[] = [
    {
      make_multiple: [
        {
          type: 'shapes',
          options: {
            number: shapesNum,
            value: {
              type: ['polygon'],
              sides: [4],
              svg_attributes: [
                {
                  'stroke-width': '0.2',
                  stroke: color_gray_2,
                },
              ],
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
  ]

  const shapes: IOptionsShape[] = [
    {
      type: 'polygon',
      sides: shapesNum,
      svg_attributes: {
        'stroke-width': '0',
      },
      ratios: [
        {
          type: 'radius',
          options: {
            value: 1,
          },
        },
        {
          type: 'size',
          options: {
            value: 0.5,
          },
        },
      ],
      guides: [
        {
          type: 'position',
          options: {
            shapes: shapesPos,
          },
        },
      ],
    },
  ]

  const options: IOptions = {
    element__svg_container: {
      css_properties: {
        width: '100%',
        height: '100%',
      },
    },
    shapes,
  }

  return options
}

//1 patterns

export const presetAdvanced4 = () => {
  /**
   * An advanced example demonstrating the use of pattern
   */

  // the number of shapes that are going to be positioned on the position guide
  const shapesPatternPosNum = 4

  const svgAttributes: TOptionsShapeMakeMulti['svg_attributes'] = []
  const ratios: TOptionsShapeMakeMulti['ratios'] = []
  for (let i = 0; i < shapesPatternPosNum; i++) {
    svgAttributes.push({
      'stroke-width': '0',
      fill: `hsl(${(60 / shapesPatternPosNum) * i}, 100%, 40%)`,
    })

    ratios.push([
      {
        type: 'size',
        options: {
          value: 0.6,
        },
      },
      // this is turning a polygon with 14 sides into a 7 pointed star (or leaf)
      {
        type: 'radius',
        options: {
          type: 'alternate',
          value: 0.4,
        },
      },
    ])
  }

  // shapes property for the position guide
  const shapesPatternPos: IOptionsShape[] = [
    {
      make_multiple: [
        {
          type: 'shapes',
          options: {
            number: shapesPatternPosNum,
            value: {
              type: ['polygon'],
              sides: [14],
              svg_attributes: svgAttributes,
              ratios: ratios,
            },
          },
        },
      ],
    },
  ]

  // shapes property for the pattern guide
  const shapesPattern: IOptionsShape[] = [
    {
      type: 'polygon',
      sides: shapesPatternPosNum,
      svg_attributes: {
        'stroke-width': '0',
      },
      guides: [
        {
          type: 'position',
          options: {
            shapes: shapesPatternPos,
          },
        },
      ],
    },
  ]

  const shapes: IOptionsShape[] = [
    {
      type: 'triangle',
      svg_attributes: {
        'stroke-width': '0',
      },
      guides: [
        {
          type: 'pattern',
          options: {
            area: 'fill',
            shapes: shapesPattern,
            ratios: {
              /* 
                  Removing the gaps is what makes the shapes on the four corners of a tile overlap and
                  create the leaves with two colors, try commenting this part to see the actual tiles.
              */
              gap: {
                column: 0,
                row: 0,
              },
            },
          },
        },
      ],
    },
  ]

  const options: IOptions = {
    element__svg_container: {
      css_properties: {
        width: '100%',
        height: '100%',
      },
    },
    shapes,
  }

  return options
}

//1 effects and animations

export const presetAdvanced5 = () => {
  /**
   * An advanced example demonstrating the use of animations and filters
   */

  const shapes: IOptionsShape[] = [
    {
      make_multiple: [
        {
          type: 'shapes',
          options: {
            number: 3,
            value: {
              type: ['circle', 'square', 'square'],
              sides: [undefined, 5, 5],
              svg_attributes: [
                {
                  'stroke-width': '0',
                  stroke: 'hsl(160, 50%, 40%)',
                  fill: 'hsl(0, 100%, 40%)',
                },
                {
                  'stroke-width': '0.2',
                  stroke: 'hsl(160, 50%, 40%)',
                  fill: 'transparent',
                },
                {
                  'stroke-width': '1',
                  stroke: 'hsl(160, 50%, 40%)',
                  fill: 'transparent',
                },
              ],
              ratios: [
                [
                  {
                    type: 'size',
                    options: {
                      value: 0.2,
                    },
                  },
                ],
                [
                  {
                    type: 'size',
                    options: {
                      value: 0.7,
                    },
                  },
                ],
                [
                  {
                    type: 'size',
                    options: {
                      value: 0.6,
                    },
                  },
                ],
              ],
              animations: [
                undefined,
                [
                  {
                    preset: 'rotate',
                    // you can further customize animations
                    css_properties: {
                      'animation-direction': 'normal',
                      'animation-duration': '40s',
                    },
                  },
                ],
                [
                  {
                    preset: 'rotate',
                    // you can further customize animations
                    css_properties: {
                      'animation-direction': 'alternate-reverse',
                      'animation-duration': '40s',
                    },
                  },
                ],
              ],
              effects: [
                [
                  {
                    preset: 'glow',
                  },
                ],
                undefined,
                undefined,
              ],
            },
          },
        },
      ],
    },
  ]

  const options: IOptions = {
    element__svg_container: {
      css_properties: {
        width: '100%',
        height: '100%',
      },
    },
    shapes,
  }

  return options
}
