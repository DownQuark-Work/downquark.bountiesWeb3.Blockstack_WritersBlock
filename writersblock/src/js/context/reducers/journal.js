import type { ContextWritersBlockType } from '../../../flow/context/ReducersType'

import * as JournalConst from '../constants/store/Journal'
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
    // case JournalConst.JOURNAL_LOGIN:
    //   return {
    //     ...jrnl,
    //     emailVerified:true
    //   }
    // case JournalConst.JOURNAL_LOGOUT:
    //   return jrnl
    default:
      return jrnl
  }
}