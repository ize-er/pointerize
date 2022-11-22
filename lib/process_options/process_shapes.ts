import type { IOptionsShape, IOptionsShapeRatio, IOptionsShapeGuide, IOptionsShapeMerged } from '../types'
import makeDefaults from '../make_defaults'

/**
 *
 * @param shapes
 * @param ratioTile - if the shapes are for a pattern, certain shape properties are multiplied by this
 * @param respectReducedMotion - if true, animations are removed
 * @returns the merged shapes
 */
const processShapes = (
  sizeInner: number,
  shapes: IOptionsShape[],
  ratioTile = 1,
  respectReducedMotion = false
): IOptionsShapeMerged[] => {
  // If a shape object has `make_multiple`, make and add it's shapes and remove the object
  let indexMultiShape = -1
  for (const s of shapes) {
    indexMultiShape++

    if (s.make_multiple !== undefined) {
      for (const m of s.make_multiple) {
        for (let i = 0; i < m.options.number; i++) {
          const shapeMulti: { [s: string]: unknown } = {}
          for (const [k, v] of Object.entries(m.options.value)) {
            if (v.length === 1) {
              shapeMulti[k] = JSON.parse(JSON.stringify(v[0]))
            } else {
              if (v[i] !== undefined) {
                shapeMulti[k] = v[i]
              }
            }
          }
          shapes.splice(indexMultiShape, 0, shapeMulti)
          indexMultiShape++
        }
      }
      // remove object related to `make_multiple` from shapes
      shapes.splice(indexMultiShape, 1)
    }
  }

  //
  const shapesUpdated: IOptionsShapeMerged[] = []

  for (const s of shapes) {
    let ratioRadiusIndex = -1
    let ratioRadius: IOptionsShapeRatio | undefined
    let ratioRadiusOptions
    let guidePatternIndex = -1
    let guidePattern

    //0 size and defaults
    let defaults, defaultsShape

    defaults = makeDefaults()
    defaultsShape = defaults.defaultsShape
    let ratioSize = defaultsShape?.ratios.size.options.value
    if (Array.isArray(s.ratios)) {
      for (const ratio of s.ratios) {
        if (ratio.type === 'size') {
          ratioSize = ratio.options.value
        }
      }
    }
    let size = sizeInner * ratioSize
    defaults = makeDefaults(size)
    defaultsShape = defaults.defaultsShape

    //1 adjust the shape's size based on `stroke-width`
    /* Instead of using the above defaults created by size variable we'll use defaults made by
      `sizeInner` because the `stroke-width` shouldn't be influenced by size ratio. (in `create_shapes`
       the defaults are made with `sizeInner`)
     */
    const { defaultsSvgAttrs: defaultsSvgAttrsTemp } = makeDefaults(sizeInner)
    const strokeWidth = s.svg_attributes?.['stroke-width'] ?? defaultsSvgAttrsTemp.attrsStroke['stroke-width']
    size -= +strokeWidth

    //0 ratios
    let ratios: IOptionsShapeRatio[] = []
    if (Array.isArray(s.ratios) && s.ratios.length) {
      ratios = s.ratios
      let index = -1
      for (const ratioItem of s.ratios) {
        index++
        if (ratioItem.type === 'radius') {
          ratioRadiusIndex = index
          ratioRadiusOptions = ratioItem.options
          ratioRadius = ratioItem
        }
      }
    }

    //1 radius ratio (for polygons), mandatory
    ratioRadiusOptions = { ...defaultsShape.ratios.radius.options, ...ratioRadiusOptions }
    // start is a polygon but doesn't need `1` for it's radius ratio
    if (s.type === 'triangle') {
      //polygon
      ratioRadiusOptions.value = ratioRadius?.options.value ?? 1
      ratioRadius = { type: 'radius', options: ratioRadiusOptions }
    } else if (s.type === 'polygon') {
      ratioRadiusOptions.value = ratioRadius?.options.value ?? 1
      ratioRadius = { type: 'radius', options: ratioRadiusOptions }
    }

    if (ratioRadius !== undefined) {
      ratioRadius = { type: 'radius', options: ratioRadiusOptions }
      ratios.splice(ratioRadiusIndex, 1, ratioRadius)
    }

    //0 guides
    let guides: IOptionsShapeMerged['guides']

    if (Array.isArray(s.guides) && s.guides.length) {
      guides = s.guides
      let index = -1
      for (const guideItem of s.guides) {
        index++
        // pattern
        if (guideItem.type === 'pattern') {
          guidePatternIndex = index
          guidePattern = {
            ...guideItem,
            options: {
              ...guideItem.options,
              ratios: {
                tile: defaultsShape.guides.pattern.ratios.tile,
                ...guideItem.options?.ratios,
                gap: {
                  row: defaultsShape.guides.pattern.ratios.gap,
                  column: defaultsShape.guides.pattern.ratios.gap,
                  ...guideItem.options?.ratios?.gap,
                },
              },
            },
          }
          guides.splice(guidePatternIndex, 1, guidePattern as IOptionsShapeGuide)
        }
      }
    }

    //0 multiply by ratioTile (if it's a pattern, this needs to be done)
    if (ratioTile) {
      size *= ratioTile
    }

    //
    shapesUpdated.push({
      ...s,
      size,
      ratios,
      guides,
      ...(respectReducedMotion && { animations: undefined }),
    })
  }
  return shapesUpdated
}

export default processShapes
