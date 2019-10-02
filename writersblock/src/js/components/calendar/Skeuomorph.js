import type {SkeuomorphPropsType} from '../../../flow/components/CalendarType'

import React from 'react'
import { styled } from 'styletron-react'

import {MediaQuery} from '../../context/constants/app/common'

const Skeuomorph = (props:SkeuomorphPropsType) =>
{
  const {active, date, description, title} = props
  const CalendarSkeuomorph = styled('dl', {
          borderColor: '#ccc',
          borderStyle: 'solid',
          borderBottomWidth: '0.0625em',
          borderLeftWidth: '0',
          borderRightWidth: '0',
          borderTopWidth: '0.0625em',
          breakInside: 'avoid-column',
          display:(active)?'block':'none',
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

  return (
    <CalendarSkeuomorph>
      <dt><strong>{title.replace(/\s/g,'•')}</strong></dt>
      <CalendarDescription>
        <em>{date}</em><br/>
        {description}
      </CalendarDescription>
    </CalendarSkeuomorph>
  )
}
Skeuomorph.displayName = 'CalendarSkeuomorph'

export default Skeuomorph