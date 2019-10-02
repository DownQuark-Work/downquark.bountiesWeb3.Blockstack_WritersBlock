import type {
  CommonWrapperAnimatedPropsType,
  CommonWrapperScrollablePropsType
} from '../../../flow/components/CommonTypes'

import React from 'react'
import { styled } from 'styletron-react'

export const Scrollable = (props:CommonWrapperScrollablePropsType) =>
{
  const css = props.styles || {},
        dir = props.direction 
                ? props.direction === 'x' ? {'overflow-x':'scroll'} : {'overflow-y':'scroll'}
                : {overflow:'scroll'},
        h = props.h ? {height:props.h} : {},
        w = props.w ? {width:props.w} : {}

  const CommonWrapperScrollable = styled('div', {
          ...css,
          ...dir,
          ...h,
          ...w,
        })

  return <CommonWrapperScrollable>{props.children}</CommonWrapperScrollable>
}
Scrollable.displayName = 'CommonWrapperScrollable'


export const Animated = (props:CommonWrapperAnimatedPropsType) =>
{
  const {children,
        animOptions,
        animFrom,
        animTo,
        styleBase} = props
  const opts = animOptions ? { // I think these are the only 2 currently supported
          // animationName: animOptions.name || null,
          animationDuration: animOptions.duration || null,
          // animationDelay: animOptions.delay || 0,
          animationIterationCount: animOptions.iterationCount || null,
          // animationDirection: animOptions.direction || null,
          // animationTimingFunction: animOptions.timingFunction || null,
          // animationFillMode: animOptions.fillMode || null,
        } : {}
  const css = styleBase || {}
  
  const CommonWrapperAnimated = styled('div', {
          ...css,
          ...opts,
          animationName: {
            from: {
              ...animFrom
            },
            to: {
              ...animTo
            }
          }
        })
  
  return <CommonWrapperAnimated>{props.children}</CommonWrapperAnimated>
}
Animated.displayName = 'CommonWrapperAnimated'