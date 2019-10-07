import type {JournalContentPropsType} from '../../../flow/components/JournalTypes'

import React, {Fragment, useContext, useState} from 'react'
import { styled } from 'styletron-react'
import {USE_GAIA} from '../../utils/blockstack'

import {WritersBlockContext} from '../../base/Root'
import {JournalContext} from './context'
import {useJournalContent, useJournalContentMouseLeave} from './context/hooks'

import * as Decorator from './decorators'

const ContentRender = (props:JournalContentPropsType, ref) =>
{
  const {classMaps, content, wysiwygVisible} = props,
        {writersBlockStore, writersBlockDispatch} = useContext(WritersBlockContext),
        {journalStore, journalDispatch} = useContext(JournalContext)
        let journalContentString = useJournalContent(journalStore.original.content, classMaps, wysiwygVisible) //do local checks within this hook
  
  const JournalContent = styled('div', {minHeight:'55vh'}),
        JournalContentMarkup = () => ({__html: journalContentString})
  
  const handleMouseLeave = (e) =>
  {
    if(wysiwygVisible)
    {

      const updatedContent = e.target.innerHTML,
            ar = 'ar'.removeClasses(journalStore.original.content).split(' '),
            arr = 'arr'.removeClasses(e.target.innerHTML).split(' ')
      
      if(ar.length === arr.length)
      {
        for (let i = 0; i < ar.length; i++)
        {
          if(i < arr.length)
          {
            if(ar[i] != arr[i])
            {
              // console.log('ar[i] != arr[i]',i,'::',ar[i], arr[i])
              journalStore.unsavedUpdate = true
              journalStore.updatedContent = updatedContent
              return false
            }
          }
        }
        journalStore.unsavedUpdate = false
        journalStore.updatedContent && delete journalStore.updatedContent
      }
    else
      {
        journalStore.unsavedUpdate = true
        journalStore.updatedContent = updatedContent
      }
    }
  }
  const handleFocus = (e) =>
  {
    //clear initial default content on click
  if(!journalStore.currentDayFileExists)
  { journalStore.original.content = '' }
  
    journalStore.journalDOM = ref
    props.toggleWysiwyg(true)
  }
  const isEditable = () =>
  {
    return USE_GAIA 
              && (journalStore.currentDayFileExists && journalStore.currentDayFileExists.noExt() === journalStore.fileName.current)
              || !journalStore.currentDayFileExists
  }

  return (
    <>
      <JournalContent
        className="journal-daily-content"
        contentEditable={isEditable()}
        dangerouslySetInnerHTML={JournalContentMarkup()}
        onMouseLeave={handleMouseLeave}
        onFocus={isEditable() ? handleFocus : null}
        ref={ref}
        suppressContentEditableWarning
      />
    </>
  )
}
const Content:$FlowES6Bug = React.forwardRef(ContentRender)
Content.displayName = 'JournalContent'

export default Content