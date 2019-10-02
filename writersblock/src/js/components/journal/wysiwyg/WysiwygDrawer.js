import type {WysiwygControlsDrawerPropsType} from '../../../../flow/components/WysiwygTypes'

import React from 'react'
import { styled } from 'styletron-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const WysiwygDrawer = (props:WysiwygControlsDrawerPropsType) =>
{
  const WysiwygDrawerComponent = styled('div', {
    backgroundColor:'#fff',
    border: '1px solid #333',
    borderBottom: 'none',
    borderBottomLeftRadius:0,
    borderBottomRightRadius:0,
    borderTopLeftRadius:'3px',
    borderTopRightRadius:'3px',
    bottom: '100%',
    boxShadow: 'rgba(0,0,0,0.6) -4px -6px 10px 2px',
    marginBottom: '1px',
    color:'#222',
    left: '5px',
    padding: '3px',
    position: 'absolute !important',
    width: 'calc(100% - 10px)',
  })

  console.log('props: WysiwygDrawerComponent',props)
  return (
    <WysiwygDrawerComponent>
      {props.msg}
      {props.customDrawerComponent && props.customDrawerComponent(props.classMap, props.setCustomDrawerComponentFormat)}
    </WysiwygDrawerComponent>
  )
}
WysiwygDrawer.displayName = 'WysiwygDrawer'

export default WysiwygDrawer