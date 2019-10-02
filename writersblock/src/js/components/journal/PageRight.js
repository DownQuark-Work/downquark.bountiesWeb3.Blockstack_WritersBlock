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
      console.log('sel',sel)
        if (sel.rangeCount > 0)
        {
            // First, delete the existing selection
            var range = sel.getRangeAt(0);
            range.deleteContents();

            // Insert a text node at the caret containing the braces/parens
            // var text = (charTyped == "{") ? "{}" : "()";
            // var text = (charTyped === "{") ? "{}" : "()";
            // var textNode = document.createTextNode(text);
            // range.insertNode(textNode);

            // Move the selection to the middle of the inserted text node
            // range.setStart(textNode, 1);
            // range.setEnd(textNode, 1);
            // sel.removeAllRanges();
            // sel.addRange(range);
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

  // const handleContentEdit = () => 
  // {
    
  // }
  const toggleWysiwyg = (display:boolean) =>
  { !props.wysiwygDisplayed && writersBlockDispatch({ type:WYSIWYG_SET_VISIBILITY, payload:true }) }

  return <JournalContent classMaps={classMaps} content={content} ref={journalContentRef} toggleWysiwyg={toggleWysiwyg} wysiwygVisible={props.wysiwygDisplayed} />
}
PageRight.displayName = 'JournalPageRight'

export default PageRight