import type {JournalContentPropsType} from '../../../flow/components/JournalTypes'

import React, {Fragment, useContext, useRef, useState} from 'react'
import { styled } from 'styletron-react'
import {USE_GAIA} from '../../utils/blockstack'

import {WritersBlockContext} from '../../base/Root'
import {JournalContext} from './context'
import {useJournalContent} from './context/hooks'

import * as Decorator from './decorators'

const ContentRender = (props:JournalContentPropsType, ref) =>
{
  const {classMaps, content, wysiwygVisible} = props,
        {writersBlockStore, writersBlockDispatch} = useContext(WritersBlockContext),
        {journalStore, journalDispatch} = useContext(JournalContext),
        [journalContentState, setJournalContentState] = useState(props.content) //allows for useJournalContent hook to be triggered without state refresh
  let journalContentString = useJournalContent(journalContentState, classMaps, wysiwygVisible) //do local checks within this hook
  // let journalContentString = useJournalContent(journalStore.original.content, classMaps, wysiwygVisible) //do local checks within this hook
  
  const getContentMinHeight = () =>
  {
    window.journalContentMinHeight = window.journalContentMinHeight || 0
    const leftSideHeightElems = document.querySelectorAll('*[data-totalheight]')
    let contentMinHeight = 0
    
    leftSideHeightElems.forEach(itm =>
    {
      const computed = window.getComputedStyle(itm)
      contentMinHeight += parseInt(computed.height.replace(/[a-z]/gi,''))
    })
    //slightly hacky - but with redrawing this for the writing layout it was the best option available
    window.journalContentMinHeight = Math.max(window.journalContentMinHeight, contentMinHeight)
    return `${window.journalContentMinHeight}px`
  }
  const JournalContent = styled('div', { minHeight: getContentMinHeight()}),
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
              // console.dev('journal', 'ar[i] != arr[i]',i,'::',ar[i], arr[i])
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
  { setJournalContentState('') }
  
    journalStore.journalDOM = ref
    props.toggleWysiwyg(true)
  }
  const isEditable = () =>
  {
    return USE_GAIA && (!journalStore.author || (journalStore.author && journalStore.author.did === writersBlockStore.Blockstack.decentralizedID)) // LOGGED IN && NEW FILE || VIEWING FILE THEY AUTHORED
              && ((journalStore.currentDayFileExists && journalStore.currentDayFileExists.noExt() === journalStore.fileName.current)//EDIT ONLY TODAY
              || !journalStore.currentDayFileExists) // CREATE
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