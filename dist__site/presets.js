import d from "./tokens.js";
const c = (n, e) => {
  const o = [];
  for (let a = 0; a < n; a++) {
    const i = {}, r = (p, s) => {
      for (const t in p)
        if (Array.isArray(p[t]))
          if (p[t].length === 1)
            if (Array.isArray(p[t][0])) {
              s[t] = [];
              for (let h = 0; h < p[t][0].length; h++)
                s[t].push({}), r(p[t][0][h], s[t][h]);
            } else
              s[t] = p[t][0];
          else
            s[t] = p[t][a];
        else
          s[t] = {}, typeof p[t] == "string" ? s[t] = p[t] : r(p[t], s[t]);
    };
    r(e, i), o.push(i);
  }
  return o;
}, { color_gray_2: u } = { ...d.colors }, l = [
  {
    type: "circle",
    svg_attributes: {
      "stroke-width": "0",
      fill: u
    },
    ratios: [
      {
        type: "size",
        options: {
          value: 0.2
        }
      }
    ]
  },
  {
    type: "polygon",
    sides: 8,
    svg_attributes: {
      stroke: u
    }
  }
], y = () => ({
  element__svg_container: {
    css_properties: {
      width: "100%",
      height: "100%"
    }
  },
  shapes: l
}), _ = () => ({
  element__svg: {
    svg_attributes: {
      preserveAspectRatio: "xMidYMid slice"
    }
  },
  element__svg_container: {
    css_properties: {
      width: "100%",
      height: "100%",
      "z-index": "-1"
    }
  },
  shapes: [{
    type: "square",
    svg_attributes: {
      "stroke-width": "0"
    },
    guides: [
      {
        type: "pattern",
        options: {
          area: "fill",
          shapes: l
        }
      }
    ]
  }]
}), v = () => ({
  element__svg_container: {
    css_properties: {
      position: "fixed",
      top: "-48px",
      left: "-48px",
      width: "48px",
      height: "48px",
      "z-index": "10"
    }
  },
  shapes: l,
  interactions: [
    {
      type: "pointer"
    }
  ]
}), m = () => {
  const e = [], o = [];
  for (let s = 0; s < 60; s++)
    e.push(`hsl(${360 / 60 * s}, 100%, 40%)`), o.push(0.2 / 60 * (s + 1));
  const i = c(60, {
    type: ["polygon"],
    sides: [4],
    svg_attributes: {
      "stroke-width": ["0"],
      fill: e
    },
    ratios: [
      [
        {
          type: ["size"],
          options: {
            value: o
          }
        },
        {
          type: ["radius"],
          options: {
            type: ["alternate"],
            value: [0.4]
          }
        }
      ]
    ]
  });
  return {
    element__svg_container: {
      css_properties: {
        width: "100%",
        height: "100%"
      }
    },
    shapes: [
      {
        type: "polygon",
        sides: 60,
        svg_attributes: {
          "stroke-width": "0"
        },
        ratios: [
          {
            type: "radius",
            options: {
              type: "accumulate",
              value: 0.99
            }
          }
        ],
        guides: [
          {
            type: "position",
            options: {
              shapes: i
            }
          }
        ]
      }
    ]
  };
}, P = () => {
  const e = [], o = [];
  for (let s = 0; s < 20; s++)
    e.push(`hsl(${360 / 20 * s}, 100%, 40%)`), o.push(s % 2 === 0 ? 0.2 : 0.3);
  const i = c(20, {
    type: ["polygon"],
    sides: [8],
    svg_attributes: {
      "stroke-width": ["0"],
      fill: e
    },
    ratios: [
      [
        {
          type: ["size"],
          options: {
            value: o
          }
        },
        {
          type: ["radius"],
          options: {
            type: ["alternate"],
            value: [0.4]
          }
        }
      ]
    ]
  });
  return {
    element__svg_container: {
      css_properties: {
        width: "100%",
        height: "100%"
      }
    },
    shapes: [
      {
        type: "polygon",
        sides: 20,
        svg_attributes: {
          "stroke-width": "0"
        },
        ratios: [
          {
            type: "radius",
            options: {
              type: "alternate",
              value: 0.8
            }
          },
          {
            type: "size",
            options: {
              value: 0.8
            }
          }
        ],
        guides: [
          {
            type: "position",
            options: {
              shapes: i
            }
          }
        ]
      }
    ]
  };
}, f = () => {
  const e = [];
  for (let i = 0; i < 10; i++)
    e.push({
      type: "polygon",
      sides: 4,
      svg_attributes: {
        "stroke-width": "0.2",
        stroke: u
      },
      ratios: [
        {
          type: "size",
          options: {
            value: 0.5
          }
        }
      ]
    });
  return {
    element__svg_container: {
      css_properties: {
        width: "100%",
        height: "100%"
      }
    },
    shapes: [
      {
        type: "polygon",
        sides: 10,
        svg_attributes: {
          "stroke-width": "0"
        },
        ratios: [
          {
            type: "radius",
            options: {
              value: 1
            }
          },
          {
            type: "size",
            options: {
              value: 0.5
            }
          }
        ],
        guides: [
          {
            type: "position",
            options: {
              shapes: e
            }
          }
        ]
      }
    ]
  };
}, w = () => {
  const e = [];
  for (let s = 0; s < 4; s++)
    e.push(`hsl(${60 / 4 * s}, 100%, 40%)`);
  const a = c(4, {
    type: ["polygon"],
    sides: [14],
    svg_attributes: {
      "stroke-width": ["0"],
      fill: e
    },
    ratios: [
      [
        {
          type: ["size"],
          options: {
            value: [0.6]
          }
        },
        {
          type: ["radius"],
          options: {
            type: ["alternate"],
            value: [0.4]
          }
        }
      ]
    ]
  });
  return {
    element__svg_container: {
      css_properties: {
        width: "100%",
        height: "100%"
      }
    },
    shapes: [
      {
        type: "triangle",
        svg_attributes: {
          "stroke-width": "0"
        },
        guides: [
          {
            type: "pattern",
            options: {
              area: "fill",
              shapes: [
                {
                  type: "polygon",
                  sides: 4,
                  svg_attributes: {
                    "stroke-width": "0"
                  },
                  guides: [
                    {
                      type: "position",
                      options: {
                        shapes: a
                      }
                    }
                  ]
                }
              ],
              ratios: {
                gap: {
                  column: 0,
                  row: 0
                }
              }
            }
          }
        ]
      }
    ]
  };
}, N = () => {
  const o = c(3, {
    type: ["square"],
    sides: [5],
    svg_attributes: {
      "stroke-width": ["0", "0.2", "1"],
      stroke: ["hsl(160, 50%, 40%)"],
      fill: ["hsl(0, 100%, 40%)", "transparent", "transparent"]
    },
    ratios: [
      [
        {
          type: ["size"],
          options: {
            value: ["0.2", "0.7", "0.6"]
          }
        }
      ]
    ],
    animations: [
      [
        {
          preset: ["rotate"],
          css_properties: {
            "animation-direction": ["alternate", "alternate-reverse"],
            "animation-duration": ["40s"]
          }
        }
      ]
    ]
  });
  return o[0].type = "circle", o[0].effects = [{ preset: "glow" }], o[0].animations = void 0, {
    element__svg_container: {
      css_properties: {
        width: "100%",
        height: "100%"
      }
    },
    shapes: o
  };
};
export {
  m as presetAdvanced1,
  P as presetAdvanced2,
  f as presetAdvanced3,
  w as presetAdvanced4,
  N as presetAdvanced5,
  y as presetBasic1,
  _ as presetBasic2,
  v as presetBasic3
};
