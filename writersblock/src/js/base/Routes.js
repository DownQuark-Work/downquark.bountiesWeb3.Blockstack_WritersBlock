import React, {useContext,useState} from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import routes from '../context/constants/app/routes'
import App from './App'

import AboutPage from '../containers/About'
import JournalPage from '../containers/Journal'
import LandingPage from '../containers/Landing'

import Loading from '../components/loading'

import {WritersBlockContext} from './Root'
import {WRITERS_BLOCK_BASE_FILES} from '../utils/blockstack'
import * as Testing from '../utils/testing'
import {BLOCKSTACK_USER_LOAD_SUCCESS, BLOCKSTACK_LIST_FILE_LOADED} from '../context/constants/store/blockstack'

const loadingOpts = {
  backgroundRGBA: 'rgba(255,255,255,.7)',
  charAmtRange:[1,38],
  color:'rgba(139, 69, 19, 1)',
  lineAmtRange:[1,13],
  pos:'MC',
  padding:'50px 0 0 30px',
  z:50
}
// TODO: [@mlnck] UPDATE ~ DRY Below
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
const LoadingEntry = (<>
                        <div style={{
                            textAlign:'center',
                            color:'brown',
                            marginTop:'20px',
                            position:'relative',
                            fontSize:'48px',
                            zIndex:105}}>
                          Loading Your Entry
                        </div>
                        <Loading {...loadingOpts} />
                      </>)
const SavingWriting = (<>
                        <div style={{
                            textAlign:'center',
                            color:'brown',
                            marginTop:'20px',
                            position:'relative',
                            fontSize:'48px',
                            zIndex:105}}>
                          Saving Your Content
                        </div>
                        <Loading {...loadingOpts} />
                      </>)
const Routes = (props:$FlowCurrentBranch) =>
{  
  const {blockstackAppConfig,blockstackUserSession} = props
  const {writersBlockStore, writersBlockDispatch} = useContext(WritersBlockContext)

  const gatherAllUserData = () =>
  { //load user info for upcoming fetch(s)
    const loadedUserData = blockstackUserSession.loadUserData()

    writersBlockDispatch({type:BLOCKSTACK_USER_LOAD_SUCCESS, payload:loadedUserData})
    
    const baseFiles = WRITERS_BLOCK_BASE_FILES.map(itm => itm.name),
          baseFilesLength = WRITERS_BLOCK_BASE_FILES.length
    let createInitialFiles = true,
        filesFound = 0,
        baseStorePayload ={}
    
    const getBaseFile = (i) =>
    {
      const file = WRITERS_BLOCK_BASE_FILES[i].path + WRITERS_BLOCK_BASE_FILES[i].name,
            opts = WRITERS_BLOCK_BASE_FILES[i].opts,
            sKey = WRITERS_BLOCK_BASE_FILES[i].storeKey
      
      blockstackUserSession.getFile(file,opts)
        .then(o =>
              {
                const curVal = JSON.parse(o)
                baseStorePayload[sKey] = curVal[sKey]
                if (++i < baseFilesLength)
                { getBaseFile(i)}
                else
                { writersBlockDispatch({ type: BLOCKSTACK_LIST_FILE_LOADED, payload: baseStorePayload }) }
              })
        .catch(err=> console.error(err))
    }
    const putBaseFile = (i) =>
    {
      const file = WRITERS_BLOCK_BASE_FILES[i].path + WRITERS_BLOCK_BASE_FILES[i].name,
            cntnt = JSON.stringify(WRITERS_BLOCK_BASE_FILES[i].content),
            opts = WRITERS_BLOCK_BASE_FILES[i].opts
      
      blockstackUserSession.putFile(file, cntnt, opts)
        .then(o=>
              {
                if(++i < baseFilesLength)
                { putBaseFile(i) }
                else { getBaseFile(0) }
              })
        .catch(err => console.error(err))
    }
      //For testing
    // Testing.readSingle(blockstackUserSession,'_writersBlockListPrivate.json')
    // Testing.readSingle(blockstackUserSession,'_writersBlockListPublic.json')
    // Testing.readSingle(blockstackUserSession,`private/20191007.json`)
    // Testing.makeMultiple(blockstackUserSession,12,10)
    // Testing.listFiles(blockstackUserSession)
    // Testing.deleteCommonFiles(blockstackUserSession)
    // blockstackUserSession.deleteFile('private/20191007.json')
    // blockstackUserSession.putFile('_writersBlockListPrivate.json','{"privatePosts":["20191001.json","20191005.json","20191008.json","20191009.json","20191011.json","20191015.json","20191016.json","20191017.json","20191018.json","20191023.json","20191024.json"]}',{})

    /*
    {"privatePosts":["20191001.json","20191005.json","20191007.json","20191008.json","20191009.json","20191011.json","20191015.json","20191016.json","20191017.json","20191018.json","20191023.json","20191024.json"]}
    */

    blockstackUserSession.listFiles(
      (itm) =>
        {
          if (baseFiles.includes(itm))
          { filesFound++ }
        return (filesFound >= baseFilesLength) ? false : true //stop searching once desired files found
        })
        .then(i =>
        {
          if (filesFound >= baseFilesLength)// load files
          { getBaseFile(0) } 
          else //create files
          { putBaseFile(0) }
        })
  }

  if (!blockstackUserSession.isUserSignedIn() && blockstackUserSession.isSignInPending())
  {
    blockstackUserSession.handlePendingSignIn().then((userData) =>
    {
      //redirect user to correct page on login
      location.pathname = '/journal'
      history.go(0)
    });
  }
  //gather all user data if previously logged in and a lifecycle event occured
  if(blockstackUserSession.isUserSignedIn() && (writersBlockStore && !writersBlockStore.Blockstack.userInformationPopulated))
  { gatherAllUserData() }

  return (<App>
    <BrowserRouter>
    { blockstackUserSession.isSignInPending() && LoadingUser }
    {writersBlockStore.Journal.isSaving && SavingWriting }
    {writersBlockStore.Journal.isLoading && LoadingEntry}
      <Switch>
        <Route path={routes.ABOUT} component={AboutPage} />
  
        <Route path={routes.JOURNAL}>{/* Redirect to landing if not logged in */}
          { !blockstackUserSession.isUserSignedIn() && <Redirect to={routes.LANDING} /> }
          { !Array.isArray(writersBlockStore.Blockstack.userFiles.privatePosts) && LoadingEntry}
          { Array.isArray(writersBlockStore.Blockstack.userFiles.privatePosts) && <Route path={routes.JOURNAL+'/:file?'} component={JournalPage} />}
        </Route>

        <Route path={routes.LANDING}>{/* Redirect to users journal if logged in */}
          {blockstackUserSession.isUserSignedIn() ? <Redirect to={routes.JOURNAL} /> : <JournalPage />}
        </Route>
      </Switch>
    </BrowserRouter>
  </App>)
}

Routes.displayName = 'Routes'
export default Routes