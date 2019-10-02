import React from 'react'
import { styled } from 'styletron-react'

import { DataUri } from  '../../../context/constants/app/journal'

type Props = {
  children?: string | React$Node,
  href:string
  }
const Link = (props:Props) =>
{
  const elementType = 'a',
        JournalDecoratorLink = styled(elementType, {
          backgroundImage: `url(${DataUri.LINK[0]})`,
          backgroundPosition: 'bottom',
          backgroundRepeat: 'repeat-x',
          backgroundSize:'3rem',
          color: 'inherit',
          textDecoration: 'none'
        }),
        WysiwygClassMap = `link`

  return (
    <JournalDecoratorLink href={props.href} data-wysiwyg-class-map={WysiwygClassMap}>{props.children}</JournalDecoratorLink>
  )
}
Link.displayName = 'JournalDecoratorLink'

export default Link