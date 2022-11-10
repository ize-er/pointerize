import type { IOptionsShape } from '../types'

/**
 * Builds the shapes property to use in options
 * @param number the number of shapes
 * @param options it has the same structure as options passed to the `pointerize` constructor except
 * all the properties should be wrapped in an Array (except objects) if an Array has one member, 
 * it will be applied to all the shapes and if more, they will be applied in order to all the shapes.
 * Experimental 
 * @returns {IOptionsShape[]} shapes
 */

export const builder_shapes = (number: number, options: Record<string, any>) => {
  const shapes = []

  for (let i = 0; i < number; i++) {
    const shape = {} as IOptionsShape
    const checkPropRecursive = (obj: Record<string, any>, result: Record<string, any>) => {
      for (const p in obj) {
        if (Array.isArray(obj[p])) {
          if (obj[p]['length'] === 1) {
            if (Array.isArray(obj[p][0])) {
              // options that are already arrays
              result[p] = []
              for (let i = 0; i < obj[p][0].length; i++) {
                result[p].push({})
                checkPropRecursive(obj[p][0][i], result[p][i])
              }
            } else {
              result[p] = obj[p][0]
            }
          } else {
            result[p] = obj[p][i]
          }
        } else {
          // TODO?: we can check for Array and then leave the string and number values be but there are already array properties
          result[p] = {}
          if (typeof obj[p] === 'string') {
            result[p] = obj[p]
          } else {
            checkPropRecursive(obj[p], result[p])
          }
        }
      }
    }
    checkPropRecursive(options, shape)
    shapes.push(shape)
  }

  return shapes
}
