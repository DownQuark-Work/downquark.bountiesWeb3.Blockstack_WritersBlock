import React from 'react'
import { styled } from 'styletron-react'

type Props = {day:string}
const Day = () =>
{
  const CalendarDay = styled('span', {
      display: 'flex',
      flex: '1 1 0'
  })

  return <CalendarDay>IS THIS HERER?</CalendarDay>
}
Day.displayName = 'CalendarDecoratorDay'

export default Day