import type {JournalContentPropsType} from '../../../flow/components/JournalTypes'

import React, {Fragment, useContext, useState} from 'react'
import { styled } from 'styletron-react'
import {USE_GAIA} from '../../utils/blockstack'

import {JournalContext} from './context'
import {useJournalContent, useJournalContentMouseLeave} from './context/hooks'

import * as Decorator from './decorators'

const ContentRender = (props:JournalContentPropsType, ref) =>
{
  const {classMaps, content, wysiwygVisible} = props,
        {journalStore, journalDispatch} = useContext(JournalContext),
        journalContentString = useJournalContent(content, classMaps, wysiwygVisible) //do local checks within this hook
  
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
    journalStore.journalDOM = ref
    props.toggleWysiwyg(true)
  }

  return (
    <JournalContent
      className="journal-daily-content"
      contentEditable={USE_GAIA}
      dangerouslySetInnerHTML={JournalContentMarkup()}
      onMouseLeave={handleMouseLeave}
      onFocus={USE_GAIA ? handleFocus : null}
      ref={ref}
      suppressContentEditableWarning
    />
  )
}
const Content:$FlowES6Bug = React.forwardRef(ContentRender)
Content.displayName = 'JournalContent'

export default Content