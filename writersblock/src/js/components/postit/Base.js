import React,{Fragment} from 'react'
import { styled } from 'styletron-react'

import PostIt from './PostIt'

import {WrapperAnimated} from '../../components/common'

const Base = () =>
{
  const PostItBase = styled('div', {
    display: 'table',
    marginBottom: '1rem',  
    marginLeft: '1rem',  
    marginRight: '1rem',  
    marginTop: '1rem'
  })

  const tempPostItContent = [
          {
            id: "5ba087d8fc13ae47f000007d",
            active:true,
            created_on: new Date('2019-06-23 02:22:16'),
            date: 1561968745000,
            title: "orci mauris lacinia sapien quis",
            description: "Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam. Nam tristique tortor eu pede.",
            created_by: "5ba087d8fc13ae47f000003d"
          },
          {
            id: "5ba087d8fc13ae47f000007d",
            active:false,
            created_on: new Date('2019-06-23 02:22:16'),
            date: 1561969945000,
            title: "orci mauris lacinia sapien quis",
            description: "Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam. Nam tristique tortor eu pede.",
            created_by: "5ba087d8fc13ae47f000003d"
          }
        ],
        wrapperAnimatedProps = {
            animOptions:{
              duration:'1s',
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
              zIndex:100
            }
          }

  return (
    <WrapperAnimated {...wrapperAnimatedProps}>
      <PostItBase>
        <PostIt content={tempPostItContent} />
      </PostItBase>
    </WrapperAnimated>
  )
}
Base.displayName = 'PostItBase'

export default Base