/// import type

import * as BlockstackConst from '../constants/store/blockstack'
import { writersblockContextInitial } from '../initializers'

export const BlockstackReducer = (
  state:$FlowDeadline = writersblockContextInitial,
  action:$FlowDeadline
) =>
{ 
  const blck = { ...state.Blockstack }
  console.log('I SHOULD BE HIT NOW')
  console.log('blck',blck)
  console.log('action.type',action)
  switch (action.type)
  {
    case BlockstackConst.BLOCKSTACK_INIT_SUCCESS: // we aer currently initializing with this info. May need control over later
      return blck
    case BlockstackConst.BLOCKSTACK_USER_LOAD_SUCCESS:
      return {
        ...blck,
        ...action.payload
      }
    default:
      return blck
  }
}