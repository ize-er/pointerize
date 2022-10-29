var ot = Object.defineProperty;
var nt = (s, e, i) => e in s ? ot(s, e, { enumerable: !0, configurable: !0, writable: !0, value: i }) : s[e] = i;
var j = (s, e, i) => (nt(s, typeof e != "symbol" ? e + "" : e, i), i), V = (s, e, i) => {
  if (!e.has(s))
    throw TypeError("Cannot " + i);
};
var k = (s, e, i) => (V(s, e, "read from private field"), i ? i.call(s) : e.get(s)), N = (s, e, i) => {
  if (e.has(s))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(s) : e.set(s, i);
};
var L = (s, e, i) => (V(s, e, "access private method"), i);
/**
                    * @license Pointerize
                    * Copyright (c) 2022-present Abolfazl Faturechi
                    * 
                    * This source code is licensed under the MIT license found in the
                    * LICENSE file at https://github.com/ize-er/pointerize.
                    */
const O = (s = 32) => {
  const e = "4s", p = {
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
  }, l = {
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
  }, o = +r.attrsStroke["stroke-width"] / 2, t = p.size.inner, a = {
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
      y1: String(o),
      x2: String(t / 2),
      y2: String(t - o),
      ...r.attrsStroke
    },
    polyline: {
      points: `${t / 3}, ${t - o} 
              ${t / 3}, ${o}
              ${t / 3 * 2}, ${o}
              ${t / 3 * 2}, ${t - o}`,
      ...r.attrsStroke,
      ...r.attrsFill
    },
    polygon: {
      points: `0, 0 ${t}, 0 ${t}, ${t}`,
      ...r.attrsStroke,
      ...r.attrsFill
    },
    path: {
      d: `M ${t / 2}, ${o}
          C ${t / 2}, ${o + t / 4}
          ${t - o - t / 4}, ${t / 2}
          ${t - o}, ${t / 2}
          ${t - o - t / 4}, ${t / 2}
          ${t / 2},${t - o - t / 4}
          ${t / 2},${t - o}
          ${t / 2},${t - o - t / 4}
          ${0 + o + t / 4}, ${t / 2}
          ${0 + o}, ${t / 2}
          ${0 + o + t / 4}, ${t / 2}
          ${t / 2}, ${o + t / 4}
          ${t / 2}, ${o}
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
  };
  return {
    defaultsOpts: p,
    defaultsSvgAttrs: r,
    defaultsShape: l,
    defaultsSvgElsAttrs: a,
    defaultsCss: {
      animation: {
        "animation-duration": e,
        "animation-iteration-count": "infinite",
        "animation-timing-function": "linear",
        "transform-origin": "0px 0px"
      }
    }
  };
}, et = (s, e, i = 1, p = !1) => {
  var l, o, t, a, c, _, h;
  const r = [];
  for (const n of e) {
    let m = -1, d, v, S = -1, w, g, y;
    g = O(), y = g.defaultsShape;
    let b = y == null ? void 0 : y.ratios.size.options.value;
    if (Array.isArray(n.ratios))
      for (const M of n.ratios)
        M.type === "size" && (b = M.options.value);
    let f = s * b;
    g = O(f), y = g.defaultsShape;
    const u = g.defaultsSvgAttrs;
    f -= +((o = (l = n.svg_attributes) == null ? void 0 : l["stroke-width"]) != null ? o : u.attrsStroke["stroke-width"]);
    let E = [];
    if (Array.isArray(n.ratios) && n.ratios.length) {
      E = n.ratios;
      let M = -1;
      for (const x of n.ratios)
        M++, x.type === "radius" && (m = M, v = x.options, d = x);
    }
    v = { ...y.ratios.radius.options, ...v }, n.type === "triangle" ? (v.value = (t = d == null ? void 0 : d.options.value) != null ? t : 1, d = { type: "radius", options: v }) : n.type === "polygon" && (v.value = (a = d == null ? void 0 : d.options.value) != null ? a : 1, d = { type: "radius", options: v }), d !== void 0 && (d = { type: "radius", options: v }, E.splice(m, 1, d));
    let $;
    if (Array.isArray(n.guides) && n.guides.length) {
      $ = n.guides;
      let M = -1;
      for (const x of n.guides)
        M++, x.type === "pattern" && (S = M, w = {
          ...x,
          options: {
            ...x.options,
            ratios: {
              tile: y.guides.pattern.ratios.tile,
              ...(c = x.options) == null ? void 0 : c.ratios,
              gap: {
                row: y.guides.pattern.ratios.gap,
                column: y.guides.pattern.ratios.gap,
                ...(h = (_ = x.options) == null ? void 0 : _.ratios) == null ? void 0 : h.gap
              }
            }
          }
        }, $.splice(S, 1, w));
    }
    i && (f *= i), r.push({
      ...n,
      size: f,
      ratios: E,
      guides: $,
      ...p && { animations: void 0 }
    });
  }
  return r;
}, at = (s) => {
  var S, w, g, y, b, f, u, z, E, $, M, x, D;
  const { defaultsOpts: e, defaultsSvgElsAttrs: i } = O();
  let p = !1;
  (S = s.system_preferences) != null && S.respect_reduced_motion && matchMedia("(prefers-reduced-motion: reduce)").matches && (p = !0);
  const r = [];
  let l, o, t, a = -1, c = -1;
  if (Array.isArray(s.interactions)) {
    let C = -1;
    for (const P of s.interactions)
      C++, P.type === "pointer" ? (a = C, l = (w = P.options) == null ? void 0 : w.css_selector__root, o = (g = P.options) == null ? void 0 : g.default_pointer, t = (y = P.options) == null ? void 0 : y.start_criteria) : P.type === "pointer__scale" && (c = C);
  }
  l = (f = (b = s.css_selector__root) != null ? b : l) != null ? f : "body", o = o != null ? o : !1, t !== void 0 ? typeof t == "string" ? t === "none" ? t = "none" : t = {
    criteria: e.interactions.pointer.start_criteria.criteria,
    frequency: e.interactions.pointer.start_criteria.frequency
  } : typeof t == "object" ? t = {
    criteria: t.criteria || e.interactions.pointer.start_criteria.criteria,
    frequency: t.frequency || e.interactions.pointer.start_criteria.frequency
  } : t = e.interactions.pointer.start_criteria : t = e.interactions.pointer.start_criteria;
  const _ = {
    type: "pointer",
    options: {
      css_selector__root: l,
      default_pointer: o,
      start_criteria: t
    }
  };
  a !== -1 && r.splice(a, 0, _), c !== -1 && s.interactions !== void 0 && r.splice(c, 0, s.interactions[c]);
  let h;
  if (((u = s.size) == null ? void 0 : u.inner) !== void 0) {
    const C = s.size.inner, P = (z = s.size) == null ? void 0 : z.outer;
    C !== null ? P !== void 0 ? h = { ...e.size, inner: C, outer: P } : h = { ...e.size, inner: C } : P !== void 0 ? h = { ...e.size, outer: P } : h = e.size;
  } else
    ((E = s.size) == null ? void 0 : E.outer) !== void 0 ? h = { ...e.size, outer: ($ = s.size) == null ? void 0 : $.outer } : h = e.size;
  const n = (M = s.element__svg_container) == null ? void 0 : M.css_properties, m = { ...i.svg, ...(x = s.element__svg) == null ? void 0 : x.svg_attributes }, d = { ...(D = s.element__svg) == null ? void 0 : D.css_properties };
  let v;
  return Array.isArray(s.shapes) && s.shapes.length && (v = et(h.inner, s.shapes, 1, p)), {
    ...e,
    ...s,
    css_selector__root: l,
    size: h,
    element__svg: {
      css_properties: d,
      svg_attributes: m
    },
    element__svg_container: {
      css_properties: n
    },
    shapes: v,
    interactions: r,
    ...p && { animations: void 0 }
  };
}, ct = (s, e, i) => {
  let p = !1;
  function r(o, t) {
    p || window.requestAnimationFrame(function() {
      t(o), p = !0;
    }), p = !1;
  }
  const l = (o) => r(o, i);
  return s.addEventListener(e, l), l;
}, Z = (s) => typeof s == "string" ? s : `${s}px`, U = function(s) {
  const e = document.createElementNS("http://www.w3.org/2000/svg", s.element);
  if (s.svg_attributes !== void 0)
    for (const i of Object.entries(s.svg_attributes))
      e.setAttribute(i[0], i[1]);
  if (s.element_children !== void 0)
    for (const i of s.element_children) {
      const p = U(i);
      e.appendChild(p);
    }
  return e;
};
class lt extends Error {
  constructor() {
    super(), this.message = "The root element could not be selected, please provide a different value.", this.name = this.constructor.name;
  }
}
class st extends Error {
  constructor(e, i) {
    super();
    const p = i.map((r) => `"${r}"`).join(", ");
    this.message = `for "${e}", you must specify one of: ${p}`, this.name = this.constructor.name;
  }
}
const { defaultsOpts: J, defaultsSvgAttrs: K, defaultsCss: pt, defaultsSvgElsAttrs: Y } = O(), B = {
  rotate: {
    css_properties: {
      ...pt.animation,
      "animation-name": "rotate",
      "transform-origin": `${J.size.inner / 2 + +K.attrsStroke["stroke-width"] / 2}px ${J.size.inner / 2 + +K.attrsStroke["stroke-width"] / 2}px`
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
}, _t = {
  glow: {
    element: "filter",
    svg_attributes: {
      ...Y.filter
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
}, dt = {
  circle: {
    element: "pattern",
    svg_attributes: {
      ...Y.pattern
    },
    element_children: [
      {
        element: "circle",
        svg_attributes: {
          ...Y.circle,
          r: "4",
          cx: "4",
          cy: "4"
        }
      }
    ]
  }
}, tt = (s, e, i, p, r) => {
  let l, o;
  const t = (e.width - s) / 2, a = (e.height - s) / 2, c = e.width / 2, _ = e.height / 2;
  if (s < e.width && s < e.height)
    i.points && !p ? (o = [c + i.points[r][0], _ + i.points[r][1]], l = [t + i.points[r][0], a + i.points[r][1]]) : (o = [c, _], l = [t, a]);
  else {
    const h = s / 2;
    i.points && !p ? (o = [h + i.points[r][0], h + i.points[r][1]], l = [t + i.points[r][0], a + i.points[r][1]]) : (o = [h, h], l = [t, a]);
  }
  return {
    positionPolygon: o,
    positionRect: l
  };
}, W = (s, e, i, p, r = "string") => {
  const l = (o) => o.map((t) => t.join(",")).join(" ");
  if (e !== void 0) {
    const o = [];
    let t = s / 2;
    const a = 2 * Math.PI / i;
    let c;
    for (let _ = 0; _ <= i; _++) {
      e.type === "alternate" ? (t = s / 2, t = _ % 2 === 0 ? t : t * e.value) : _ !== 0 && (t = t * e.value), i % 2 !== 0 && (i % 3 === 1 || i % 3 === 0) ? c = Number((a * _ + a / 4).toFixed(12)) : i % 2 !== 0 && (i % 3 === 1 || i % 3 === 2) ? c = Number((a * _ - a / 4).toFixed(12)) : i % 2 === 0 && i % 4 !== 0 ? c = Number((a * _ + a / 2).toFixed(12)) : c = Number((a * _).toFixed(12));
      const h = t * Math.cos(c) + p[0], n = t * Math.sin(c) + p[1];
      o.push([h, n]);
    }
    return o.pop(), r === "string" ? l(o) : o;
  } else
    return null;
}, ft = (s, e) => {
  const i = e / 2, p = `${i}px ${i}px`, r = s.preset, l = [];
  let o = -1;
  if (s.keyframes !== void 0)
    for (const a of s.keyframes) {
      o++;
      let c;
      r !== void 0 && (c = B[r].keyframes[o]), l.push({
        ...r && c,
        ...a,
        css_properties: {
          ...r && (c == null ? void 0 : c.css_properties),
          ...a.css_properties
        }
      });
    }
  else if (r !== void 0)
    for (const a of B[r].keyframes)
      o++, l.push({
        ...a,
        css_properties: {
          ...a.css_properties
        }
      });
  return {
    ...r && B[r],
    ...s,
    css_properties: {
      ...r && B[r].css_properties,
      "transform-origin": p,
      ...s.css_properties
    },
    keyframes: l
  };
};
function ut(s, e, i) {
  const p = [], r = [];
  if (s !== void 0) {
    let l = -1;
    for (const o of s) {
      l++;
      let t, a;
      if (o.preset !== void 0) {
        a = `-_${i}__filter_${o.preset}_${e}th_${l}th`, p.push(a);
        const c = _t[o.preset];
        c.svg_attributes !== void 0 ? c.svg_attributes.id = a : c.svg_attributes = { id: a }, t = U(c);
      } else if (o.custom !== void 0) {
        a = `filter_custom_${e}th_${l}th`, p.push(a);
        const c = o.custom;
        c.svg_attributes !== void 0 ? c.svg_attributes.id = a : c.svg_attributes = { id: a }, t = U(c);
      } else
        throw new st("effect", ["preset", "custom"]);
      r.push(t);
    }
  }
  return { filterEls: r, filterIds: p };
}
function gt(s, e, i, p) {
  var r;
  if (e.animations !== void 0) {
    const l = [];
    let o = "";
    const t = {};
    for (const _ of e.animations) {
      const h = ft(_, i);
      if (l.push(h), h !== null && h.css_properties !== void 0)
        for (const n of Object.entries(h.css_properties))
          /^animation/.test(n[0]) && n[0] in t ? t[n[0]] += `,${n[1]}` : t[n[0]] = n[1];
    }
    o += `#${(r = p.parentElement) == null ? void 0 : r.id} #${s.id}{`;
    for (const _ of Object.entries(t))
      o += `${_[0]}:${t[_[0]]};`;
    o += "}";
    for (const _ of l)
      if (_ !== null && _.css_properties !== void 0 && (_ == null ? void 0 : _.keyframes) !== void 0) {
        o += `@keyframes ${_.css_properties["animation-name"]}{`;
        for (const h of _.keyframes) {
          o += `${h.keyframe_selector}{`;
          const n = h.css_properties;
          if (n !== void 0)
            for (const m of Object.entries(n))
              o += `${m[0]}:${m[1]};`;
          o += "}";
        }
        o += "}";
      }
    let c = p.querySelector(":scope > style");
    c === null && (c = document.createElement("style"), p.insertAdjacentElement("afterbegin", c)), c.textContent += o;
  }
}
const ht = (s, e, i, p, r) => {
  var _, h, n, m, d, v, S;
  const l = s.svg_attributes, o = s.effects, t = (_ = r.parentElement) == null ? void 0 : _.id.match(/\dth/), a = `-_${t[0]}__shape_${e}th_${s.type}`, c = document.createElementNS("http://www.w3.org/2000/svg", s.type);
  if (c.id = a, l !== void 0)
    for (const w of Object.entries(l))
      w[1] !== void 0 && c.setAttribute(w[0], w[1]);
  if (gt(c, s, p, r), o !== void 0) {
    const { filterEls: w, filterIds: g } = ut(o, e, t[0]);
    for (const b of w)
      i.insertAdjacentElement("afterbegin", b);
    const y = g.map((b) => `url(#${b})`).join(" ");
    c.setAttribute("filter", y);
  }
  if (s.guides !== void 0)
    for (const w of s.guides) {
      const g = w.options;
      if (w.type === "pattern" && g !== void 0) {
        let y = i.querySelector(":scope > defs");
        y = y != null ? y : document.createElementNS("http://www.w3.org/2000/svg", "defs");
        let b, f;
        if (g.preset !== void 0) {
          f = `-_${t[0]}__pattern_${g.preset}_${e}th`;
          const u = dt[g.preset];
          u.svg_attributes !== void 0 ? u.svg_attributes.id = f : u.svg_attributes = { id: f }, b = U(u);
        } else if (g.custom !== void 0) {
          f = `-_${t[0]}__pattern_custom_${e}th`;
          const u = g.custom;
          u.svg_attributes !== void 0 ? u.svg_attributes.id = f : u.svg_attributes = { id: f }, b = U(u);
        } else if (Array.isArray(g.shapes) && g.shapes.length) {
          const u = (h = g.ratios) == null ? void 0 : h.tile, z = (m = (n = g.ratios) == null ? void 0 : n.gap) == null ? void 0 : m.row, E = (v = (d = g.ratios) == null ? void 0 : d.gap) == null ? void 0 : v.column, $ = (S = s.svg_attributes) == null ? void 0 : S["stroke-width"];
          $ !== void 0 && $ !== "0" && (z > 0 || E > 0), p = (s.size - +($ || 0)) * u;
          const { defaultsSvgElsAttrs: M } = O(p);
          b = document.createElementNS("http://www.w3.org/2000/svg", "pattern"), f = `-_${t[0]}__pattern_custom_${e}th`;
          const x = M.pattern;
          x.id = f;
          for (const T of Object.entries(x))
            b.setAttribute(T[0], T[1]);
          const D = E === 0 ? p : p + (s.size - +($ || 0)) * E, C = z === 0 ? p : p + (s.size - +($ || 0)) * z, P = {
            width: D,
            height: C
          };
          b.setAttribute("width", String(P.width)), b.setAttribute("height", String(P.height));
          const { defaultsOpts: rt } = O(), Q = et(rt.size.inner, g.shapes, u);
          if (g.area === "fill" && $ !== void 0 && $ !== "0") {
            b.setAttribute("x", $), b.setAttribute("y", $);
            for (const T of Q)
              T.size -= +$ * (2 * u);
          }
          it(Q, b, p, r, P);
        } else
          throw new st("pattern guide options", ["preset", "custom"]);
        g.area !== void 0 && c.setAttribute(g.area, `url(#${f})`), y.appendChild(b), i.insertAdjacentElement("afterbegin", y);
      }
    }
  i.appendChild(c);
}, it = (s, e, i, p, r) => {
  var _, h;
  const { defaultsSvgElsAttrs: l, defaultsShape: o } = O(i), t = { type: void 0, points: void 0 };
  for (const n of s) {
    let m = !1;
    if (Array.isArray(n.guides)) {
      for (const v of n.guides)
        if (v.type === "position") {
          m = !0;
          break;
        }
    }
    let d;
    if (Array.isArray(n.ratios)) {
      for (const v of n.ratios)
        if (v.type === "radius") {
          d = v.options;
          break;
        }
    }
    if (m && n.sides !== void 0) {
      const v = W(
        n.size,
        d,
        n.sides,
        [0, 0],
        "array"
      );
      v !== null && (t.type = "polygon", t.points = v);
    }
  }
  const a = [];
  let c = -1;
  for (const n of s) {
    c++;
    let m;
    const d = n.size;
    let v = !1;
    if (Array.isArray(n.guides)) {
      for (const f of n.guides)
        if (f.type === "position") {
          v = !0;
          break;
        }
    }
    const S = v ? c - 1 : c;
    let w;
    r ? w = tt(d, r, t, v, S - 1) : w = tt(d, { width: i, height: i }, t, v, S - 1);
    const g = w.positionPolygon, y = w.positionRect;
    let b = o.ratios.radius.options;
    if (Array.isArray(n.ratios)) {
      for (const f of n.ratios)
        if (f.type === "radius") {
          b = f.options;
          break;
        }
    }
    switch (n.type) {
      case "rectangle": {
        const f = d * b.value, u = d, z = y[0] + (d - f) / 2, E = y[1];
        m = {
          ...n,
          type: "rect",
          svg_attributes: {
            ...l.rect,
            width: String(f),
            height: String(u),
            x: String(z),
            y: String(E),
            ...n.svg_attributes
          }
        }, a.push([
          {
            ...m
          },
          c
        ]);
        break;
      }
      case "square": {
        m = {
          ...n,
          type: "rect",
          svg_attributes: {
            ...l.rect,
            width: String(d),
            height: String(d),
            x: String(y[0]),
            y: String(y[1]),
            ...n.svg_attributes
          }
        }, a.push([
          {
            ...m
          },
          c
        ]);
        break;
      }
      case "circle": {
        const f = g[0], u = g[1];
        m = {
          ...n,
          type: "circle",
          svg_attributes: {
            ...l.circle,
            r: String(d / 2),
            cx: String(f),
            cy: String(u),
            ...n.svg_attributes
          }
        }, a.push([
          {
            ...m
          },
          c
        ]);
        break;
      }
      case "ellipse": {
        const f = d / 2, u = f * b.value, z = f, E = g[0], $ = g[1];
        m = {
          ...n,
          type: "ellipse",
          svg_attributes: {
            ...l.ellipse,
            rx: String(u),
            ry: String(z),
            cx: String(E),
            cy: String($),
            ...n.svg_attributes
          }
        }, a.push([
          {
            ...m
          },
          c
        ]);
        break;
      }
      case "triangle": {
        const u = W(n.size, b, 3, g, "string");
        u !== null && (m = {
          ...n,
          type: "polygon",
          svg_attributes: {
            ...l.path,
            points: u,
            ...n.svg_attributes
          }
        }, a.push([
          {
            ...m
          },
          c
        ]));
        break;
      }
      case "polygon": {
        const f = n.sides;
        if (f !== void 0) {
          const u = W(n.size, b, f, g, "string");
          u !== null && (m = {
            ...n,
            type: "polygon",
            svg_attributes: {
              ...l.polygon,
              points: u,
              ...n.svg_attributes
            }
          }, a.push([
            {
              ...m
            },
            c
          ]));
        }
        break;
      }
      case "star": {
        const u = d / 2, z = W(u, b, 10, g, "string");
        z !== null && (m = {
          ...n,
          type: "polygon",
          svg_attributes: {
            ...l.polygon,
            points: z,
            ...n.svg_attributes
          }
        }, a.push([
          {
            ...m
          },
          c
        ]));
        break;
      }
      case "image": {
        let f, u;
        d < i ? (f = y[0] + d / 2 / 2, u = y[1]) : ((_ = n.svg_attributes) != null && _.width ? f = (d - +n.svg_attributes.width) / 2 : f = d / 2 / 2, (h = n.svg_attributes) != null && h.height ? u = (d - +n.svg_attributes.height) / 2 : u = 0), m = {
          ...n,
          type: "image",
          svg_attributes: {
            width: String(d / 2),
            height: String(d),
            x: String(f),
            y: String(u),
            ...n.svg_attributes
          }
        }, a.push([
          {
            ...m
          },
          c
        ]);
        break;
      }
      default:
        m = {
          ...n,
          type: n.type,
          svg_attributes: {
            ...l[n.type],
            ...n.svg_attributes
          }
        }, a.push([
          {
            ...m
          },
          c
        ]);
    }
  }
  for (const n of a)
    ht(n[0], n[1], e, i, p);
};
var A, q, F, G, H, I, R, X;
class vt {
  constructor(e) {
    N(this, F);
    N(this, H);
    N(this, R);
    j(this, "element__root");
    j(this, "options__merged");
    j(this, "element__svg");
    j(this, "element__svg_container");
    j(this, "id");
    N(this, A, {
      pointer: void 0,
      pointer__elements: {
        root: null
      },
      pointer__pointer__scale: void 0
    });
    N(this, q, []);
    var p, r;
    if (this.element__svg = null, this.options__merged = at(e), this.element__svg_container = null, this.options__merged.interactions !== void 0)
      for (const l of this.options__merged.interactions)
        l.type === "pointer" && (k(this, A).pointer = l), l.type === "pointer__scale" && (k(this, A).pointer__pointer__scale = l);
    else
      k(this, A).pointer = void 0;
    const i = document.querySelector(this.options__merged.css_selector__root);
    if (!(i instanceof HTMLElement))
      throw new lt();
    this.element__root = i, ((r = (p = k(this, A).pointer) == null ? void 0 : p.options) == null ? void 0 : r.default_pointer) === !1 && this.element__root.classList.add("-_pointerize__pointer_default__non");
  }
  start() {
    var e, i, p, r, l, o, t;
    if (k(this, A).pointer !== void 0) {
      let a;
      const c = (_) => {
        a = _.matches, a ? (L(this, F, G).call(this), L(this, H, I).call(this)) : this.element__svg_container !== null && this.stop();
      };
      if (typeof ((e = k(this, A).pointer.options) == null ? void 0 : e.start_criteria) == "string")
        ((i = k(this, A).pointer.options) == null ? void 0 : i.start_criteria) === "none" && (a = !0);
      else if (typeof ((p = k(this, A).pointer.options) == null ? void 0 : p.start_criteria) == "object" && typeof ((r = k(this, A).pointer.options) == null ? void 0 : r.start_criteria.criteria) == "string") {
        const _ = matchMedia((l = k(this, A).pointer.options) == null ? void 0 : l.start_criteria.criteria);
        ((o = k(this, A).pointer.options) == null ? void 0 : o.start_criteria.frequency) === "once" ? c(_) : ((t = k(this, A).pointer.options) == null ? void 0 : t.start_criteria.frequency) === "always" && (this.element__svg_container === null && c(_), _.addEventListener("change", c));
      }
    } else
      L(this, F, G).call(this), L(this, H, I).call(this);
  }
  stop() {
    var e, i, p;
    for (const r of k(this, q))
      r.element.removeEventListener(r.event, r.handler);
    (e = this.element__svg_container) == null || e.remove(), (p = (i = k(this, A).pointer) == null ? void 0 : i.options) != null && p.default_pointer || this.element__root.classList.remove("-_pointerize__pointer_default__non");
  }
  hide() {
    var e, i, p;
    (e = this.element__svg_container) == null || e.classList.add("-_pointerize-_u__display__non"), (p = (i = k(this, A).pointer) == null ? void 0 : i.options) != null && p.default_pointer || this.element__root.classList.remove("-_pointerize__pointer_default__non");
  }
  show() {
    var e, i;
    this.element__svg_container !== null && (this.element__svg_container.classList.remove("-_pointerize-_u__display__non"), (i = (e = k(this, A).pointer) == null ? void 0 : e.options) != null && i.default_pointer || this.element__root.classList.add("-_pointerize__pointer_default__non"));
  }
}
A = new WeakMap(), q = new WeakMap(), F = new WeakSet(), G = function() {
  var _, h, n, m, d, v;
  const e = document.createElement("div");
  this.element__svg_container = e;
  let i;
  const p = Array.from(document.querySelectorAll("[id*=-_pointerize__container]"));
  if (p.length === 0)
    i = "0";
  else {
    let S = -1;
    for (const w of p) {
      const g = +((n = (h = (_ = w.getAttribute("id")) == null ? void 0 : _.match(/(?<number>\d+)th$/)) == null ? void 0 : h.groups) == null ? void 0 : n.number);
      g > S && (S = g);
    }
    i = S + 1;
  }
  const r = `-_pointerize__container_${i}th`;
  e.id = r, this.id = r, e.classList.add("-_pointerize__container");
  const l = Z(this.options__merged.size.outer);
  e.style.width = l, e.style.height = l;
  const o = (m = this.options__merged.element__svg_container) == null ? void 0 : m.css_properties;
  if (o !== void 0)
    for (const S of Object.entries(o))
      e.style.setProperty(S[0], S[1]);
  k(this, A).pointer !== void 0 && (e.style.setProperty("transform", "translate(-50%, -50%)"), e.style.setProperty("pointer-events", "none"), e.setAttribute("aria-hidden", ""));
  const t = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  this.element__svg = t;
  const a = (d = this.options__merged.element__svg) == null ? void 0 : d.svg_attributes, c = (v = this.options__merged.element__svg) == null ? void 0 : v.css_properties;
  if (a !== void 0)
    for (const S of Object.entries(a))
      t.setAttribute(S[0], S[1]);
  if (c !== void 0)
    for (const S of Object.entries(c))
      t.style.setProperty(S[0], S[1]);
  t.setAttribute("viewBox", `0 0 ${this.options__merged.size.inner} ${this.options__merged.size.inner}`), e.appendChild(t), Array.isArray(this.options__merged.shapes) && it(this.options__merged.shapes, t, this.options__merged.size.inner, t), this.element__root.appendChild(e);
}, H = new WeakSet(), I = function() {
  var i, p;
  if (this.options__merged.interactions !== void 0) {
    for (const r of this.options__merged.interactions)
      if (r.type === "pointer__scale" && ((i = r.options) == null ? void 0 : i.elements) !== void 0) {
        if ((p = r.options) != null && p.elements.length) {
          const o = [];
          for (const a of r.options.elements) {
            const c = Array.from(document.querySelectorAll(a));
            o.push(...c);
          }
          const t = (a) => {
            if (a.length > 0) {
              for (const c of a)
                if (c instanceof HTMLElement) {
                  c.dataset.pointerize = "pointer__scale__child";
                  const _ = Array.from(c.children);
                  _.length > 0 && t(_);
                }
            }
          };
          for (const a of o)
            if (a instanceof HTMLElement) {
              a.dataset.pointerize = "pointer__scale";
              const c = Array.from(a.children);
              t(c);
            }
        }
        const l = this.element__svg_container;
        l.addEventListener("transitionend", () => {
          l.classList.remove("-_pointerize__container__hover__temp");
        });
      }
  }
  const e = (r) => {
    var t;
    const l = this.element__svg_container, o = r.target;
    if (o.dataset.pointerize === "pointer__scale") {
      const a = o.getBoundingClientRect();
      l.classList.contains("-_pointerize__container") && (l.classList.add("-_pointerize__container__hover__temp"), l.classList.add("-_pointerize__container__hover"), l.style.height = `${a.height}px`, l.style.width = `${a.width}px`, l.style.top = `${a.top + a.height / 2}px`, l.style.left = `${a.left + a.width / 2}px`);
    } else if (o.dataset.pointerize !== "pointer__scale__child") {
      if (l.classList.contains("-_pointerize__container__hover")) {
        l.classList.remove("-_pointerize__container__hover");
        const a = Z(this.options__merged.size.outer);
        l.style.width = l.style.height = a;
      }
      L(this, R, X).call(this, l, r);
    }
    /pointer__scale/.test((t = o.dataset.pointerize) != null ? t : "") || L(this, R, X).call(this, l, r);
  };
  if (k(this, A).pointer !== void 0) {
    const r = ct(this.element__root, "pointermove", e);
    k(this, q).push({
      element: this.element__root,
      event: "pointerMove",
      handler: r
    });
  }
}, R = new WeakSet(), X = function(e, i) {
  e.style.left = `${i.clientX}px`, e.style.top = `${i.clientY}px`;
};
export {
  vt as default
};
