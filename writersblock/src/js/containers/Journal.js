import React, {useContext, useEffect, useReducer, useRef, useState} from 'react'
import {styled} from 'styletron-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { USE_GAIA, parseDeeplink } from '../utils/blockstack'
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
  const deepLink = match && match.params.file,
        paddingStyle = USE_GAIA ? '1rem' : '3rem',
        { writersBlockStore, writersBlockDispatch } = useContext(WritersBlockContext),
        wysiwygDisplayed = USE_GAIA && writersBlockStore && writersBlockStore.Journal.content.showWysiwyg
  
  JournalContextInitial.fileName.current = new Date().getContentFileFormattedDate() // here instead of _initial_ file so that prototype() can run
  
  const [journalStore, journalDispatch] = useReducer(JournalReducer, JournalContextInitial),
        classMapRef:RefObjOfArrayStr = useRef({})
  
  let [deeplinkParsed, setDeeplinkParsed] = useState(null)
  useEffect(() =>
  {
    if(deepLink)
    {
      let linkedFile;
      if(!deepLink.match(/^\d{8}\.\w*$/gm))//external link - try to decode
      { linkedFile = parseDeeplink(writersBlockStore.Blockstack.userSession,deepLink) }
      else{ linkedFile = deepLink }
      
      if(linkedFile && !!linkedFile.match(/^\d{8}\.\w*$/gm))//external link mounted on internal - attempt to load file path
      {
        //parsed deeplink - but need to verify that it is valid
        if(writersBlockStore.Blockstack.userFiles.privatePosts.includes(linkedFile))
        {
          //validated
          setDeeplinkParsed(linkedFile)
        }
        else if(writersBlockStore.Blockstack.userFiles.publicPosts.includes(linkedFile))
        { /* Stub for future integration when sharing / viewing other's stories: setDeeplinkParsed('public/'+linkedFile) */ }
        else{ alert('unknown file!'); }
      }
      else
      {
        alert('Link was incorrect. Please try again.')/// TODO: [@mlnck] UPDATE ~ Notification
      }
    }
  },[deepLink, writersBlockStore, writersBlockStore.Blockstack.userSession, writersBlockStore.Blockstack.userFiles.privatePosts])
  //below should be used if deeplink DNE or has failed
    // should be ignored if deeplink is valid
  let [journalFilesParsed, setJournalFilesParsed] = useState(0)
  useEffect(()=>
  {
    if(deepLink || writersBlockStore.Journal.shallowlink)
    {
      //parsed deeplink and verified as a valid file
      if(deeplinkParsed && !writersBlockStore.Journal.shallowlink) // link should no longer have an effect if shallowlink happened
      {
        journalStore.currentDayFileExists = deeplinkParsed
        setJournalFilesParsed(1)
      }
    }
    else
    {
      // this should ONLY run if no pagination or deepLinking involved OR deeplinking failed
        //allows full customization of race conditions
      const privPost = (writersBlockStore.Blockstack.userFiles.privatePosts && writersBlockStore.Blockstack.userFiles.privatePosts[0]) || null,
            pubPost = (writersBlockStore.Blockstack.userFiles.publicPosts && writersBlockStore.Blockstack.userFiles.publicPosts[0]) || null,
            effectCurrentDayFileExists = privPost && privPost.noExt() === JournalContextInitial.fileName.current
                                          || pubPost && pubPost.noExt() === JournalContextInitial.fileName.current

      journalStore.currentDayFileExists = !!effectCurrentDayFileExists ? (privPost || pubPost) : null
      if(writersBlockStore.Blockstack.userFiles.privatePosts && writersBlockStore.Blockstack.userFiles.publicPosts)
      { if (!journalStore.currentDayFileExists){ journalStore.currentDayFileExists = false} } //remove null [triggers Article.js line 98]
      if(journalStore.currentDayFileExists != null && writersBlockStore.Blockstack.userFiles.privatePosts && writersBlockStore.Blockstack.userFiles.publicPosts){setJournalFilesParsed(1)}
    }
  },[deepLink, deeplinkParsed, journalStore.currentDayFileExists, writersBlockStore.Blockstack.userFiles.privatePosts, writersBlockStore.Blockstack.userFiles.publicPosts, writersBlockStore.Journal.shallowlink])


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