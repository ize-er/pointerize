import type { IDefaultsSvgEls, IOptionsShapeMerged } from '../../types'
import { makeRadialPoints, makePosition } from '../utils'
import makeDefaults from '../../make_defaults'
import createShape from './create_shape'

/**
 * @param instanceNth
 * @param shapesMerged
 * @param elementRoot
 * @param sizeInner
 * @param elementSvg
 * @param guidesInfo informtion that is needed when these shapes are used for a guide shape
 * @param groupInfo informtion that is needed when these shapes are used for as a group (`g` element)
 */
const createShapes = (
  instanceNth: number,
  shapesMerged: IOptionsShapeMerged[],
  elementRoot: SVGSVGElement | SVGPatternElement | SVGGElement,
  sizeInner: number,
  elementSvg: SVGSVGElement,
  guidesInfo?: {
    sizeInnerCustom?: { width: number; height: number } | undefined
    positionPoints?: [number, number][] | undefined
    parentId?: string
  },
  groupInfo?: {
    svgAttributes: IOptionsShapeMerged['svg_attributes'],
    parentNth: number
  }
) => {
  
  const { defaultsSvgElsAttrs, defaultsShape } = makeDefaults(sizeInner)

  // arguments for each shape to be used with createShape function. the results for each shape will be put in here.
  const createShapeArgs: [IOptionsShapeMerged, number, [number, number] | [number, number][]][] = []
  
  const sizeInnerUpdated = guidesInfo?.sizeInnerCustom || { width: sizeInner, height: sizeInner }
  const posPointsUpdated = guidesInfo?.positionPoints
  let nth = -1
  for (const s of shapesMerged) {
    nth++
    let newShape: IOptionsShapeMerged | undefined = undefined
    const size = s.size

    // find element's position
    const positions = makePosition(size, sizeInnerUpdated, posPointsUpdated, nth)
    const positionPolygon = positions.positionPolygon
    const positionRect = positions.positionRect

    let ratioRadius = defaultsShape.ratios.radius.options // defaults
    if (Array.isArray(s.ratios)) {
      // customs if present
      for (const ratio of s.ratios) {
        if (ratio.type === 'radius') {
          ratioRadius = ratio.options as typeof defaultsShape.ratios.radius.options
          break
        }
      }
    }
    switch (s.type) {
      case 'rectangle': {
        const width = size * ratioRadius.value
        const height = size
        const x = positionRect[0] + (size - width) / 2
        const y = positionRect[1]

        newShape = {
          ...s,
          type: 'rect',
          svg_attributes: {
            ...defaultsSvgElsAttrs['rect'],
            width: String(width),
            height: String(height),
            x: String(x),
            y: String(y),
            ...s.svg_attributes,
          },
        }

        createShapeArgs.push([
          {
            ...newShape,
          },
          nth,
          positionPolygon,
        ])

        break
      }
      case 'square': {
        newShape = {
          ...s,
          type: 'rect',
          svg_attributes: {
            ...defaultsSvgElsAttrs['rect'],
            width: String(size),
            height: String(size),
            x: String(positionRect[0]),
            y: String(positionRect[1]),
            ...s.svg_attributes,
          },
        }

        createShapeArgs.push([
          {
            ...newShape,
          },
          nth,
          positionPolygon,
        ])

        break
      }
      case 'circle': {
        const x = positionPolygon[0]
        const y = positionPolygon[1]
        newShape = {
          ...s,
          type: 'circle',
          svg_attributes: {
            ...defaultsSvgElsAttrs['circle'],
            r: String(size / 2),
            cx: String(x),
            cy: String(y),
            ...s.svg_attributes,
          },
        }

        createShapeArgs.push([
          {
            ...newShape,
          },
          nth,
          positionPolygon,
        ])

        break
      }
      case 'ellipse': {
        const sizeEllipse = size / 2

        const rx = sizeEllipse * ratioRadius.value
        const ry = sizeEllipse
        const cx = positionPolygon[0]
        const cy = positionPolygon[1]

        newShape = {
          ...s,
          type: 'ellipse',
          svg_attributes: {
            ...defaultsSvgElsAttrs['ellipse'],
            rx: String(rx),
            ry: String(ry),
            cx: String(cx),
            cy: String(cy),
            ...s.svg_attributes,
          },
        }

        createShapeArgs.push([
          {
            ...newShape,
          },
          nth,
          positionPolygon,
        ])

        break
      }
      case 'triangle': {
        // polygon with 3 sides

        const sides = 3
        const points = makeRadialPoints(size, ratioRadius, sides, positionPolygon, 'string') as string
        if (points !== null) {
          newShape = {
            ...s,
            type: 'polygon',
            svg_attributes: {
              ...defaultsSvgElsAttrs['path'],
              points: points,
              ...s.svg_attributes,
            },
          }

          createShapeArgs.push([
            {
              ...newShape,
            },
            nth,
            positionPolygon,
          ])
        }
        break
      }
      case 'polygon': {
        /*
            3 sides: triangle
            4 sides: square
            5 sides: pentagon
            6 sides: hexagon
            7 sides: heptagon
            8 sides: octagon
            9 sides: nonagon
            10 sides: decagon
            ...
          */
        const sides = s.sides
        if (sides !== undefined) {
          const points = makeRadialPoints(size, ratioRadius, sides, positionPolygon, 'string') as string
          if (points !== null) {
            newShape = {
              ...s,
              type: 'polygon',
              svg_attributes: {
                ...defaultsSvgElsAttrs['polygon'],
                points: points,
                ...s.svg_attributes,
              },
            }

            createShapeArgs.push([
              {
                ...newShape,
              },
              nth,
              positionPolygon,
            ])
          }
        }
        break
      }
      case 'star': {
        // polygon with 10 sides (decagon)

        const sides = 10
        const sizeStar = size / 2
        const points = makeRadialPoints(sizeStar, ratioRadius, sides, positionPolygon, 'string') as string
        if (points !== null) {
          newShape = {
            ...s,
            type: 'polygon',
            svg_attributes: {
              ...defaultsSvgElsAttrs['polygon'],
              points: points,
              ...s.svg_attributes,
            },
          }

          createShapeArgs.push([
            {
              ...newShape,
            },
            nth,
            positionPolygon,
          ])
        }
        break
      }
      case 'image': {
        let x
        let y
        if (size < sizeInner) {
          x = positionRect[0] + size / 2 / 2
          y = positionRect[1]
        } else {
          // x
          if (s.svg_attributes?.width) {
            x = (size - +s.svg_attributes.width) / 2
          } else {
            x = size / 2 / 2
          }
          // y
          if (s.svg_attributes?.height) {
            y = (size - +s.svg_attributes.height) / 2
          } else {
            y = 0
          }
        }

        newShape = {
          ...s,
          type: 'image',
          svg_attributes: {
            width: String(size / 2),
            height: String(size),
            x: String(x),
            y: String(y),
            ...s.svg_attributes,
          },
        }

        createShapeArgs.push([
          {
            ...newShape,
          },
          nth,
          positionPolygon,
        ])

        break
      }
      case 'g': {

            newShape = {
              ...s,
              type: 'g'
            }

            createShapeArgs.push([
              {
                ...newShape,
              },
              nth,
              guidesInfo?.positionPoints as [number, number][],
            ])
        break
      }
      default: {
        newShape = {
          ...s,
          type: s.type,
          svg_attributes: {
            ...defaultsSvgElsAttrs[s.type as keyof IDefaultsSvgEls],
            ...s.svg_attributes,
          },
        }

        createShapeArgs.push([
          {
            ...newShape,
          },
          nth,
          positionPolygon,
        ])
      }
    }

    // if the shape is inside `g` remove those attributes that `g` has. (because they should be inherited)
    if (groupInfo !== undefined && newShape !== undefined && groupInfo.svgAttributes !== undefined) {
      const elGAttrs = Object.keys(groupInfo.svgAttributes)
      for (const attr of elGAttrs) {
        delete newShape.svg_attributes?.[attr]
      }
    }

  }

  // create svg elements and append to root element
  for (const args of createShapeArgs) {
    createShape(instanceNth, args[0], args[1], elementRoot, sizeInner, elementSvg, {
      parentId: guidesInfo?.parentId,
      position: args[2],
    }, {
      parentNth: groupInfo?.parentNth 
    })
  }
}

export default createShapes
