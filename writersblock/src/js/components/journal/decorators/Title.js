import React from 'react'
import { styled } from 'styletron-react'
import routes from '../../../context/constants/app/routes.json'

import { USE_GAIA } from '../../../utils/blockstack'
import { DataUri } from  '../../../context/constants/app/journal'
import { MediaQuery } from  '../../../context/constants/app/common'

const Title = (props:{title:?string}) =>
{  
  console.log('titleprops',props)
  const elementType = 'h2',
        breakBars = {
          borderColor: '#000',
          borderStyle: 'solid',
          borderBottomWidth: '0.05em',
          borderLeftWidth: '0',
          borderRightWidth: '0',
          borderTopWidth: '0.05em',
          bottom: 'calc((0.125em / 2) * 3)',
          content: '""',
          height: '0.15em',
          position: 'absolute',
          width: 'calc(50% - (1em / 2))'
        },
        JournalDecoratorTitle = styled(elementType, {
          backgroundImage: `url(${DataUri.TITLE_BREAK[0]})`,
          backgroundPosition: 'center bottom',
          backgroundRepeat: 'no-repeat',
          backgroundSize:'0.5em 0.5em',
          fontFamily: 'Playfair Display, sans-serif',
          fontSize: '7vw',
          fontWeight: 700,
          letterSpacing: '0.125em',
          lineHeight:'1.25',
          marginBottom:'1em',
          marginLeft:0,
          marginRight:0,
          marginTop:0,
          paddingBottom:'1em',
          paddingLeft:0,
          paddingRight:0,
          paddingTop:'.3em',
          position:'relative',
          textAlign:'center',
          textTransform:'uppercase',
          '::after': {
            ...breakBars,
            right:0
          },
          '::before':{
            ...breakBars,
            left:0
          },
      [MediaQuery.TABLET_PLUS]: {
            fontSize:'3em',
            ':after':{height: '0.125em'},
            ':before':{height: '0.125em'}  
          }
        }),
        WysiwygClassMap = `title`

  const defaultTitle = USE_GAIA ? `${new Date().getTitleFormattedDate()} Journal Entry` : 'why writers block?'
  return (
    <JournalDecoratorTitle data-wysiwyg-class-map={WysiwygClassMap}>
      {props.title || defaultTitle}
    </JournalDecoratorTitle>
  )
}
Title.displayName = 'JournalDecoratorTitle'

export default Title