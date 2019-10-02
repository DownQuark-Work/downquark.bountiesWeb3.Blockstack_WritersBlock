import type {WeekRowsPropsType} from '../../../../flow/components/CalendarType'

import React from 'react'
import { styled } from 'styletron-react'

import ColumnDay from './ColumnDay'
import Week from './Week'

const WeekRows = (props:WeekRowsPropsType) =>
{
  const CalendarDecoratorWeekRows = styled('section', {
      backgroundColor:'rgba(248,236,194,.6)',
      display: 'flex',
      flex: '1 1 0',
      flexFlow: 'column wrap'
  })

  const fullCalendarDates = new Date().getFullCalendarDates(props.activeDate),
        totalWeeks = fullCalendarDates.numbered.length / 7,
        fullContentSpan = new Date().getEpochRange()
  
  let Weeks = []
  for(let i=0; i<totalWeeks; i++)
  {
    const dates = fullCalendarDates.numbered.splice(0,7),
          epochs = fullCalendarDates.epoch.splice(0,7),
          rowContent = props.content.filter(itm => itm.date >= epochs[0] && itm.date <= epochs[6]+Math.msInDay())
    Weeks.push(<Week key={btoa(i+'')} weekPosition={i} dates={dates} epochs={epochs} content={rowContent} />)
  }

  return (
    <CalendarDecoratorWeekRows>
      {Weeks}
    </CalendarDecoratorWeekRows>
  )
}
WeekRows.displayName = 'CalendarDecoratorWeekRows'

export default WeekRows
