import type {WysiwygDecoratorCommonPropsType,WysiwygContextConstantsType} from '../../../../flow/components/WysiwygTypes'

import React from 'react'
import { styled } from 'styletron-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {createContextConstants} from '../../../utils/context'
import {WysiwygConstantsEnum, WysiwygConstantsKey} from '../context/constants'

const Copy = (props:WysiwygDecoratorCommonPropsType) =>
{
  const {commonCss, setDrawerContent, setFormat} = props,
        WysiwygDecoratorCopy = styled('button', {...props.commonCss})

  return (
    <WysiwygDecoratorCopy
      type="button"
      onClick={() => setFormat(WysiwygConstantsKey.WYSIWYG_COPY)}
      onMouseOver={() => setDrawerContent({message:'Copy Currently Selected Text to Clipboard'})}
      onMouseOut={() => setDrawerContent({message:'DRAWER_MOUSE_OUT'})}>
        <FontAwesomeIcon icon={['far', 'copy']} size='2x'/>
    </WysiwygDecoratorCopy>
  )
}
Copy.displayName = 'WysiwygDecoratorCopy'

export default Copy