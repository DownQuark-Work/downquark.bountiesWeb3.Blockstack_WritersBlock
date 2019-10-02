import type {WysiwygDecoratorCommonPropsType} from '../../../../flow/components/WysiwygTypes'

import React from 'react'
import { styled } from 'styletron-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {createContextConstants} from '../../../utils/context'
import {WysiwygConstantsEnum, WysiwygConstantsKey} from '../context/constants'

const Cut = (props:WysiwygDecoratorCommonPropsType) =>
{
  const {commonCss, setDrawerContent, setFormat} = props,
        WysiwygDecoratorCut = styled('button', {...props.commonCss})

  return (
    <WysiwygDecoratorCut
      type="button"
      onClick={() => setFormat(WysiwygConstantsKey.WYSIWYG_CUT)}
      onMouseOver={() => setDrawerContent({message:'Cut Currently Selected Text to Clipboard'})}
      onMouseOut={() => setDrawerContent({message:'DRAWER_MOUSE_OUT'})}>
        <FontAwesomeIcon icon='cut' size='2x'/>
      </WysiwygDecoratorCut>
  )
}
Cut.displayName = 'WysiwygDecoratorCut'

export default Cut