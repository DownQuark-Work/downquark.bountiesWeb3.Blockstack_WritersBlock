import React from 'react'
import { styled } from 'styletron-react'

import {MediaQuery} from '../../../context/constants/app/common'

type Props = {
  children?: $FlowReactBug,
  orderedList?:boolean,
  }
const List = (props:Props) =>
{
  const {children, orderedList} = props,
        elementType = orderedList ? 'ol' : 'ul',
        JournalDecoratorList = styled(elementType, {
          paddingLeft:'1em',
      [MediaQuery.TABLET_PLUS]:{paddingLeft:'1.5em'}
        }),
        WysiwygClassMap = `${orderedList ? 'list-ordered' : 'list-unordered'}`
  return (
    <JournalDecoratorList data-wysiwyg-class-map={WysiwygClassMap}>
      {children}
    </JournalDecoratorList>
  )
}
List.displayName = 'JournalDecoratorList'

export default List