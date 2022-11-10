import d from "./tokens.js";
const c = (n, e) => {
  const i = [];
  for (let o = 0; o < n; o++) {
    const a = {}, r = (p, s) => {
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
            s[t] = p[t][o];
        else
          s[t] = {}, typeof p[t] == "string" ? s[t] = p[t] : r(p[t], s[t]);
    };
    r(e, a), i.push(a);
  }
  return i;
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
      height: "48px"
    }
  },
  shapes: l,
  interactions: [
    {
      type: "pointer"
    }
  ]
}), m = () => {
  const e = [
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
          type: "position"
        }
      ]
    }
  ], i = [], o = [];
  for (let s = 0; s < 60; s++)
    i.push(`hsl(${360 / 60 * s}, 100%, 40%)`), o.push(0.2 / 60 * (s + 1));
  const r = c(60, {
    type: ["polygon"],
    sides: [4],
    svg_attributes: {
      "stroke-width": ["0"],
      fill: i
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
  for (const s of r)
    e.push(s);
  return {
    element__svg_container: {
      css_properties: {
        width: "100%",
        height: "100%"
      }
    },
    shapes: e
  };
}, P = () => {
  const e = [
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
          type: "position"
        }
      ]
    }
  ], i = [], o = [];
  for (let s = 0; s < 20; s++)
    i.push(`hsl(${360 / 20 * s}, 100%, 40%)`), o.push(s % 2 === 0 ? 0.2 : 0.3);
  const r = c(20, {
    type: ["polygon"],
    sides: [8],
    svg_attributes: {
      "stroke-width": ["0"],
      fill: i
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
  for (const s of r)
    e.push(s);
  return {
    element__svg_container: {
      css_properties: {
        width: "100%",
        height: "100%"
      }
    },
    shapes: e
  };
}, f = () => {
  const e = [
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
          type: "position"
        }
      ]
    }
  ];
  for (let o = 0; o < 10; o++)
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
    shapes: e
  };
}, N = () => {
  const e = [
    {
      type: "polygon",
      sides: 4,
      svg_attributes: {
        "stroke-width": "0"
      },
      guides: [
        {
          type: "position"
        }
      ]
    }
  ], i = [];
  for (let s = 0; s < 4; s++)
    i.push(`hsl(${60 / 4 * s}, 100%, 40%)`);
  const a = c(4, {
    type: ["polygon"],
    sides: [14],
    svg_attributes: {
      "stroke-width": ["0"],
      fill: i
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
  for (const s of a)
    e.push(s);
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
              shapes: e,
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
}, w = () => {
  const e = [], i = [], o = [], a = [];
  for (let t = 0; t < 4; t++)
    e.push(`hsl(${360 / 4 * t}, 100%, 40%)`), i.push(0.7 / 4 * t + 0.3), o.push(t + 3), a.push(t % 2 === 0 ? "alternate" : "alternate-reverse");
  const p = c(4, {
    type: ["polygon"],
    sides: o,
    svg_attributes: {
      "stroke-width": ["0.5"],
      stroke: e
    },
    ratios: [
      [
        {
          type: ["size"],
          options: {
            value: i
          }
        }
      ]
    ],
    effects: [
      [
        {
          preset: ["glow"]
        }
      ]
    ],
    animations: [
      [
        {
          preset: ["rotate"],
          css_properties: {
            "animation-direction": a,
            "animation-duration": ["40s"]
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
    shapes: p
  };
};
export {
  m as presetAdvanced1,
  P as presetAdvanced2,
  f as presetAdvanced3,
  N as presetAdvanced4,
  w as presetAdvanced5,
  y as presetBasic1,
  _ as presetBasic2,
  v as presetBasic3
};
