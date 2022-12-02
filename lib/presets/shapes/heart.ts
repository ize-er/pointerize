

import makeDefaults from "../../make_defaults"
import type { IOptionsShape } from "../../types"


const { defaultsSvgAttrs, defaultsOpts } = makeDefaults()

export const heart = () => {
  const strokeWidthHalf = Number(defaultsSvgAttrs.attrsStroke["stroke-width"])/2
  const size = defaultsOpts.size.inner
  const archChangeHor = size/4/2/2
  const archChangeVer = size/4/1.2
  const shape: IOptionsShape = {
    type: 'path',
    svg_attributes: {
      d:  `M ${size/2} ${size/4/2} `+
          `A ${size/4} ${size/4}, ${0}, ${0}, ${1}, ${size - strokeWidthHalf - archChangeHor} ${size/4 + archChangeVer} `+
          `L ${size/2} ${size - strokeWidthHalf} `+
          `L ${0 + strokeWidthHalf + archChangeHor} ${size/4 + archChangeVer} `+
          `A ${size/4} ${size/4}, ${0}, ${0}, ${1}, ${size/2} ${size/4/2} `+
          `Z`
    }
  }
  return shape
}