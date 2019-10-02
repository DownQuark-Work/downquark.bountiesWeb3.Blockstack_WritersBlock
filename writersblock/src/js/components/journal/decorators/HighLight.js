import React from 'react'
import { styled } from 'styletron-react'

type Props = {
  color?: 'YELLOW' | 'PINK' | 'BLUE' | 'GREEN' | 'ORANGE',
  children?: string | React$Node
}
const HighLight = (props:Props) =>
{
  const {color,children} = props,
        elementType = 'mark',
        highLightValues:ObjOfArrayStr = {
          YELLOW:['rgba(222,255,0,1)','rgba(222,255,0,0.5)','rgba(222,255,0,1)'],
          PINK:['rgba(255,69,190,1)','rgba(255,107,203,0.5)','rgba(255,107,203,1)'],
          BLUE:['rgba(73,179,255,1)','rgba(107,193,255,0.5)','rgba(107,193,255,1)'],
          GREEN:['rgba(67,226,15,1)','rgba(39,229,54,0.5)','rgba(39,229,54,1)'],
          ORANGE:['rgba(255,134,9,1)','rgba(255,177,34,0.5)','rgba(255,177,34,1)']
        },
        highlightBackground = `linear-gradient(to bottom, ${highLightValues[color || 'DEFAULT'][0]} 0%,` 
                                                + `${highLightValues[color || 'DEFAULT'][1]} 60%,`
                                                + `${highLightValues[color || 'DEFAULT'][2]} 100%)`,
        JournalDecoratorHighLight = styled(elementType, {
          background: highlightBackground
        }),
        WysiwygClassMap = `highlight-${(color || 'DEFAULT').toLowerCase()}`

  return <JournalDecoratorHighLight data-wysiwyg-class-map={WysiwygClassMap}>{children}</JournalDecoratorHighLight>
}
HighLight.displayName = 'JournalDecoratorHighLight'

export default HighLight