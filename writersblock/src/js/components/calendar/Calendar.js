import type {FetchCalendarContentCallbackDataType} from '../../../flow/context/ActionsType'

import React, {useContext, useEffect, useState} from 'react'
import {styled} from 'styletron-react'

import { WritersBlockContext } from '../../base/Root'

import {api, MediaQuery} from '../../context/constants/app/common'

import Loading from '../loading'
import DayColumns from './decorators/DayColumns'
import WeekRows from './decorators/WeekRows'
import CalendarContentMock from '../../../mocks/calendar'

const Calendar = () =>
{
  const { writersBlockStore, writersBlockDispatch } = useContext(WritersBlockContext),
        [calendarContent, setCalendarContent] = useState({content:[], loading:true})
  
  useEffect(() =>
  {
    if (writersBlockStore.Blockstack.userFiles.postsLoaded && writersBlockStore.Journal.calendar.activeMonth)
    {
      const curMonthRegEx = new RegExp(`${new Date(writersBlockStore.Journal.calendar.activeMonth).getFullYear()}${new Date(writersBlockStore.Journal.calendar.activeMonth).getMonth()+1}\\d{2}$`)
      let   monthlyDates = writersBlockStore.Blockstack.userFiles.postsMap ? [...Object.keys(writersBlockStore.Blockstack.userFiles.postsMap)] : []
            monthlyDates = monthlyDates.filter(itm => itm.match(curMonthRegEx))
            monthlyDates = monthlyDates.map(itm => itm.noExt().getDateFromFileName())
            monthlyDates = [...new Set(monthlyDates)].sort()
      setCalendarContent({content:monthlyDates,loading:false})
    }
  },[writersBlockStore])
  
  const loadingOpts = {
    backgroundRGBA: 'rgba(255,255,255,.7)',
    charAmtRange:[1,8],
    color:'rgba(139, 69, 19, 1)',
    lineAmtRange:[1,5],
    pos:'TL',
    padding:'50px 0 0 30px'
  }

  const CalendarWrapper = styled('section', {
          display:'none',
          position:'relative',
        [MediaQuery.TABLET_PLUS]:{
          alignItems: 'stretch',
          background: 'transparent',
          display: 'flex',
          flexFlow: 'column wrap',
          float: 'none',
          fontSize: '.75rem',
          height: '100%',
          padding: '0.8rem 0 1rem 1rem',
          textRendering: 'optimizeLegibility',
          webkitFontSmoothing: 'antialiased',
          width: '100%'
          }
  })

  return (
    <CalendarWrapper data-totalheight>
      { calendarContent.loading && <Loading {...loadingOpts} /> }
      <DayColumns />
      <WeekRows activeDate={new Date()} content={calendarContent.content} />
    </CalendarWrapper>
  )
}
Calendar.displayName = 'CalendarWrapper'

export default Calendar