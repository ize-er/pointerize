import type { IElGuide, IAnimationsOptions } from '../types'
import { presetsAnimation } from '../presets/misc'

// finds shape's position
export const makePosition = (
  sizeShape: number,
  sizeInner: { width: number; height: number },
  elGuide: IElGuide,
  isGuide: boolean | undefined,
  nth: number
) => {
  let positionRect: [number, number]
  let positionPolygon: [number, number]
  // the fixed amount part of the positon members' value
  const posRectMemberX = (sizeInner.width - sizeShape) / 2
  const posRectMemberY = (sizeInner.height - sizeShape) / 2
  const posPolyMemberX = sizeInner.width / 2
  const posPolyMemberY = sizeInner.height / 2
  if (sizeShape < sizeInner.width && sizeShape < sizeInner.height) {
    // if there is a guide shape
    if (elGuide.points && !isGuide) {
      // if there's a position guide shape and current shape is not it (the guide shape itself should be positioned normally)
      // polygon
      positionPolygon = [posPolyMemberX + elGuide.points[nth][0], posPolyMemberY + elGuide.points[nth][1]]
      // rectangle
      positionRect = [posRectMemberX + elGuide.points[nth][0], posRectMemberY + elGuide.points[nth][1]]
    } else {
      positionPolygon = [posPolyMemberX, posPolyMemberY]
      positionRect = [posRectMemberX, posRectMemberY]
    }
  } else {
    const posPolyMember = sizeShape / 2
    // if there is a guide shape
    if (elGuide.points && !isGuide) {
      // if there's a position guide shape and current shape is not it (the guide shape itself should be positioned normally)
      positionPolygon = [posPolyMember + elGuide.points[nth][0], posPolyMember + elGuide.points[nth][1]]
      positionRect = [posRectMemberX + elGuide.points[nth][0], posRectMemberY + elGuide.points[nth][1]]
    } else {
      positionPolygon = [posPolyMember, posPolyMember]
      positionRect = [posRectMemberX, posRectMemberY]
    }
  }
  return {
    positionPolygon,
    positionRect,
  }
}

// find radial points' coordinates
export const makeRadialPoints = (
  size: number,
  radiusRatio: { type: string; value: number } | undefined,
  sides: number,
  position: [number, number],
  returnType: 'string' | 'array' = 'string'
): [number, number][] | string | null => {
  // this might be used to convert array into string
  const convertToString = (arr: [number, number][]): string => {
    return arr.map(i => i.join(',')).join(' ')
  }
  if (radiusRatio !== undefined) {
    const radialPoints: [number, number][] = []
    let radius = size / 2
    const angleRadianCount = (2 * Math.PI) / sides
    let angleRadian
    for (let i = 0; i <= sides; i++) {
      if (radiusRatio.type === 'alternate') {
        radius = size / 2
        radius = (i%2 === 0) ? radius : radius * radiusRatio.value
      } else {
        // `accumulate`
        i !== 0 && (radius = radius * radiusRatio.value)
      }

      // make all the shapes point upwards (like a mountain peak)
      // calculate the points to 12 decimal places
      // TODO?: make sure the ratios are accurate (/2,/4)
      if (sides % 2 !== 0 && (sides % 3 === 1 || sides % 3 === 0)) {
        // 3, 7, 11, etc.
        angleRadian = Number((angleRadianCount * i + angleRadianCount / 4).toFixed(12))
      } else if (sides % 2 !== 0 && (sides % 3 === 1 || sides % 3 === 2)) {
        // 5, 9, 13, etc.
        angleRadian = Number((angleRadianCount * i - angleRadianCount / 4).toFixed(12))
      } else if (sides % 2 === 0 && sides % 4 !== 0) {
        // 6, 10, etc.
        angleRadian = Number((angleRadianCount * i + angleRadianCount / 2).toFixed(12))
      } else {
        angleRadian = Number((angleRadianCount * i).toFixed(12))
      }
      const x = radius * Math.cos(angleRadian) + position[0] // x coordinate
      const y = radius * Math.sin(angleRadian) + position[1] // y coordinate
      radialPoints.push([x, y])
    }
    // the last point is the same as first one so remove it
    radialPoints.pop()
    if (returnType === 'string') {
      return convertToString(radialPoints)
    } else {
      return radialPoints
    }
  } else {
    return null
  }
}

/* 
   animations
   change the necessary attributes and return the updated attributes 
*/
export const updateAnimation = (animation: IAnimationsOptions, sizeInner: number): IAnimationsOptions | null => {
  // add the animation attrs we calculated and then the user's over them
  const originCoord = sizeInner / 2
  const transformOrigin = `${originCoord}px ${originCoord}px`
  const preset = animation.preset

  // keyframes
  const keyframes = []
  let index = -1
  if (animation.keyframes !== undefined) {
    for (const keyframe of animation.keyframes) {
      index++

      // add preset's keyframes and then the user's keyframes
      let presetKeyframe
      if (preset !== undefined) {
        presetKeyframe = presetsAnimation[preset].keyframes[index]
      }
      keyframes.push({
        ...(preset && presetKeyframe),
        ...keyframe,
        css_properties: {
          ...(preset && presetKeyframe?.css_properties),
          ...keyframe.css_properties,
        },
      })
    }
  } else if (preset !== undefined) {
    for (const keyframe of presetsAnimation[preset].keyframes) {
      index++
      // add preset's keyframes
      keyframes.push({
        ...keyframe,
        css_properties: {
          ...keyframe.css_properties,
        },
      })
    }
  }

  // merge them. order of merging is: preset stuff, updated stuff, user's stuff
  const animationUpdated: IAnimationsOptions = {
    ...(preset && presetsAnimation[preset]),
    ...animation,
    css_properties: {
      ...(preset && presetsAnimation[preset].css_properties),
      'transform-origin': transformOrigin,
      ...animation.css_properties,
    },
    keyframes: keyframes,
  }
  return animationUpdated
}
