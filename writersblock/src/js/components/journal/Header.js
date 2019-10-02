import React, {Fragment,useContext} from 'react'
import * as blockstack from 'blockstack'
import { styled, withStyle } from 'styletron-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {activeBorder} from '../../utils/ui'

import { USE_GAIA } from '../../utils/blockstack'
import {WritersBlockContext} from '../../base/Root'

import {MediaQuery} from '../../context/constants/app/common'
import {TabletPlusCorners} from '../../context/constants/app/journal'

const Header = () =>
{
  const {writersBlockStore, writersBlockDispatch} = useContext(WritersBlockContext)
  
  const blockstackSignIn = (e) => { blockstack.redirectToSignIn() }
  const blockstackLogout = (e) =>
{ blockstack.signUserOut(window.location.origin) }

  const JournalHeader = styled('header', {
          paddingBottom: '1em',
          [MediaQuery.TABLET_PLUS]: {
            columnCount: '2',
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
          fontFamily: 'Playfair Display, sans-serif',
          fontSize: '.75em',
          fontWeight: 700,
          letterSpacing: '0.125em',
          lineHeight:'1.25',
          margin:0,
          textTransform:'uppercase'
        }),
        JournalUserActions = withStyle(JournalHeaderDate, {
          backgroundColor: USE_GAIA ? '#e5e5e5' : 'none',
          borderRadius: USE_GAIA ? '50%' : 0,
          cursor:'pointer',
          display:'inline-block',
          float:'right',
          margin: '0 20px 0 0',
          padding:'10px',
          position:'relative',
          zIndex:10
        }),
        UserLoginWrapper = styled('div', {
          ...activeBorder,
          backgroundColor: 'transparent',
          height:'3rem',
          lineHeight:'3rem',
          width:'150%',
          textAlign:'center',
          ':hover':{
            borderColor:'#16264c',
            borderWidth:'3px',
            color:'#16264c'
          }
        }),
        UserAvater = <FontAwesomeIcon onClick={blockstackLogout}  icon='book-reader'/>,
        UserLogin = <UserLoginWrapper onClick={blockstackSignIn}>Sign In <FontAwesomeIcon style={{ fontSize: '1.25rem' }} icon='file-signature' /></UserLoginWrapper>
        
  const currentDay = `${new Date().getMonth()+1} / ${new Date().getDate()} / ${new Date().getFullYear()}`
  
  

  return (
    <JournalHeader>
      <JournalHeaderDate onClick={()=>console.log('DEBUG:',writersBlockStore)}>{currentDay}</JournalHeaderDate>
      <JournalUserActions>
      {
        USE_GAIA
          ? UserAvater
          : UserLogin
      }
      {/*
      GAIA: Add username here
      onClick={e => toggleBlockstackCredential(e) }
       */}
      </JournalUserActions>
    </JournalHeader>
  )
}
Header.displayName = 'JournalHeader'

export default Header