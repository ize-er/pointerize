
import type { IOptionsShape } from "../../types"
import makeDefaults from "../../make_defaults"


const { defaultsShape } = makeDefaults()

export const star = () => {
  const shape: IOptionsShape = {
    type: 'polygon',
    sides: 10,
    ratios: [
      {
        type: 'radius',
        options: {
          value: defaultsShape.ratios.radius.options.value
        }
      }
    ]
  }
  return shape
}