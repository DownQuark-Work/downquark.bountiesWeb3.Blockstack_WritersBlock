import type {WysiwygDecoratorExtendedPropsType} from '../../../../flow/components/WysiwygTypes'

import React, {Fragment, useContext} from 'react'
import { styled } from 'styletron-react'

import {WritersBlockContext} from '../../../base/Root'
import {saveJournalContent} from '../context/actions'

import {JournalContext} from '../context'
import {JOURNAL_UNSAVED_UPDATE} from '../context/constants'

import {WysiwygConstantsEnum, WysiwygConstantsKey} from '../context/constants'

const Finish = (props:WysiwygDecoratorExtendedPropsType) => // Save and Cancel BUttons
{  
  const {writersBlockStore, writersBlockDispatch} = useContext(WritersBlockContext)
  const {journalStore, journalDispatch} = useContext(JournalContext)
  const disableSave = !journalStore.unsavedUpdate

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
    const cancelContent = journalStore.currentDayFileExists ? journalStore.original.content : journalStore.default.content
    confirm('All changes will be lost. Are you sure you wish to proceed?')
      && props.removeWysiwyg(false)
    journalDispatch({ type: JOURNAL_UNSAVED_UPDATE, payload: { content: cancelContent, title: journalStore.original.title } })
  }

  const journalSave = () =>
  {
    /*
    Saving user info for future use when sharing / allowing public posts
      https://github.com/blockstack/blockstack.js/blob/master/src/auth/authApp.ts#L46
      https://github.com/blockstack/blockstack.js/blob/master/src/auth/authApp.ts#L53
      https://github.com/blockstack/blockstack.js/blob/master/src/auth/authApp.ts#L65
    */
    const blockInfo = {
            dispatch: writersBlockDispatch,
            authorData: {
              decentralizedID:writersBlockStore.Blockstack.decentralizedID,
              appPrivateKey:writersBlockStore.Blockstack.appPrivateKey,
              profile: writersBlockStore.Blockstack.profile
            },
            userFiles: writersBlockStore.Blockstack.userFiles,
            userSession: writersBlockStore.Blockstack.userSession,
            onFinishCallback: props.removeWysiwyg
          },
          journalInfo = {
            content: journalStore.updatedContent,
            dispatch: journalDispatch,
            meta: journalStore.meta,
            title: journalStore.original.title,
          }
    saveJournalContent(blockInfo, journalInfo)
  }

  return (
    <>
      <WysiwygDecoratorFinish $Cancel type="button" onClick={journalCancel}>Cancel</WysiwygDecoratorFinish>
      <WysiwygDecoratorFinish $Save style={{}} type="button" onClick={journalSave}>Save</WysiwygDecoratorFinish>
    </>
  )
}
Finish.displayName = 'WysiwygDecoratorFinish'

export default Finish