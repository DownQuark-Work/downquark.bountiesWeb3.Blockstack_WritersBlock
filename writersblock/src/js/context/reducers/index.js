import type { ContextWritersBlockType } from '../../../flow/context/ReducersType'

import * as LandingConst from '../constants/store/landing'
import { writersblockContextInitial } from '../initializers'

import { BlockstackReducer } from './blockstack'
import { IntegrationReducer } from './integration'
import { JournalReducer } from './journal'
import { LandingReducer } from './landing'
import { UserReducer } from './user'

export default function writersBlockRootReducer(
  state: ContextWritersBlockType = writersblockContextInitial,
  action: Action
)
{
  const clonedState = {...state}, clonedAction = {...action}
  console.dev('root-reducer','table','reducer writers block', clonedState, clonedAction)
  return {
    Blockstack: BlockstackReducer(state, action),
    Integration: IntegrationReducer(state, action),
    Journal: JournalReducer(state, action),
    Landing: LandingReducer(state, action),
    User: UserReducer(state, action)
  }
}