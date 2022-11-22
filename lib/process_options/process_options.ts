import makeDefaults from '../make_defaults'
import type { IOptionsMerged, IOptions, IOptionsInteractions, IStartCriteria } from '../types'
import processShapes from './process_shapes'

const processOptions = (opts: IOptions): IOptionsMerged => {
  /* 
    first, for the nested properties, find the merged value by checking the values and making the necessary changes
    and merging user's options with default options
    then, put them all together to make the merged options.
  */

  // defaults
  const { defaultsOpts, defaultsSvgElsAttrs } = makeDefaults()

  // system_preferences
  //0 if `systemPrefereces.respectReducedMotion` is true, if user refers less motion, disable animations
  let respectReducedMotion = false
  if (opts.system_preferences?.respect_reduced_motion) {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      respectReducedMotion = true
    }
  }

  //0 interactions
  const interactions: IOptionsMerged['interactions'] = []
  //1 find all interactions' properties
  let default_pointer, startCriteria
  let indexPointer = -1
  let indexPointerScale = -1
  if (Array.isArray(opts.interactions)) {
    let index = -1
    for (const inter of opts.interactions) {
      index++
      if (inter.type === 'pointer') {
        indexPointer = index
        default_pointer = inter.options?.default_pointer
        startCriteria = inter.options?.start_criteria
      } else if (inter.type === 'pointer__scale') {
        indexPointerScale = index
      }
    }
  }
  //2 css_selector__root
  const cssSelectorRoot = opts.css_selector__root ?? 'body'
  //2 default_pointer
  default_pointer = default_pointer ?? false
  //2 start_criteria
  if (startCriteria !== undefined) {
    if (typeof startCriteria === 'string') {
      if (startCriteria === 'none') {
        // user wants to implement it themselves
        startCriteria = 'none'
      } else {
        // user provided the wrong value
        startCriteria = {
          criteria: defaultsOpts.interactions.pointer.start_criteria.criteria,
          frequency: defaultsOpts.interactions.pointer.start_criteria.frequency,
        }
      }
    } else {
      if (typeof startCriteria === 'object') {
        startCriteria = {
          criteria: startCriteria.criteria || defaultsOpts.interactions.pointer.start_criteria.criteria,
          frequency: startCriteria.frequency || defaultsOpts.interactions.pointer.start_criteria.frequency,
        }
      } else {
        // user provided the wrong type
        startCriteria = defaultsOpts.interactions.pointer.start_criteria
      }
    }
  } else {
    // default
    startCriteria = defaultsOpts.interactions.pointer.start_criteria
  }
  //1 pointer
  const interactionPointer: IOptionsInteractions = {
    type: 'pointer',
    options: {
      default_pointer: default_pointer,
      start_criteria: startCriteria as IStartCriteria,
    },
  }

  //0 update interactions
  if (indexPointer !== -1) {
    interactions.splice(indexPointer, 0, interactionPointer)
  }
  if (indexPointerScale !== -1) {
    if (opts.interactions !== undefined) {
      interactions.splice(indexPointerScale, 0, opts.interactions[indexPointerScale])
    }
  }

  //0 size
  let size
  if (opts.size?.inner !== undefined) {
    const userSizeInner = opts.size.inner
    const userSizeOuter = opts.size?.outer
    if (userSizeInner !== null) {
      if (userSizeOuter !== undefined) {
        size = { ...defaultsOpts.size, inner: userSizeInner, outer: userSizeOuter }
      } else {
        size = { ...defaultsOpts.size, inner: userSizeInner }
      }
    } else {
      if (userSizeOuter !== undefined) {
        size = { ...defaultsOpts.size, outer: userSizeOuter }
      } else {
        size = defaultsOpts.size
      }
    }
  } else {
    if (opts.size?.outer !== undefined) {
      size = { ...defaultsOpts.size, outer: opts.size?.outer }
    } else {
      size = defaultsOpts.size
    }
  }

  //0 svg and container elements
  //1 container element
  const containerCssProps = opts.element__svg_container?.css_properties
  //1 svg element
  const svgSvgAttrs = { ...defaultsSvgElsAttrs.svg, ...opts.element__svg?.svg_attributes }
  const svgCssProps = { ...opts.element__svg?.css_properties }
  //0 shapes
  let shapes
  if (Array.isArray(opts.shapes) && opts.shapes.length) {
    shapes = processShapes(size.inner, opts.shapes, 1, respectReducedMotion)
  }

  // merge them all
  return {
    ...defaultsOpts,
    // todo CHECK THIS PROPERTY;s type
    ...(opts as unknown as IOptionsMerged), // the two options are not deep-merged so extra steps are taken
    css_selector__root: cssSelectorRoot,
    size: size,
    element__svg: {
      css_properties: svgCssProps,
      svg_attributes: svgSvgAttrs,
    },
    element__svg_container: {
      css_properties: containerCssProps,
    },
    shapes,
    interactions,
    ...(respectReducedMotion && { animations: undefined }),
  }
}
export default processOptions
