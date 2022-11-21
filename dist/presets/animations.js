import e from "./defaults.js";
/**
  * @license Pointerize
  * Copyright (c) 2022-present Abolfazl Faturechi
  * 
  * This source code is licensed under the MIT license found in the
  * LICENSE file at https://github.com/ize-er/pointerize.
  */
const { defaultsCss: t } = e(), a = () => ({
  type: "rotate",
  data: {
    css_properties: {
      ...t.animation,
      "animation-name": "rotate"
    },
    keyframes: [
      {
        keyframe_selector: "0%",
        css_properties: {
          transform: "rotate(0deg)"
        }
      },
      {
        keyframe_selector: "100%",
        css_properties: {
          transform: "rotate(360deg)"
        }
      }
    ]
  }
});
export {
  a as animationRotate
};
