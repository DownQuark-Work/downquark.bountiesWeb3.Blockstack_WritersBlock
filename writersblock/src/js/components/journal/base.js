import type {JournalBasePropsType} from '../../../flow/components/JournalTypes'

import React from 'react'
import { styled } from 'styletron-react'
import { USE_GAIA } from '../../utils/blockstack'

import {MediaQuery} from '../../context/constants/app/common'

import JournalArticle from './Article'
import JournalFooter from './Footer'
import JournalHeader from './Header'

const Base = (props:JournalBasePropsType) =>
{
  const {classMaps} = props,
        minHt = USE_GAIA ? 'calc(100vh - 4em)' : 'unset'

  const JournalBase = styled('section', {
          background: "#fff",
          boxShadow: "rgba(0,0,0,0.5) 0 1em 3em",
          color: "#000",
          minHeight: minHt,
          padding: "2em",
        [MediaQuery.TABLET_PLUS]: {
          margin:'1em',
          position:'relative',
          ':after':{
            background: 'linear-gradient(to right, transparent 0%,rgba(0,0,0,0.2) 46%,rgba(0,0,0,0.5) 49%,rgba(0,0,0,0.6) 50%,rgba(0,0,0,0.5) 51%,rgba(0,0,0,0.2) 52%,transparent 100%)',
            bottom: '-1em',
            content: '""',
            display: props.wysiwygDisplayed ? 'none' : 'block',
            left: '50%',
            position: 'absolute',
            top: '-1em',
            transform: 'translate(-50%,0)',
            transition: '.3s',
            width: '4em',
            zIndex: '1',
          },
          ':before':{
            backgroundColor: '#8B4513',
            borderRadius: '0.25em',
            bottom: '-1em',
            content: '""',
            left: '-1em',
            position: 'absolute',
            right: '-1em',
            top: '-1em',
            zIndex: '-1',
          }
          }
        })

  return (
    <JournalBase>
      <JournalHeader />
      <JournalArticle {...props} />
      {USE_GAIA && <JournalFooter />}
    </JournalBase>
  )
}
Base.displayName = 'JournalBase'

export default Base