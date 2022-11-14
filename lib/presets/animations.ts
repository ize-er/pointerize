
import type { IPresetAnimation } from '../types'
import makeDefaults from '../make_defaults'

const { defaultsCss } = makeDefaults()

export const rotate = () => {
  const preset: IPresetAnimation = {
    type: 'rotate',
    data: {
      css_properties: {
        ...defaultsCss.animation,
        'animation-name': 'rotate',
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
    }
  }
  return preset
}