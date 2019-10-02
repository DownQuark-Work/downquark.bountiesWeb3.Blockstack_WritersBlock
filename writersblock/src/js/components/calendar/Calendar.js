import type {FetchCalendarContentCallbackDataType} from '../../../flow/context/ActionsType'

import React, {useEffect, useState} from 'react'
import {styled} from 'styletron-react'

import {api, MediaQuery} from '../../context/constants/app/common'
import {ActionFetch} from '../../context/actions'

import Loading from '../loading'
import DayColumns from './decorators/DayColumns'
import WeekRows from './decorators/WeekRows'
import CalendarContentMock from '../../../mocks/calendar'

const Calendar = () =>
{
  const calendarUrl = `${api.url.BASE}${api.url.CALENDAR}`,
        [calendarContent, setCalendarContent] = useState({content:[], loading:true})

  // TODO: UPDATE - replace with BlockStack
    //And real query if needed
  const receiveFetchedData = <FetchCalendarContentCallbackDataType>(o:FetchCalendarContentCallbackDataType) =>
  { setCalendarContent({...o}) }
  useEffect(() =>
  {
    ActionFetch({
      callback:receiveFetchedData,
      extended:{loading: false},
      mock:CalendarContentMock,
      url:calendarUrl,
    })
  }, [calendarUrl])
  //I think turning off the calendar and re-working the 
  //skeuomorph to include more options is the way to go
  //for mobile
  const [activeMonth, setActiveMonth] = useState(new Date().getMonth())
  const [activeYear, setActiveYear] = useState(new Date().getYear())

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
    <CalendarWrapper>
      { calendarContent.loading && <Loading {...loadingOpts} /> }
      <DayColumns />
      <WeekRows activeDate={new Date()} content={calendarContent.content} />
    </CalendarWrapper>
  )
}
Calendar.displayName = 'CalendarWrapper'

export default Calendar