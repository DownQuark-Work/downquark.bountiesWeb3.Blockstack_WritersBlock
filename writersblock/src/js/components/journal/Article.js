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

import {landingPageContent, loggedInDefaultContent} from './context/index'

const Article = (props:JournalBasePropsType) =>
{
  const { writersBlockStore, writersBlockDispatch } = useContext(WritersBlockContext),
        {journalStore, journalDispatch} = useContext(JournalContext)

  const JournalArticle = styled('article', {
        //Below is FPO so I don't forget it exists. (makes graph paper)
            // backgroundSize: '20px 20px',
            // backgroundImage: 'linear-gradient(to right, #99CFE0 1px, transparent 1px), linear-gradient(to bottom, #99CFE0 1px, #f8f8f8 1px)',
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

  const createContentFromUserSettings = () =>
  {
    if (!USE_GAIA) //User NOT logged in
    { 
      return {
        ...baseDefaultContentObj,
        content:landingPageContent,
        title: 'why writers block?'
      }
    }
    const defaultJournalContentSetting = 'instructions',
          // defaultJournalContentSetting = context.user.journal.default
          defaultTitle = `${new Date().getTitleFormattedDate()} Journal Entry`,
          baseDefaultContentObj = {
            created_by:'WritersBlock',
            created_on:new Date().getTime(),
            id:'0',
            title:defaultTitle
          }

    switch(defaultJournalContentSetting)
    {
      case 'instructions':
      case 'blank':
      case 'previousEntry':
      case 'markov':
      default:
        return {
          ...baseDefaultContentObj,
          content:loggedInDefaultContent
          }
    }
  }

  useEffect(() =>
  {
    if(!USE_GAIA)
    { journalStore.original = {...journalStore.landing} }
    else
    {
      if(journalStore.currentDayFileExists === false)
      {
        const defaultData = createContentFromUserSettings()
        journalStore.default = {...defaultData}
        journalStore.original = {...defaultData}
      }
    }
  },[journalStore.currentDayFileExists, journalStore.default, journalStore.landing, journalStore.original])

  useEffect(() =>
  {
    if (!journalStore.loaded)
    {
      const block = { userSession:writersBlockStore.Blockstack.userSession },
            journal = {currentDayFileExists:journalStore.currentDayFileExists, dispatch:journalDispatch, filename:journalStore.fileName.current}
      if(journalStore.currentDayFileExists != null) // base private and public files have been parsed
      {loadJournalContent(block,journal)}
    }
  }, [journalStore.loaded, journalStore.currentDayFileExists, journalStore.fileName, writersBlockStore.Blockstack.userSession, journalDispatch])

  return (
    <JournalArticle>
      <JournalPageLeft title={journalStore.original.title} {...props} />
      <JournalPageRight
        content={journalStore.updatedContent || USE_GAIA && journalStore.original.content || journalStore.landing.content}
        {...props}
      />
    </JournalArticle>
  )
}
Article.displayName = 'JournalArticle'

export default Article