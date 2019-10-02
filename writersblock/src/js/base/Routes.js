import React, {useContext,useState} from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import routes from '../context/constants/app/routes'
import App from './App'

import AboutPage from '../containers/About'
import JournalPage from '../containers/Journal'
import LandingPage from '../containers/Landing'

import Loading from '../components/loading'

import {WritersBlockContext} from './Root'
import {BLOCKSTACK_USER_LOAD_SUCCESS} from '../context/constants/store/blockstack'

const loadingOpts = {
  backgroundRGBA: 'rgba(255,255,255,.7)',
  charAmtRange:[1,38],
  color:'rgba(139, 69, 19, 1)',
  lineAmtRange:[1,13],
  pos:'MC',
  padding:'50px 0 0 30px',
  z:50
}

const LoadingUser = (<>
                        <div style={{
                            textAlign:'center',
                            color:'brown',
                            marginTop:'20px',
                            position:'relative',
                            fontSize:'48px',
                            zIndex:105}}>
                          Collecting Your Writings
                        </div>
                        <Loading {...loadingOpts} />
                      </>)
const Routes = (props:$FlowTesting) =>
{  
  const {blockstackAppConfig,blockstackUserSession} = props
  const {writersBlockStore, writersBlockDispatch} = useContext(WritersBlockContext)
console.log("MUDDDY",writersBlockStore)

  if (!blockstackUserSession.isUserSignedIn() && blockstackUserSession.isSignInPending())
{
  blockstackUserSession.handlePendingSignIn().then((userData) =>
  {
    const payload = blockstackUserSession.loadUserData()
    console.log('payload',payload)
    writersBlockDispatch({type:BLOCKSTACK_USER_LOAD_SUCCESS, payload:blockstackUserSession.loadUserData()})
  });
}

  return (<App>
    <BrowserRouter>
    { !blockstackUserSession.isUserSignedIn() && blockstackUserSession.isSignInPending() && LoadingUser }
      <Switch>
        <Route path={routes.ABOUT} component={AboutPage} />
        
        <Route exact path={routes.JOURNAL}>{/* Redirect to landing if not logged in */}
          {!blockstackUserSession.isUserSignedIn() ? <Redirect to={routes.LANDING} /> : <JournalPage />}
        </Route>

        <Route exact path={routes.LANDING}>{/* Redirect to users journal if logged in */}
          {blockstackUserSession.isUserSignedIn() ? <Redirect to={routes.JOURNAL} /> : <JournalPage />}
        </Route>
      </Switch>
    </BrowserRouter>
  </App>)
}

Routes.displayName = 'Routes'
export default Routes