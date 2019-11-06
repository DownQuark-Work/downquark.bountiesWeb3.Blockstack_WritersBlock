import type {
  JournalPageRightMutationsRefType,
  JournalPageRightPropsType
} from '../../../flow/components/JournalTypes'

import React, {Fragment, useContext, useEffect, useRef, useState} from 'react'
import { styled } from 'styletron-react'

import { WritersBlockContext } from '../../base/Root'
import {WYSIWYG_SET_VISIBILITY} from '../../context/constants/store/journal'

import JournalContent from './Content'

const PageRight = (props:JournalPageRightPropsType) =>
{
  const { writersBlockStore, writersBlockDispatch } = useContext(WritersBlockContext)

  const JournalPageRight = styled('div', {}),
        {classMaps, content} = props

  const journalContentRef:React$ElementRef<typeof JournalContent> = React.createRef(),
        journalMutationsRef:JournalPageRightMutationsRefType = useRef({
          preBlurText:props.content || '',
          initialText:props.content || '',
          unsavedUpdate:false
        })

  const focusContent = () =>
  { 
    journalContentRef.current.focus()
    var sel = window.getSelection();
    // console.dev('journal', 'sel',sel)
        if (sel.rangeCount > 0)
        {
            // First, delete the existing selection
            var range = sel.getRangeAt(0);
            range.deleteContents();
        }
  }

  useEffect(() =>
  {
    if(props.wysiwygDisplayed)
    {
      journalMutationsRef.current.initialText = journalContentRef.current.innerHTML
      journalContentRef.current.focus()
    }
  }, [journalContentRef, props.wysiwygDisplayed]);

  const toggleWysiwyg = (display:boolean) =>
  { !props.wysiwygDisplayed && writersBlockDispatch({ type:WYSIWYG_SET_VISIBILITY, payload:true }) }

  return <JournalContent classMaps={classMaps} content={content} ref={journalContentRef} toggleWysiwyg={toggleWysiwyg} wysiwygVisible={props.wysiwygDisplayed} />
}
PageRight.displayName = 'JournalPageRight'

export default PageRight