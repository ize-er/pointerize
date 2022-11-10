import type { IPresetsEffects } from '../types'
import makeDefaults from '../make_defaults'

/**
 * Here contains presets for various options
 */
const { defaultsCss, defaultsSvgElsAttrs } = makeDefaults()

export const presetsAnimation = {
  rotate: {
    css_properties: {
      ...defaultsCss.animation,
      'animation-name': 'rotate'
    },
    keyframes: [
      {
        keyframe_selector: '0%',
        css_properties: {
          transform: `rotate(0deg)`,
        },
      },
      {
        keyframe_selector: '100%',
        css_properties: {
          transform: `rotate(360deg)`,
        },
      },
    ],
  },
}

export const presetsEffects: IPresetsEffects = {
  glow: {
    element: 'filter',
    svg_attributes: {
      ...defaultsSvgElsAttrs.filter,
    },
    element_children: [
      {
        element: 'feGaussianBlur',
        svg_attributes: {
          in: 'SourceGraphic',
          stdDeviation: '0.2',
          result: 'blur02',
        },
      },
      {
        element: 'feGaussianBlur',
        svg_attributes: {
          in: 'SourceGraphic',
          stdDeviation: '0.4',
          result: 'blur04',
        },
      },
      {
        element: 'feGaussianBlur',
        svg_attributes: {
          in: 'SourceGraphic',
          stdDeviation: '1',
          result: 'blur1',
        },
      },
      {
        element: 'feMerge',
        element_children: [
          {
            element: 'feMergeNode',
            svg_attributes: {
              in: 'blur02',
            },
          },
          {
            element: 'feMergeNode',
            svg_attributes: {
              in: 'blur04',
            },
          },
          {
            element: 'feMergeNode',
            svg_attributes: {
              in: 'blur1',
            },
          },
        ],
        svg_attributes: {
          result: 'blur-merged',
        },
      },
      {
        element: 'feColorMatrix',
        svg_attributes: {
          result: 'color-blur',
          in: 'blur-merged',
          type: 'matrix',
          values: '1 0 0 0 0\n 0 1 0 0 0\n 0 0 1 0 0\n 0 0 0 1 0',
        },
      },
      {
        element: 'feMerge',
        element_children: [
          {
            element: 'feMergeNode',
            svg_attributes: {
              in: 'color-blur',
            },
          },
          {
            element: 'feMergeNode',
            svg_attributes: {
              in: 'SourceGraphic',
            },
          },
        ],
      },
    ],
  },
}

export const presetsPatterns = {
  circle: {
    element: 'pattern',
    svg_attributes: {
      ...defaultsSvgElsAttrs.pattern,
    },
    element_children: [
      {
        element: 'circle',
        svg_attributes: {
          ...defaultsSvgElsAttrs.circle,
          r: '4',
          cx: '4',
          cy: '4',
        },
      },
    ],
  },
}
