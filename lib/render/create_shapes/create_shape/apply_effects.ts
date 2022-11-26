import type { IOptionsShapeEffect } from '../../../types'
import { createSvgElementsDeep } from '../../../utils'
import { UnspecifiedProperty } from '../../../errors'

/**
 * creates filter and filter primitive elements
 * @param effects 
 * @returns filter elements and ids
 */
export default function applyEffects(
  effects: IOptionsShapeEffect[]
): { filterEls: SVGFilterElement[]; filterIds: string[] } {

  const filterIds = []
  const filterEls: SVGFilterElement[] = []
  if (effects !== undefined) {
    for (const ef of effects) {
      let elFilter: SVGFilterElement | undefined
      let attrId
      if (ef.preset !== undefined) { // presets
        
        attrId = ef.preset.data.svg_attributes?.id as string
        filterIds.push(attrId)

        if (ef.preset.data.element_children !== undefined) {
          elFilter = createSvgElementsDeep(ef.preset.data) as SVGFilterElement
        }
      } else if (ef.custom !== undefined) {// custom effect
        
        attrId = ef.custom.svg_attributes?.id as string
        filterIds.push(attrId)

        if (ef.custom.element_children !== undefined) {
          elFilter = createSvgElementsDeep(ef.custom) as SVGFilterElement
        }
      } else {
        throw new UnspecifiedProperty('effect', ['preset', 'custom'])
      }
      if (elFilter !== undefined) {
        filterEls.push(elFilter)
      }
    }
  }
  return { filterEls, filterIds }
}
