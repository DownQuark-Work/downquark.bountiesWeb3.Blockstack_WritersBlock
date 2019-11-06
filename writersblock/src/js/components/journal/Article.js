import type {FetchJournalContentCallbackDataType} from '../../../flow/context/ActionsType'
import type {JournalBasePropsType} from '../../../flow/components/JournalTypes'

import React, {useCallback, useContext, useEffect, useState} from 'react'
import { styled } from 'styletron-react'
import { USE_GAIA } from '../../utils/blockstack'

import { WritersBlockContext } from '../../base/Root'

import {JournalContext} from './context'
import {JOURNAL_LOAD_CONTENT_SUCCESS} from './context/constants'

import {api, MediaQuery} from '../../context/constants/app/common'
import {loadJournalContent} from './context/actions'

import JournalPageLeft from './PageLeft'
import JournalPageRight from './PageRight'

import { landingPageContent, landingPageTitle, loadingPageContent, loadingPageTitle, loggedInDefaultContent, loggedInDefaultTitle} from './context/index'

const Article = (props:JournalBasePropsType) =>
{
  const { writersBlockStore, writersBlockDispatch } = useContext(WritersBlockContext),
        {journalStore, journalDispatch} = useContext(JournalContext),
        [userStage, setUserStage] = useState(USE_GAIA ? 'DEFAULT_LOGGED_IN' : 'LOGGED_OUT')
        
  console.dev('journal', 'journalStore', journalStore)

  const JournalArticle = styled('article', {
          [MediaQuery.TABLET_PLUS]: {
            columnCount: props.wysiwygDisplayed ? 'unset' : 2,
            columnGap: '6em',
            height:props.wysiwygDisplayed ? '90vh' : 'inherit',
            overflow:props.wysiwygDisplayed ? 'scroll' : 'inherit',
            position: 'relative',
            transition: '.3s',
            zIndex: '1'
          }
        })
  const defaultTitle = `${new Date().TITLE.formatDate()} Journal Entry`,
  createContentFromUserStage = () =>
  {
    const defaultJournalContentSetting = writersBlockStore.User.settings.pageview,
          baseDefaultContentObj = {
            created_by:'WritersBlock',
            created_on:new Date().getTime(),
            id:'0',
            title:defaultTitle
          }
    if(journalStore.isDeepLink === true && journalStore.loaded === true)
    { return journalStore.original } //deeplinked file - parsing completed - no need to wait
    
    if (userStage === 'LOGGED_OUT')
    {
      return {
        ...baseDefaultContentObj,
        content: landingPageContent,
        title: landingPageTitle
      }
    }
    
    const loadingObj = {
      ...baseDefaultContentObj,
      content: loadingPageContent,
      title: loadingPageTitle
    }
    if (!writersBlockStore.Blockstack.userFiles.postsLoaded) // loading user information
    { return loadingObj }

    if(!journalStore.currentDayFileExists)
    { // show default until we make an entry on this date
      switch (defaultJournalContentSetting)
      {
        case 'blank':
          return {
            ...baseDefaultContentObj,
            content: '',
            title: `${new Date().TITLE.formatDate()} Journal Entry`
          }
        case 'instructions':
        case 'previousEntry':
        case 'markov':
        default:
          return {
            ...baseDefaultContentObj,
            content: loggedInDefaultContent,
            title: loggedInDefaultTitle
          }
      }
    }

    //entry exists and is available in store. Wait for the load to finish before changing message
    return journalStore.loaded ? { ...journalStore.original } : loadingObj
  }

  const journalContentObj = createContentFromUserStage()
  if (props.wysiwygDisplayed)
  {
    journalContentObj.title = defaultTitle
    journalStore.original.title = defaultTitle //directly to avoid lifecycle
  }
  const [journalContent, setJournalContent] = useState(journalContentObj)


  useEffect(() =>
  {
    if (!journalStore.loaded && journalStore.currentDayFileExists)
    {
      const block = { userSession:writersBlockStore.Blockstack.userSession },
            journal = {
              currentDayFileExists:journalStore.currentDayFileExists,
              dispatch:journalDispatch,
              filename:journalStore.fileName.current,
              kind:writersBlockStore.Blockstack.userFiles.postsMap[journalStore.currentDayFileExists.noExt()].kind
            }
      loadJournalContent(block,journal)
    }
  }, [journalDispatch, journalStore.currentDayFileExists, journalStore.fileName, journalStore.loaded, writersBlockStore.Blockstack.userFiles.postsMap, writersBlockStore.Blockstack.userSession])

  return (
    <JournalArticle>
      <JournalPageLeft title={journalContent.title} {...props} />
      <JournalPageRight
        content={journalContent.content}
        {...props}
      />
    </JournalArticle>
  )
}
Article.displayName = 'JournalArticle'

export default Article