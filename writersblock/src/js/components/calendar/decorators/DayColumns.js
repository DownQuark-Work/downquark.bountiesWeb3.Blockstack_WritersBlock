import React from 'react'
import { styled } from 'styletron-react'

import ColumnDay from './ColumnDay'

const DayColumns = () =>
{
  const CalendarDecoratorDayColumns = styled('section', {
      display: 'flex',
      flex: '32px 0 0',
      width:'100%'
  })
  
  const DaysOfWeek = new Date().getDaysOfWeek().map(itm => {
    return <ColumnDay key={btoa(itm)} day={itm} />
  })

  return (
    <CalendarDecoratorDayColumns>
      {DaysOfWeek}
    </CalendarDecoratorDayColumns>
  )
}
DayColumns.displayName = 'CalendarDecoratorDayColumns'

export default DayColumns