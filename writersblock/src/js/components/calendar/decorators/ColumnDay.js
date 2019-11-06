import type {ColumnDayPropsType} from '../../../../flow/components/CalendarType'

import React from 'react'
import { styled } from 'styletron-react'

const ColumnDay = (props:ColumnDayPropsType) =>
{
  const CalendarDecoratorColumnDay = styled('span', {
      fontSize: '1rem',
      fontWeight: '100',
      padding: '0 5px',
      width: '100%',
  })

  return <CalendarDecoratorColumnDay>{props.day}</CalendarDecoratorColumnDay>
}
ColumnDay.displayName = 'CalendarDecoratorColumnDay'

export default ColumnDay