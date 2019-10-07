import type { ContextWritersBlockType } from '../../../flow/context/ReducersType'

import * as JournalConst from '../constants/store/Journal'
import {
  JOURNAL_NAVIGATE_ENTRIES_FAILURE,
  JOURNAL_NAVIGATE_ENTRIES_INIT,
  JOURNAL_NAVIGATE_ENTRIES_SUCCESS,
  JOURNAL_SAVE_CONTENT_FAILURE,
  JOURNAL_SAVE_CONTENT_INIT,
  JOURNAL_SAVE_CONTENT_SUCCESS
  } from '../../components/journal/context/constants'
import { writersblockContextInitial } from '../initializers'

export const JournalReducer = (
  state: ContextWritersBlockType = writersblockContextInitial,
  action: Action
) =>
{
  const jrnl = { ...state.Journal }
  switch (action.type)
  {
    case JournalConst.WYSIWYG_SET_VISIBILITY:
      return {
        ...jrnl,
        content: {
          ...jrnl.content,
          showWysiwyg:action.payload
        }

      }
    case JOURNAL_NAVIGATE_ENTRIES_INIT:
      return {...jrnl, isLoading:true, shallowlink:true}
    case JOURNAL_NAVIGATE_ENTRIES_FAILURE:
    case JOURNAL_NAVIGATE_ENTRIES_SUCCESS:
      return {...jrnl, isLoading:false}
    case JOURNAL_SAVE_CONTENT_INIT:
      return {...jrnl, isSaving:true}
    case JOURNAL_SAVE_CONTENT_FAILURE:
    case JOURNAL_SAVE_CONTENT_SUCCESS:
      return {...jrnl, isSaving:false}
    default:
      return jrnl
  }
}