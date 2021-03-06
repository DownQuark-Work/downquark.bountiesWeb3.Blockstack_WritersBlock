import React, {useContext, useEffect, useRef, useState} from 'react'
import { styled,withStyle } from 'styletron-react'

import UserSettingsBase from '../usersettings/Base'

import { TabletPlusCorners } from  '../../context/constants/app/journal'
import { MediaQuery } from  '../../context/constants/app/common'

import {WritersBlockContext} from '../../base/Root'
import {JournalContext} from '../journal/context'

import {navigateJournalContent} from './context/actions'

const Footer = () =>
{
  const {writersBlockStore, writersBlockDispatch} = useContext(WritersBlockContext)
  const {journalStore, journalDispatch} = useContext(JournalContext)
  
  const JournalFooter = styled('footer', {
          paddingTop: '1em',
          [MediaQuery.TABLET_PLUS]: {
            columnCount: '2',
            columnGap: '6em',
            position: 'relative',
            zIndex: '1',
            ':after': {
              ...TabletPlusCorners.ALL,
              ...TabletPlusCorners.FA,
              ...TabletPlusCorners.F
            },
            ':before': {
              ...TabletPlusCorners.ALL,
              ...TabletPlusCorners.FB,
              ...TabletPlusCorners.F
            }
          }
        }),
        JournalFooterNav = styled('ol', {
          padding:0,
        }),
        JournalFooterPrev = styled('li',{
          cursor: 'pointer',
          fontFamily: 'Playfair Display, sans-serif',
          fontSize: '1.5em',
          fontWeight: 700,
          letterSpacing: '0.125em',
          lineHeight:'1.25',
          listStyle:'none',
          margin:0,
          textAlign:'left',
        }),
        JournalFooterNext = withStyle(JournalFooterPrev, { textAlign:'right' })

const clonedPosts = writersBlockStore.Blockstack.userFiles.postsMap ? [...Object.keys(writersBlockStore.Blockstack.userFiles.postsMap)] : [],
      footerNavData = clonedPosts.sort().filter((itm, indx, arr) => arr.indexOf(itm) === indx)
let [footerPointer, setFooterPointer] = useState(footerNavData.length-1)
useEffect(()=>
{
  if(journalStore.currentDayFileExists)
  {
    footerNavData.forEach((itm,indx) => 
    { if(journalStore.currentDayFileExists.noExt() === itm){ setFooterPointer(indx); } })
  }
},[footerNavData, footerPointer, journalStore.currentDayFileExists])

  const navigateContent = (i) =>
  {
    footerPointer += i
    
    const entryFile = footerNavData[footerPointer]+'.json',
          kind = writersBlockStore.Blockstack.userFiles.postsMap[entryFile.noExt()].kind,
          block = { userSession:writersBlockStore.Blockstack.userSession, dispatch:writersBlockDispatch },
          journal = {dispatch:journalDispatch, currentDayFileExists:entryFile, kind}

    navigateJournalContent(block, journal, entryFile)
  }

  return (<>
    <JournalFooter>
      <JournalFooterNav>
        {footerPointer > 0 && <JournalFooterPrev onClick={() => navigateContent(-1)}>↤</JournalFooterPrev>}
        {footerPointer < footerNavData.len && <JournalFooterNext onClick={() => navigateContent(1)}>↦</JournalFooterNext>}
      </JournalFooterNav>
    </JournalFooter>
    {
      // true && <UserSettingsBase /> || //auto-open for dev
      writersBlockStore
      && writersBlockStore.Landing
      && writersBlockStore.Landing.settingsOpen &&
      <UserSettingsBase/>
    }
    </>
  )
}
Footer.displayName = 'JournalFooter'

export default Footer