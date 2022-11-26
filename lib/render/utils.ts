import type { IOptionsShapeAnimation } from '../types'

// finds shape's position
export const makePosition = (
  sizeShape: number,
  sizeInner: { width: number; height: number },
  positionPoints: [number, number][] | undefined,
  nth: number
) => {
  let positionRect: [number, number]
  let positionPolygon: [number, number]
  // the fixed amount part of the positon members' value
  const posRectMemberX = (sizeInner.width - sizeShape) / 2
  const posRectMemberY = (sizeInner.height - sizeShape) / 2
  const posPolyMemberX = sizeInner.width / 2
  const posPolyMemberY = sizeInner.height / 2
  // if there is a guide shape
  if (positionPoints !== undefined) {
    // polygon
    positionPolygon = [positionPoints[nth][0], positionPoints[nth][1]]
    // rectangle
    positionRect = [positionPoints[nth][0] - sizeShape / 2, positionPoints[nth][1] - sizeShape / 2]
  } else {
    positionPolygon = [posPolyMemberX, posPolyMemberY]
    positionRect = [posRectMemberX, posRectMemberY]
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
        radius = i % 2 === 0 ? radius : radius * radiusRatio.value
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
export const updateAnimation = (
  animation: IOptionsShapeAnimation,
  guidesInfo?: { position?: [number, number] }
): IOptionsShapeAnimation | null => {
  //0 add the animation attrs we calculated and then the user's over them
  //1 transform origin
  let transformOrigin
  if (guidesInfo?.position !== undefined) {
    transformOrigin = `${guidesInfo.position[0]}px ${guidesInfo.position[1]}px`
  }
  const preset = animation.preset

  //1 keyframes
  const keyframes = []
  let index = -1
  if (animation.keyframes !== undefined) {
    for (const keyframe of animation.keyframes) {
      index++

      // add preset's keyframes and then the user's keyframes
      let presetKeyframe
      if (preset !== undefined) {
        presetKeyframe = preset.data.keyframes[index]
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
    if (animation.keyframes !== undefined) {
      for (const keyframe of preset.data.keyframes) {
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
  }

  //0 merge them. order of merging is: preset stuff, updated stuff, user's stuff
  const animationUpdated: IOptionsShapeAnimation = {
    ...(preset && preset.data),
    ...animation,
    css_properties: {
      ...(preset && preset.data.css_properties),
      ...(transformOrigin && { 'transform-origin': transformOrigin }),
      ...animation.css_properties,
    },
    ...(keyframes.length && {keyframes}),
  }
  return animationUpdated
}
