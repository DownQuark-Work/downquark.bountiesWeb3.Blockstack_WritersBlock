import type {SkeuomorphPropsType} from '../../../flow/components/CalendarType'

import React, {useContext, useEffect, useState} from 'react'
import { styled } from 'styletron-react'

import {JournalContext} from '../journal/context'

import {MediaQuery} from '../../context/constants/app/common'

const Skeuomorph = () =>
{
  const CalendarSkeuomorph = styled('dl', {
          borderColor: '#ccc',
          borderStyle: 'solid',
          borderBottomWidth: '0.0625em',
          borderLeftWidth: '0',
          borderRightWidth: '0',
          borderTopWidth: '0.0625em',
          breakInside: 'avoid-column',
          marginBottom: '1em',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: '1em',
          paddingBottom: '1em',
          paddingRight: '0',
          paddingLeft: '0',
          paddingTop: '1em'
        }),
        CalendarDescription = styled('dd', {
          marginInlineStart:'1em',
        [MediaQuery.TABLET_PLUS]:{ marginInlineStart:'2.25em' }
        })

  const {journalStore, journalDispatch} = useContext(JournalContext)
  let [skeuContent, setSkeuContent] = useState({
    title:'Daily Entry Information',
    date: new Date().SKEUMORPH.formatDate(),
    description:'This will update to show you a few brief statistics of your current writing page.'
                  + ' Click anywhere on the text below or to the right, put down your own words, and give it a shot!'
  })
  useEffect(()=>
  {
    if(journalStore.currentDayFileExists)
    {
      const totWords = journalStore.original.content.replace(/<\/?[\w\s-+"=]*>/g,'').split(' '),
            totLetts = totWords.join('').length
      setSkeuContent({
        title:`${journalStore.original.title}`,
        date: `${new Date(parseInt(journalStore.meta.created,10)).SKEUMORPH.formatDate()}`,
        description:`This entry, which was edited ${journalStore.meta.totalupdates || 0} times has a total of ${totWords.length} words consisting of ${totLetts} letters.`,
      })
    }
  },[journalStore])

  return (
    <CalendarSkeuomorph data-totalheight>
      <dt><strong>{skeuContent.title.replace(/\s/g,'•')}</strong></dt>
      <CalendarDescription>
        <em>{skeuContent.date}</em><br/>
        {skeuContent.description}
      </CalendarDescription>
    </CalendarSkeuomorph>
  )
}
Skeuomorph.displayName = 'CalendarSkeuomorph'

export default Skeuomorph