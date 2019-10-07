/// import type

import * as BlockstackConst from '../constants/store/blockstack'
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
      return {
        ...blck,
        userFiles: {...action.payload}
      }
    default:
      return blck
  }
}