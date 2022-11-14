
import type { IPresetEffect } from '../types'
import makeDefaults from '../make_defaults'

const { defaultsSvgElsAttrs } = makeDefaults()

export const glow = () => {
  const preset: IPresetEffect = {
    type: 'glow',
    data: {
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
    }
  }
  return preset
}