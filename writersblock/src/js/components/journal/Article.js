import type {FetchJournalContentCallbackDataType} from '../../../flow/context/ActionsType'
import type {JournalBasePropsType} from '../../../flow/components/JournalTypes'

import React, {useCallback, useContext, useEffect, useState} from 'react'
import { styled } from 'styletron-react'
import { USE_GAIA } from '../../utils/blockstack'


import {api, MediaQuery} from '../../context/constants/app/common'
import {ActionFetch} from '../../context/actions'
import JournalContentMock from '../../../mocks/journal'

import {JournalContext} from './context'
import {JOURNAL_LOAD_CONTENT_SUCCESS, JOURNAL_UNSAVED_UPDATE} from './context/constants'

import JournalPageLeft from './PageLeft'
import JournalPageRight from './PageRight'

const Article = (props:JournalBasePropsType) =>
{
  const {journalStore, journalDispatch} = useContext(JournalContext)

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
          content:'This is your journal. To edit it just click anywhere',
          }
    }
  }
  
  const initialJournalContent = {content:null, loading: true, loaded:false},
        journalUrl =`${api.url.BASE}${api.url.JOURNAL}`

  const receiveFetchedData = useCallback((o:FetchJournalContentCallbackDataType) =>
  {
    if(!(o.content && o.content.content.length))
    { o.content = createContentFromUserSettings() }

    journalDispatch({type:JOURNAL_LOAD_CONTENT_SUCCESS, payload:o})
  },[journalDispatch])

  const journalContentUserUpdate = (s:string) =>
  {
    const localStateTest = {
      ...journalStore,
      content: {
        ...journalStore.content,
        content:s,
        updatedAt: new Date().getTimestamp()
      }
    }
  }

  useEffect(() =>
  {
    if(!journalStore.loaded)
    {
      ActionFetch({
        callback:receiveFetchedData,
        extended:{loaded: true, loading: false},
        mock:JournalContentMock,
        url:journalUrl,
      })
    }
  }, [journalUrl, journalStore.loaded, receiveFetchedData])

  return (
    <JournalArticle>
      <JournalPageLeft title={journalStore.original.title} {...props} />
      <JournalPageRight
        content={journalStore.updatedContent || USE_GAIA && journalStore.original.content || journalStore.landing.content}
        updateJournalContent={journalContentUserUpdate}
        {...props}
      />
    </JournalArticle>
  )
}
Article.displayName = 'JournalArticle'

export default Article