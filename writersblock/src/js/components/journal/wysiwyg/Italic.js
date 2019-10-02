import type {WysiwygDecoratorCommonPropsType} from '../../../../flow/components/WysiwygTypes'

import React from 'react'
import { styled } from 'styletron-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {createContextConstants} from '../../../utils/context'
import {WysiwygConstantsEnum, WysiwygConstantsKey} from '../context/constants'

const Italic = (props:WysiwygDecoratorCommonPropsType) =>
{
  const {commonCss, setDrawerContent, setFormat} = props,
        WysiwygDecoratorItalic = styled('button', {...props.commonCss})

  return (
    <WysiwygDecoratorItalic
      type="button"
      onClick={() => setFormat(WysiwygConstantsKey.WYSIWYG_ITALIC_TOGGLE)}
      onMouseOver={() => setDrawerContent({message:'Format Selection as Italicized Text'})}
      onMouseOut={() => setDrawerContent({message:'DRAWER_MOUSE_OUT'})}>
        <FontAwesomeIcon icon='italic' size='2x'/>
      </WysiwygDecoratorItalic>
  )
}
Italic.displayName = 'WysiwygDecoratorItalic'

export default Italic