import type {WeekPropsType} from '../../../../flow/components/CalendarType'

import React from 'react'
import { styled } from 'styletron-react'

import Cell from './Cell'

const Week = (props:WeekPropsType) =>
{
  const CalendarWeek = styled('section', {
      display: 'flex',
      flex: '1 1 0'
  })
  let dateContent = {},
      isActive = (props.weekPosition === 0) ? false : true;
  props.epochs.forEach((itm,indx) =>
  {
    const dailyContent = props.content.filter(item => item.date >= itm && item.date < itm+Math.msInDay())
    dateContent[indx] = dailyContent.length ? dailyContent : null
  })
  
  const weeks = props.dates.map((itm,indx) =>
  {
    if(parseInt(itm) === 1){isActive = !isActive}
    const task = dateContent[indx]
    return <Cell
              key={itm}
              id={itm}
              active={isActive}
              date={itm}
              epoch={props.epochs[indx]}
              task={task}/>
  })

  return  <CalendarWeek>{weeks}</CalendarWeek>
}
Week.displayName = 'CalendarDecoratorWeek'

export default Week