/**
  * @license Pointerize
  * Copyright (c) 2022-present Abolfazl Faturechi
  * 
  * This source code is licensed under the MIT license found in the
  * LICENSE file at https://github.com/ize-er/pointerize.
  */
const $ = (i = 32) => {
  const s = "4s", n = {
    size: {
      inner: i,
      outer: i
    },
    interactions: {
      pointer: {
        element_selector__root: "body",
        default_pointer: !1,
        start_criteria: {
          criteria: "(pointer: fine)",
          frequency: "once"
        }
      }
    },
    system_preferences: {
      respect_reduced_motion: !1
    }
  }, r = {
    attrsStroke: {
      stroke: "#757575",
      "stroke-width": String(i / 20),
      "stroke-opacity": "1",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    },
    attrsFill: {
      fill: "transparent",
      "fill-opacity": "1"
    }
  }, o = {
    type: "circle",
    ratios: {
      size: {
        options: {
          value: 1
        }
      },
      radius: {
        options: {
          type: "alternate",
          value: 0.625
        }
      }
    },
    guides: {
      pattern: {
        ratios: {
          tile: 0.1,
          gap: 0.1
        }
      }
    }
  }, e = +r.attrsStroke["stroke-width"] / 2, t = n.size.inner, a = {
    rect: {
      x: String(0 + t / 2 / 2 + +r.attrsStroke["stroke-width"] / 2),
      y: String(0 + +r.attrsStroke["stroke-width"] / 2),
      width: String(t / 2),
      height: String(t),
      rx: String(0),
      ry: String(0),
      ...r.attrsStroke,
      ...r.attrsFill
    },
    circle: {
      r: String(t / 2),
      cx: String(t / 2 + +r.attrsStroke["stroke-width"] / 2),
      cy: String(t / 2 + +r.attrsStroke["stroke-width"] / 2),
      ...r.attrsStroke,
      ...r.attrsFill
    },
    ellipse: {
      rx: String(t / 4),
      ry: String(t / 2),
      cx: String(t / 2 + +r.attrsStroke["stroke-width"] / 2),
      cy: String(t / 2 + +r.attrsStroke["stroke-width"] / 2),
      ...r.attrsStroke,
      ...r.attrsFill
    },
    line: {
      x1: String(t / 2),
      y1: String(e),
      x2: String(t / 2),
      y2: String(t - e),
      ...r.attrsStroke
    },
    polyline: {
      points: `${t / 3}, ${t - e} 
              ${t / 3}, ${e}
              ${t / 3 * 2}, ${e}
              ${t / 3 * 2}, ${t - e}`,
      ...r.attrsStroke,
      ...r.attrsFill
    },
    polygon: {
      points: `0, 0 ${t}, 0 ${t}, ${t}`,
      ...r.attrsStroke,
      ...r.attrsFill
    },
    path: {
      d: `M ${t / 2}, ${e}
          C ${t / 2}, ${e + t / 4}
          ${t - e - t / 4}, ${t / 2}
          ${t - e}, ${t / 2}
          ${t - e - t / 4}, ${t / 2}
          ${t / 2},${t - e - t / 4}
          ${t / 2},${t - e}
          ${t / 2},${t - e - t / 4}
          ${0 + e + t / 4}, ${t / 2}
          ${0 + e}, ${t / 2}
          ${0 + e + t / 4}, ${t / 2}
          ${t / 2}, ${e + t / 4}
          ${t / 2}, ${e}
          Z
          `,
      ...r.attrsStroke,
      ...r.attrsFill,
      fill: "none"
    },
    filter: {
      filterUnits: "userSpaceOnUse",
      x: "-50%",
      y: "-50%",
      width: "200%",
      height: "200%"
    },
    pattern: {
      patternUnits: "userSpaceOnUse",
      patternContentUnits: "userSpaceOnUse",
      width: String(i),
      height: String(i)
    },
    svg: {
      xmlns: "http://www.w3.org/2000/svg",
      preserveAspectRatio: "xMidYMid meet",
      viewBox: `0 0 ${i} ${i}`,
      width: "100%",
      height: "100%"
    }
  }, l = {
    animation: {
      "animation-duration": s,
      "animation-iteration-count": "infinite",
      "animation-timing-function": "linear",
      "transform-origin": `${i / 2}px ${i / 2}px`
    }
  };
  return {
    defaultsOpts: n,
    defaultsSvgAttrs: r,
    defaultsShape: o,
    defaultsSvgElsAttrs: a,
    defaultsCss: l
  };
};
export {
  $ as default
};
