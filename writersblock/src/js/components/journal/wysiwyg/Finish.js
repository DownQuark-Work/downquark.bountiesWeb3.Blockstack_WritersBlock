import type {WysiwygDecoratorExtendedPropsType} from '../../../../flow/components/WysiwygTypes'

import React, {Fragment} from 'react'
import { styled } from 'styletron-react'

import {createContextConstants} from '../../../utils/context'
import {WysiwygConstantsEnum, WysiwygConstantsKey} from '../context/constants'

const Finish = (props:WysiwygDecoratorExtendedPropsType) => // Save and Cancel BUttons
{
  const WysiwygDecoratorFinish = styled('button', (props) => ({
    borderRadius: '5px',
    borderWidth: '2px',
    borderColor: props.$Cancel ? '#e74c3c' : '#2ecc71',
    borderStyle: 'solid',
    boxSizing: 'border-box',
    color: props.$Cancel ? '#e74c3c' : '#2ecc71',
    cursor: 'pointer',
    display: 'inlineBlock',
    fontSize: '22px',
    margin: '10px',
    padding: '10px',
    textDecoration: 'none',
    transition: '.3s',
    ':hover': {
      color: '#fff',
      backgroundColor: props.$Cancel ? '#e74c3c' : '#2ecc71',
    }
  }))

  const journalCancel = () =>
  {
    confirm('All changes will be lost. Are you sure you wish to proceed?')
      && props.removeWysiwyg(false)
  }

  const journalSave = () =>
  {
    console.log('====================================')
    console.log('SAVE Content')
    console.log('====================================')
  }

  return (
    <>
      <WysiwygDecoratorFinish $Cancel type="button" onClick={journalCancel}>Cancel</WysiwygDecoratorFinish>
      <WysiwygDecoratorFinish $Save type="button" onClick={journalSave}>Save</WysiwygDecoratorFinish>
    </>
  )
}
Finish.displayName = 'WysiwygDecoratorFinish'

export default Finish