import React from 'react'
import { styled } from 'styletron-react'

import { DataUri } from  '../../../context/constants/app/journal'
import { MediaQuery } from  '../../../context/constants/app/common'

type Props = {
  children?: string | React$Node,
  replacement?:string
  }
const Strike = (props:Props) =>
{
  const elementType = 's',
        elementTypeNested = 'sup',
        JournalDecoratorStrike = styled(elementType, {
          backgroundImage: `url(${DataUri.STRIKE_THROUGH[0]})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat-x',
          backgroundSize:'3rem',
          color: 'rgba(0,0,0,0.5)',
          position:'relative',
          textDecoration: 'none'
        }),
        JournalDecoratorStrikeReplacement = styled(elementTypeNested, {
          color: '#cc0000',
          fontFamily: '"Rock Salt", cursive',
          left: '0',
          position: 'absolute',
          textAlign: 'center',
          bottom:'100%',
          width: '75vw',
      [MediaQuery.TABLET_PLUS]:{
          marginTop: '-1em!important',
          maxWidth: '100%!important',
          width: '100%',
        }
      }),
      WysiwygClassMap = `strike`,
      WysiwygClassMapNested = `strike-replacement`


  return (
    <JournalDecoratorStrike data-wysiwyg-class-map={WysiwygClassMap}>
      {props.children}
      {props.replacement && 
          <JournalDecoratorStrikeReplacement data-wysiwyg-class-map={WysiwygClassMapNested}>
            {props.replacement}
          </JournalDecoratorStrikeReplacement>}
    </JournalDecoratorStrike>
  )
}
Strike.displayName = 'JournalDecoratorStrike'

export default Strike