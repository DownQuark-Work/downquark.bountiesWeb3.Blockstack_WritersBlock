import type { ContextWritersBlockType } from '../../../flow/context/ReducersType'

import * as UserConst from '../constants/store/User'
import {BLOCKSTACK_LIST_FILE_LOADED} from '../constants/store/blockstack'
import { writersblockContextInitial } from '../initializers'

export const UserReducer = (
  state: ContextWritersBlockType = writersblockContextInitial,
  action: Action
) =>
{
  console.dev('reducer','table','reducer user',state, action)
  const usr = { ...state.User }
  let updatedUser = {}
  switch (action.type)
  {
    case UserConst.USER_LOGIN:
      return {
        ...usr,
        emailVerified:true
      }
    case UserConst.USER_LOGOUT:
      return usr
    case BLOCKSTACK_LIST_FILE_LOADED:
      return {
        ...usr,
        ...action.payload.user
      }
    case UserConst.USER_SETTING_APPLY_CHANGES:
      const {integrations, ...settings} = action.payload
      return {
        ...usr,
        settings,
        integrations,
      }
    default:
      return usr
  }
}