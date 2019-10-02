import React from 'react'
import { styled } from 'styletron-react'

type Props = {children?: string | React$Node}
const Underline = (props:Props) =>
{
  const elementType = 'u',
        JournalDecoratorUnderline = styled(elementType, { }),
        WysiwygClassMap = `underline`

  return (
    <JournalDecoratorUnderline data-wysiwyg-class-map={WysiwygClassMap}>{props.children}</JournalDecoratorUnderline>
  )
}
Underline.displayName = 'JournalDecoratorUnderline'

export default Underline