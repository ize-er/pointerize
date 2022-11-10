var rt = Object.defineProperty;
var ot = (s, e, i) => e in s ? rt(s, e, { enumerable: !0, configurable: !0, writable: !0, value: i }) : s[e] = i;
var j = (s, e, i) => (ot(s, typeof e != "symbol" ? e + "" : e, i), i), tt = (s, e, i) => {
  if (!e.has(s))
    throw TypeError("Cannot " + i);
};
var k = (s, e, i) => (tt(s, e, "read from private field"), i ? i.call(s) : e.get(s)), U = (s, e, i) => {
  if (e.has(s))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(s) : e.set(s, i);
};
var L = (s, e, i) => (tt(s, e, "access private method"), i);
/**
                    * @license Pointerize
                    * Copyright (c) 2022-present Abolfazl Faturechi
                    * 
                    * This source code is licensed under the MIT license found in the
                    * LICENSE file at https://github.com/ize-er/pointerize.
                    */
const O = (s = 32) => {
  const e = "4s", l = {
    size: {
      inner: s,
      outer: s
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
      "stroke-width": String(s / 20),
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
      },
      intensity: {
        options: {}
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
  }, n = +r.attrsStroke["stroke-width"] / 2, t = l.size.inner, a = {
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
      y1: String(n),
      x2: String(t / 2),
      y2: String(t - n),
      ...r.attrsStroke
    },
    polyline: {
      points: `${t / 3}, ${t - n} 
              ${t / 3}, ${n}
              ${t / 3 * 2}, ${n}
              ${t / 3 * 2}, ${t - n}`,
      ...r.attrsStroke,
      ...r.attrsFill
    },
    polygon: {
      points: `0, 0 ${t}, 0 ${t}, ${t}`,
      ...r.attrsStroke,
      ...r.attrsFill
    },
    path: {
      d: `M ${t / 2}, ${n}
          C ${t / 2}, ${n + t / 4}
          ${t - n - t / 4}, ${t / 2}
          ${t - n}, ${t / 2}
          ${t - n - t / 4}, ${t / 2}
          ${t / 2},${t - n - t / 4}
          ${t / 2},${t - n}
          ${t / 2},${t - n - t / 4}
          ${0 + n + t / 4}, ${t / 2}
          ${0 + n}, ${t / 2}
          ${0 + n + t / 4}, ${t / 2}
          ${t / 2}, ${n + t / 4}
          ${t / 2}, ${n}
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
      width: String(s),
      height: String(s)
    },
    svg: {
      xmlns: "http://www.w3.org/2000/svg",
      preserveAspectRatio: "xMidYMid meet",
      viewBox: `0 0 ${s} ${s}`,
      width: "100%",
      height: "100%"
    }
  }, p = {
    animation: {
      "animation-duration": e,
      "animation-iteration-count": "infinite",
      "animation-timing-function": "linear",
      "transform-origin": `${s / 2}px ${s / 2}px`
    }
  };
  return {
    defaultsOpts: l,
    defaultsSvgAttrs: r,
    defaultsShape: o,
    defaultsSvgElsAttrs: a,
    defaultsCss: p
  };
}, Y = (s, e, i = 1, l = !1) => {
  var o, n, t, a, p, d, c;
  const r = [];
  for (const _ of e) {
    let g = -1, w, A, S = -1, v, m, u;
    m = O(), u = m.defaultsShape;
    let h = u == null ? void 0 : u.ratios.size.options.value;
    if (Array.isArray(_.ratios))
      for (const y of _.ratios)
        y.type === "size" && (h = y.options.value);
    let f = s * h;
    m = O(f), u = m.defaultsShape;
    const $ = m.defaultsSvgAttrs;
    f -= +((n = (o = _.svg_attributes) == null ? void 0 : o["stroke-width"]) != null ? n : $.attrsStroke["stroke-width"]);
    let z = [];
    if (Array.isArray(_.ratios) && _.ratios.length) {
      z = _.ratios;
      let y = -1;
      for (const M of _.ratios)
        y++, M.type === "radius" && (g = y, A = M.options, w = M);
    }
    A = { ...u.ratios.radius.options, ...A }, _.type === "triangle" ? (A.value = (t = w == null ? void 0 : w.options.value) != null ? t : 1, w = { type: "radius", options: A }) : _.type === "polygon" && (A.value = (a = w == null ? void 0 : w.options.value) != null ? a : 1, w = { type: "radius", options: A }), w !== void 0 && (w = { type: "radius", options: A }, z.splice(g, 1, w));
    let E;
    if (Array.isArray(_.guides) && _.guides.length) {
      E = _.guides;
      let y = -1;
      for (const M of _.guides)
        y++, M.type === "pattern" && (S = y, v = {
          ...M,
          options: {
            ...M.options,
            ratios: {
              tile: u.guides.pattern.ratios.tile,
              ...(p = M.options) == null ? void 0 : p.ratios,
              gap: {
                row: u.guides.pattern.ratios.gap,
                column: u.guides.pattern.ratios.gap,
                ...(c = (d = M.options) == null ? void 0 : d.ratios) == null ? void 0 : c.gap
              }
            }
          }
        }, E.splice(S, 1, v));
    }
    i && (f *= i), r.push({
      ..._,
      size: f,
      ratios: z,
      guides: E,
      ...l && { animations: void 0 }
    });
  }
  return r;
}, nt = (s) => {
  var S, v, m, u, h, f, $, b, z, E, y, M, N;
  const { defaultsOpts: e, defaultsSvgElsAttrs: i } = O();
  let l = !1;
  (S = s.system_preferences) != null && S.respect_reduced_motion && matchMedia("(prefers-reduced-motion: reduce)").matches && (l = !0);
  const r = [];
  let o, n, t, a = -1, p = -1;
  if (Array.isArray(s.interactions)) {
    let P = -1;
    for (const C of s.interactions)
      P++, C.type === "pointer" ? (a = P, o = (v = C.options) == null ? void 0 : v.css_selector__root, n = (m = C.options) == null ? void 0 : m.default_pointer, t = (u = C.options) == null ? void 0 : u.start_criteria) : C.type === "pointer__scale" && (p = P);
  }
  o = (f = (h = s.css_selector__root) != null ? h : o) != null ? f : "body", n = n != null ? n : !1, t !== void 0 ? typeof t == "string" ? t === "none" ? t = "none" : t = {
    criteria: e.interactions.pointer.start_criteria.criteria,
    frequency: e.interactions.pointer.start_criteria.frequency
  } : typeof t == "object" ? t = {
    criteria: t.criteria || e.interactions.pointer.start_criteria.criteria,
    frequency: t.frequency || e.interactions.pointer.start_criteria.frequency
  } : t = e.interactions.pointer.start_criteria : t = e.interactions.pointer.start_criteria;
  const d = {
    type: "pointer",
    options: {
      css_selector__root: o,
      default_pointer: n,
      start_criteria: t
    }
  };
  a !== -1 && r.splice(a, 0, d), p !== -1 && s.interactions !== void 0 && r.splice(p, 0, s.interactions[p]);
  let c;
  if ((($ = s.size) == null ? void 0 : $.inner) !== void 0) {
    const P = s.size.inner, C = (b = s.size) == null ? void 0 : b.outer;
    P !== null ? C !== void 0 ? c = { ...e.size, inner: P, outer: C } : c = { ...e.size, inner: P } : C !== void 0 ? c = { ...e.size, outer: C } : c = e.size;
  } else
    ((z = s.size) == null ? void 0 : z.outer) !== void 0 ? c = { ...e.size, outer: (E = s.size) == null ? void 0 : E.outer } : c = e.size;
  const _ = (y = s.element__svg_container) == null ? void 0 : y.css_properties, g = { ...i.svg, ...(M = s.element__svg) == null ? void 0 : M.svg_attributes }, w = { ...(N = s.element__svg) == null ? void 0 : N.css_properties };
  let A;
  return Array.isArray(s.shapes) && s.shapes.length && (A = Y(c.inner, s.shapes, 1, l)), {
    ...e,
    ...s,
    css_selector__root: o,
    size: c,
    element__svg: {
      css_properties: w,
      svg_attributes: g
    },
    element__svg_container: {
      css_properties: _
    },
    shapes: A,
    interactions: r,
    ...l && { animations: void 0 }
  };
}, at = (s, e, i) => {
  let l = !1;
  function r(n, t) {
    l || window.requestAnimationFrame(function() {
      t(n), l = !0;
    }), l = !1;
  }
  const o = (n) => r(n, i);
  return s.addEventListener(e, o), o;
}, et = (s) => typeof s == "string" ? s : `${s}px`, q = function(s) {
  const e = document.createElementNS("http://www.w3.org/2000/svg", s.element);
  if (s.svg_attributes !== void 0)
    for (const i of Object.entries(s.svg_attributes))
      e.setAttribute(i[0], i[1]);
  if (s.element_children !== void 0)
    for (const i of s.element_children) {
      const l = q(i);
      e.appendChild(l);
    }
  return e;
};
class lt extends Error {
  constructor() {
    super(), this.message = "The root element could not be selected, please provide a different value.", this.name = this.constructor.name;
  }
}
class X extends Error {
  constructor(e, i) {
    super();
    const l = i.map((r) => `"${r}"`).join(", ");
    this.message = `for "${e}", you must specify one of: ${l}`, this.name = this.constructor.name;
  }
}
const { defaultsCss: ct, defaultsSvgElsAttrs: Q } = O(), T = {
  rotate: {
    css_properties: {
      ...ct.animation,
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
}, pt = {
  glow: {
    element: "filter",
    svg_attributes: {
      ...Q.filter
    },
    element_children: [
      {
        element: "feGaussianBlur",
        svg_attributes: {
          in: "SourceGraphic",
          stdDeviation: "0.2",
          result: "blur02"
        }
      },
      {
        element: "feGaussianBlur",
        svg_attributes: {
          in: "SourceGraphic",
          stdDeviation: "0.4",
          result: "blur04"
        }
      },
      {
        element: "feGaussianBlur",
        svg_attributes: {
          in: "SourceGraphic",
          stdDeviation: "1",
          result: "blur1"
        }
      },
      {
        element: "feMerge",
        element_children: [
          {
            element: "feMergeNode",
            svg_attributes: {
              in: "blur02"
            }
          },
          {
            element: "feMergeNode",
            svg_attributes: {
              in: "blur04"
            }
          },
          {
            element: "feMergeNode",
            svg_attributes: {
              in: "blur1"
            }
          }
        ],
        svg_attributes: {
          result: "blur-merged"
        }
      },
      {
        element: "feColorMatrix",
        svg_attributes: {
          result: "color-blur",
          in: "blur-merged",
          type: "matrix",
          values: `1 0 0 0 0
 0 1 0 0 0
 0 0 1 0 0
 0 0 0 1 0`
        }
      },
      {
        element: "feMerge",
        element_children: [
          {
            element: "feMergeNode",
            svg_attributes: {
              in: "color-blur"
            }
          },
          {
            element: "feMergeNode",
            svg_attributes: {
              in: "SourceGraphic"
            }
          }
        ]
      }
    ]
  }
}, _t = {
  circle: {
    element: "pattern",
    svg_attributes: {
      ...Q.pattern
    },
    element_children: [
      {
        element: "circle",
        svg_attributes: {
          ...Q.circle,
          r: "4",
          cx: "4",
          cy: "4"
        }
      }
    ]
  }
}, dt = (s, e, i, l) => {
  let r, o;
  const n = (e.width - s) / 2, t = (e.height - s) / 2, a = e.width / 2, p = e.height / 2;
  if (s < e.width && s < e.height)
    i !== void 0 ? (o = [i[l][0], i[l][1]], r = [i[l][0] - s / 2, i[l][1] - s / 2]) : (o = [a, p], r = [n, t]);
  else {
    const d = s / 2;
    i !== void 0 ? (o = [d + i[l][0], d + i[l][1]], r = [n + i[l][0], t + i[l][1]]) : (o = [d, d], r = [n, t]);
  }
  return {
    positionPolygon: o,
    positionRect: r
  };
}, B = (s, e, i, l, r = "string") => {
  const o = (n) => n.map((t) => t.join(",")).join(" ");
  if (e !== void 0) {
    const n = [];
    let t = s / 2;
    const a = 2 * Math.PI / i;
    let p;
    for (let d = 0; d <= i; d++) {
      e.type === "alternate" ? (t = s / 2, t = d % 2 === 0 ? t : t * e.value) : d !== 0 && (t = t * e.value), i % 2 !== 0 && (i % 3 === 1 || i % 3 === 0) ? p = Number((a * d + a / 4).toFixed(12)) : i % 2 !== 0 && (i % 3 === 1 || i % 3 === 2) ? p = Number((a * d - a / 4).toFixed(12)) : i % 2 === 0 && i % 4 !== 0 ? p = Number((a * d + a / 2).toFixed(12)) : p = Number((a * d).toFixed(12));
      const c = t * Math.cos(p) + l[0], _ = t * Math.sin(p) + l[1];
      n.push([c, _]);
    }
    return n.pop(), r === "string" ? o(n) : n;
  } else
    return null;
}, ft = (s, e) => {
  let i;
  (e == null ? void 0 : e.position) !== void 0 && (i = `${e.position[0]}px ${e.position[1]}px`);
  const l = s.preset, r = [];
  let o = -1;
  if (s.keyframes !== void 0)
    for (const t of s.keyframes) {
      o++;
      let a;
      l !== void 0 && (a = T[l].keyframes[o]), r.push({
        ...l && a,
        ...t,
        css_properties: {
          ...l && (a == null ? void 0 : a.css_properties),
          ...t.css_properties
        }
      });
    }
  else if (l !== void 0)
    for (const t of T[l].keyframes)
      o++, r.push({
        ...t,
        css_properties: {
          ...t.css_properties
        }
      });
  return {
    ...l && T[l],
    ...s,
    css_properties: {
      ...l && T[l].css_properties,
      ...i && { "transform-origin": i },
      ...s.css_properties
    },
    keyframes: r
  };
};
function ut(s, e, i) {
  const l = [], r = [];
  if (s !== void 0) {
    let o = -1;
    for (const n of s) {
      o++;
      let t, a;
      if (n.preset !== void 0) {
        a = `-_${i}__filter_${n.preset}_${e}th_${o}th`, l.push(a);
        const p = pt[n.preset];
        p.svg_attributes !== void 0 ? p.svg_attributes.id = a : p.svg_attributes = { id: a }, t = q(p);
      } else if (n.custom !== void 0) {
        a = `filter_custom_${e}th_${o}th`, l.push(a);
        const p = n.custom;
        p.svg_attributes !== void 0 ? p.svg_attributes.id = a : p.svg_attributes = { id: a }, t = q(p);
      } else
        throw new X("effect", ["preset", "custom"]);
      r.push(t);
    }
  }
  return { filterEls: r, filterIds: l };
}
function ht(s, e, i, l) {
  var r;
  if (e.animations !== void 0) {
    const o = [];
    let n = "";
    const t = {};
    for (const d of e.animations) {
      const c = ft(d, l);
      if (o.push(c), c !== null && c.css_properties !== void 0)
        for (const _ of Object.entries(c.css_properties))
          /^animation/.test(_[0]) && _[0] in t ? t[_[0]] += `,${_[1]}` : t[_[0]] = _[1];
    }
    n += `#${(r = i.parentElement) == null ? void 0 : r.id} #${s.id}{`;
    for (const d of Object.entries(t))
      n += `${d[0]}:${t[d[0]]};`;
    n += "}";
    for (const d of o)
      if (d !== null && d.css_properties !== void 0 && (d == null ? void 0 : d.keyframes) !== void 0) {
        n += `@keyframes ${d.css_properties["animation-name"]}{`;
        for (const c of d.keyframes) {
          n += `${c.keyframe_selector}{`;
          const _ = c.css_properties;
          if (_ !== void 0)
            for (const g of Object.entries(_))
              n += `${g[0]}:${g[1]};`;
          n += "}";
        }
        n += "}";
      }
    let p = i.querySelector(":scope > style");
    p === null && (p = document.createElement("style"), i.insertAdjacentElement("afterbegin", p)), p.textContent += n;
  }
}
const gt = (s, e, i, l, r, o) => {
  var c, _, g, w, A, S, v;
  const n = s.svg_attributes, t = s.effects, a = (c = r.parentElement) == null ? void 0 : c.id.match(/\dth/);
  let p;
  (o == null ? void 0 : o.parentId) !== void 0 ? p = `${o.parentId}__shape_${e}th_${s.type}` : p = `-_${a[0]}__shape_${e}th_${s.type}`;
  const d = document.createElementNS("http://www.w3.org/2000/svg", s.type);
  if (d.id = p, n !== void 0)
    for (const m of Object.entries(n))
      m[1] !== void 0 && d.setAttribute(m[0], m[1]);
  if (ht(d, s, r, (o == null ? void 0 : o.position) && { position: o == null ? void 0 : o.position }), t !== void 0) {
    const { filterEls: m, filterIds: u } = ut(t, e, a[0]);
    for (const f of m)
      i.insertAdjacentElement("afterbegin", f);
    const h = u.map((f) => `url(#${f})`).join(" ");
    d.setAttribute("filter", h);
  }
  if (s.guides !== void 0)
    for (const m of s.guides) {
      const u = m.options;
      if (m.type === "pattern" && u !== void 0) {
        let h = i.querySelector(":scope > defs");
        h = h != null ? h : document.createElementNS("http://www.w3.org/2000/svg", "defs");
        let f, $;
        if (u.preset !== void 0) {
          $ = `-_${a[0]}__pattern_${u.preset}_${e}th`;
          const b = _t[u.preset];
          b.svg_attributes !== void 0 ? b.svg_attributes.id = $ : b.svg_attributes = { id: $ }, f = q(b);
        } else if (u.custom !== void 0) {
          $ = `-_${a[0]}__pattern_custom_${e}th`;
          const b = u.custom;
          b.svg_attributes !== void 0 ? b.svg_attributes.id = $ : b.svg_attributes = { id: $ }, f = q(b);
        } else if (Array.isArray(u.shapes) && u.shapes.length) {
          const b = (_ = u.ratios) == null ? void 0 : _.tile, z = (w = (g = u.ratios) == null ? void 0 : g.gap) == null ? void 0 : w.row, E = (S = (A = u.ratios) == null ? void 0 : A.gap) == null ? void 0 : S.column, y = (v = s.svg_attributes) == null ? void 0 : v["stroke-width"];
          y !== void 0 && y !== "0" && (z > 0 || E > 0), l = (s.size - +(y || 0)) * b;
          const { defaultsSvgElsAttrs: M } = O(l);
          f = document.createElementNS("http://www.w3.org/2000/svg", "pattern"), $ = `-_${a[0]}__pattern_custom_${e}th`;
          const N = M.pattern;
          N.id = $;
          for (const R of Object.entries(N))
            f.setAttribute(R[0], R[1]);
          const P = E === 0 ? l : l + (s.size - +(y || 0)) * E, C = z === 0 ? l : l + (s.size - +(y || 0)) * z, W = {
            width: P,
            height: C
          };
          f.setAttribute("width", String(W.width)), f.setAttribute("height", String(W.height));
          const { defaultsOpts: st } = O(), I = Y(st.size.inner, u.shapes, b);
          if (u.area === "fill" && y !== void 0 && y !== "0") {
            f.setAttribute("x", y), f.setAttribute("y", y);
            for (const R of I)
              R.size -= +y * (2 * b);
          }
          const it = `-_${a[0]}__shape_${e}th__pat`;
          V(I, f, l, r, { sizeInnerCustom: W, parentId: it });
        } else
          throw new X("pattern guide options", ["shapes"]);
        u.area !== void 0 && d.setAttribute(u.area, `url(#${$})`), h.appendChild(f), i.insertAdjacentElement("afterbegin", h);
      }
      if (m.type === "position" && u !== void 0)
        if (Array.isArray(u.shapes) && u.shapes.length) {
          let h;
          if (s.sides !== void 0) {
            let b;
            for (const E of s.ratios)
              if (E.type === "radius") {
                b = {
                  type: E.options.type,
                  value: E.options.value
                };
                break;
              }
            const z = B(
              s.size,
              b,
              s.sides,
              o == null ? void 0 : o.position,
              "array"
            );
            z !== null && (h = z);
          }
          const f = Y(l, u.shapes), $ = `-_${a[0]}__shape_${e}th__pos`;
          V(f, i, l, r, { positionPoints: h, parentId: $ });
        } else
          throw new X("position guide options", ["shapes"]);
    }
  i.appendChild(d);
}, V = (s, e, i, l, r) => {
  var p, d;
  const { defaultsSvgElsAttrs: o, defaultsShape: n } = O(i), t = [];
  let a = -1;
  for (const c of s) {
    a++;
    let _;
    const g = c.size, w = (r == null ? void 0 : r.sizeInnerCustom) || { width: i, height: i }, A = r == null ? void 0 : r.positionPoints, S = dt(g, w, A, a), v = S.positionPolygon, m = S.positionRect;
    let u = n.ratios.radius.options;
    if (Array.isArray(c.ratios)) {
      for (const h of c.ratios)
        if (h.type === "radius") {
          u = h.options;
          break;
        }
    }
    switch (c.type) {
      case "rectangle": {
        const h = g * u.value, f = g, $ = m[0] + (g - h) / 2, b = m[1];
        _ = {
          ...c,
          type: "rect",
          svg_attributes: {
            ...o.rect,
            width: String(h),
            height: String(f),
            x: String($),
            y: String(b),
            ...c.svg_attributes
          }
        }, t.push([
          {
            ..._
          },
          a,
          v
        ]);
        break;
      }
      case "square": {
        _ = {
          ...c,
          type: "rect",
          svg_attributes: {
            ...o.rect,
            width: String(g),
            height: String(g),
            x: String(m[0]),
            y: String(m[1]),
            ...c.svg_attributes
          }
        }, t.push([
          {
            ..._
          },
          a,
          v
        ]);
        break;
      }
      case "circle": {
        const h = v[0], f = v[1];
        _ = {
          ...c,
          type: "circle",
          svg_attributes: {
            ...o.circle,
            r: String(g / 2),
            cx: String(h),
            cy: String(f),
            ...c.svg_attributes
          }
        }, t.push([
          {
            ..._
          },
          a,
          v
        ]);
        break;
      }
      case "ellipse": {
        const h = g / 2, f = h * u.value, $ = h, b = v[0], z = v[1];
        _ = {
          ...c,
          type: "ellipse",
          svg_attributes: {
            ...o.ellipse,
            rx: String(f),
            ry: String($),
            cx: String(b),
            cy: String(z),
            ...c.svg_attributes
          }
        }, t.push([
          {
            ..._
          },
          a,
          v
        ]);
        break;
      }
      case "triangle": {
        const f = B(c.size, u, 3, v, "string");
        f !== null && (_ = {
          ...c,
          type: "polygon",
          svg_attributes: {
            ...o.path,
            points: f,
            ...c.svg_attributes
          }
        }, t.push([
          {
            ..._
          },
          a,
          v
        ]));
        break;
      }
      case "polygon": {
        const h = c.sides;
        if (h !== void 0) {
          const f = B(c.size, u, h, v, "string");
          f !== null && (_ = {
            ...c,
            type: "polygon",
            svg_attributes: {
              ...o.polygon,
              points: f,
              ...c.svg_attributes
            }
          }, t.push([
            {
              ..._
            },
            a,
            v
          ]));
        }
        break;
      }
      case "star": {
        const f = g / 2, $ = B(f, u, 10, v, "string");
        $ !== null && (_ = {
          ...c,
          type: "polygon",
          svg_attributes: {
            ...o.polygon,
            points: $,
            ...c.svg_attributes
          }
        }, t.push([
          {
            ..._
          },
          a,
          v
        ]));
        break;
      }
      case "image": {
        let h, f;
        g < i ? (h = m[0] + g / 2 / 2, f = m[1]) : ((p = c.svg_attributes) != null && p.width ? h = (g - +c.svg_attributes.width) / 2 : h = g / 2 / 2, (d = c.svg_attributes) != null && d.height ? f = (g - +c.svg_attributes.height) / 2 : f = 0), _ = {
          ...c,
          type: "image",
          svg_attributes: {
            width: String(g / 2),
            height: String(g),
            x: String(h),
            y: String(f),
            ...c.svg_attributes
          }
        }, t.push([
          {
            ..._
          },
          a,
          v
        ]);
        break;
      }
      default:
        _ = {
          ...c,
          type: c.type,
          svg_attributes: {
            ...o[c.type],
            ...c.svg_attributes
          }
        }, t.push([
          {
            ..._
          },
          a,
          v
        ]);
    }
  }
  for (const c of t)
    gt(c[0], c[1], e, i, l, { parentId: r == null ? void 0 : r.parentId, position: c[2] });
};
var x, F, G, Z, H, J, D, K;
class vt {
  constructor(e) {
    U(this, G);
    U(this, H);
    U(this, D);
    j(this, "element__root");
    j(this, "options__merged");
    j(this, "element__svg");
    j(this, "element__svg_container");
    j(this, "id");
    U(this, x, {
      pointer: void 0,
      pointer__elements: {
        root: null
      },
      pointer__pointer__scale: void 0
    });
    U(this, F, []);
    var l, r;
    if (this.element__svg = null, this.options__merged = nt(e), this.element__svg_container = null, this.options__merged.interactions !== void 0)
      for (const o of this.options__merged.interactions)
        o.type === "pointer" && (k(this, x).pointer = o), o.type === "pointer__scale" && (k(this, x).pointer__pointer__scale = o);
    else
      k(this, x).pointer = void 0;
    const i = document.querySelector(this.options__merged.css_selector__root);
    if (!(i instanceof HTMLElement))
      throw new lt();
    this.element__root = i, ((r = (l = k(this, x).pointer) == null ? void 0 : l.options) == null ? void 0 : r.default_pointer) === !1 && this.element__root.classList.add("-_pointerize__pointer_default__non");
  }
  start() {
    var e, i, l, r, o, n, t;
    if (k(this, x).pointer !== void 0) {
      let a;
      const p = (d) => {
        a = d.matches, a ? (L(this, G, Z).call(this), L(this, H, J).call(this)) : this.element__svg_container !== null && this.stop();
      };
      if (typeof ((e = k(this, x).pointer.options) == null ? void 0 : e.start_criteria) == "string")
        ((i = k(this, x).pointer.options) == null ? void 0 : i.start_criteria) === "none" && (a = !0);
      else if (typeof ((l = k(this, x).pointer.options) == null ? void 0 : l.start_criteria) == "object" && typeof ((r = k(this, x).pointer.options) == null ? void 0 : r.start_criteria.criteria) == "string") {
        const d = matchMedia((o = k(this, x).pointer.options) == null ? void 0 : o.start_criteria.criteria);
        ((n = k(this, x).pointer.options) == null ? void 0 : n.start_criteria.frequency) === "once" ? p(d) : ((t = k(this, x).pointer.options) == null ? void 0 : t.start_criteria.frequency) === "always" && (this.element__svg_container === null && p(d), d.addEventListener("change", p));
      }
    } else
      L(this, G, Z).call(this), L(this, H, J).call(this);
  }
  stop() {
    var e, i, l;
    for (const r of k(this, F))
      r.element.removeEventListener(r.event, r.handler);
    (e = this.element__svg_container) == null || e.remove(), (l = (i = k(this, x).pointer) == null ? void 0 : i.options) != null && l.default_pointer || this.element__root.classList.remove("-_pointerize__pointer_default__non");
  }
  hide() {
    var e, i, l;
    (e = this.element__svg_container) == null || e.classList.add("-_pointerize-_u__display__non"), (l = (i = k(this, x).pointer) == null ? void 0 : i.options) != null && l.default_pointer || this.element__root.classList.remove("-_pointerize__pointer_default__non");
  }
  show() {
    var e, i;
    this.element__svg_container !== null && (this.element__svg_container.classList.remove("-_pointerize-_u__display__non"), (i = (e = k(this, x).pointer) == null ? void 0 : e.options) != null && i.default_pointer || this.element__root.classList.add("-_pointerize__pointer_default__non"));
  }
}
x = new WeakMap(), F = new WeakMap(), G = new WeakSet(), Z = function() {
  var d, c, _, g, w, A;
  const e = document.createElement("div");
  this.element__svg_container = e;
  let i;
  const l = Array.from(document.querySelectorAll("[id*=-_pointerize__container]"));
  if (l.length === 0)
    i = "0";
  else {
    let S = -1;
    for (const v of l) {
      const m = +((_ = (c = (d = v.getAttribute("id")) == null ? void 0 : d.match(/(?<number>\d+)th$/)) == null ? void 0 : c.groups) == null ? void 0 : _.number);
      m > S && (S = m);
    }
    i = S + 1;
  }
  const r = `-_pointerize__container_${i}th`;
  e.id = r, this.id = r, e.classList.add("-_pointerize__container");
  const o = et(this.options__merged.size.outer);
  e.style.width = o, e.style.height = o;
  const n = (g = this.options__merged.element__svg_container) == null ? void 0 : g.css_properties;
  if (n !== void 0)
    for (const S of Object.entries(n))
      e.style.setProperty(S[0], S[1]);
  k(this, x).pointer !== void 0 && (e.style.setProperty("transform", "translate(-50%, -50%)"), e.style.setProperty("pointer-events", "none"), e.setAttribute("aria-hidden", ""));
  const t = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  this.element__svg = t;
  const a = (w = this.options__merged.element__svg) == null ? void 0 : w.svg_attributes, p = (A = this.options__merged.element__svg) == null ? void 0 : A.css_properties;
  if (a !== void 0)
    for (const S of Object.entries(a))
      t.setAttribute(S[0], S[1]);
  if (p !== void 0)
    for (const S of Object.entries(p))
      t.style.setProperty(S[0], S[1]);
  t.setAttribute("viewBox", `0 0 ${this.options__merged.size.inner} ${this.options__merged.size.inner}`), e.appendChild(t), Array.isArray(this.options__merged.shapes) && V(this.options__merged.shapes, t, this.options__merged.size.inner, t), this.element__root.appendChild(e);
}, H = new WeakSet(), J = function() {
  var i, l;
  if (this.options__merged.interactions !== void 0) {
    for (const r of this.options__merged.interactions)
      if (r.type === "pointer__scale" && ((i = r.options) == null ? void 0 : i.elements) !== void 0) {
        if ((l = r.options) != null && l.elements.length) {
          const n = [];
          for (const a of r.options.elements) {
            const p = Array.from(document.querySelectorAll(a));
            n.push(...p);
          }
          const t = (a) => {
            if (a.length > 0) {
              for (const p of a)
                if (p instanceof HTMLElement) {
                  p.dataset.pointerize = "pointer__scale__child";
                  const d = Array.from(p.children);
                  d.length > 0 && t(d);
                }
            }
          };
          for (const a of n)
            if (a instanceof HTMLElement) {
              a.dataset.pointerize = "pointer__scale";
              const p = Array.from(a.children);
              t(p);
            }
        }
        const o = this.element__svg_container;
        o.addEventListener("transitionend", () => {
          o.classList.remove("-_pointerize__container__hover__temp");
        });
      }
  }
  const e = (r) => {
    var t;
    const o = this.element__svg_container, n = r.target;
    if (n.dataset.pointerize === "pointer__scale") {
      const a = n.getBoundingClientRect();
      o.classList.contains("-_pointerize__container") && (o.classList.add("-_pointerize__container__hover__temp"), o.classList.add("-_pointerize__container__hover"), o.style.height = `${a.height}px`, o.style.width = `${a.width}px`, o.style.top = `${a.top + a.height / 2}px`, o.style.left = `${a.left + a.width / 2}px`);
    } else if (n.dataset.pointerize !== "pointer__scale__child") {
      if (o.classList.contains("-_pointerize__container__hover")) {
        o.classList.remove("-_pointerize__container__hover");
        const a = et(this.options__merged.size.outer);
        o.style.width = o.style.height = a;
      }
      L(this, D, K).call(this, o, r);
    }
    /pointer__scale/.test((t = n.dataset.pointerize) != null ? t : "") || L(this, D, K).call(this, o, r);
  };
  if (k(this, x).pointer !== void 0) {
    const r = at(this.element__root, "pointermove", e);
    k(this, F).push({
      element: this.element__root,
      event: "pointerMove",
      handler: r
    });
  }
}, D = new WeakSet(), K = function(e, i) {
  e.style.left = `${i.clientX}px`, e.style.top = `${i.clientY}px`;
};
export {
  vt as default
};
