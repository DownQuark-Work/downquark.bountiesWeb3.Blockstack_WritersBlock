import React, {useContext, useEffect, useReducer, useRef, useState} from 'react'
import {styled} from 'styletron-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { USE_GAIA } from '../utils/blockstack'
import { handleDeepLink, parseDeepLink } from '../utils/context'
import { WritersBlockContext } from '../base/Root'
import {WYSIWYG_SET_VISIBILITY} from '../context/constants/store/journal'

import {JournalContext, JournalContextInitial} from '../components/journal/context'
import JournalReducer from '../components/journal/context/reducer'

import JournalBase from '../components/journal/Base'
import JournalClassMap from '../components/journal/ContentClassMap'
import JournalWysiwyg from '../components/journal/BaseWysiwyg'
import LinedPaperBase from '../components/linedpaper/Base'
import PostItBase from '../components/postit/Base'

const Journal = ({ match }) =>
{
  const [journalFilesParsed, setJournalFilesParsed] = useState(0),
        deepLink = match && match.params.entry,
        paddingStyle = USE_GAIA ? '1rem' : '3rem',
        { writersBlockStore, writersBlockDispatch } = useContext(WritersBlockContext),
        wysiwygDisplayed = USE_GAIA && writersBlockStore && writersBlockStore.Journal.content.showWysiwyg
  
  JournalContextInitial.fileName.current = new Date().CONTENT_FILE.formatDate() // here instead of _initial_ file so that prototype() can run
  JournalContextInitial.entryData.todaysDate = new Date().CONTENT_FILE.formatDate()
  JournalContextInitial.entryData.todaysDateFile = new Date().CONTENT_FILE.formatDate()+'.json'
  
  JournalContextInitial.defaultStorageType = writersBlockStore.User.settings.publish || 'PRIVATE'
  const [journalStore, journalDispatch] = useReducer(JournalReducer, JournalContextInitial),
        classMapRef:RefObjOfArrayStr = useRef({}),
        contentLoadInit = useRef(false)
  
  let [deeplinkParsed, setDeeplinkParsed] = useState(null)
  useEffect(() =>
  {
    if (deepLink)
    {
      if(!deepLink.match(/^\d{8}$/gm))//external "deep" link
      { writersBlockStore.Journal.shallowlink = null }
      else{ writersBlockStore.Journal.shallowlink = deepLink+'.json'; } //assume shallow
      
      if (writersBlockStore.Journal.shallowlink && writersBlockStore.Blockstack.userFiles.postsLoaded) // handle shallow link
      {
        // verify file exists (shallow links are the logged in user's files. Available to them only when logged in)
        if (writersBlockStore.Blockstack.userFiles.postsMap[writersBlockStore.Journal.shallowlink.noExt()])
        {
          //validated
          journalStore.currentDayFileExists = writersBlockStore.Journal.shallowlink
          journalStore.isDeepLink = false
          setJournalFilesParsed(1) // <-- kicks off render when finished validating
        }
        else{ alert('unknown file!'); }
      }
      else { setDeeplinkParsed(parseDeepLink(deepLink)) } // proceed for deep link
    }
  }, [deepLink, journalStore.currentDayFileExists, journalStore.isDeepLink, writersBlockStore.Blockstack.userFiles.postsLoaded, writersBlockStore.Blockstack.userFiles.postsMap, writersBlockStore.Journal.shallowlink])
  
  useEffect(()=>
  {
    if(deeplinkParsed && !writersBlockStore.Journal.shallowlink && !contentLoadInit.current)
    {// link should no longer have an effect if shallowlink happened
        // navigated by deeplink, clicked another entry
        journalStore.isDeepLink = true
        contentLoadInit.current = true //only loads 1x
        handleDeepLink(deeplinkParsed,journalDispatch)
    }
    else
    {
      // this should ONLY run if no shallow or deep linking involved
        // creates (or loads) today's entry
      if (writersBlockStore.Blockstack.userFiles.postsMap)
      {
        journalStore.currentDayFileExists = writersBlockStore.Blockstack.userFiles.postsMap.hasOwnProperty(JournalContextInitial.fileName.current)
          ? JournalContextInitial.fileName.current+'.json' : false
        journalStore.isDeepLink = false
        setJournalFilesParsed(1) //triggers Article.js to render
      }
    }
  }, [deeplinkParsed, journalStore.currentDayFileExists, journalStore.isDeepLink, writersBlockStore.Blockstack.userFiles.postsMap, writersBlockStore.Journal.shallowlink])

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

  return (
    <Wrapper> 
      <Container>
        <JournalClassMap classMapRef={classMap => classMap && configureClassMap(classMap) } />{/* Keep this out of the context.provider */}
        <JournalContext.Provider value={{journalStore, journalDispatch}} displayName='JournalContextProvider'>
          <JournalBase wysiwygDisplayed={wysiwygDisplayed} classMaps={classMapRef} />
          { wysiwygDisplayed && <JournalWysiwyg classMaps={classMapRef} removeWysiwyg={removeWysiwyg} /> }
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