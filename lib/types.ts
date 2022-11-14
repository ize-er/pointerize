// TODO?: remove hard-coded values for attributes:
export interface IPointerize {
  element__root: HTMLElement
  element__svg: SVGSVGElement | null // svg element
  element__svg_container: HTMLDivElement | null // svg's container element (div)
  options__merged: IOptionsMerged // merge of default options and user's options
  start(): void
  stop(): void
  hide(): void
  show(): void
}
export interface IOptionsShapeRatio {
  //`radius` is used for rectangle and ellipse to find the `width`/`height` for rectangle and 'rx'/'ry' for ellipse, and for polygons to find the radii, ratio of the smaller number to larger one
  type: 'size' | 'radius'
  options: {
    // radius options
    type?: 'alternate' | 'accumulate'
    value: number
  }
}
export interface IOptionsShapeGuide {
  // TODO: Implemenet motion
  // `position` determines whether this shape should be used as a guiding path for other shapes to be on, only for polygon, circle
  type: 'position' | 'pattern' | 'motion'
  options?: {
    //0 shared options
    //1 pattern and position
    shapes?: IOptionsShape[]
    //0 pattern options
    preset?: {
      type: 'circle',
      data: IElement
    }
    custom?: IElement
    area?: 'fill' | 'stroke'
    ratios?: {
      tile?: number // ratio of the tile's size to the size of the tiles' container
      gap?: {
        // ratio of the gap's size to the size of the tiles' container
        row: number
        column: number
      }
    }
  }
}
export interface IOptionsShape {
  type:
    | 'ellipse'
    | 'rect'
    | 'circle'
    | 'line'
    | 'polyline'
    | 'polygon'
    | 'path'
    | 'rectangle'
    | 'triangle'
    | 'square'
    | 'star'
    | 'image'
    | 'use'
  // size?: number
  sides?: number // number of polygon's sides
  ratios?: IOptionsShapeRatio[]
  guides?: IOptionsShapeGuide[]
  svg_attributes?: {
    stroke?: string
    'stroke-width'?: string
    'stroke-opacity'?: string
    'stroke-linecap'?: 'butt' | 'round' | 'square'
    'stroke-linejoin'?: 'arcs' | 'bevel' | 'miter' | 'miter-clip' | 'round'
    'stroke-dasharray'?: string
    'stroke-dashoffset'?: string
    'stroke-miterlimit'?: string
    fill?: string
    'fill-opacity'?: string
    'fill-rule'?: 'nonzero' | 'evenodd'
    x?: string
    y?: string
    width?: string
    height?: string
    rx?: string
    ry?: string
    r?: string
    cx?: string
    cy?: string
    x1?: string
    y1?: string
    x2?: string
    y2?: string
    points?: string
    d?: string
    transform?: string
    'clip-path'?: string
    'clip-rule'?: 'nonzero' | 'evenodd' | 'inherit'
    [key: string]: string | undefined
  }
  animations?: IAnimationsOptions[] // CSS animations
  effects?: IEffectsOptions[]
}
export interface IOptionsShapeMerged extends Omit<IOptionsShape, 'size' | 'ratio'> {
  size: number
  ratios: {
    type: 'size' | 'radius'
    options: {
      // `radius` options
      type?: 'alternate' | 'accumulate'
      value: number
    }
  }[]
}
export interface IDefaultsOptionsShape extends Omit<IOptionsShape, 'size' | 'ratios' | 'guides'> {
  // size: number // this one differs from options.size in that it is calculated for svg and can only be a number, nevertheless strings are also allowed for consistency as long as they are in pixel format; e.g. '20px'
  ratios: {
    size: {
      options: {
        value: number
      }
    }
    radius: {
      options: {
        type: 'alternate' | 'accumulate'
        value: number
      }
    }
  }
  guides: {
    pattern: {
      ratios: {
        tile: number
        gap: number
      }
    }
  }
}

// animations

export interface ICssAnimation {
  css_properties: {
    'animation-delay'?: string
    'animation-direction'?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse'
    'animation-duration'?: string
    'animation-fill-mode'?: 'none' | 'forwards' | 'backwards' | 'both'
    'animation-iteration-count'?: 'infinite' | string
    'animation-name'?: string
    'animation-play-state'?: 'running' | 'paused'
    'animation-timing-function'?: string
    'transform-origin'?: string
  }
  keyframes: {
    keyframe_selector?: string
    css_properties?: {
      [key: string]: string
    }
  }[]
}
export interface IAnimationsOptions extends Omit<ICssAnimation, 'css_properties' | 'keyframes'> {
  preset?: IPresetAnimation
  when?: string | string[] // 'still', 'moving', 'active', 'hover', 'always' // TODO? implement
  css_properties?: {
    'animation-delay'?: string
    'animation-direction'?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse'
    'animation-duration'?: string
    'animation-fill-mode'?: 'none' | 'forwards' | 'backwards' | 'both'
    'animation-iteration-count'?: 'infinite' | string
    'animation-name'?: string
    'animation-play-state'?: 'running' | 'paused'
    'animation-timing-function'?: string
    'transform-origin'?: string
  }
  keyframes?: {
    keyframe_selector?: string
    css_properties?: {
      [key: string]: string
    }
  }[]
}

export interface IPresetAnimation {
  type: 'rotate',
  data: ICssAnimation
}

export interface IOptions {
  css_selector__root?: string // css selector for the root element, this is used when Pointerize is used generally
  // so if there is nother root in interactions specified, that one might have priority voer this
  element__svg?: {
    svg_attributes?: {
      [key: string]: string
    }
    css_properties?: {
      [key: string]: string
    }
  }
  element__svg_container?: {
    css_properties?: {
      [key: string]: string
    }
  }
  interactions?: IOptionsInteractions[]
  size?: {
    inner?: number // size of the shapes' container (svg). Note that this is used for setting the `viewBox` and the svg's `width`/`height` is always the same as it's container
    outer?: number // size of the svg's container (div)
  }
  preset?: IOptions // TODO?: implement
  shapes?: IOptionsShape[] // circle, rectangle, square, triangle, cross, crescent, heart, star, rhombus, pentagon, hexagon, heptagon, octagon, nonagon, random
  animations?: IAnimationsOptions[] // TODO?: implement
  effects?: IEffectsOptions[] //TODO?: implement
  system_preferences?: {
    // preferences in user's system
    respect_reduced_motion: boolean // if true, if the user has requested that the system minimize the amount of non-essential motion it uses, disables aniamtions
  }
  // layout?: // determines the layout of the elements
  // color?: string | string[]; // red, #000, random, rgba(), hsla(), random
}
export interface IOptionsInteractions {
  type: 'pointer__scale' | 'pointer' // TODO?: implement ratio for pointer__scale (first pointer scale has to be decided)
  options?: {
    // `pointer` options
    css_selector__root?: string // CSS selector string or HTML Element. the root element to apply the pointer to
    default_pointer?: boolean // whether to show the default user-agent pointer or not
    start_criteria?: IStartCriteria | 'none' // string `none` means pointerize starts unconditionally. if there is a need for criteria, user implements it themselves by using class methods

    // `pointer__scale` options
    elements?: string[] // CSS selector strings

    //...
  }
}
export interface IStartCriteria {
  criteria?: string // mediaQueryString. default is `(pointer: fine)`
  frequency?: 'once' | 'always' // default is `once`, `once` means matchMedia runs once, `always` means an event listener is added on it's return value (`MeidaQueryList`)
}
export interface IOptionsMerged extends Omit<IOptions, 'size' | 'shapes' | 'css_selector__root' | 'css_properties'> {
  css_selector__root: string
  css_properties: {
    [key: string]: string | undefined
  }
  size: {
    inner: number
    outer: number
  }
  shapes?: IOptionsShapeMerged[]
}
interface IStringProps {
  [key: string]: string
}
export interface IDefaultsSvgEls {
  rect: IStringProps
  circle: IStringProps
  ellipse: IStringProps
  line: IStringProps
  polyline: IStringProps
  polygon: IStringProps
  path: IStringProps
  filter: IStringProps
  pattern: IStringProps
  svg: IStringProps
}

// general

export interface IElement {
  element: string
  svg_attributes?: {
    [key: string]: string
  }
  element_children?: IElement[]
}

// effects

export default interface IEffectsOptions {
  preset?: IPresetEffect
  custom?: IElement
}
export interface IElementPresetEffects extends Omit<IElement, 'element_children'> {
  element_children: IElement[]
}

export interface IPresetEffect {
  type: 'glow',
  data: IElementPresetEffects
}

// debounced addEventListener using requestAnimationFrame
export interface IEventHandler {
  (event: TEvents): void
}
export interface IDomEvents {
  // all the events that are added by pointerize, it is used for removing them
  element: HTMLElement // element that has event listener
  event: string // type of event
  handler: IEventHandler // event handler
}
export type TEvents = Event | PointerEvent 