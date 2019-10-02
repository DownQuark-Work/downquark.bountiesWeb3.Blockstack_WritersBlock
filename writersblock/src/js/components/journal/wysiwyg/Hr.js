import type {WysiwygDecoratorCommonPropsType} from '../../../../flow/components/WysiwygTypes'

import React from 'react'
import { styled } from 'styletron-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {createContextConstants} from '../../../utils/context'
import {WysiwygConstantsEnum, WysiwygConstantsKey} from '../context/constants'

const Hr = (props:WysiwygDecoratorCommonPropsType) =>
{
  const {commonCss, setDrawerContent, setFormat} = props,
        WysiwygDecoratorHr = styled('button', {...props.commonCss})

  return (
    <WysiwygDecoratorHr
      type="button"
      onClick={() => setFormat(WysiwygConstantsKey.WYSIWYG_HEADER_ROW_ADD)}
      onMouseOver={() => setDrawerContent({message:'Create Header Row at Cursor Location'})}
      onMouseOut={() => setDrawerContent({message:'DRAWER_MOUSE_OUT'})}>
        <FontAwesomeIcon icon='minus' size='2x'/>
      </WysiwygDecoratorHr>
  )
}
Hr.displayName = 'WysiwygDecoratorHr'

export default Hr