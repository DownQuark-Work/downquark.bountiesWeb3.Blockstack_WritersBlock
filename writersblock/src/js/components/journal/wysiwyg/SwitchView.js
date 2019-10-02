import type {WysiwygDecoratorCommonPropsType} from '../../../../flow/components/WysiwygTypes'

import React from 'react'
import { styled } from 'styletron-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {createContextConstants} from '../../../utils/context'
import {WysiwygConstantsEnum, WysiwygConstantsKey} from '../context/constants'

const SwitchView = (props:WysiwygDecoratorCommonPropsType) => // This is the View/HTML toggle switch
{
  const {commonCss, setDrawerContent, setFormat} = props,
        WysiwygDecoratorSwitchView = styled('button', {...props.commonCss})

  return (
    <WysiwygDecoratorSwitchView
      type="button"
      onClick={() => setFormat(WysiwygConstantsKey.WYSIWYG_VIEW_TOGGLE)}
      onMouseOver={() => setDrawerContent({message:'Toggle Between HTML and Readable Views'})}
      onMouseOut={() => setDrawerContent({message:'DRAWER_MOUSE_OUT'})}>
        <FontAwesomeIcon icon='code' size='2x'/>
      </WysiwygDecoratorSwitchView>
  )
}
SwitchView.displayName = 'WysiwygDecoratorSwitchView'

export default SwitchView