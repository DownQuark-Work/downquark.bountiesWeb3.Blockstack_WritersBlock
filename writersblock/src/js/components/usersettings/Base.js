import React,{Fragment} from 'react'
import { styled } from 'styletron-react'

import UserSettingsContent from './Settings'

import {WrapperAnimated,WrapperScrollable} from '../../components/common'

type Props = {
  children: Array<React$Element<any>>
  }
const Base = (props:Props) =>
{
  const UserSettingsBase = styled('div', {
          backgroundImage: 'linear-gradient(to right, rgba(153,207,224,.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(153,207,224,.2) 1px, rgba(248,248,248,.2) 1px)',
          backgroundSize: '20px 20px',
          boxShadow: '0px 10px 10px #000',
          margin: '0 auto',
          height:'300px',
          overflow:'scroll',
          // paddingBottom:'20px',
          width: '100%'
        }),
        wrapperAnimatedProps = {
          animOptions:{
            delay:'1s',
            duration:'.5s',
            iterationCount:1
          },
          animFrom: {right:'-300px',top:'-350px'},
          animTo:{right:'-30px',top:'-30px'},
          styleBase:{
            backgroundColor:'#e5e5e5',
            height:'300px',
            position:'absolute',
            width:'600px',
            zIndex:2
          }
        }


  return (
    <WrapperAnimated {...wrapperAnimatedProps}>
        <UserSettingsBase>
          <UserSettingsContent />
        </UserSettingsBase>
    </WrapperAnimated>
  )
}
Base.displayName = 'UserSettingsBase'

export default Base