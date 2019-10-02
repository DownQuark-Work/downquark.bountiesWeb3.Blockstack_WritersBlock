//This file really does nothing other than allowing for Overrides if needed in the future
import type {
  ContextWritersBlockType,
  ContextJournalType,
  ContextLandingType,
  ContextUserType,
} from './ReducersType';

export type ContextInitializerJournalType = {...ContextJournalType}
export type ContextInitializerLandingType = {...ContextLandingType}
export type ContextInitializerUserType = {...ContextUserType}


export type ContextInitializerWritersBlockType = {
  ...ContextWritersBlockType
}