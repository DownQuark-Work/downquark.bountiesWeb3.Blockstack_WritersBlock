import type {CellPropsType} from '../../../../flow/components/CalendarType'

import React from 'react'
import { styled } from 'styletron-react'

import {activeBorder,dynamicBorder,dynamicBorderHover} from '../../../utils/ui'

const Cell = (props:CellPropsType) =>
{
  const corner1 = (Math.random()*10)+220,
        corner2 = (Math.random()*10)+10,
        currentDayBorder = !props.active ? {} : (props.date !== new Date().getDate()) ? {} : activeBorder,
        inactiveBorder = dynamicBorder(),
        inactive = (props.active) ? {} : {
          backgroundColor:'rgba(151, 1, 1,.1)',
          cursor:'default',
          ':hover':{
            backgroundColor:'rgba(151, 1, 1,.1)'
          }
        }

  const CalendarCell = styled('div', {
    ...inactiveBorder,
    backgroundColor:'rgba(248,236,194,.6)',
    cursor:'pointer',
    display: 'flex',
    flexFlow: 'column wrap',
    justifyContent: 'space-between',
    width: '100%',
    padding: '1.9rem 0.2rem 0.2rem',
    position: 'relative',
    ':hover':!props.active ? {} : (props.date === new Date().getDate()) ? {} : dynamicBorderHover,
    ...inactive,
    ...currentDayBorder
  })

  const CalendarTask = styled('sup', {
    color: 'rgb(204, 0, 0)',
    fontFamily: '"Rock Salt", cursive',
    left:'10%',
    letterSpacing: '-5px',
    lineHeight:'6px',
    position: 'absolute',
    top:'10%',
    width:'85%'
  })

  const handleCellSelect = (epoch,task) =>
  {
    console.log('selecting',epoch,task)
    // show or create based on if content is there
  }

  let taskContent = ''
  const taskContentLines = Math.min(5,Math.random()*10)
  for(let i=0; i<taskContentLines; i++)
  {
    const taskContentLineChars = Math.min(5,Math.random()*10)
    for(let j=0; j<taskContentLineChars; j++)
    { taskContent += '~' }
    taskContent += ' '
  }
  return  <CalendarCell onClick={() => handleCellSelect(props.epoch,props.task)}>
            {props.task && <CalendarTask>{taskContent}</CalendarTask>}
            {props.date}
          </CalendarCell>
}
Cell.displayName = 'CalendarDecoratorCell'

export default Cell