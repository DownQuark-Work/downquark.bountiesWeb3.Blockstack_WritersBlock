import React,{Fragment} from 'react'
import { styled } from 'styletron-react'

import Calendar from './Calendar'
import CalendarSkeuomorph from './Skeuomorph'

const Base = () =>
{
  const CalendarBase = styled('div', {})
//make calendar context from journal base?
  const tmpMorphs = [
    {date:'2019-09-29', description:'This entry, which was edited 3 times has a total of 104 words consisting of 2,365 letters.', title:'Daily Entry Information'},
    {date:'1996-06-23', description:'Nintendo 64 goes on sale in Japan - if there is a calendar entry for today\'s date it will show up here', title:'Today In History'},
    {date:'1991-06-23', description:'"Weird Al" Yankovic records "Babalu Music"',title:'Today In History'}
    ]
  const skeuomorphs = tmpMorphs.map((itm,indx) => <CalendarSkeuomorph key={btoa(itm.date)} active={indx===0} date={itm.date} description={itm.description} title={itm.title} />)

  return (
    <>
      <Calendar />
      {skeuomorphs}
    </>
  )
}
Base.displayName = 'CalendarBase'

export default Base