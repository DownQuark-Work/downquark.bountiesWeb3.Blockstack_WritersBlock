import type {WysiwygDecoratorCommonPropsType} from '../../../../flow/components/WysiwygTypes'

import React from 'react'
import { styled } from 'styletron-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {createContextConstants} from '../../../utils/context'
import {WysiwygConstantsEnum, WysiwygConstantsKey} from '../context/constants'

const List = (props:WysiwygDecoratorCommonPropsType) =>
{
  const {commonCss, setDrawerContent, setFormat} = props,
        WysiwygDecoratorList = styled('button', {...props.commonCss})

  return (
    <WysiwygDecoratorList
      type="button"
      onClick={() => setFormat(WysiwygConstantsKey.WYSIWYG_LIST)}
      onMouseOver={() => setDrawerContent({message:'Create a Bulleted List at Cursor Location'})}
      onMouseOut={() => setDrawerContent({message:'DRAWER_MOUSE_OUT'})}>
        <FontAwesomeIcon icon='list-ul' size='2x'/>
      </WysiwygDecoratorList>
  )
}
List.displayName = 'WysiwygDecoratorList'

export default List