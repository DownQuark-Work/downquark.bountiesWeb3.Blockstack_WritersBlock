import React,{Fragment} from 'react'
import { styled } from 'styletron-react'

import LinedPaper from './LinedPaper'

import {WrapperAnimated,WrapperScrollable} from '../../components/common'

type Props = {
  children: Array<React$Element<any>>
  }
const Base = (props:Props) =>
{
  const LinedPaperBase = styled('div', {
          backgroundImage: 'linear-gradient(to bottom, #99CFE0 1px, #f8f8f8 1px); ',
          backgroundSize: '20px 30px',
          boxShadow: '0px 10px 10px #000',
          margin: '1rem auto',
          minHeight:'100%',
          paddingBottom:'20px',
          width: '100%',
        }),
        wrapperAnimatedProps = {
          animOptions:{
            delay:'3s',
            duration:'3s',
            iterationCount:1,
          },
          animFrom:{opacity:0},
          animTo:{opacity:1},
          styleBase:{
            backgroundColor:'#090909',
            height:'100%',
            left:0,
            position:'fixed',
            top:0,
            width:'100%',
          }
        },
        wrapperScrollStyles = {
          height: '90%',
          paddingBottom: '0',
          paddingLeft:'5%',
          paddingRight:'5%',
          paddingTop: '0',
          position: 'absolute',
          transform: 'rotate(-3deg)',
          width: '60%',
        }


  return (
    <WrapperAnimated {...wrapperAnimatedProps}>
      <WrapperScrollable direction='y' styles={wrapperScrollStyles}>
        <LinedPaperBase>
          <LinedPaper>
            {props.children}
          </LinedPaper>
        </LinedPaperBase>
      </WrapperScrollable>
    </WrapperAnimated>
  )
}
Base.displayName = 'LinedPaperBase'

export default Base