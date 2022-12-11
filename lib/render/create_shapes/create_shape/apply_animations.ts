import type { IOptionsShape } from '../../../types'
import { updateAnimation } from '../../utils'

export default function applyAnimations(
  el: SVGElement,
  shape: IOptionsShape,
  elementSvg: SVGSVGElement
): void {
  if (shape.animations !== undefined) {
    
    const animationsUpdated = []
    let styleDeclarations = ''

    // merge all the animation-related properties by commas
    const animationsMerged: Record<string, string> = {}
    for (const animationObj of shape.animations) {
      // update them
      const animationUpdated = updateAnimation(animationObj)
      animationsUpdated.push(animationUpdated)

      if (animationUpdated !== null && animationUpdated.css_properties !== undefined) {
        for (const prop of Object.entries(animationUpdated.css_properties)) {
          if (/^animation/.test(prop[0])) {
            if (prop[0] in animationsMerged) {
              animationsMerged[prop[0]] += `,${prop[1]}`
            } else {
              animationsMerged[prop[0]] = prop[1]
            }
          } else {
            // not animation-related property
            animationsMerged[prop[0]] = prop[1]
          }
        }
      }
    }

    // add selector and animation properties
    const elContainerId = elementSvg.parentElement?.id
    styleDeclarations += `#${elContainerId} #${el.id}{`
    for (const prop of Object.entries(animationsMerged)) {
      styleDeclarations += `${prop[0]}:${animationsMerged[prop[0]]};`
    }
    styleDeclarations += '}'

    // add keyframes
    for (const animationObj of animationsUpdated) {
      if (animationObj !== null && animationObj.css_properties !== undefined) {
        if (animationObj?.keyframes !== undefined) {
          styleDeclarations += `@keyframes ${animationObj.css_properties['animation-name']}{`
          for (const keyframe of animationObj.keyframes) {
            styleDeclarations += `${keyframe.keyframe_selector}{`
            const propsKeyframe = keyframe.css_properties
            if (propsKeyframe !== undefined) {
              for (const prop of Object.entries(propsKeyframe)) {
                styleDeclarations += `${prop[0]}:${prop[1]};`
              }
            }
            styleDeclarations += '}'
          }
          styleDeclarations += '}'
        }
      }
    }

    // create the `style` element if it doesn't exist and append to svg.
    let elementStyle = elementSvg.querySelector(':scope > style')
    if (elementStyle === null) {
      elementStyle = document.createElement('style')
      elementSvg.insertAdjacentElement('afterbegin', elementStyle)
    }
    
    //
    elementStyle.textContent += styleDeclarations
  }
}
