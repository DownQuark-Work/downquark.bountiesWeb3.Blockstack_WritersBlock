import React, {Fragment,useContext} from 'react'
import * as blockstack from 'blockstack'
import { styled, withStyle } from 'styletron-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {USER_SETTINGS_DISPLAY} from '../../context/constants/store/landing'
import {USE_GAIA} from '../../utils/blockstack'
import {WritersBlockContext} from '../../base/Root'
import {JournalContext} from './context'
import {activeBorder} from '../../utils/ui'

import {MediaQuery} from '../../context/constants/app/common'
import {TabletPlusCorners} from '../../context/constants/app/journal'

import Shareables from './share'

const Header = () =>
{
  const {writersBlockStore, writersBlockDispatch} = useContext(WritersBlockContext)
  const {journalStore, journalDispatch} = useContext(JournalContext)
  
  const blockstackSignIn = (e) => { blockstack.redirectToSignIn() }
  const displayUserSettings = (e) => { writersBlockDispatch({ type: USER_SETTINGS_DISPLAY }) }

  const JournalHeader = styled('header', {
          marginBottom: '2em',
          paddingBottom: '1em',
          [MediaQuery.TABLET_PLUS]: {
            columnCount: 1, //USE_GAIA ? 2 : 1,
            columnGap: '6em',
            position: 'relative',
            zIndex: '1',
            ':after': {
              ...TabletPlusCorners.ALL,
              ...TabletPlusCorners.HA,
              ...TabletPlusCorners.H
            },
            ':before': {
              ...TabletPlusCorners.ALL,
              ...TabletPlusCorners.HB,
              ...TabletPlusCorners.H
            }
          }
        }),
        JournalHeaderDate = styled('h1', {
          display: 'inline-block',
          fontFamily: 'Playfair Display, sans-serif',
          fontSize: '.75em',
          fontWeight: 700,
          letterSpacing: '0.125em',
          lineHeight:'1.25',
          margin:0,
          textTransform:'uppercase'
        }),
        JournalUserActions = withStyle(JournalHeaderDate, {
          cursor:'pointer',
          display:'inline-block',
          float:'right',
          margin: '0 20px 0 0',
          padding:'10px',
          position:'static',
          zIndex:10
        }),
        SocialSectionWrapper = styled('section', {
          display:'block',
          position:'absolute',
          top:'20px',
          right:'25%'
        }),
        UserLoginWrapper = styled('div', {
          ...activeBorder,
          backgroundColor: 'transparent',
          height:'3rem',
          left:'-25%',
          lineHeight:'3rem',
          width:'150%',
          textAlign:'center',
          ':hover':{
            borderColor:'#16264c',
            borderWidth:'3px',
            color:'#16264c'
          }
        }),
        UserLoginCTA = styled('p', {
          textAlign:'right',
          clear:'both'
        }),
        UserSettingsWrapper = styled('div', {
          backgroundColor:'transparent',
          border:'unset',
          position:'absolute',
          top:0,
          right:0
        }),
        UserAvatar = (<UserSettingsWrapper onClick={displayUserSettings}>
                        <FontAwesomeIcon  icon='book-reader'/> {writersBlockStore.User.settings.pseudonym || 'Settings'}
                      </UserSettingsWrapper>),
        UserLogin = <UserLoginWrapper onClick={blockstackSignIn}>Sign In With Blockstack <FontAwesomeIcon style={{ fontSize: '1.25rem' }} icon='file-signature' /></UserLoginWrapper>
        
  const currentDay = new Date().HEADER.formatDate()
  
  const validShare = () =>
  {
    if(USE_GAIA && !writersBlockStore.Journal.content.showWysiwyg // logged in and not creating/editing entry
        && (journalStore.author && journalStore.author.did === writersBlockStore.Blockstack.decentralizedID)
        && (writersBlockStore.Blockstack.userFiles.postsMap[journalStore.original.id]
          && writersBlockStore.Blockstack.userFiles.postsMap[journalStore.original.id].kind === 'PUBLIC')) 
    {
      writersBlockStore.User.integrations = writersBlockStore.User.integrations || {}
      return true
    }
    return false
  }

  return (<JournalHeader>
    <JournalHeaderDate onClick={() => console.dev('base', 'DEBUG:',writersBlockStore,journalStore)}>{currentDay}</JournalHeaderDate>
      <JournalUserActions>
      {
        USE_GAIA
          ? UserAvatar
          : UserLogin
      }
      </JournalUserActions>
      {validShare() && <Shareables 
                          apisAvailable={writersBlockStore.User.integrations}
                          fileInfo={{...writersBlockStore.Blockstack.userFiles.postsMap[journalStore.original.id],...journalStore.original}}
                          integrationInfo={writersBlockStore.User.Integrations}
                          integrationLoading={writersBlockStore.Integration && writersBlockStore.Integration.loading} />}
    {!USE_GAIA && <UserLoginCTA>
      <i>psst..</i> Isn&lsquo;t it tempting to click the <b><i><mark data-wysiwyg-class-map="highlight-yellow">SIGN IN BUTTON</mark></i></b> above - ☝️</UserLoginCTA>}
          </JournalHeader>)
}
Header.displayName = 'JournalHeader'

export default Header