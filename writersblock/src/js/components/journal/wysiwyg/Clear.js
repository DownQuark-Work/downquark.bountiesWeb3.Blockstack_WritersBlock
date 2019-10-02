import type {WysiwygDecoratorCommonPropsType,WysiwygContextConstantsType} from '../../../../flow/components/WysiwygTypes'

import React from 'react'
import { styled } from 'styletron-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {createContextConstants} from '../../../utils/context'
import {WysiwygConstantsEnum, WysiwygConstantsKey} from '../context/constants'

const Clear = (props:WysiwygDecoratorCommonPropsType) => // This is the clear HTML component
{
  const {commonCss, setDrawerContent, setFormat} = props,
        WysiwygDecoratorClear = styled('button', {...props.commonCss})

  return (
    <WysiwygDecoratorClear
      type="button"
      onClick={() => setFormat(WysiwygConstantsKey.WYSIWYG_FORMAT_REMOVE)}
      onMouseOver={() => setDrawerContent({message:'Remove Formatting from Currently Selected Text'})}
      onMouseOut={() => setDrawerContent({message:'DRAWER_MOUSE_OUT'})}>
        <FontAwesomeIcon icon='remove-format' size='2x'/>
      </WysiwygDecoratorClear>
  )
}
Clear.displayName = 'WysiwygDecoratorClear'

export default Clear