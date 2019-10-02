import type {WysiwygDecoratorCommonPropsType,WysiwygContextConstantsType} from '../../../../flow/components/WysiwygTypes'

import React from 'react'
import { styled } from 'styletron-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {createContextConstants} from '../../../utils/context'
import {WysiwygConstantsEnum, WysiwygConstantsKey} from '../context/constants'

const Bold = (props:WysiwygDecoratorCommonPropsType) =>
{
  const {commonCss, setDrawerContent, setFormat} = props,
        WysiwygDecoratorBold = styled('button', {...commonCss})

  return (
    <WysiwygDecoratorBold
      type="button"
      onClick={() => setFormat(WysiwygConstantsKey.WYSIWYG_BOLD_TOGGLE)}
      onMouseOver={() => setDrawerContent({message:'Format Selection as Bold Text'})}
      onMouseOut={() => setDrawerContent({message:'DRAWER_MOUSE_OUT'})}>
        <FontAwesomeIcon icon='bold' size='2x'/>
      </WysiwygDecoratorBold>
  )
}
Bold.displayName = 'WysiwygDecoratorBold'

export default Bold