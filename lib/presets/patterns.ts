

import makeDefaults from '../make_defaults'

const { defaultsSvgElsAttrs } = makeDefaults()

export const circle = () => {
  return {
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
}