import type {WysiwygDecoratorCommonPropsType} from '../../../../flow/components/WysiwygTypes'

import React from 'react'
import { styled } from 'styletron-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {createContextConstants} from '../../../utils/context'
import {WysiwygConstantsEnum, WysiwygConstantsKey} from '../context/constants'

const Undo = (props:WysiwygDecoratorCommonPropsType) =>
{
  const {commonCss, setDrawerContent, setFormat} = props,
        WysiwygDecoratorUndo = styled('button', {...props.commonCss})

  return (
    <WysiwygDecoratorUndo
      type="button"
      onClick={() => setFormat(WysiwygConstantsKey.WYSIWYG_UNDO)}
      onMouseOver={() => setDrawerContent({message:'Undo Most Recent Change'})}
      onMouseOut={() => setDrawerContent({message:'DRAWER_MOUSE_OUT'})}>
        <FontAwesomeIcon icon='reply' size='2x'/>
      </WysiwygDecoratorUndo>
  )
}
Undo.displayName = 'WysiwygDecoratorUndo'

export default Undo