import type { IOptionsShapeMerged } from '../../../types'
import applyEffects from './apply_effects'
import applyAnimations from './apply_animations'
import { createSvgElementsDeep } from '../../../utils'
import { presetsPatterns } from '../../../presets/misc'
import { UnspecifiedProperty } from '../../../errors'
import createShapes from '..'
import processShapes from '../../../process_options/process_shapes'
import makeDefaults from '../../../make_defaults'

const createShape = (
  shape: IOptionsShapeMerged,
  nth: number,
  elementRoot: SVGSVGElement | SVGPatternElement,
  sizeInner: number,
  elementSvg: SVGSVGElement
): void => {
  const attrs = shape.svg_attributes
  const effects = shape.effects
  const elContainerNth = elementSvg.parentElement?.id.match(/\dth/) as RegExpMatchArray
  const elId = `-_${elContainerNth[0]}__shape_${nth}th_${shape.type}`
  const el = document.createElementNS('http://www.w3.org/2000/svg', shape.type)
  el.id = elId
  // attributes
  if (attrs !== undefined) {
    for (const attr of Object.entries(attrs)) {
      if (attr[1] !== undefined) {
        el.setAttribute(attr[0], attr[1])
      }
    }
  }
  // animations
  applyAnimations(el, shape, sizeInner, elementSvg)
  // effects
  if (effects !== undefined) {
    const { filterEls, filterIds } = applyEffects(effects, nth, elContainerNth[0])
    for (const filterEl of filterEls) {
      // append each filter element to svg
      elementRoot.insertAdjacentElement('afterbegin', filterEl)
    }
    const filter = filterIds.map(id => `url(#${id})`).join(' ') // create the final filter attribute string by combining all ids
    el.setAttribute('filter', filter)
  }
  // if it's a pattern guide
  if (shape.guides !== undefined) {
    for (const guide of shape.guides) {
      const guideOptions = guide.options
      if (guide.type === 'pattern') {
        if (guideOptions !== undefined) {
          // `defs` element. if there's already a descendant `defs` element, don't make another
          let elDefs = elementRoot.querySelector(':scope > defs')
          elDefs = elDefs ?? document.createElementNS('http://www.w3.org/2000/svg', 'defs')
          // pattern element
          let elPattern: SVGPatternElement
          let attrId

          if (guideOptions.preset !== undefined) {
            // presets
            attrId = `-_${elContainerNth[0]}__pattern_${guideOptions.preset}_${nth}th`

            // give `id` attribute to the root pattern element
            const elInfoUpdated = presetsPatterns[guideOptions.preset]
            if (elInfoUpdated.svg_attributes !== undefined) {
              elInfoUpdated.svg_attributes.id = attrId
            } else {
              elInfoUpdated.svg_attributes = { id: attrId }
            }

            elPattern = createSvgElementsDeep(elInfoUpdated) as SVGPatternElement
          } else if (guideOptions.custom !== undefined) {
            // custom pattern
            attrId = `-_${elContainerNth[0]}__pattern_custom_${nth}th`

            // give `id` attribute to the root pattern element
            const elInfoUpdated = guideOptions.custom
            if (elInfoUpdated.svg_attributes !== undefined) {
              elInfoUpdated.svg_attributes.id = attrId
            } else {
              elInfoUpdated.svg_attributes = { id: attrId }
            }

            elPattern = createSvgElementsDeep(elInfoUpdated) as SVGPatternElement
          } else if (Array.isArray(guideOptions.shapes) && guideOptions.shapes.length) {
            const ratioTiles = guideOptions.ratios?.tile as number
            const ratioGapRow = guideOptions.ratios?.gap?.row as number
            const ratioGapColumn = guideOptions.ratios?.gap?.column as number
            const strokeWidth = shape.svg_attributes?.['stroke-width']

            if (strokeWidth !== undefined && strokeWidth !== '0' && (ratioGapRow > 0 || ratioGapColumn > 0)) {
              sizeInner = (shape.size - +(strokeWidth ? strokeWidth : 0)) * ratioTiles
            } else {
              sizeInner = (shape.size - +(strokeWidth ? strokeWidth : 0)) * ratioTiles
            }

            const { defaultsSvgElsAttrs } = makeDefaults(sizeInner)
            elPattern = document.createElementNS('http://www.w3.org/2000/svg', 'pattern')

            // set `id` attribute on the root `pattern` element
            attrId = `-_${elContainerNth[0]}__pattern_custom_${nth}th`
            const attrsPattern = defaultsSvgElsAttrs.pattern
            attrsPattern.id = attrId
            for (const attr of Object.entries(attrsPattern)) {
              elPattern.setAttribute(attr[0], attr[1])
            }

            //0 only necessary when there's gap
            const sizeInnerWidth =
              ratioGapColumn === 0
                ? sizeInner
                : sizeInner + (shape.size - +(strokeWidth ? strokeWidth : 0)) * ratioGapColumn
            const sizeInnerHeight =
              ratioGapRow === 0 ? sizeInner : sizeInner + (shape.size - +(strokeWidth ? strokeWidth : 0)) * ratioGapRow
            const sizeInnerWithGap = {
              width: sizeInnerWidth,
              height: sizeInnerHeight,
            }

            //1 to create the gap, set each tile's (`pattern` element) width/height to the new increased value
            elPattern.setAttribute('width', String(sizeInnerWithGap.width))
            elPattern.setAttribute('height', String(sizeInnerWithGap.height))

            //0 pattern shapes
            //1 processShapes
            const { defaultsOpts } = makeDefaults()
            const patternShapesUpdate = processShapes(defaultsOpts.size.inner, guideOptions.shapes, ratioTiles)

            /*1 
              When there's stroke on pattern guide element:
              Adjust `x` and `y` on pattern element.
              Change each pattern shape's size accordingly to automatically scale down the pattern.
            */
            if (guideOptions.area === 'fill' && strokeWidth !== undefined && strokeWidth !== '0') {
              elPattern.setAttribute('x', strokeWidth)
              elPattern.setAttribute('y', strokeWidth)
              for (const s of patternShapesUpdate) {
                s.size -= +strokeWidth * (2 * ratioTiles)
              }
            }

            //1 create pattern shapes
            createShapes(patternShapesUpdate, elPattern, sizeInner, elementSvg, sizeInnerWithGap)
          } else {
            throw new UnspecifiedProperty('pattern guide options', ['preset', 'custom'])
          }

          // set pattern on element
          if (guideOptions.area !== undefined) {
            el.setAttribute(guideOptions.area, `url(#${attrId})`)
          }

          // append
          elDefs.appendChild(elPattern)
          elementRoot.insertAdjacentElement('afterbegin', elDefs)
        }
      }
    }
  }

  elementRoot.appendChild(el)
}

export default createShape
