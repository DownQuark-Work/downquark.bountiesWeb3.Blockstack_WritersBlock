import React from 'react'
import { styled } from 'styletron-react'

type Props = {children?: string | React$Node}
const Strong = (props:Props) =>
{
  const elementType = 'strong',
        JournalDecoratorStrong = styled(elementType, {}),
        WysiwygClassMap = `strong`

  return (
    <JournalDecoratorStrong data-wysiwyg-class-map={WysiwygClassMap}>
      {props.children}
    </JournalDecoratorStrong>
  )
}
Strong.displayName = 'JournalDecoratorStrong'

export default Strong