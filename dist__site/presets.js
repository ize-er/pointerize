import u from "./tokens.js";
/**
  * @license Pointerize
  * Copyright (c) 2022-present Abolfazl Faturechi
  * 
  * This source code is licensed under the MIT license found in the
  * LICENSE file at https://github.com/ize-er/pointerize.
  */
const { color_gray_2: a } = { ...u.colors }, n = [
  {
    type: "circle",
    svg_attributes: {
      "stroke-width": "0",
      fill: a
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
      stroke: a
    }
  }
], c = () => ({
  element__svg_container: {
    css_properties: {
      width: "100%",
      height: "100%"
    }
  },
  shapes: n
}), d = () => ({
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
          shapes: n
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
  shapes: n,
  interactions: [
    {
      type: "pointer"
    }
  ]
}), _ = () => {
  const s = [], e = [];
  for (let t = 0; t < 60; t++)
    s.push({
      "stroke-width": "0",
      fill: `hsl(${360 / 60 * t}, 100%, 40%)`
    }), e.push([
      {
        type: "size",
        options: {
          value: 0.2 / 60 * (t + 1)
        }
      },
      {
        type: "radius",
        options: {
          type: "alternate",
          value: 0.4
        }
      }
    ]);
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
              shapes: [
                {
                  make_multiple: [
                    {
                      type: "shapes",
                      options: {
                        number: 60,
                        value: {
                          type: ["polygon"],
                          sides: [4],
                          svg_attributes: s,
                          ratios: e
                        }
                      }
                    }
                  ]
                }
              ]
            }
          }
        ]
      }
    ]
  };
}, y = () => {
  const s = [], e = [];
  for (let t = 0; t < 20; t++)
    s.push({
      "stroke-width": "0",
      fill: `hsl(${360 / 20 * t}, 100%, 40%)`
    }), e.push([
      {
        type: "size",
        options: {
          value: t % 2 === 0 ? 0.2 : 0.3
        }
      },
      {
        type: "radius",
        options: {
          type: "alternate",
          value: 0.4
        }
      }
    ]);
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
              shapes: [
                {
                  make_multiple: [
                    {
                      type: "shapes",
                      options: {
                        number: 20,
                        value: {
                          type: ["polygon"],
                          sides: [8],
                          svg_attributes: s,
                          ratios: e
                        }
                      }
                    }
                  ]
                }
              ]
            }
          }
        ]
      }
    ]
  };
}, g = () => ({
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
            shapes: [
              {
                make_multiple: [
                  {
                    type: "shapes",
                    options: {
                      number: 10,
                      value: {
                        type: ["polygon"],
                        sides: [4],
                        svg_attributes: [
                          {
                            "stroke-width": "0.2",
                            stroke: a
                          }
                        ],
                        ratios: [
                          [
                            {
                              type: "size",
                              options: {
                                value: 0.5
                              }
                            }
                          ]
                        ]
                      }
                    }
                  }
                ]
              }
            ]
          }
        }
      ]
    }
  ]
}), m = () => {
  const s = [], e = [];
  for (let i = 0; i < 4; i++)
    s.push({
      "stroke-width": "0",
      fill: `hsl(${60 / 4 * i}, 100%, 40%)`
    }), e.push([
      {
        type: "size",
        options: {
          value: 0.6
        }
      },
      {
        type: "radius",
        options: {
          type: "alternate",
          value: 0.4
        }
      }
    ]);
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
                        shapes: [
                          {
                            make_multiple: [
                              {
                                type: "shapes",
                                options: {
                                  number: 4,
                                  value: {
                                    type: ["polygon"],
                                    sides: [14],
                                    svg_attributes: s,
                                    ratios: e
                                  }
                                }
                              }
                            ]
                          }
                        ]
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
}, P = () => ({
  element__svg_container: {
    css_properties: {
      width: "100%",
      height: "100%"
    }
  },
  shapes: [
    {
      make_multiple: [
        {
          type: "shapes",
          options: {
            number: 3,
            value: {
              type: ["circle", "square", "square"],
              sides: [void 0, 5, 5],
              svg_attributes: [
                {
                  "stroke-width": "0",
                  stroke: "hsl(160, 50%, 40%)",
                  fill: "hsl(0, 100%, 40%)"
                },
                {
                  "stroke-width": "0.2",
                  stroke: "hsl(160, 50%, 40%)",
                  fill: "transparent"
                },
                {
                  "stroke-width": "1",
                  stroke: "hsl(160, 50%, 40%)",
                  fill: "transparent"
                }
              ],
              ratios: [
                [
                  {
                    type: "size",
                    options: {
                      value: 0.2
                    }
                  }
                ],
                [
                  {
                    type: "size",
                    options: {
                      value: 0.7
                    }
                  }
                ],
                [
                  {
                    type: "size",
                    options: {
                      value: 0.6
                    }
                  }
                ]
              ],
              animations: [
                void 0,
                [
                  {
                    preset: "rotate",
                    css_properties: {
                      "animation-direction": "normal",
                      "animation-duration": "40s"
                    }
                  }
                ],
                [
                  {
                    preset: "rotate",
                    css_properties: {
                      "animation-direction": "alternate-reverse",
                      "animation-duration": "40s"
                    }
                  }
                ]
              ],
              effects: [
                [
                  {
                    preset: "glow"
                  }
                ],
                void 0,
                void 0
              ]
            }
          }
        }
      ]
    }
  ]
});
export {
  _ as presetAdvanced1,
  y as presetAdvanced2,
  g as presetAdvanced3,
  m as presetAdvanced4,
  P as presetAdvanced5,
  c as presetBasic1,
  d as presetBasic2,
  v as presetBasic3
};
