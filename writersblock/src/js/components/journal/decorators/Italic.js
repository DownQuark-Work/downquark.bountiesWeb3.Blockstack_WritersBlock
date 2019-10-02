import React from 'react'
import { styled } from 'styletron-react'

type Props = {children?: string | React$Node}
const Italic = (props:Props) =>
{
  const elementType = 'em',
        JournalDecoratorItalic = styled(elementType, {}),
        WysiwygClassMap = `italic`

  return (
    <JournalDecoratorItalic data-wysiwyg-class-map={WysiwygClassMap}>{props.children}</JournalDecoratorItalic>
  )
}
Italic.displayName = 'JournalDecoratorItalic'

export default Italic