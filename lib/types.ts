// TODO?: remove hard-coded values for attributes:
export interface IPointerize {
  /**
   * The root element.
   */
  element__root: HTMLElement
  /**
   * The `svg` element.
   */
  element__svg: SVGSVGElement | null
  /**
   * The `svg`'s container element (`div`).
   */
  element__svg_container: HTMLDivElement | null
  /**
   * The final merged and updated options used for creating this instance.
   */
  options__merged: IOptionsMerged
  /**
   * ID of current instance (on container).
   */
  id: string | undefined
  /**
   * Starts.
   */
  start(): void
  /**
   * Removes elements and event listeners (if there are any ).
   * If it's used as a custom pointer, shows the default pointer if it's not already visible.
   */
  stop(): void
  /**
   * Makes it invisible.
   * If it's used as a custom pointer, shows the default pointer if it's not already visible.
   */
  hide(): void
  /**
   * Makes it visible.
   * If it's used as a custom pointer, removes the default pointer if necessary.
   */
  show(): void
}

// options

export interface IOptions {
  /**
   * CSS selector string for the root element to apply the pointer to.
   * @defaultValue 'body'
   */
  css_selector__root?: string
  /**
   * {@link IPointerize.element__svg}
   */
  element__svg?: {
    svg_attributes?: {
      [key: string]: string
    }
    css_properties?: {
      [key: string]: string
    }
  }
  /**
   * {@link IPointerize.element__svg_container}
   */
  element__svg_container?: {
    css_properties?: {
      [key: string]: string
    }
  }
  /**
   * Interactions that can exist between elements created by Pointerize and anything else on the page.
   */
  interactions?: IOptionsInteractions[]
  size?: {
    /**
     * Size of the `svg` element. This is used for setting the `viewBox`
     * and the `svg`'s `width`/`height` is the same as its container.
     */
    inner?: number
    /**
     * Size of the `svg`'s container (`div`).
     */
    outer?: number
  }
  /**
   * The shapes that will be created.
   */
  // TODO?: circle, rectangle, square, triangle, cross, crescent, heart, star, rhombus, pentagon, hexagon, heptagon, octagon, nonagon, random
  shapes?: IOptionsShape[]
  /**
   * Preferences in user's system.
   */
  system_preferences?: {
    /**
     * If true and if the user has requested that the system minimize the amount of non-essential motion it uses, disables animations.
     */
    respect_reduced_motion: boolean
  }
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

export interface IOptionsShape {
  /**
   * `.make_multiple` is used to specify the shapes less verbosely. All the normal shape properties are
   * wrapped in arrays and applied one by one to the shapes.
   * If an array only has one member, that value is used for all shapes.
   * If a shape doesn't need a property but other shapes do, the property should be `undefined`.
   * */
  make_multiple?: {
    type: 'shapes'
    options: {
      number: number
      value: TOptionsShapeMakeMulti
    }
  }[]
  type?:
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
  /**
   * Number of a polygon's sides
   */
  sides?: number
  /**
   * Ratios are used as a simple way of doing calculations that could have been very complex otherwise.
   */
  ratios?: IOptionsShapeRatio[]
  /**
   * The kinds of guides that this shape can be.
   * A shape is used as a guide fot other shapes to achieve a particular result.
   */
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
  /**
   * CSS animations.
   */
  animations?: IOptionsShapeAnimation[]
  /**
   * Effects that are created by using SVG `filter` and filter primitive elements.
   */
  effects?: IOptionsShapeEffect[]
  /**
   * Added when processing the options.
   */
  size?: number
}

export interface IOptionsShapeMerged extends Omit<IOptionsShape, 'size' | 'ratio'> {
  size: number
  ratios: {
    type: 'size' | 'radius'
    options: {
      type?: 'alternate' | 'accumulate'
      value: number
    }
  }[]
}

export interface IOptionsShapeRatio {
  /**
   * `radius`: Determines polygons' radii ratio, rectangles `width` and `height` ratio, ellipses' `rx` and `ry` ratio.
   * `size`: Determines shapes' size.
   */
  type: 'size' | 'radius'
  options: {
    /**
     * `alternate` radii are multiplied by `value` alternately.
     * `accumulate` each radius is the previous radius multipled by `value`.
     * @remarks
     * `radius` option
     */
    type?: 'alternate' | 'accumulate'
    /**
     * Ratio of the smaller number to larger one.
     */
    value: number
  }
}

export interface IOptionsShapeGuide {
  /**
   * `position`: Configures shapes to be positioned evenly on a circle or on a polygon' vertexes.
   * `pattern`: Configures shapes to be the tiles of a pattern which is on the current shape's fill or stroke.
   */
  type: 'position' | 'pattern' // TODO?: Implemenet `motion`
  options?: {
    shapes?: IOptionsShape[]
    /**
     * A preset that can be used instead of specifying the options.
     * @remarks
     * `pattern` option
     */
     preset?: {
       type: 'circle',
       data: IElement
     }
    /**
     * The area of the shape in which pattern is.
     * @remarks
     * `pattern` option
     */
    area?: 'fill' | 'stroke'
    /**
     * @remarks
     * `pattern` option
     */
    ratios?: {
      /**
       * Ratio of the tile's size to the size of the tiles' container.
       */
      tile?: number
      gap?: {
        /**
         * Ratio of the gap's size to the size of the tiles' container.
         */
        row: number
        column: number
      }
    }
  }
}

// animations

export interface IPresetsAnimation {
  ['rotate']: ICssAnimation
}

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
  /**
   * It is used to create CSS `@keyframes`
   */
  keyframes: {
    keyframe_selector?: string
    css_properties?: {
      [key: string]: string
    }
  }[]
}

export interface IOptionsShapeAnimation extends Omit<ICssAnimation, 'css_properties' | 'keyframes'> {
  /**
   * A preset that can be used instead of specifying the options.
   */
  preset?: IPresetAnimation
  // TODO?: when?: string | string[] ('still', 'moving', 'active', 'hover', 'always')
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

// interactions

export interface IOptionsInteractions {
  /**
   * The accepted value will be changed; please refer to `CHANGELOG.md`.
   * @experimental `pointer__scale` is experimental
   */
  type: 'pointer__scale' | 'pointer' // TODO?: implement ratio for pointer__scale
  options?: {
    /**
     * Whether to show the default user-agent pointer or not
     * @remarks
     * `pointer` option
     */
    default_pointer?: boolean
    /**
     * Determines the criteria for the existence of Pointerize on the page.
     * `none` means pointerize starts unconditionally.
     * @remarks
     * `pointer` option
     */
    start_criteria?: IStartCriteria | 'none'
    /**
     * CSS selector strings.
     * @remarks
     * `pointer__scale` option
     */
    elements?: string[]
  }
}

export interface IStartCriteria {
  /**
   * `mediaQueryString`
   * @defaultValue `(pointer: fine)`
   */
  criteria?: string
  /**
   * Determines whether the criteria is checked once or more.
   * `once` means `matchMedia` runs once. `always` means an event listener is added on its return value (`MeidaQueryList`).
   * @defaultValue `once`
   */
  frequency?: 'once' | 'always'
}

// effects

export default interface IOptionsShapeEffect {
  /**
   * A preset that can be used instead of specifying the options.
   */
  preset?: IPresetEffect
  /**
   * A custom effect.
   */
  custom?: IElement
}

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

//0 events
//1 debounced addEventListener using requestAnimationFrame
export interface IEventHandler {
  (event: TEvents): void
}

//1
/**
 * All the events that are added by pointerize, it is used for removing them.
 */
export interface IDomEvents {
  /**
   * Element that has event listener.
   */
  element: HTMLElement
  /**
   * Type of event.
   */
  event: string
  /**
   * Event handler.
   */
  handler: IEventHandler
}

//1
export type TEvents = Event | PointerEvent

// general

export interface IElement {
  element: string
  svg_attributes?: {
    [key: string]: string
  }
  element_children?: IElement[]
}

type TPutPropsInArray<Type> = {
  [Property in keyof Type]: Type[Property][]
}

export type TOptionsShapeMakeMulti = TPutPropsInArray<IOptionsShape>

// defaults

export interface IDefaultsOptionsShape extends Omit<IOptionsShape, 'size' | 'ratios' | 'guides'> {
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

export interface IDefaultsSvgEls {
  rect: Record<string, string>
  circle: Record<string, string>
  ellipse: Record<string, string>
  line: Record<string, string>
  polyline: Record<string, string>
  polygon: Record<string, string>
  path: Record<string, string>
  filter: Record<string, string>
  pattern: Record<string, string>
  svg: Record<string, string>
}
