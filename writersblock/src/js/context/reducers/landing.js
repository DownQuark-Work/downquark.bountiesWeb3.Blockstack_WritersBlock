import type { ContextWritersBlockType } from '../../../flow/context/ReducersType'

import * as LandingConst from '../constants/store/landing'
import { writersblockContextInitial } from '../initializers'

export const LandingReducer = (
  state: ContextWritersBlockType = writersblockContextInitial,
  action: Action
) =>
{
    const landing = {...state.Landing}
    switch (action.type)
    {
      case LandingConst.APP_INITIAL_LOAD:
        return { ...landing }
      case LandingConst.USER_SETTINGS_DISPLAY:
        return {
          ...landing,
          settingsOpen: true
        }
      case LandingConst.USER_SETTINGS_CONCEAL:
        return {
          ...landing,
          settingsOpen: false
        }
      default:
        return landing
    }
}