var rt = Object.defineProperty;
var ot = (i, e, s) => e in i ? rt(i, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : i[e] = s;
var O = (i, e, s) => (ot(i, typeof e != "symbol" ? e + "" : e, s), s), K = (i, e, s) => {
  if (!e.has(i))
    throw TypeError("Cannot " + s);
};
var A = (i, e, s) => (K(i, e, "read from private field"), s ? s.call(i) : e.get(i)), j = (i, e, s) => {
  if (e.has(i))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(i) : e.set(i, s);
};
var L = (i, e, s) => (K(i, e, "access private method"), s);
/**
  * @license Pointerize
  * Copyright (c) 2022-present Abolfazl Faturechi
  * 
  * This source code is licensed under the MIT license found in the
  * LICENSE file at https://github.com/ize-er/pointerize.
  */
const C = (i = 32) => {
  const e = "4s", l = {
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
  }, n = {
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
  }, o = +r.attrsStroke["stroke-width"] / 2, t = l.size.inner, a = {
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
  }, p = {
    animation: {
      "animation-duration": e,
      "animation-iteration-count": "infinite",
      "animation-timing-function": "linear",
      "transform-origin": `${i / 2}px ${i / 2}px`
    }
  };
  return {
    defaultsOpts: l,
    defaultsSvgAttrs: r,
    defaultsShape: n,
    defaultsSvgElsAttrs: a,
    defaultsCss: p
  };
}, B = (i, e, s = 1, l = !1) => {
  var o, t, a, p, u, c, f;
  let r = -1;
  for (const _ of e)
    if (r++, _.make_multiple !== void 0) {
      for (const E of _.make_multiple)
        for (let b = 0; b < E.options.number; b++) {
          const g = {};
          for (const [v, y] of Object.entries(E.options.value))
            y.length === 1 ? g[v] = JSON.parse(JSON.stringify(y[0])) : y[b] !== void 0 && (g[v] = y[b]);
          e.splice(r, 0, g), r++;
        }
      e.splice(r, 1);
    }
  const n = [];
  for (const _ of e) {
    let E = -1, b, g, v = -1, y, m, d;
    m = C(), d = m.defaultsShape;
    let h = d == null ? void 0 : d.ratios.size.options.value;
    if (Array.isArray(_.ratios))
      for (const x of _.ratios)
        x.type === "size" && (h = x.options.value);
    let S = i * h;
    m = C(S), d = m.defaultsShape;
    const { defaultsSvgAttrs: k } = C(i);
    S -= +((t = (o = _.svg_attributes) == null ? void 0 : o["stroke-width"]) != null ? t : k.attrsStroke["stroke-width"]);
    let M = [];
    if (Array.isArray(_.ratios) && _.ratios.length) {
      M = _.ratios;
      let x = -1;
      for (const w of _.ratios)
        x++, w.type === "radius" && (E = x, g = w.options, b = w);
    }
    g = { ...d.ratios.radius.options, ...g }, _.type === "triangle" ? (g.value = (a = b == null ? void 0 : b.options.value) != null ? a : 1, b = { type: "radius", options: g }) : _.type === "polygon" && (g.value = (p = b == null ? void 0 : b.options.value) != null ? p : 1, b = { type: "radius", options: g }), b !== void 0 && (b = { type: "radius", options: g }, M.splice(E, 1, b));
    let $;
    if (Array.isArray(_.guides) && _.guides.length) {
      $ = _.guides;
      let x = -1;
      for (const w of _.guides)
        x++, w.type === "pattern" && (v = x, y = {
          ...w,
          options: {
            ...w.options,
            ratios: {
              tile: d.guides.pattern.ratios.tile,
              ...(u = w.options) == null ? void 0 : u.ratios,
              gap: {
                row: d.guides.pattern.ratios.gap,
                column: d.guides.pattern.ratios.gap,
                ...(f = (c = w.options) == null ? void 0 : c.ratios) == null ? void 0 : f.gap
              }
            }
          }
        }, $.splice(v, 1, y));
    }
    s && (S *= s), n.push({
      ..._,
      size: S,
      ratios: M,
      guides: $,
      ...l && { animations: void 0 }
    });
  }
  return n;
}, nt = (i) => {
  var g, v, y, m, d, h, S, k, P, M, $;
  const { defaultsOpts: e, defaultsSvgElsAttrs: s } = C();
  let l = !1;
  (g = i.system_preferences) != null && g.respect_reduced_motion && matchMedia("(prefers-reduced-motion: reduce)").matches && (l = !0);
  const r = [];
  let n, o, t = -1, a = -1;
  if (Array.isArray(i.interactions)) {
    let x = -1;
    for (const w of i.interactions)
      x++, w.type === "pointer" ? (t = x, n = (v = w.options) == null ? void 0 : v.default_pointer, o = (y = w.options) == null ? void 0 : y.start_criteria) : w.type === "pointer__scale" && (a = x);
  }
  const p = (m = i.css_selector__root) != null ? m : "body";
  n = n != null ? n : !1, o !== void 0 ? typeof o == "string" ? o === "none" ? o = "none" : o = {
    criteria: e.interactions.pointer.start_criteria.criteria,
    frequency: e.interactions.pointer.start_criteria.frequency
  } : typeof o == "object" ? o = {
    criteria: o.criteria || e.interactions.pointer.start_criteria.criteria,
    frequency: o.frequency || e.interactions.pointer.start_criteria.frequency
  } : o = e.interactions.pointer.start_criteria : o = e.interactions.pointer.start_criteria;
  const u = {
    type: "pointer",
    options: {
      default_pointer: n,
      start_criteria: o
    }
  };
  t !== -1 && r.splice(t, 0, u), a !== -1 && i.interactions !== void 0 && r.splice(a, 0, i.interactions[a]);
  let c;
  if (((d = i.size) == null ? void 0 : d.inner) !== void 0) {
    const x = i.size.inner, w = (h = i.size) == null ? void 0 : h.outer;
    x !== null ? w !== void 0 ? c = { ...e.size, inner: x, outer: w } : c = { ...e.size, inner: x } : w !== void 0 ? c = { ...e.size, outer: w } : c = e.size;
  } else
    ((S = i.size) == null ? void 0 : S.outer) !== void 0 ? c = { ...e.size, outer: (k = i.size) == null ? void 0 : k.outer } : c = e.size;
  const f = (P = i.element__svg_container) == null ? void 0 : P.css_properties, _ = { ...s.svg, ...(M = i.element__svg) == null ? void 0 : M.svg_attributes }, E = { ...($ = i.element__svg) == null ? void 0 : $.css_properties };
  let b;
  return Array.isArray(i.shapes) && i.shapes.length && (b = B(c.inner, i.shapes, 1, l)), {
    ...e,
    ...i,
    css_selector__root: p,
    size: c,
    element__svg: {
      css_properties: E,
      svg_attributes: _
    },
    element__svg_container: {
      css_properties: f
    },
    shapes: b,
    interactions: r,
    ...l && { animations: void 0 }
  };
}, at = (i, e, s) => {
  let l = !1;
  function r(o, t) {
    l || window.requestAnimationFrame(function() {
      t(o), l = !0;
    }), l = !1;
  }
  const n = (o) => r(o, s);
  return i.addEventListener(e, n), n;
}, I = (i) => typeof i == "string" ? i : `${i}px`, D = function(i) {
  const e = document.createElementNS("http://www.w3.org/2000/svg", i.element);
  if (i.svg_attributes !== void 0)
    for (const s of Object.entries(i.svg_attributes))
      e.setAttribute(s[0], s[1]);
  if (i.element_children !== void 0)
    for (const s of i.element_children) {
      const l = D(s);
      e.appendChild(l);
    }
  return e;
};
class lt extends Error {
  constructor() {
    super(), this.message = "The root element could not be selected, please provide a different value.", this.name = this.constructor.name;
  }
}
class W extends Error {
  constructor(e, s) {
    super();
    const l = s.map((r) => `"${r}"`).join(", ");
    this.message = `for "${e}", you must specify one of: ${l}`, this.name = this.constructor.name;
  }
}
const { defaultsCss: ct, defaultsSvgElsAttrs: Y } = C(), H = {
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
}, _t = {
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
}, dt = (i, e, s, l) => {
  let r, n;
  const o = (e.width - i) / 2, t = (e.height - i) / 2, a = e.width / 2, p = e.height / 2;
  return s !== void 0 ? (n = [s[l][0], s[l][1]], r = [s[l][0] - i / 2, s[l][1] - i / 2]) : (n = [a, p], r = [o, t]), {
    positionPolygon: n,
    positionRect: r
  };
}, T = (i, e, s, l, r = "string") => {
  const n = (o) => o.map((t) => t.join(",")).join(" ");
  if (e !== void 0) {
    const o = [];
    let t = i / 2;
    const a = 2 * Math.PI / s;
    let p;
    for (let u = 0; u <= s; u++) {
      e.type === "alternate" ? (t = i / 2, t = u % 2 === 0 ? t : t * e.value) : u !== 0 && (t = t * e.value), s % 2 !== 0 && (s % 3 === 1 || s % 3 === 0) ? p = Number((a * u + a / 4).toFixed(12)) : s % 2 !== 0 && (s % 3 === 1 || s % 3 === 2) ? p = Number((a * u - a / 4).toFixed(12)) : s % 2 === 0 && s % 4 !== 0 ? p = Number((a * u + a / 2).toFixed(12)) : p = Number((a * u).toFixed(12));
      const c = t * Math.cos(p) + l[0], f = t * Math.sin(p) + l[1];
      o.push([c, f]);
    }
    return o.pop(), r === "string" ? n(o) : o;
  } else
    return null;
}, ft = (i, e) => {
  let s;
  (e == null ? void 0 : e.position) !== void 0 && (s = `${e.position[0]}px ${e.position[1]}px`);
  const l = i.preset, r = [];
  let n = -1;
  if (i.keyframes !== void 0)
    for (const t of i.keyframes) {
      n++;
      let a;
      l !== void 0 && (a = H[l].keyframes[n]), r.push({
        ...l && a,
        ...t,
        css_properties: {
          ...l && (a == null ? void 0 : a.css_properties),
          ...t.css_properties
        }
      });
    }
  else if (l !== void 0)
    for (const t of H[l].keyframes)
      n++, r.push({
        ...t,
        css_properties: {
          ...t.css_properties
        }
      });
  return {
    ...l && H[l],
    ...i,
    css_properties: {
      ...l && H[l].css_properties,
      ...s && { "transform-origin": s },
      ...i.css_properties
    },
    keyframes: r
  };
};
function ut(i, e, s) {
  const l = [], r = [];
  if (i !== void 0) {
    let n = -1;
    for (const o of i) {
      n++;
      let t, a;
      if (o.preset !== void 0) {
        a = `-_${s}__filter_${o.preset}_${e}th_${n}th`, l.push(a);
        const p = pt[o.preset];
        p.svg_attributes !== void 0 ? p.svg_attributes.id = a : p.svg_attributes = { id: a }, t = D(p);
      } else if (o.custom !== void 0) {
        a = `filter_custom_${e}th_${n}th`, l.push(a);
        const p = o.custom;
        p.svg_attributes !== void 0 ? p.svg_attributes.id = a : p.svg_attributes = { id: a }, t = D(p);
      } else
        throw new W("effect", ["preset", "custom"]);
      r.push(t);
    }
  }
  return { filterEls: r, filterIds: l };
}
function ht(i, e, s, l) {
  var r;
  if (e.animations !== void 0) {
    const n = [];
    let o = "";
    const t = {};
    for (const u of e.animations) {
      const c = ft(u, l);
      if (n.push(c), c !== null && c.css_properties !== void 0)
        for (const f of Object.entries(c.css_properties))
          /^animation/.test(f[0]) && f[0] in t ? t[f[0]] += `,${f[1]}` : t[f[0]] = f[1];
    }
    o += `#${(r = s.parentElement) == null ? void 0 : r.id} #${i.id}{`;
    for (const u of Object.entries(t))
      o += `${u[0]}:${t[u[0]]};`;
    o += "}";
    for (const u of n)
      if (u !== null && u.css_properties !== void 0 && (u == null ? void 0 : u.keyframes) !== void 0) {
        o += `@keyframes ${u.css_properties["animation-name"]}{`;
        for (const c of u.keyframes) {
          o += `${c.keyframe_selector}{`;
          const f = c.css_properties;
          if (f !== void 0)
            for (const _ of Object.entries(f))
              o += `${_[0]}:${_[1]};`;
          o += "}";
        }
        o += "}";
      }
    let p = s.querySelector(":scope > style");
    p === null && (p = document.createElement("style"), s.insertAdjacentElement("afterbegin", p)), p.textContent += o;
  }
}
const gt = (i, e, s, l, r, n) => {
  var c, f, _, E, b, g, v;
  const o = i.svg_attributes, t = i.effects, a = (c = r.parentElement) == null ? void 0 : c.id.match(/\dth/);
  let p;
  (n == null ? void 0 : n.parentId) !== void 0 ? p = `${n.parentId}__shape_${e}th_${i.type}` : p = `-_${a[0]}__shape_${e}th_${i.type}`;
  const u = document.createElementNS("http://www.w3.org/2000/svg", i.type);
  if (u.id = p, o !== void 0)
    for (const y of Object.entries(o))
      y[1] !== void 0 && u.setAttribute(y[0], y[1]);
  if (ht(u, i, r, (n == null ? void 0 : n.position) && { position: n == null ? void 0 : n.position }), t !== void 0) {
    const { filterEls: y, filterIds: m } = ut(t, e, a[0]);
    for (const h of y)
      s.insertAdjacentElement("afterbegin", h);
    const d = m.map((h) => `url(#${h})`).join(" ");
    u.setAttribute("filter", d);
  }
  if (i.guides !== void 0)
    for (const y of i.guides) {
      const m = y.options;
      if (y.type === "pattern" && m !== void 0) {
        let d = s.querySelector(":scope > defs");
        d = d != null ? d : document.createElementNS("http://www.w3.org/2000/svg", "defs");
        let h, S;
        if (m.preset !== void 0) {
          S = `-_${a[0]}__pattern_${m.preset}_${e}th`;
          const k = _t[m.preset];
          k.svg_attributes !== void 0 ? k.svg_attributes.id = S : k.svg_attributes = { id: S }, h = D(k);
        } else if (Array.isArray(m.shapes) && m.shapes.length) {
          const k = (f = m.ratios) == null ? void 0 : f.tile, P = (E = (_ = m.ratios) == null ? void 0 : _.gap) == null ? void 0 : E.row, M = (g = (b = m.ratios) == null ? void 0 : b.gap) == null ? void 0 : g.column, $ = (v = i.svg_attributes) == null ? void 0 : v["stroke-width"];
          $ !== void 0 && $ !== "0" && (P > 0 || M > 0), l = (i.size - +($ || 0)) * k;
          const { defaultsSvgElsAttrs: x } = C(l);
          h = document.createElementNS("http://www.w3.org/2000/svg", "pattern"), S = `-_${a[0]}__pattern_custom_${e}th`;
          const w = x.pattern;
          w.id = S;
          for (const G of Object.entries(w))
            h.setAttribute(G[0], G[1]);
          const tt = M === 0 ? l : l + (i.size - +($ || 0)) * M, et = P === 0 ? l : l + (i.size - +($ || 0)) * P, R = {
            width: tt,
            height: et
          };
          h.setAttribute("width", String(R.width)), h.setAttribute("height", String(R.height));
          const { defaultsOpts: it } = C(), Z = B(it.size.inner, m.shapes, k);
          if (m.area === "fill" && $ !== void 0 && $ !== "0") {
            h.setAttribute("x", $), h.setAttribute("y", $);
            for (const G of Z)
              G.size -= +$ * (2 * k);
          }
          const st = `-_${a[0]}__shape_${e}th__pat`;
          X(Z, h, l, r, {
            sizeInnerCustom: R,
            parentId: st
          });
        } else
          throw new W("pattern guide options", ["shapes"]);
        m.area !== void 0 && u.setAttribute(m.area, `url(#${S})`), d.appendChild(h), s.insertAdjacentElement("afterbegin", d);
      }
      if (y.type === "position" && m !== void 0)
        if (Array.isArray(m.shapes) && m.shapes.length) {
          let d;
          if (i.sides !== void 0) {
            let k;
            for (const M of i.ratios)
              if (M.type === "radius") {
                k = {
                  type: M.options.type,
                  value: M.options.value
                };
                break;
              }
            const P = T(
              i.size,
              k,
              i.sides,
              n == null ? void 0 : n.position,
              "array"
            );
            P !== null && (d = P);
          }
          const h = B(l, m.shapes), S = `-_${a[0]}__shape_${e}th__pos`;
          X(h, s, l, r, { positionPoints: d, parentId: S });
        } else
          throw new W("position guide options", ["shapes"]);
    }
  s.appendChild(u);
}, X = (i, e, s, l, r) => {
  var p, u;
  const { defaultsSvgElsAttrs: n, defaultsShape: o } = C(s), t = [];
  let a = -1;
  for (const c of i) {
    a++;
    let f;
    const _ = c.size, E = (r == null ? void 0 : r.sizeInnerCustom) || { width: s, height: s }, b = r == null ? void 0 : r.positionPoints, g = dt(_, E, b, a), v = g.positionPolygon, y = g.positionRect;
    let m = o.ratios.radius.options;
    if (Array.isArray(c.ratios)) {
      for (const d of c.ratios)
        if (d.type === "radius") {
          m = d.options;
          break;
        }
    }
    switch (c.type) {
      case "rectangle": {
        const d = _ * m.value, h = _, S = y[0] + (_ - d) / 2, k = y[1];
        f = {
          ...c,
          type: "rect",
          svg_attributes: {
            ...n.rect,
            width: String(d),
            height: String(h),
            x: String(S),
            y: String(k),
            ...c.svg_attributes
          }
        }, t.push([
          {
            ...f
          },
          a,
          v
        ]);
        break;
      }
      case "square": {
        f = {
          ...c,
          type: "rect",
          svg_attributes: {
            ...n.rect,
            width: String(_),
            height: String(_),
            x: String(y[0]),
            y: String(y[1]),
            ...c.svg_attributes
          }
        }, t.push([
          {
            ...f
          },
          a,
          v
        ]);
        break;
      }
      case "circle": {
        const d = v[0], h = v[1];
        f = {
          ...c,
          type: "circle",
          svg_attributes: {
            ...n.circle,
            r: String(_ / 2),
            cx: String(d),
            cy: String(h),
            ...c.svg_attributes
          }
        }, t.push([
          {
            ...f
          },
          a,
          v
        ]);
        break;
      }
      case "ellipse": {
        const d = _ / 2, h = d * m.value, S = d, k = v[0], P = v[1];
        f = {
          ...c,
          type: "ellipse",
          svg_attributes: {
            ...n.ellipse,
            rx: String(h),
            ry: String(S),
            cx: String(k),
            cy: String(P),
            ...c.svg_attributes
          }
        }, t.push([
          {
            ...f
          },
          a,
          v
        ]);
        break;
      }
      case "triangle": {
        const h = T(_, m, 3, v, "string");
        h !== null && (f = {
          ...c,
          type: "polygon",
          svg_attributes: {
            ...n.path,
            points: h,
            ...c.svg_attributes
          }
        }, t.push([
          {
            ...f
          },
          a,
          v
        ]));
        break;
      }
      case "polygon": {
        const d = c.sides;
        if (d !== void 0) {
          const h = T(_, m, d, v, "string");
          h !== null && (f = {
            ...c,
            type: "polygon",
            svg_attributes: {
              ...n.polygon,
              points: h,
              ...c.svg_attributes
            }
          }, t.push([
            {
              ...f
            },
            a,
            v
          ]));
        }
        break;
      }
      case "star": {
        const h = _ / 2, S = T(h, m, 10, v, "string");
        S !== null && (f = {
          ...c,
          type: "polygon",
          svg_attributes: {
            ...n.polygon,
            points: S,
            ...c.svg_attributes
          }
        }, t.push([
          {
            ...f
          },
          a,
          v
        ]));
        break;
      }
      case "image": {
        let d, h;
        _ < s ? (d = y[0] + _ / 2 / 2, h = y[1]) : ((p = c.svg_attributes) != null && p.width ? d = (_ - +c.svg_attributes.width) / 2 : d = _ / 2 / 2, (u = c.svg_attributes) != null && u.height ? h = (_ - +c.svg_attributes.height) / 2 : h = 0), f = {
          ...c,
          type: "image",
          svg_attributes: {
            width: String(_ / 2),
            height: String(_),
            x: String(d),
            y: String(h),
            ...c.svg_attributes
          }
        }, t.push([
          {
            ...f
          },
          a,
          v
        ]);
        break;
      }
      default:
        f = {
          ...c,
          type: c.type,
          svg_attributes: {
            ...n[c.type],
            ...c.svg_attributes
          }
        }, t.push([
          {
            ...f
          },
          a,
          v
        ]);
    }
  }
  for (const c of t)
    gt(c[0], c[1], e, s, l, {
      parentId: r == null ? void 0 : r.parentId,
      position: c[2]
    });
};
var z, N, U, J, q, Q, F, V;
class vt {
  constructor(e) {
    j(this, U);
    j(this, q);
    j(this, F);
    O(this, "element__root");
    O(this, "options__merged");
    O(this, "element__svg");
    O(this, "element__svg_container");
    O(this, "id");
    j(this, z, {
      pointer: void 0,
      pointer__elements: {
        root: null
      },
      pointer__pointer__scale: void 0
    });
    j(this, N, []);
    if (this.element__svg = null, this.options__merged = nt(e), this.element__svg_container = null, this.options__merged.interactions !== void 0)
      for (const l of this.options__merged.interactions)
        l.type === "pointer" && (A(this, z).pointer = l), l.type === "pointer__scale" && (A(this, z).pointer__pointer__scale = l);
    else
      A(this, z).pointer = void 0;
    const s = document.querySelector(this.options__merged.css_selector__root);
    if (!(s instanceof HTMLElement))
      throw new lt();
    this.element__root = s;
  }
  start() {
    var e;
    if (A(this, z).pointer !== void 0) {
      let s;
      const l = (n) => {
        var o, t, a, p;
        s = n.matches, s ? ((t = (o = A(this, z).pointer) == null ? void 0 : o.options) != null && t.default_pointer || this.element__root.classList.add("-_pointerize__pointer_default__non"), L(this, U, J).call(this), L(this, q, Q).call(this)) : this.element__svg_container !== null && ((p = (a = A(this, z).pointer) == null ? void 0 : a.options) != null && p.default_pointer || this.element__root.classList.remove("-_pointerize__pointer_default__non"), this.stop());
      }, r = (e = A(this, z).pointer.options) == null ? void 0 : e.start_criteria;
      if (typeof r == "string")
        r === "none" && (s = !0);
      else if (typeof r == "object" && typeof r.criteria == "string") {
        const n = matchMedia(r.criteria);
        r.frequency === "once" ? l(n) : r.frequency === "always" && (this.element__svg_container === null && l(n), n.addEventListener("change", l));
      }
    } else
      L(this, U, J).call(this), L(this, q, Q).call(this);
  }
  stop() {
    var e, s;
    for (const l of A(this, N))
      l.element.removeEventListener(l.event, l.handler);
    (e = this.element__svg_container) == null || e.remove(), A(this, z).pointer !== void 0 && ((s = A(this, z).pointer.options) != null && s.default_pointer || this.element__root.classList.remove("-_pointerize__pointer_default__non"));
  }
  hide() {
    var e, s, l;
    (e = this.element__svg_container) == null || e.classList.add("-_pointerize-_u__display__non"), (l = (s = A(this, z).pointer) == null ? void 0 : s.options) != null && l.default_pointer || this.element__root.classList.remove("-_pointerize__pointer_default__non");
  }
  show() {
    var e, s;
    this.element__svg_container !== null && (this.element__svg_container.classList.remove("-_pointerize-_u__display__non"), (s = (e = A(this, z).pointer) == null ? void 0 : e.options) != null && s.default_pointer || this.element__root.classList.add("-_pointerize__pointer_default__non"));
  }
}
z = new WeakMap(), N = new WeakMap(), U = new WeakSet(), J = function() {
  var u, c, f, _, E, b;
  const e = document.createElement("div");
  this.element__svg_container = e;
  let s;
  const l = Array.from(document.querySelectorAll("[id*=-_pointerize__container]"));
  if (l.length === 0)
    s = "0";
  else {
    let g = -1;
    for (const v of l) {
      const y = +((f = (c = (u = v.getAttribute("id")) == null ? void 0 : u.match(/(?<number>\d+)th$/)) == null ? void 0 : c.groups) == null ? void 0 : f.number);
      y > g && (g = y);
    }
    s = g + 1;
  }
  const r = `-_pointerize__container_${s}th`;
  e.id = r, this.id = r, e.classList.add("-_pointerize__container");
  const n = I(this.options__merged.size.outer);
  e.style.width = n, e.style.height = n;
  const o = (_ = this.options__merged.element__svg_container) == null ? void 0 : _.css_properties;
  if (o !== void 0)
    for (const g of Object.entries(o))
      e.style.setProperty(g[0], g[1]);
  A(this, z).pointer !== void 0 && (e.style.setProperty("transform", "translate(-50%, -50%)"), e.style.setProperty("pointer-events", "none"), e.setAttribute("aria-hidden", ""));
  const t = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  this.element__svg = t;
  const a = (E = this.options__merged.element__svg) == null ? void 0 : E.svg_attributes, p = (b = this.options__merged.element__svg) == null ? void 0 : b.css_properties;
  if (a !== void 0)
    for (const g of Object.entries(a))
      t.setAttribute(g[0], g[1]);
  if (p !== void 0)
    for (const g of Object.entries(p))
      t.style.setProperty(g[0], g[1]);
  t.setAttribute("viewBox", `0 0 ${this.options__merged.size.inner} ${this.options__merged.size.inner}`), e.appendChild(t), Array.isArray(this.options__merged.shapes) && X(this.options__merged.shapes, t, this.options__merged.size.inner, t), this.element__root.appendChild(e);
}, q = new WeakSet(), Q = function() {
  var s, l;
  if (this.options__merged.interactions !== void 0) {
    for (const r of this.options__merged.interactions)
      if (r.type === "pointer__scale" && ((s = r.options) == null ? void 0 : s.elements) !== void 0) {
        if ((l = r.options) != null && l.elements.length) {
          const o = [];
          for (const a of r.options.elements) {
            const p = Array.from(document.querySelectorAll(a));
            o.push(...p);
          }
          const t = (a) => {
            if (a.length > 0) {
              for (const p of a)
                if (p instanceof HTMLElement) {
                  p.dataset.pointerize = "pointer__scale__child";
                  const u = Array.from(p.children);
                  u.length > 0 && t(u);
                }
            }
          };
          for (const a of o)
            if (a instanceof HTMLElement) {
              a.dataset.pointerize = "pointer__scale";
              const p = Array.from(a.children);
              t(p);
            }
        }
        const n = this.element__svg_container;
        n.addEventListener("transitionend", () => {
          n.classList.remove("-_pointerize__container__hover__temp");
        });
      }
  }
  const e = (r) => {
    var t;
    const n = this.element__svg_container, o = r.target;
    if (o.dataset.pointerize === "pointer__scale") {
      const a = o.getBoundingClientRect();
      n.classList.contains("-_pointerize__container") && (n.classList.add("-_pointerize__container__hover__temp"), n.classList.add("-_pointerize__container__hover"), n.style.height = `${a.height}px`, n.style.width = `${a.width}px`, n.style.top = `${a.top + a.height / 2}px`, n.style.left = `${a.left + a.width / 2}px`);
    } else if (o.dataset.pointerize !== "pointer__scale__child") {
      if (n.classList.contains("-_pointerize__container__hover")) {
        n.classList.remove("-_pointerize__container__hover");
        const a = I(this.options__merged.size.outer);
        n.style.width = n.style.height = a;
      }
      L(this, F, V).call(this, n, r);
    }
    /pointer__scale/.test((t = o.dataset.pointerize) != null ? t : "") || L(this, F, V).call(this, n, r);
  };
  if (A(this, z).pointer !== void 0) {
    const r = at(this.element__root, "pointermove", e);
    A(this, N).push({
      element: this.element__root,
      event: "pointerMove",
      handler: r
    });
  }
}, F = new WeakSet(), V = function(e, s) {
  e.style.left = `${s.clientX}px`, e.style.top = `${s.clientY}px`;
};
export {
  vt as default
};
