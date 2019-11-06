import type {CellPropsType} from '../../../../flow/components/CalendarType'

import React, {useContext} from 'react'
import { styled,withStyle } from 'styletron-react'

import {WritersBlockContext} from '../../../base/Root'
import {JournalContext} from '../../journal/context'
import {navigateJournalContent} from '../../journal/context/actions'

import {activeBorder,dynamicBorder,dynamicBorderHover} from '../../../utils/ui'

const Cell = (props:CellPropsType) =>
{
  const {writersBlockStore, writersBlockDispatch} = useContext(WritersBlockContext)
  const {journalStore, journalDispatch} = useContext(JournalContext)

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
  }),
    CalendarTaskSelectedCell = withStyle(CalendarCell,{
      boxShadow: 'inset 47px -31px 111px -37px rgba(133,129,58,1)'
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

  const handleCellSelect = (epoch,selected) =>
  {
    //leave selected as array for future support of calendar events
    if(selected)
    {
      const entryFile = new Date(selected[0]).CONTENT_FILE.formatDate()+'.json',
            kind = writersBlockStore.Blockstack.userFiles.postsMap[entryFile.noExt()].kind,
            block = { userSession:writersBlockStore.Blockstack.userSession, dispatch:writersBlockDispatch },
            journal = {dispatch:journalDispatch, currentDayFileExists:entryFile, kind}

    navigateJournalContent(block, journal, entryFile)
    }
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
  
  const hasValidActiveDateKey = (s:string):boolean => s && s.noExt() !== journalStore.fileName.current

  const activeCalendarDate = hasValidActiveDateKey(writersBlockStore.Journal.shallowlink)
          ? writersBlockStore.Journal.shallowlink.noExt().substr(-2)
          : hasValidActiveDateKey(journalStore.currentDayFileExists)
            ? journalStore.currentDayFileExists.noExt().substr(-2)
            : 'NO_MATCH'

  return (activeCalendarDate === String(props.date).padStart(2,'0'))
          ? (<CalendarTaskSelectedCell onClick={() => {/* SELCTED may need to re-integrate when calendar tasks are live > handleCellSelect(props.epoch,props.task)*/}}>
                {props.task && <CalendarTask>{taskContent}</CalendarTask>}
                {props.date}
              </CalendarTaskSelectedCell>)
          : (<CalendarCell onClick={() => handleCellSelect(props.epoch,props.task)}>
                {props.task && <CalendarTask>{taskContent}</CalendarTask>}
                {props.date}
              </CalendarCell>)
}
Cell.displayName = 'CalendarDecoratorCell'

export default Cell