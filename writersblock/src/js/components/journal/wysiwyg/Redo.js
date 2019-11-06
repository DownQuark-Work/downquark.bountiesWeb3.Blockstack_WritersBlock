import type {WysiwygDecoratorCommonPropsType} from '../../../../flow/components/WysiwygTypes'

import React from 'react'
import { styled } from 'styletron-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {createContextConstants} from '../../../utils/context'
import {WysiwygConstantsEnum, WysiwygConstantsKey} from '../context/constants'

const Redo = (props:WysiwygDecoratorCommonPropsType) =>
{
  const {commonCss, setDrawerContent, setFormat} = props,
        WysiwygDecoratorRedo = styled('button', {...props.commonCss})

  return (
    <WysiwygDecoratorRedo
      type="button"
      onClick={() => setFormat(WysiwygConstantsKey.WYSIWYG_REDO)}
      onMouseOver={() => setDrawerContent({message:'Redo Last Reverted Change'})}
      onMouseOut={() => setDrawerContent({message:'DRAWER_MOUSE_OUT'})}>
        <FontAwesomeIcon icon='share' size='2x'/>
      </WysiwygDecoratorRedo>
  )
}
Redo.displayName = 'WysiwygDecoratorRedo'

export default Redo