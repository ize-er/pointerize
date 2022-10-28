import type { IDefaultsSvgEls, IDefaultsOptionsShape } from './types'

const makeDefaults = (size = 32) => {
  // default variables (these are the only static values, others are calculated using these)
  const duration = '4s'
  const goldenRatio = 0.625

  // defaults for options
  const defaultsOpts = {
    size: {
      inner: size,
      outer: size,
    },
    interactions: {
      pointer: {
        element_selector__root: 'body',
        default_pointer: false,
        start_criteria: {
          criteria: '(pointer: fine)',
          frequency: 'once',
        },
      },
    },
    system_preferences: {
      respect_reduced_motion: false,
    },
  } as const

  // defaults for some shared svg attrs
  const defaultsSvgAttrs = {
    attrsStroke: {
      stroke: '#757575',
      'stroke-width': String(size / 20),
      'stroke-opacity': '1',
      'stroke-linecap': 'round', // butt, square, round
      'stroke-linejoin': 'round', // miter, round, bevel
      // 'stroke-dasharray': 'none', // '2,1'
      // 'stroke-dashoffset': '0', // 2
      // 'stroke-miterlimit': 4 // 8
    },
    attrsFill: {
      fill: 'transparent',
      'fill-opacity': '1',
    },
    // 'fill-rule': 'nonzero' // 'evenodd', 'nonzero' — this does not need the fill attr hence seperated
  }
  // defaults for shapes
  const defaultsShape: IDefaultsOptionsShape = {
    type: 'circle',
    ratios: {
      size: {
        options: {
          value: 1,
        },
      },
      radius: {
        options: {
          type: 'alternate',
          value: goldenRatio,
        },
      },
      intensity: {
        options: {},
      },
    },
    guides: {
      pattern: {
        ratios: {
          tile: 0.1,
          gap: 0.1,
        },
      },
    },
  }
  // defaults for svg elements
  const strokeWidthHalf = +defaultsSvgAttrs.attrsStroke['stroke-width'] / 2
  const sizeInner = defaultsOpts.size.inner
  const defaultsSvgElsAttrs: IDefaultsSvgEls = {
    rect: {
      x: String(0 + sizeInner / 2 / 2 + +defaultsSvgAttrs.attrsStroke['stroke-width'] / 2),
      y: String(0 + +defaultsSvgAttrs.attrsStroke['stroke-width'] / 2),
      width: String(sizeInner / 2),
      height: String(sizeInner),
      rx: String(0),
      ry: String(0),
      ...defaultsSvgAttrs.attrsStroke,
      ...defaultsSvgAttrs.attrsFill,
    },
    circle: {
      r: String(sizeInner / 2),
      cx: String(sizeInner / 2 + +defaultsSvgAttrs.attrsStroke['stroke-width'] / 2),
      cy: String(sizeInner / 2 + +defaultsSvgAttrs.attrsStroke['stroke-width'] / 2),
      ...defaultsSvgAttrs.attrsStroke,
      ...defaultsSvgAttrs.attrsFill,
    },
    ellipse: {
      rx: String(sizeInner / 4),
      ry: String(sizeInner / 2),
      cx: String(sizeInner / 2 + +defaultsSvgAttrs.attrsStroke['stroke-width'] / 2),
      cy: String(sizeInner / 2 + +defaultsSvgAttrs.attrsStroke['stroke-width'] / 2),
      ...defaultsSvgAttrs.attrsStroke,
      ...defaultsSvgAttrs.attrsFill,
    },
    line: {
      x1: String(sizeInner / 2),
      y1: String(strokeWidthHalf),
      x2: String(sizeInner / 2),
      y2: String(sizeInner - strokeWidthHalf),
      ...defaultsSvgAttrs.attrsStroke,
    },
    polyline: {
      points: `${sizeInner / 3}, ${sizeInner - strokeWidthHalf} 
              ${sizeInner / 3}, ${strokeWidthHalf}
              ${(sizeInner / 3) * 2}, ${strokeWidthHalf}
              ${(sizeInner / 3) * 2}, ${sizeInner - strokeWidthHalf}`,
      ...defaultsSvgAttrs.attrsStroke,
      ...defaultsSvgAttrs.attrsFill,
    },
    polygon: {
      points: `0, 0 ${sizeInner}, 0 ${sizeInner}, ${sizeInner}`,
      ...defaultsSvgAttrs.attrsStroke,
      ...defaultsSvgAttrs.attrsFill,
    },
    path: {
      d: `M ${sizeInner / 2}, ${strokeWidthHalf}
          C ${sizeInner / 2}, ${strokeWidthHalf + sizeInner / 4}
          ${sizeInner - strokeWidthHalf - sizeInner / 4}, ${sizeInner / 2}
          ${sizeInner - strokeWidthHalf}, ${sizeInner / 2}
          ${sizeInner - strokeWidthHalf - sizeInner / 4}, ${sizeInner / 2}
          ${sizeInner / 2},${sizeInner - strokeWidthHalf - sizeInner / 4}
          ${sizeInner / 2},${sizeInner - strokeWidthHalf}
          ${sizeInner / 2},${sizeInner - strokeWidthHalf - sizeInner / 4}
          ${0 + strokeWidthHalf + sizeInner / 4}, ${sizeInner / 2}
          ${0 + strokeWidthHalf}, ${sizeInner / 2}
          ${0 + strokeWidthHalf + sizeInner / 4}, ${sizeInner / 2}
          ${sizeInner / 2}, ${strokeWidthHalf + sizeInner / 4}
          ${sizeInner / 2}, ${strokeWidthHalf}
          Z
          `,
      ...defaultsSvgAttrs.attrsStroke,
      ...defaultsSvgAttrs.attrsFill,
      fill: 'none',
    },
    filter: {
      // TODO? adjust numbers based on element's size or something else
      filterUnits: 'userSpaceOnUse',
      x: '-50%',
      y: '-50%',
      width: '200%',
      height: '200%',
    },
    pattern: {
      patternUnits: 'userSpaceOnUse',
      patternContentUnits: 'userSpaceOnUse',
      width: String(size),
      height: String(size),
    },
    svg: {
      xmlns: 'http://www.w3.org/2000/svg',
      preserveAspectRatio: 'xMidYMid meet',
      viewBox: `0 0 ${size} ${size}`,
      width: '100%',
      height: '100%',
    },
  }

  // defaults for CSS properties
  const defaultsCss = {
    animation: {
      'animation-duration': duration,
      'animation-iteration-count': 'infinite',
      'animation-timing-function': 'linear',
      'transform-origin': `${size/2}px ${size/2}px`,
    },
  }

  return {
    defaultsOpts,
    defaultsSvgAttrs,
    defaultsShape,
    defaultsSvgElsAttrs,
    defaultsCss,
  }
}

export default makeDefaults
