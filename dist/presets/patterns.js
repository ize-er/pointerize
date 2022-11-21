import e from "./defaults.js";
/**
  * @license Pointerize
  * Copyright (c) 2022-present Abolfazl Faturechi
  * 
  * This source code is licensed under the MIT license found in the
  * LICENSE file at https://github.com/ize-er/pointerize.
  */
const { defaultsSvgElsAttrs: t } = e(), c = () => ({
  type: "circle",
  data: {
    element: "pattern",
    svg_attributes: {
      ...t.pattern
    },
    element_children: [
      {
        element: "circle",
        svg_attributes: {
          ...t.circle,
          r: "4",
          cx: "4",
          cy: "4"
        }
      }
    ]
  }
});
export {
  c as patternCircle
};
