

import makeDefaults from '../make_defaults'
import type { IPresetPattern } from '../types'

const { defaultsSvgElsAttrs } = makeDefaults()

export const circle = () => {
  const preset: IPresetPattern = {
    type: 'circle',
    data: {
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
    }
  }
  return preset
}