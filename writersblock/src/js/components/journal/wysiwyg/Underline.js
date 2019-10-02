import type {WysiwygDecoratorCommonPropsType} from '../../../../flow/components/WysiwygTypes'

import React from 'react'
import { styled } from 'styletron-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {createContextConstants} from '../../../utils/context'
import {WysiwygConstantsEnum, WysiwygConstantsKey} from '../context/constants'

const Underline = (props:WysiwygDecoratorCommonPropsType) =>
{
  const {commonCss, setDrawerContent, setFormat} = props,
        WysiwygDecoratorUnderline = styled('button', {...props.commonCss})

  return (
    <WysiwygDecoratorUnderline
      type="button"
      onClick={() => setFormat(WysiwygConstantsKey.WYSIWYG_UNDERLINE)}
      onMouseOver={() => setDrawerContent({message:'Format Selection as Underlined Text'})}
      onMouseOut={() => setDrawerContent({message:'DRAWER_MOUSE_OUT'})}>
        <FontAwesomeIcon icon='underline' size='2x'/>
      </WysiwygDecoratorUnderline>
  )
}
Underline.displayName = 'WysiwygDecoratorUnderline'

export default Underline