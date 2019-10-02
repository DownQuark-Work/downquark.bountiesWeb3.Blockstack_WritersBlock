import type {WysiwygContextConstantsType, WysiwygControlsDrawerMouseEventType, WysiwygDefaultFormatType, WysiwygPropsType} from '../../../flow/components/WysiwygTypes'

import React, {Fragment, useContext, useRef, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { styled } from 'styletron-react'

import {JournalContext} from './context'

import * as Controls from './wysiwyg'
import {useWysiwygConfig} from './context/hooks'

const WysiwygControls = styled('div', {
        alignContent:'stretch',
        alignItems:'stretch',
        backgroundColor: 'white',
        borderRadius: '5px',
        borderShadow:'10px',
        bottom: '0',
        boxShadow: 'black 4px -6px 20px 0px',
        display: 'flex',
        flexDirection: 'row',
        height: '10%',
        justifyContent:'space-around',
        position:'fixed',
        right: '8%',
        width: '84%',
        zIndex:'20',
      }),
    WysiwygSpacerDiv = styled('div', {
      backgroundColor:'#222222',
      width:'2px'
    })

// https://www.npmjs.com/package/@fortawesome/react-fontawesome
// https://fontawesome.com/how-to-use/on-the-web/styling/layering
// https://fontawesome.com/how-to-use/on-the-web/styling/masking

const Wysiwyg = (props:WysiwygPropsType) =>
{
  const {journalStore, journalDispatch} = useContext(JournalContext)

  const [test, setTest] = useState(true)
  const toggleTest = () =>
  {
    console.log('testing',test,'\r\n',Controls);
    setTest(!test);
    // journalDispatch({type:'writersblock.Journal.SET_HTML_MODE',payload:true})
    journalDispatch({type:'writersblock.Journal.SET_HTML_MODE'})
    console.log('TOGGLE TEST:journalStore',journalStore)
  }

  const defaultFormat:WysiwygDefaultFormatType = {
          displayDrawer: false,
          msg:''
        },
        [curFormat, setCurFormat] = useState(defaultFormat),
        drawerContentRef = useRef(defaultFormat)

  const commonCss = {
      cursor:'pointer',
      ':hover':{
        backgroundColor:'rgba(.5,.5,.5,.05)',
        color:'#000'
      }
    }

     //do local checks within this hook
  // useWysiwygConfig(curFormat) // https://reactjs.org/docs/hooks-rules.html
  const setFormat = (s:WysiwygContextConstantsType) =>
        {
          document.execCommand(s, false)
          journalStore.journalDOM.current.focus()
        },
    setCustomDrawerComponentFormat = (type: string, openingTag: string, sel: { begin: { element: any, index: number }, end: { element: any, index: number }, txt: { range: number, selectedTxt: string, overwriteText?:string, overwriteClass?:string[]}}) =>
        {
          console.log('setCustomDrawerComponentFormat type',type)
          const REPLACE_TAG_CLOSE = 'zx_REPLACE_TAG_CLOSE_xz',
                REPLACE_TAG_OPEN = 'zx_REPLACE_TAG_OPEN_xz',
                REPLACE_TAG_SPLIT = 'zx_REPLACE_TAG_SPLIT_xz'
                
          let appliedFormat = '',
              closingTag = openingTag.replace(/[\s>].*/, '>').replace('<', '</'),
              tag = closingTag.replace(/\W/g, ''),
              rmTagRegEx = new RegExp(`<\\/?${tag}[\\s\\w"-=\\d]*>`, 'g')
          
          if(sel.begin.element === sel.end.element)
          { //If same element we can skip all other regex tests
            const selectionIndexEnd = Math.max(sel.begin.index,sel.end.index), //ignores direction of selection
                  selectionIndexStart = Math.min(sel.begin.index,sel.end.index)

            appliedFormat = sel.begin.element.data.slice(0,selectionIndexStart)
                              + REPLACE_TAG_OPEN 
                              + sel.begin.element.data.slice(selectionIndexStart,selectionIndexEnd).replace(rmTagRegEx,'') //redundant replace, but shouldn't hurt anything
                              + REPLACE_TAG_CLOSE 
                              + sel.begin.element.data.slice(selectionIndexEnd)
            sel.begin.element.data = appliedFormat
          }
          else
          {
            const updatedDataClose = sel.end.element.data.slice(0,sel.end.index)
                              + REPLACE_TAG_SPLIT
                              + sel.end.element.data.slice(sel.end.index),
                  updatedDataOpen = sel.begin.element.data.slice(0,sel.begin.index)
                              + REPLACE_TAG_SPLIT
                              + sel.begin.element.data.slice(sel.begin.index)

            sel.end.element.data = updatedDataClose
            sel.begin.element.data = updatedDataOpen
            
            //$FlowNonIssue [innerHTML is valid]
            const splitText = document.querySelector('.journal-daily-content').innerHTML.split(REPLACE_TAG_SPLIT)
            let   formattedText = REPLACE_TAG_OPEN + splitText[1] + REPLACE_TAG_CLOSE,
                  matchedTags = formattedText.match(rmTagRegEx)
            
            //remove all internal instances of tag
            formattedText = formattedText.replace(rmTagRegEx,'')
            console.log('matchedTags',matchedTags)
            if(matchedTags)
            { //Handle opening and closing within other tags of the same type
              if(matchedTags.length && matchedTags[0].startsWith('</')){ formattedText = matchedTags.shift() + formattedText }
              if(matchedTags.length && !matchedTags[matchedTags.length-1].startsWith('</')){ formattedText += matchedTags.pop() }
            }
            //$FlowNonIssue [innerHTML is valid]
            document.querySelector('.journal-daily-content').innerHTML = splitText[0] + formattedText + splitText[2]
          }

          const regexTagClose = new RegExp(REPLACE_TAG_CLOSE,'g'),
                regexTagOpen = new RegExp(REPLACE_TAG_OPEN,'g')

          //handle special cases
          if (type === 'STRIKETHROUGH')
          { closingTag = `<${sel.txt.overwriteClass[0]} data-wysiwyg-class-map="strike-replacement" class="${sel.txt.overwriteClass[1]}">${sel.txt.overwriteText}</${sel.txt.overwriteClass[0]}>${closingTag}` }

          //$FlowNonIssue [innerHTML is valid]
          document.querySelector('.journal-daily-content').innerHTML = 
            //$FlowNonIssue [innerHTML is valid]
            document.querySelector('.journal-daily-content').innerHTML
              .replace(regexTagOpen,openingTag).replace(regexTagClose,closingTag)

          setDrawerContent({message:'DRAWER_MOUSE_OUT'})
        }

  const setDrawerContent = (o:null | WysiwygControlsDrawerMouseEventType) =>
  {
    if(o && drawerContentRef.current.message !== o.message)
    {
      drawerContentRef.current = {...o}
      o ? setCurFormat({
          customDrawerComponent: o.drawerComponent || null,
          displayDrawer:o.message === 'DRAWER_MOUSE_OUT' ? false : true,
          msg:o.message
          })
        : setCurFormat({displayDrawer:false, msg:''})
    }
  }

  const commonControlProps = {commonCss, setFormat, setDrawerContent}
  // TODO: [@mlnck] UPDATE ~ Map below to use enums
  return (
    <WysiwygControls>
      {curFormat.displayDrawer && <Controls.Drawer msg={curFormat.msg} customDrawerComponent={curFormat.customDrawerComponent} setCustomDrawerComponentFormat={setCustomDrawerComponentFormat}  classMap={props.classMaps.current} />}
      {/* <button type='button' onClick={toggleTest}>WYSIWYG</button> */}
      {!!document.queryCommandSupported('removeFormat') && <Controls.Clear {...commonControlProps} />}
        <WysiwygSpacerDiv />
      {!!document.queryCommandSupported('copy') && <Controls.Copy {...commonControlProps} />}
      {!!document.queryCommandSupported('cut') && <Controls.Cut {...commonControlProps} />}
      {!!document.queryCommandSupported('paste') && <Controls.Paste {...commonControlProps} />}
        <WysiwygSpacerDiv />
      {!!document.queryCommandSupported('bold') && <Controls.Bold {...commonControlProps} />}
      {!!document.queryCommandSupported('backColor') && <Controls.Highlight {...commonControlProps} />}
      {!!document.queryCommandSupported('italic') && <Controls.Italic {...commonControlProps} />}
      {!!document.queryCommandSupported('strikeThrough') && <Controls.Strikethrough {...commonControlProps} />}
      {!!document.queryCommandSupported('underline') && <Controls.Underline {...commonControlProps} />}
        <WysiwygSpacerDiv />
      {!!document.queryCommandSupported('createLink') && <Controls.Link {...commonControlProps} />}
      {!!document.queryCommandSupported('insertHorizontalRule') && <Controls.Hr {...commonControlProps} />}
      {!!document.queryCommandSupported('insertunorderedlist') && <Controls.List {...commonControlProps} />}
      {/* allow this in phase 2? Not sure it's needed at all {!!document.queryCommandSupported('bold') && <Controls.SwitchView {...commonControlProps} />} */}
        <WysiwygSpacerDiv />
      {!!document.queryCommandSupported('undo') && <Controls.Undo {...commonControlProps} />}
      <Controls.Reset {...commonControlProps} />
      {!!document.queryCommandSupported('redo') && <Controls.Redo {...commonControlProps} />}
        <WysiwygSpacerDiv />
      <Controls.Finish {...commonControlProps} {...props} />
    </WysiwygControls>
  )
}
Wysiwyg.displayName = 'JournalWysiwyg'

export default Wysiwyg