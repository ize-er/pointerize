import type { IOptionsShapeMerged } from '../../../types'
import { createSvgElementsDeep } from '../../../utils'
import { UnspecifiedProperty } from '../../../errors'

export default function applyEffects(
  effects: IOptionsShapeMerged['effects'],
  nth: number,
  elementContainerNth: string
): { filterEls: SVGFilterElement[]; filterIds: string[] } {
  const filterIds = []
  const filterEls: SVGFilterElement[] = []
  if (effects !== undefined) {
    let index = -1
    for (const ef of effects) {
      index++
      let elFilter: SVGFilterElement
      let attrId
      if (ef.preset !== undefined) {
        // presets
        attrId = `-_${elementContainerNth}__filter_${ef.preset.type}${nth}th_${index}th`
        filterIds.push(attrId)

        // give `id` attribute to the root filter element
        const elInfoUpdated = ef.preset.data
        if (elInfoUpdated.svg_attributes !== undefined) {
          elInfoUpdated.svg_attributes.id = attrId
        } else {
          elInfoUpdated.svg_attributes = { id: attrId }
        }

        elFilter = createSvgElementsDeep(elInfoUpdated) as SVGFilterElement
      } else if (ef.custom !== undefined) {
        // custom effect
        attrId = `-_${elementContainerNth}__filter_custom_${nth}th_${index}th`
        filterIds.push(attrId)

        // give `id` attribute to the root filter element
        const elInfoUpdated = ef.custom
        if (elInfoUpdated.svg_attributes !== undefined) {
          elInfoUpdated.svg_attributes.id = attrId
        } else {
          elInfoUpdated.svg_attributes = { id: attrId }
        }

        elFilter = createSvgElementsDeep(elInfoUpdated) as SVGFilterElement
      } else {
        throw new UnspecifiedProperty('effect', ['preset', 'custom'])
      }
      filterEls.push(elFilter)
    }
  }
  return { filterEls, filterIds }
}
