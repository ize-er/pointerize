
import type { IOptionsShape } from "../../types"
import makeDefaults from "../../make_defaults"


const { defaultsShape } = makeDefaults()

// rhombus: parallelogram, equilateral quadrilateral, tilted square
export const rhombus = () => {
  const shape: IOptionsShape = {
    type: 'polygon',
    sides: 4,
    ratios: [
      {
        type: 'radius',
        options: {
          type: 'alternate',
          value: defaultsShape.ratios.radius.options.value
        }
      }
    ]
  }
  return shape
}