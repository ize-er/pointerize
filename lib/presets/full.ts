import { builder_shapes } from '../options_builders/builder_shapes'
import type { IOptions, IOptionsShape } from '../types'
import tokens from '../brand/tokens'

/**
 *
 * Here contains presets that can be passed directly to the library's main class as options.
 * If you're not familiar with typescript, in names, the stuff after `:` are types, ignore them.
 *
 */

// colors
const { color_gray_2 } = { ...tokens.colors}

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
      stroke: color_gray_2
    }
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
         we need `position: fixed` since event listeners change `left` and `top` properties
         to move the pointer, we are also specifying the initial `top` and `left` for the
         pointer based on its `width` and `height` to move it out of sight until the user
         moves the pointer and it becomes visible 
      */
      css_properties: {
        position: 'fixed',
        top: '-48px',
        left: '-48px',
        width: '48px',
        height: '48px',
      },
    },
    shapes,
    interactions: [
      {
        type: 'pointer',
      },
    ],
  }

  return options
}

//0 advanced examples

/* 
   About `builder_shapes`:
   to make it easier and faster to create the options we will use loops to create arrays and pass
   them to the `builder_shapes` function, all that this function does is loop through those arrays 
   and create the options properties for multiple shapes that would have taken us a long time to write.
   the options passed to that function are essentially the same as normal options with values wrapped
   in arrays. you can read more details in it's file.
   you may just as easily come up with your own solution to generate the options, `builder_shapes` is
   intended to be a general solution and is experimental.
*/

//1 ratios and guides
//2 this first one has the explanations for the parts that are going to be repeated in later presets

export const presetAdvanced1 = () => {
  /**
   * An advanced example demonstrating the use of ratios and guides
   */

  // the number of shapes that are going to be positioned on the position guide
  const shapesPosNum = 60

  // shapes property, already containing the position guide shape
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
        },
      ],
    },
  ]

  // build the shapes' options and add to the rest
  const fill: string[] = []
  const ratiosSize: number[] = []
  for (let i = 0; i < shapesPosNum; i++) {
    /* 
       Using a loop and the number of shapes to make the options
       based on how we want the final shapes. It's just easier this way than
       writing them in arrays one by one
    */
    fill.push(`hsl(${(360 / shapesPosNum) * i}, 100%, 40%)`)
    ratiosSize.push((0.2 / shapesPosNum) * (i + 1))
  }

  const shapesPosOpts = {
    type: ['polygon'],
    sides: [4],
    svg_attributes: {
      'stroke-width': ['0'],
      fill: fill,
    },
    ratios: [
      [
        {
          type: ['size'],
          options: {
            value: ratiosSize,
          },
        },
        // this is turning a polygon with 4 sides (square) into a rhombus
        {
          type: ['radius'],
          options: {
            type: ['alternate'],
            value: [0.4],
          },
        },
      ],
    ],
  }

  const shapesPos = builder_shapes(shapesPosNum, shapesPosOpts)
  for (const i of shapesPos) {
    shapes.push(i)
  }

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
        },
      ],
    },
  ]

  const fill: string[] = []
  const ratiosSize: number[] = []
  for (let i = 0; i < shapesPosNum; i++) {
    fill.push(`hsl(${(360 / shapesPosNum) * i}, 100%, 40%)`)
    ratiosSize.push(i % 2 === 0 ? 0.2 : 0.3)
  }

  const shapesPosOpts = {
    type: ['polygon'],
    sides: [8],
    svg_attributes: {
      'stroke-width': ['0'],
      fill: fill,
    },
    ratios: [
      [
        {
          type: ['size'],
          options: {
            value: ratiosSize,
          },
        },
        // this is turning a polygon with 8 sides into a 4 pointed star
        {
          type: ['radius'],
          options: {
            type: ['alternate'],
            value: [0.4]
          }
        }
      ],
    ],
  }

  const shapesPos = builder_shapes(shapesPosNum, shapesPosOpts)
  for (const i of shapesPos) {
    shapes.push(i)
  }

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

export const presetAdvanced3 = () => {
  /**
   * An advanced example demonstrating the use of ratios and guides
   */

  const shapesNum = 10

  const shapes: IOptionsShape[] = [
    {
      type: 'polygon',
      sides: shapesNum,
      svg_attributes: {
        "stroke-width": '0'
      },
      ratios: [
        {
          type: 'radius',
          options: {
            value: 1
          }
        },
        {
          type: 'size',
          options: {
            value: 0.5
          }
        }
      ],
      guides: [
        {
          type: 'position'
        }
      ]
    },
  ]
  
  for (let i = 0; i < shapesNum; i++) {
    shapes.push({
      type: 'polygon',
      sides: 4,
      svg_attributes: {
        'stroke-width': '0.2',
        stroke: color_gray_2
      },
      ratios: [
        {
          type: 'size',
          options: {
            value: 0.5
          }
        }
      ]
    })
  }
  
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

//1 patterns

export const presetAdvanced4 = () => {
  /**
   * An advanced example demonstrating the use of pattern
   */

  // the number of shapes that are going to be positioned on the position guide (all used as a pattern tile)
  const shapesPatternPosNum = 4

  // shapes property for the pattern guide, already containing the position guide shape
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
        },
      ],
    },
  ]

  const fill: string[] = []
  for (let i = 0; i < shapesPatternPosNum; i++) {
    fill.push(`hsl(${(60 / shapesPatternPosNum) * i}, 100%, 40%)`)
  }

  const shapesPatternPosOpts = {
    type: ['polygon'],
    sides: [14],
    svg_attributes: {
      'stroke-width': ['0'],
      fill: fill,
    },
    ratios: [
      [
        {
          type: ['size'],
          options: {
            value: [0.6],
          },
        },
        // this is turning a polygon with 14 sides into a 7 pointed star (or leaf)
        {
          type: ['radius'],
          options: {
            type: ['alternate'],
            value: [0.4],
          },
        },
      ],
    ],
  }

  const shapesRest = builder_shapes(shapesPatternPosNum, shapesPatternPosOpts)
  for (const i of shapesRest) {
    shapesPattern.push(i)
  }

  // shapes
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
                  Removing the gaps is what makes the shapes on the four courners of a tile overlap and
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

//1 effects and animations

export const presetAdvanced5 = () => {
  /**
   * An advanced example demonstrating the use of animations and filters
   */

  const shapesNum = 4

  const stroke: string[] = []
  const size: number[] = []
  const sides: number[] = []
  const direction: string[] = []
  for (let i = 0; i < shapesNum; i++) {
    stroke.push(`hsl(${(360 / shapesNum) * i}, 100%, 40%)`)
    size.push((0.7 / shapesNum) * i + 0.3)
    sides.push(i + 3)
    direction.push(i % 2 === 0 ? 'alternate' : 'alternate-reverse')
  }
  const shapesOpts = {
    type: ['polygon'],
    sides: sides,
    svg_attributes: {
      'stroke-width': ['0.5'],
      stroke: stroke,
    },
    ratios: [
      [
        {
          type: ['size'],
          options: {
            value: size,
          },
        },
      ],
    ],
    effects: [
      [
        {
          preset: ['glow'],
        },
      ],
    ],
    animations: [
      [
        {
          preset: ['rotate'],
          // you can further customize animations
          css_properties: {
            'animation-direction': direction,
            'animation-duration': ['40s'],
          },
        },
      ],
    ],
  }

  const shapes: IOptionsShape[] = builder_shapes(shapesNum, shapesOpts)

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