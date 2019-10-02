import type {JournalPageLeftPropsType} from '../../../flow/components/JournalTypes'

import React, {Fragment} from 'react'
import { styled } from 'styletron-react'
import { USE_GAIA } from '../../utils/blockstack'
import routes from '../../context/constants/app/routes.json'

import CalendarBase from '../calendar/Base'
import JournalTitle from './decorators/Title'

const PageLeft = (props:JournalPageLeftPropsType) =>
{
  const JournalPageLeft = styled('div', {})

  return (
    <>
      <JournalTitle title={props.title} />
      {!props.wysiwygDisplayed && USE_GAIA && <CalendarBase />}
    </>
  )
}
PageLeft.displayName = 'JournalPageLeft'

export default PageLeft