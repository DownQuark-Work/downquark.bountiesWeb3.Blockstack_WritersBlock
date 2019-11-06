import React,{Fragment} from 'react'
import { styled } from 'styletron-react'

import Calendar from './Calendar'
import CalendarSkeuomorph from './Skeuomorph'

const Base = () =>
{
  const CalendarBase = styled('div', {})

  return (
    <>
      <Calendar />
      <CalendarSkeuomorph />
    </>
  )
}
Base.displayName = 'CalendarBase'

export default Base