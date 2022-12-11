import type { IElement, TEvents } from './types'

export const addListenerDebounce = (
  element: HTMLElement,
  eventName: keyof HTMLElementEventMap,
  lastCallback: (e: TEvents) => void
) => {
  // using eventHandler and eventHandlerInner because the addventListener's listener needs parameters (which are passed to the inner function)
  let ticking = false
  function eventHandlerInner(event: TEvents, callback: (e: TEvents) => void) {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        callback(event)
        ticking = true
      })
    }
    ticking = false
  }

  const eventHandler = (e: TEvents) => eventHandlerInner(e, lastCallback)
  element.addEventListener(eventName, eventHandler as EventListener)
  return eventHandler
}

/* If it's a number, turn it into pixles (string), otherwise keep the string as is.*/
export const makeCssPixelValue = (value: string | number): string => {
  if (typeof value === 'string') {
    return value
  } else {
    return `${value}px`
  }
}

// create the root and all children SVG elements
export const createSvgElementsDeep = function (elementRootInfo: IElement): SVGElement {
  // the element
  const el = document.createElementNS('http://www.w3.org/2000/svg', elementRootInfo.element)
  // attributes
  if (elementRootInfo.svg_attributes !== undefined) {
    for (const attr of Object.entries(elementRootInfo.svg_attributes)) {
      el.setAttribute(attr[0], attr[1])
    }
  }

  if (elementRootInfo.element_children !== undefined) {
    for (const elementNestedInfo of elementRootInfo.element_children) {
      const elementNested = createSvgElementsDeep(elementNestedInfo)
      el.appendChild(elementNested)
    }
  }

  return el
}

// convert array into string
export const convertToString = (arr: [number, number][]): string => {
  return arr.map(i => i.join(',')).join(' ')
}
