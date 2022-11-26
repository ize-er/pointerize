
import type { IOptionsShape, IOptionsShapeMerged } from "../../types" 
import processShapes from "./process_shapes"


/**
 * If a shape object has `make_multiple` property, create and add its shapes to a `g` and remove the shape object.
 * 
 * @param shapes
 * @param sizeInner
 */
export function makeMultiple(shapes: IOptionsShape[], instanceNth: number, sizeInner: number) {
  
  let index = -1
  let indexMulti
  const shapeGs = []
  for (const s of shapes) {
    index++
    if (s.make_multiple !== undefined) {
      indexMulti = index
      for (const m of s.make_multiple) {
        const shapeG: IOptionsShape = { type: 'g', shapes: []}
        const shapesMulti: IOptionsShape[] = []
        for (let i = 0; i < m.options.number; i++) {
          
          const shapeMulti: IOptionsShape = {}
          for (const [k, v] of Object.entries(m.options.value)) {

            // when there is only one member, if property is `aninmations`, `effects`, or `svg_attributes` add it to the `g`
            if (v.length === 1) { 
              if (k === 'animations') {
                shapeG.animations = v[0] as IOptionsShape['animations']
              }
              else if (k === 'effects') {
                let attrId
                for (const effects of v as IOptionsShape['effects'][]) {
                  let indexEf = -1
                  if (effects !== undefined) {
                    for (const ef of effects) {
                      indexEf++
                      if (ef.preset !== undefined) {
                        attrId = `-_${instanceNth}th__filter_${ef.preset.type}_nth_${indexEf}th`
                        if (ef.preset.data.svg_attributes !== undefined) {
                          ef.preset.data.svg_attributes.id = attrId
                        }
                      }
                      else if (ef.custom !== undefined) {
                        attrId = `-_${instanceNth}th__filter_custom_nth_${indexEf}th`
                        if (ef.custom.svg_attributes !== undefined) {
                          ef.custom.svg_attributes.id = attrId
                        }
                      }
                    }
                  }
                }
                shapeG.effects = v[0] as IOptionsShape['effects']
              }
              else if (k === 'svg_attributes') {
                shapeG.svg_attributes = v[0] as IOptionsShape['svg_attributes']
              }
              else {
                shapeMulti[k as keyof IOptionsShape] = JSON.parse(JSON.stringify(v[0]))
              }
            } else {
              if (k === 'effects') {
                let attrId
                let indexEf = -1
                for (const effects of v as IOptionsShape['effects'][]) {
                  indexEf++
                  let indexEfShape = -1
                  if (effects !== undefined) {
                    for (const ef of effects) {
                      indexEfShape++
                      if (ef.preset !== undefined) {
                        attrId = `-_${instanceNth}th__filter_${ef.preset.type}_${indexEf}_${indexEfShape}th`
                        if (ef.preset.data.svg_attributes !== undefined) {
                          ef.preset.data.svg_attributes.id = attrId
                        }
                      }
                      else if (ef.custom !== undefined) {
                        attrId = `-_${instanceNth}th__filter_custom_${indexEf}_${indexEfShape}th`
                        if (ef.custom.svg_attributes !== undefined) {
                          ef.custom.svg_attributes.id = attrId
                        }
                      }
                    }
                  }
                }
              }
              if (v[i] !== undefined) {
                shapeMulti[k as keyof IOptionsShape] = v[i] as any
              }
            }
          }
          shapesMulti.push(shapeMulti)
        }
        // process 
        const shapesMultiProcessed: IOptionsShapeMerged[] = processShapes(instanceNth, sizeInner, shapesMulti)
        shapeG.shapes = shapesMultiProcessed
        shapeGs.push(shapeG)
      }
      // remove the object from shapes
      shapes.splice(indexMulti, 1)
    }
  }
  // add the groups to shapes
  if (indexMulti !== undefined) {
    shapes.splice(indexMulti, 0, ...shapeGs)
  }
}
