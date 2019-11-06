import type {WysiwygDecoratorCommonPropsType} from '../../../../flow/components/WysiwygTypes'

import React from 'react'
import { styled } from 'styletron-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {createContextConstants} from '../../../utils/context'
import {WysiwygConstantsEnum, WysiwygConstantsKey} from '../context/constants'

const Paste = (props:WysiwygDecoratorCommonPropsType) =>
{
  // TODO: [@mlnck] UPDATE ~ paste should replace copy button when copy pressed and info on clipboard
  const {commonCss, setDrawerContent, setFormat} = props,
        WysiwygDecoratorPaste = styled('button', {...props.commonCss})

  return (
    <WysiwygDecoratorPaste
      type="button"
      onClick={() => setFormat(WysiwygConstantsKey.WYSIWYG_PASTE)}
      onMouseOver={() => setDrawerContent({message:'Paste Text in Clipboard at Cursor Location'})}
      onMouseOut={() => setDrawerContent({message:'DRAWER_MOUSE_OUT'})}>
      <FontAwesomeIcon icon='copy' size='2x'/>
    </WysiwygDecoratorPaste>
  )
}
Paste.displayName = 'WysiwygDecoratorPaste'

export default Paste