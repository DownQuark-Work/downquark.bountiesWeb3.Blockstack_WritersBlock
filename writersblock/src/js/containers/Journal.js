import React, {useContext, useReducer, useRef} from 'react'
import {styled} from 'styletron-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { USE_GAIA } from '../utils/blockstack'
import { WritersBlockContext } from '../base/Root'
import {WYSIWYG_SET_VISIBILITY} from '../context/constants/store/journal'

import {JournalContext, JournalContextInitial} from '../components/journal/context'
import JournalReducer from '../components/journal/context/reducer'

import JournalBase from '../components/journal/Base'
import JournalClassMap from '../components/journal/ContentClassMap'
import JournalWysiwyg from '../components/journal/BaseWysiwyg'
import LinedPaperBase from '../components/linedpaper/Base'
import PostItBase from '../components/postit/Base'

const Journal = () =>
{
  const paddingStyle = USE_GAIA ? '1rem' : '3rem',
        { writersBlockStore, writersBlockDispatch } = useContext(WritersBlockContext),
        wysiwygDisplayed = USE_GAIA && writersBlockStore && writersBlockStore.Journal.content.showWysiwyg
  

  const [journalStore, journalDispatch] = useReducer(JournalReducer, JournalContextInitial),
        // renderedContentRef:?{current:{title:string, content:string}} = useRef<{title:string, content:string}>({title:'', content:''}),
        classMapRef:RefObjOfArrayStr = useRef({}) //https://reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables

  const configureClassMap = (ref:HTMLDivElement) =>
  {
    if(Object.keys(classMapRef.current).length){ return}

    const parseClasses = (itm:$FlowReactBug) =>
    {
      for(let i:number=0; i<itm.attributes.length; i++)
      {
        if(itm.attributes[i].name === 'data-wysiwyg-class-map')
        {
          const attrMap = itm.attributes[i].value
          classMapRef.current[attrMap] = [itm.tagName.toLowerCase(), itm.className]
          break;
        }
      }
    }
    const getRecursiveClasses = (itm:Node) =>
    {
      if(itm.childNodes.length > 1)
      {
        for(let j:number=0; j<itm.childNodes.length; j++)
        {
          //https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
          if(itm.childNodes[j].nodeType === 1){ getRecursiveClasses(itm.childNodes[j]) }
        }
      }
      parseClasses(itm)
    }
    ref.childNodes.forEach((itm:Node,indx) => { getRecursiveClasses(itm) })
  }

  const Container = styled('div', {
          float: 'left',
          padding: paddingStyle,
          width:  '100%'
        }),
        Wrapper = styled('div', {
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: '80em'
        })
  
  const removeWysiwyg = () =>
  { writersBlockDispatch({ type:WYSIWYG_SET_VISIBILITY, payload:false }) }

  const contentUpdated = (s:string, autoSave:boolean = false) =>
  {
    //autoSave for title ?
  }
  const setFormat = (s:string) =>{ /* no longer needed? */ }

  return (
    <Wrapper> 
      <Container>
        <JournalClassMap classMapRef={classMap => classMap && configureClassMap(classMap) } />{/* Keep this out of the context.provider */}
        <JournalContext.Provider value={{journalStore, journalDispatch}} displayName='JournalContextProvider'>
          <JournalBase wysiwygDisplayed={wysiwygDisplayed} classMaps={classMapRef} />
          { wysiwygDisplayed && <JournalWysiwyg classMaps={classMapRef} removeWysiwyg={removeWysiwyg} setFormat={setFormat} /> }
        </JournalContext.Provider>
      </Container>
      {/* {!calendarContent.loading && <PostItBase />} */}
      {/* <LinedPaperBase>
        <p>These are your notes</p>
        <p>They will be visible only to you and will remain persistent from day to day.</p>
      </ LinedPaperBase> */}
    </Wrapper>
  )
}
Journal.displayName = 'JournalPage'

export default Journal