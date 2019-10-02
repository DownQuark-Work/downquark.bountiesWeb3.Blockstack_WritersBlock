import React from 'react'
import { styled,withStyle } from 'styletron-react'

import { TabletPlusCorners } from  '../../context/constants/app/journal'
import { MediaQuery } from  '../../context/constants/app/common'

const Footer = () =>
{
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

  return (
    <JournalFooter>
      <JournalFooterNav>
        <JournalFooterPrev>↤</JournalFooterPrev>
        <JournalFooterNext>↦</JournalFooterNext>
      </JournalFooterNav>
    </JournalFooter>
  )
}
Footer.displayName = 'JournalFooter'

export default Footer