import type {
    ContextWritersBlockType,
    ContextUserType
} from '../../../flow/context/ReducersType'

import blockstackContextInitial from './blockstack'
import integrationContextInitial from './integration'
import journalContextInitial from './journal'
import landingContextInitial from './landing'
import userContextInitial from './user'


export const writersblockContextInitial: ContextWritersBlockType = {
  Blockstack: {...blockstackContextInitial},
  Integration: {...integrationContextInitial},
  Journal: {...journalContextInitial},
  Landing: {...landingContextInitial},
  User: {...userContextInitial},
}
