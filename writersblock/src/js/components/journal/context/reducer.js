import type { ContextJournalConstantsType,
              ContextJournalStoreType} from '../../../../flow/components/JournalTypes'

import {JournalContextInitial} from '../context'
import * as JournalConstants from './constants'

export default (
  state:ContextJournalStoreType = JournalContextInitial,
  action:Action
):ContextJournalStoreType =>
{
  let newState = { ...state }
  switch(action.type)
  {
    case JournalConstants.JOURNAL_LOAD_CONTENT_INIT:
      newState.loaded = false,
      newState.loading = true,
      newState.original = {content:'...', title:'Loading'}
      return newState
    case JournalConstants.JOURNAL_LOAD_CONTENT_FAILURE:
      newState.loaded = true,
      newState.loading = false,
      newState.original = {content:'There was an error loading your content. Please refresh to try again', title:'ERROR!'}
      return newState
    case JournalConstants.JOURNAL_LOAD_CONTENT_SUCCESS:
      newState.loaded = true,
      newState.loading = false,
      newState.original = {
        content:action.payload.content.content,
        title:action.payload.content.title
      }
      return newState
    case JournalConstants.JOURNAL_PRE_BLUR_TEXT:
      return {...state}
    case JournalConstants.JOURNAL_PRE_FOCUS_TEXT:
      return {...state}
    case JournalConstants.JOURNAL_REDO_ACTIVE:
      return {...state}
    case JournalConstants.JOURNAL_UNSAVED_UPDATE:
      return {
        ...state,
        updatedContent:
          action.payload || state.original.content,
      }
  }
  return state
}