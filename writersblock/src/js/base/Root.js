import type { ContextWritersBlockType } from '../../flow/context/ReducersType'

import React, { useReducer } from 'react'
import { UserSession, AppConfig } from 'blockstack';
import { Client as Styletron } from 'styletron-engine-atomic'
import { Provider as StyletronProvider, DebugEngine } from 'styletron-react'
import { writersblockContextInitial } from '../context/initializers'
import Routes from './Routes'
import writersBlockRootReducer from '../context/reducers'

const debug = false 
    //only works with webpack but keep for future integration
// const debug = process.env.NODE_ENV === "production" ? void 0 : new DebugEngine()
const engine = new Styletron()

//  https://stackoverflow.com/questions/55205472
//    /is-nesting-react-context-provider-and-consuming-those-with-usecontext-a-problem
const initialContext: ContextWritersBlockType  = writersblockContextInitial
export const WritersBlockContext: $FlowES6Bug = React.createContext(initialContext);

const Root = () => 
{
  const blockstackAppConfig = new AppConfig()
  const blockstackUserSession = new UserSession({ appConfig: blockstackAppConfig })
  //utlize javascripts pointers to capture config and sesson before store is populated and becomes immutable
  //$FlowDeadline
  initialContext.Blockstack.appConfig = blockstackAppConfig
  //$FlowDeadline
  initialContext.Blockstack.userSession = blockstackUserSession
  

  const [writersBlockStore, writersBlockDispatch] = useReducer(writersBlockRootReducer, initialContext)
  
  console.log('writersBlockStore',writersBlockStore)

  return (
    <WritersBlockContext.Provider value={{ writersBlockStore, writersBlockDispatch }}>
      <StyletronProvider value={engine} debug={debug}>
        <Routes blockstackAppConfig={blockstackAppConfig} blockstackUserSession={blockstackUserSession} />
      </StyletronProvider>
    </WritersBlockContext.Provider>
  )
}
  Root.displayName = 'Root'

export default Root