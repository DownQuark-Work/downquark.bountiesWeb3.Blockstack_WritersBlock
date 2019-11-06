// import type { ContextWritersBlockType } from '../../../flow/context/ReducersType'

import * as IntegrationConst from '../constants/store/Integration'
import {BLOCKSTACK_LIST_FILE_LOADED} from '../constants/store/blockstack'
import { writersblockContextInitial } from '../initializers'

export const IntegrationReducer = (
  state:$FlowCurrentBranch = writersblockContextInitial,
  action:$FlowCurrentBranch
) =>
{ 
  console.dev('reducer','table','reducer integration', state, action)
  const integ = { ...state.Integration }
  let successState = {}
  switch(action.type)
  {
    case BLOCKSTACK_LIST_FILE_LOADED:
      return {...integ,...action.payload.INTEGRATIONS}
    case IntegrationConst.INTEGRATION_SUBMISSION_INIT:
    case IntegrationConst.INTEGRATION_LOAD_INIT:
      return {...integ, loaded:false, loading:true }
    case IntegrationConst.INTEGRATION_SUBMISSION_SUCCESS:
    case IntegrationConst.INTEGRATION_LOAD_SUCCESS:
      const loadState = {loaded:true, loading:false},
            successState = {...action.payload}
            console.log('SHOULD NOT SEE THIS')
    case IntegrationConst.INTEGRATION_SUBMISSION_FAILURE:
    case IntegrationConst.INTEGRATION_LOAD_FAILURE:
      console.warn('TESTING: COMMENT WHEN FINISHED'); return {integ:{}, ...loadState} //TESTING RESET
      console.warn('REMEMBER to handle timestamps')
      //mostRecentCommit:0,//now
  //   nextEligibleToCommit:0,//1hr after mostRecentCommit
      return {...integ, ...loadState,  ...successState}
    default :
      return integ
  }
}


/*
//   const MOCKintegrationInfo = {TWO_HUNDRED_WAD:{
  //   entries:{
  //     "20191103":{
  //       POST:1572743188939,//timestamp
  //       UPDATED:[1572743189432,1572743190960],//array of timestamps
  //       uuid:'Xyz'
  //     },
  //   },
  //   mostRecentCommit:0,//now
  //   nextEligibleToCommit:0,//1hr after mostRecentCommit
  // }}
*/