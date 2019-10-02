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
      case LandingConst.APP_COOKIES_ACCEPTED:
        return {
          ...landing,
          cookiesAccept: true
        }
      case LandingConst.APP_COOKIES_DECLINED:
        return { ...landing }
      case LandingConst.APP_GDPR_ACCEPTED:
        return { ...landing }
      case LandingConst.APP_GDPR_DECLINED:
        return { ...landing }
      default:
        return landing
    }
}