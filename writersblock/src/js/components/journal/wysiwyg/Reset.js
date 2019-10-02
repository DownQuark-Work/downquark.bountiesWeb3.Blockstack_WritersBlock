import type {WysiwygDecoratorCommonPropsType} from '../../../../flow/components/WysiwygTypes'

import React from 'react'
import { styled } from 'styletron-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {createContextConstants} from '../../../utils/context'
import {WysiwygConstantsEnum, WysiwygConstantsKey} from '../context/constants'

const Reset = (props:WysiwygDecoratorCommonPropsType) => // This is the remove formatting from the HTML
{
  const {commonCss, setDrawerContent, setFormat} = props,
        WysiwygDecoratorReset = styled('button', {...props.commonCss})

  return (
    <WysiwygDecoratorReset
      type="button"
      onClick={() => setFormat(WysiwygConstantsKey.WYSIWYG_RESET)}
      onMouseOver={() => setDrawerContent({message:'Remove All Changes From Content'})}
      onMouseOut={() => setDrawerContent({message:'DRAWER_MOUSE_OUT'})}>
        <FontAwesomeIcon icon='undo' size='2x'/>
      </WysiwygDecoratorReset>
  )
}
Reset.displayName = 'WysiwygDecoratorReset'

export default Reset