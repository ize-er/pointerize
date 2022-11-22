import type { IPointerize, IOptions, IOptionsMerged, IDomEvents, IOptionsInteractions, TEvents } from './types'
import processOptions from './process_options/process_options'
import { addListenerDebounce } from './utils'
import { makeCssPixelValue } from './utils'
import { InvalidRoot } from './errors'
import createShapes from './render/create_shapes'

export default class Pointerize implements IPointerize {
  
  element__root: HTMLElement
  options__merged: IOptionsMerged
  element__svg: SVGSVGElement | null
  element__svg_container: HTMLDivElement | null
  id: string | undefined
  #options__interactions: {
    // info related to `options`' `interactions` property and related elements. stored here because it's used in multiple places
    pointer: IOptionsInteractions | undefined
    pointer__elements: {
      root: HTMLElement | null // root element that pointer is applied to
    }
    pointer__pointer__scale: IOptionsInteractions | undefined
  } = {
    pointer: undefined,
    pointer__elements: {
      root: null,
    },
    pointer__pointer__scale: undefined,
  }
  #domEvents: IDomEvents[] = []
  
  /**
   * 
   * @param options Options based on which the instance is created.
   */
  constructor(options: IOptions) {
    this.element__svg = null
    this.options__merged = processOptions(options)
    // container
    this.element__svg_container = null

    // interactions
    if (this.options__merged.interactions !== undefined) {
      for (const inter of this.options__merged.interactions) {
        inter.type === 'pointer' && (this.#options__interactions.pointer = inter)
        inter.type === 'pointer__scale' && (this.#options__interactions.pointer__pointer__scale = inter)
      }
    } else {
      this.#options__interactions.pointer = undefined
    }

    const elementRoot = document.querySelector(this.options__merged.css_selector__root)
    if (!(elementRoot instanceof HTMLElement)) {
      // throw if the root element could not be selected
      throw new InvalidRoot()
    }
    this.element__root = elementRoot
  }

  #render(): void {
    //1 initial preperations (svg and svg container elements, options)

    //2 create container and svg
    //3 container
    const container = document.createElement('div')
    this.element__svg_container = container

    //4 add the id specific to this instance
    let nth
    const elsPointerize = Array.from(document.querySelectorAll('[id*=-_pointerize__container]'))
    if (elsPointerize.length === 0) {
      // if there are no other instances, this one becomes 0
      nth = '0'
    } else {
      // find the last element's `nth` and this one becomes `n+1`
      let nthLargest = -1
      for (const el of elsPointerize) {
        const id = +(el.getAttribute('id')?.match(/(?<number>\d+)th$/)?.groups?.number as string)
        if (id > nthLargest) {
          nthLargest = id
        }
      }
      nth = nthLargest + 1
    }
    const attrId = `-_pointerize__container_${nth}th`
    container.id = attrId
    this.id = attrId

    //4 add the general glass
    container.classList.add('-_pointerize__container')

    const size = makeCssPixelValue(this.options__merged.size.outer)
    container.style.width = size
    container.style.height = size
    const containerCssProps = this.options__merged.element__svg_container?.css_properties
    if (containerCssProps !== undefined) {
      for (const attr of Object.entries(containerCssProps)) {
        container.style.setProperty(attr[0], attr[1])
      }
    }

    if (this.#options__interactions.pointer !== undefined) {
      container.style.setProperty('transform', 'translate(-50%, -50%)')
      container.style.setProperty('pointer-events', 'none')
      container.setAttribute('aria-hidden', '')
    }
    //3 svg
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    this.element__svg = svg
    const svgSvgAttrs = this.options__merged.element__svg?.svg_attributes
    const svgCssProps = this.options__merged.element__svg?.css_properties
    if (svgSvgAttrs !== undefined) {
      for (const attr of Object.entries(svgSvgAttrs)) {
        svg.setAttribute(attr[0], attr[1])
      }
    }
    if (svgCssProps !== undefined) {
      for (const attr of Object.entries(svgCssProps)) {
        svg.style.setProperty(attr[0], attr[1])
      }
    }
    svg.setAttribute('viewBox', `0 0 ${this.options__merged.size.inner} ${this.options__merged.size.inner}`)
    container.appendChild(svg)

    // shapes
    if (Array.isArray(this.options__merged.shapes)) {
      createShapes(this.options__merged.shapes, svg, this.options__merged.size.inner, svg)
    }

    // mount
    this.element__root.appendChild(container)
  }

  #add_listeners(): void {
    // prepare the elements for each interaction
    if (this.options__merged.interactions !== undefined) {
      for (const inter of this.options__merged.interactions) {
        if (inter.type === 'pointer__scale') {
          // `pointer__pointer__scale` interaction
          if (inter.options?.elements !== undefined) {
            if (inter.options?.elements.length) {
              // gather all target elements
              const elements = []
              for (const el of inter.options.elements) {
                const elsHTML = Array.from(document.querySelectorAll(el))
                elements.push(...elsHTML)
              }
              // give all the target elements and their children a specific data attribute. target elements' attribute differs from their childrn
              const handleChildren = (children: Element[]) => {
                if (children.length > 0) {
                  for (const child of children) {
                    if (child instanceof HTMLElement) {
                      child.dataset.pointerize = 'pointer__scale__child'
                      const childChildren = Array.from(child.children)
                      if (childChildren.length > 0) {
                        handleChildren(childChildren)
                      }
                    }
                  }
                }
              }
              for (const el of elements) {
                if (el instanceof HTMLElement) {
                  el.dataset.pointerize = 'pointer__scale'
                  const Children = Array.from(el.children)
                  handleChildren(Children)
                }
              }
            }
            const container = this.element__svg_container as HTMLDivElement
            /* 
               This class will be added when pointer is on the element and should be 
               removed when pointer leaves the element but not before transition is complete,
               so we add this event listener here just once
            */
            container.addEventListener('transitionend', () => {
              container.classList.remove('-_pointerize__container__hover__temp')
            })
          }
        }
      }
    }

    // event handlers
    const pointerMove = (event: TEvents) => {
      const container = this.element__svg_container as HTMLDivElement
      const eventTarget = event.target as HTMLDivElement
      // pointer__scale interaction
      if (eventTarget.dataset.pointerize === 'pointer__scale') {
        const bounding = eventTarget.getBoundingClientRect()
        if (container.classList.contains('-_pointerize__container')) {
          container.classList.add('-_pointerize__container__hover__temp')
          container.classList.add('-_pointerize__container__hover')
          container.style.height = `${bounding.height}px`
          container.style.width = `${bounding.width}px`
          container.style.top = `${bounding.top + bounding.height / 2}px`
          container.style.left = `${bounding.left + bounding.width / 2}px`
        }
      } else {
        if (eventTarget.dataset.pointerize !== 'pointer__scale__child') {
          // if the element is not a child of 'pointer__scale' target
          if (container.classList.contains('-_pointerize__container__hover')) {
            // `-_pointerize__container__hover__temp` is removed automatically by transitionend event

            container.classList.remove('-_pointerize__container__hover')
            const size = makeCssPixelValue(this.options__merged.size.outer)
            container.style.width = container.style.height = size
          }
          this.#move_pointer(container, event as PointerEvent)
        }
      }
      if (!/pointer__scale/.test(eventTarget.dataset.pointerize ?? '')) {
        // if it's not on an `pointer__scale` interaction element
        this.#move_pointer(container, event as PointerEvent)
      }
    }

    // add event listeners
    if (this.#options__interactions.pointer !== undefined) {
      // if there is `pointer` interaciton
      const eventHandler = addListenerDebounce(this.element__root, 'pointermove', pointerMove)
      this.#domEvents.push({
        element: this.element__root,
        event: 'pointerMove',
        handler: eventHandler,
      })
    }
  }

  // if there is `pointer` interaction, this moves the container
  #move_pointer(container: HTMLElement, event: PointerEvent): void {
    container.style.left = `${event.clientX}px`
    container.style.top = `${event.clientY}px`
  }

  start(): void {
    if (this.#options__interactions.pointer !== undefined) {
      // if there is a `pointer` type in interactions
      let isAllowed: boolean
      // decides what to do based on MediaQuery results and start mode
      const decideMQL = (m: MediaQueryList | MediaQueryListEvent) => {
        isAllowed = m.matches
        if (isAllowed) {
          // related to `pointer` interaction
          if (!this.#options__interactions.pointer?.options?.default_pointer) {
            this.element__root.classList.add('-_pointerize__pointer_default__non')
          }
          //
          this.#render()
          this.#add_listeners()
        } else {
          if (this.element__svg_container !== null) {
            // related to `pointer` interaction
            if (!this.#options__interactions.pointer?.options?.default_pointer) {
              this.element__root.classList.remove('-_pointerize__pointer_default__non')
            }
            // call `stop` only if pointerize elements exist
            this.stop()
          }
        }
      }
      // criteria
      const startCriteria = this.#options__interactions.pointer.options?.start_criteria
      if (typeof startCriteria === 'string') {
        if (startCriteria === 'none') {
          // if user chose `none`, don't do any checks
          isAllowed = true
        }
      } else if (typeof startCriteria === 'object') {
        if (typeof startCriteria.criteria === 'string') {
          // mediaQueryString
          const mql = matchMedia(startCriteria.criteria)

          if (startCriteria.frequency === 'once') {
            decideMQL(mql)
          } else if (startCriteria.frequency === 'always') {
            if (this.element__svg_container === null) {
              // if pointerize elements don't exist, run the function once
              decideMQL(mql)
            }
            mql.addEventListener('change', decideMQL)
          }
        }
      }
    } else {
      this.#render()
      this.#add_listeners()
    }
  }

  stop(): void {
    // remove the event listeners
    for (const DOMEvent of this.#domEvents) {
      DOMEvent.element.removeEventListener(DOMEvent.event, DOMEvent.handler)
    }
    // remove the elements
    this.element__svg_container?.remove()
    // related to `pointer` interaction, show the default pointer if it's not already there
    if (this.#options__interactions.pointer !== undefined) {
      if (!this.#options__interactions.pointer.options?.default_pointer) {
        this.element__root.classList.remove('-_pointerize__pointer_default__non')
      }
    }
  }

  hide() {
    // add non-visibility class to svg container
    this.element__svg_container?.classList.add('-_pointerize-_u__display__non')
    // related to `pointer` interaction, show the default pointer if it's not already there
    if (!this.#options__interactions.pointer?.options?.default_pointer) {
      this.element__root.classList.remove('-_pointerize__pointer_default__non')
    }
  }

  show() {
    if (this.element__svg_container !== null) {
      // remove non-visibility class from svg container
      this.element__svg_container.classList.remove('-_pointerize-_u__display__non')
      // related to `pointer` interaction, remove the default pointer if it's specified in options
      if (!this.#options__interactions.pointer?.options?.default_pointer) {
        this.element__root.classList.add('-_pointerize__pointer_default__non')
      }
    }
  }
}
