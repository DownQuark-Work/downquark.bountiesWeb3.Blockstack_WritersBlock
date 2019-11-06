import type {WysiwygDecoratorExtendedPropsType} from '../../../../flow/components/WysiwygTypes'

import React, {Fragment, useContext, useEffect, useRef} from 'react'
import { styled, withTransform } from 'styletron-react'
import { useHover } from '../context/hooks'

import {WritersBlockContext} from '../../../base/Root'
import {saveJournalContent} from '../context/actions'

import {JournalContext} from '../context'
import {JOURNAL_UNSAVED_UPDATE} from '../context/constants'

import {WysiwygConstantsEnum, WysiwygConstantsKey} from '../context/constants'

const Finish = (props:WysiwygDecoratorExtendedPropsType) => // Save and Cancel Buttons
{  
  const {writersBlockStore, writersBlockDispatch} = useContext(WritersBlockContext),
        {journalStore, journalDispatch} = useContext(JournalContext)
  let defaultStorageTypeOverride = false
  
  const [hoverRef, isHovered] = useHover(document.getElementById('hover-ref-wysiwyg')),
        activeSetting = (journalStore.currentDayFileExists 
                            && writersBlockStore.Blockstack.userFiles.postsMap[journalStore.currentDayFileExists.noExt()]
                            && writersBlockStore.Blockstack.userFiles.postsMap[journalStore.currentDayFileExists.noExt()].kind) // previously saved setting
                              || writersBlockStore.User.settings.publish,
        activeSettingRef = useRef({activeSetting, userInteraction:false}), // default from user setting
        settingsRef = useRef()
  activeSettingRef.current.activeSetting = activeSettingRef.current.activeSetting.toLowerCase()

  const animationBase = (s) =>
  {
    const start = s === 'in' ? 0 : 1
    return {
      animationDuration: ".5s",
      animationIterationCount: "1",
      animationName: {
        from: {
          opacity: start,
        },
        to: {
          opacity: Math.abs(start-1),
        }
      }
    }
  }
  const animatedBtn = styled('button', (props) => ({
      ...animationBase(props.$fade),
      opacity:props.$fade === 'in' ? 1 : 0, //prevents reset at end of animation
    })),
  WysiwygDecoratorFinishWrapper = styled('div',{position:'relative'}),
  WysiwygDecoratorFinish = withTransform(animatedBtn, (style,props) =>
  {
    let fadeIt = props.$hovered ? {
      ...style,
      pointerEvents:'none', //no chance of interference with the public/private settings option
      position: 'relative'
      } : {}
    return {
      ...fadeIt,
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
    }
  }),
  WysiwygDecoratorPublishSettingsWrapper = styled('div', (props) => ({
    ...animationBase(props.$fade),
    cursor:'pointer',
    fontFamily:'"Courier New", Courier, monospace',
    left:'0',
    padding:'10px 0 0 10px',
    position: 'absolute',
  })),
  WysiwygDecoratorPublishSettings = styled('div', {
    display:'inline-block',
    // height:'14px',
    overflow:'hidden',
    width:'14px',
  }),
  WysiwygDecoratorPublishSettingLabel = styled('label', (props) => ({
    // color:props.$active ? 'rgba(0,0,0,.9)' : 'rgba(0,0,0,.6)',
    color:'rgba(0,0,0,.6)',
    cursor:'pointer',
    ':hover':{color:'rgba(0,0,0,.9)'}
  })),
  WysiwygDecoratorPublishSetting = styled('input', {
    left:'-18px',
    position:'relative',
    ':after':{
      content:'"•"',
      color:'transparent',
      fontSize:'28px',
      position:'relative',
      right:'-18px',
      top:'-14px'
    },
    ':checked':{
      ':after':{ color:'rgba(0,0,0,.6)' }
    }
  })

  const journalCancel = () =>
  {
    const cancelContent = journalStore.currentDayFileExists ? journalStore.original.content : journalStore.default && journalStore.default.content || ''
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
            content: journalStore.updatedContent || journalStore.original.content,
            dispatch: journalDispatch,
            meta: journalStore.meta,
            title: journalStore.original.title,
            storageType: activeSettingRef.current.activeSetting || writersBlockStore.User.settings.publish
          }
    saveJournalContent(blockInfo, journalInfo)
  }

  useEffect(() =>
  {
    if(isHovered)
    { document.getElementById(`active-setting-${activeSettingRef.current.activeSetting}`).setAttribute('checked','checked') }
  },[isHovered])

  return (
    <WysiwygDecoratorFinishWrapper>
      {!isHovered && <WysiwygDecoratorFinish $Cancel type="button" $hovered={isHovered} $fade='out' onClick={journalCancel}>Cancel</WysiwygDecoratorFinish>}
      <div ref={hoverRef} id="hover-ref-wysiwyg" data-allow-children style={{display: isHovered ? 'inlineBlock' : 'inline'}}>
        {isHovered && <WysiwygDecoratorPublishSettingsWrapper ref={settingsRef} $fade='in'>
                        <WysiwygDecoratorPublishSettings>
                          <WysiwygDecoratorPublishSetting type="radio" id="active-setting-private" name="active-setting" onChange={e => activeSettingRef.current.activeSetting='private'} value="private" />
                          <br/>
                          <WysiwygDecoratorPublishSetting type="radio" id="active-setting-public" name="active-setting" onChange={e => activeSettingRef.current.activeSetting='public'} value="public" />
                        </WysiwygDecoratorPublishSettings>
                        <div style={{display:'inline',position:'absolute'}}>
                          <WysiwygDecoratorPublishSettingLabel htmlFor="active-setting-private" $active={activeSettingRef.current.activeSetting === 'private'}>
                            Private</WysiwygDecoratorPublishSettingLabel>
                          <br/>
                          <WysiwygDecoratorPublishSettingLabel htmlFor="active-setting-public" $active={activeSettingRef.current.activeSetting === 'public'}>
                              Public</WysiwygDecoratorPublishSettingLabel>
                        </div>
                      </WysiwygDecoratorPublishSettingsWrapper>}
        {/* Use Below to keep consistent sizing */}
        {isHovered && <WysiwygDecoratorFinish $Cancel $style={{pointerEvents:'none'}} type="button" $hovered={isHovered} $fade='out'>Cancel</WysiwygDecoratorFinish>}
        <WysiwygDecoratorFinish $Save type="button" onClick={journalSave}>Save</WysiwygDecoratorFinish>
      </div>
    </WysiwygDecoratorFinishWrapper>
  )
}
Finish.displayName = 'WysiwygDecoratorFinish'

export default Finish