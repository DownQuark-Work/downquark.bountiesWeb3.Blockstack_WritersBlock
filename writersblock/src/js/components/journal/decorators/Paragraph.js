import React from 'react'
import { styled } from 'styletron-react'

import {MediaQuery} from '../../../context/constants/app/common'

type Props = {
  children?: string | React$Node,
  firstParagraph?:boolean
}
const Paragraph = (props:Props) =>
{
  const elementType = 'p',
        paragraph = {
          marginBottom: '0',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: '0',
          // maxWidth: '28.125em',
          textAlign:'justify',
          textIndent:'2em',
        [MediaQuery.TABLET_PLUS]: { textIndent: '3em' }
        },
        firstParagraph = {
          ...paragraph,
          textIndent:0,
      [MediaQuery.TABLET_PLUS]: { textIndent: '.1em' },
          ':first-letter':{
            float: 'left',
            fontWeight: '700',
            fontFamily: '"Playfair Display", sans-serif',
            fontSize: '3em',
            lineHeight: '0.65',
            paddingBottom: '0',
            paddingLeft: '0',
            paddingRight: '0.15em',
            paddingTop: '0.15em',
            textTransform: 'uppercase',
          }
        },
        JournalDecoratorParagraph = styled(elementType,
          props.firstParagraph ? firstParagraph : paragraph
        ),
        WysiwygClassMap = `${props.firstParagraph ? 'first-paragraph' : 'paragraph'}`

  return (
    <JournalDecoratorParagraph data-wysiwyg-class-map={WysiwygClassMap}>
      {props.children}
    </JournalDecoratorParagraph>
  )
}
Paragraph.displayName = 'JournalDecoratorParagraph'

export default Paragraph