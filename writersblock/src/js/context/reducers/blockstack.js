/// import type

import * as BlockstackConst from '../constants/store/blockstack'
import { JOURNAL_SAVE_CONTENT_SUCCESS_UPDATE_USER_FILES } from '../../components/journal/context/constants'
import { writersblockContextInitial } from '../initializers'

export const BlockstackReducer = (
  state:$FlowCurrentBranch = writersblockContextInitial,
  action:$FlowCurrentBranch
) =>
{ 
  const blck = { ...state.Blockstack }
  switch (action.type)
  {
    case BlockstackConst.BLOCKSTACK_INIT_SUCCESS: // we are currently initializing with this info. May need control over later
      return blck
    case BlockstackConst.BLOCKSTACK_USER_LOAD_SUCCESS:
      return {
        ...blck,
        ...action.payload,
        userInformationPopulated:true
      }
    case BlockstackConst.BLOCKSTACK_LIST_FILE_LOADED:
      let noUser = { postsMap: action.payload.postsMap, postsLoaded: true}
      return {
        ...blck,
        userFiles:{ ...noUser }
      }
    case JOURNAL_SAVE_CONTENT_SUCCESS_UPDATE_USER_FILES:
      return {
        ...blck,
        userFiles: { ...blck.userFiles, postsMap: action.payload.postsMap }
      }
    default:
      return blck
  }
}

