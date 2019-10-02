import type {PostItPropsType} from '../../../flow/components/CalendarType'

import React, {Fragment} from 'react'
import { styled } from 'styletron-react'

const Note = (props:PostItPropsType) =>
{
  const postItWidth = '250px',
        PostItNote = styled('p', {
          backgroundColor: '#F4F39E',
          boxShadow: '0px 1px 3px rgba(0,0,0,0.25)',
          color:'#47576B',
          fontFamily:"Gloria Hallelujah",
          fontSize: '1em',
          margin: '1.5em auto',
          padding: '1.5em 1em',
          position: 'absolute',
          textAlign: 'left',
          width: postItWidth,
          ':after': {
            display: 'block',
            content: '""',
            position: 'absolute;',
            width: '110px',
            height: '30px',
            top: '-21px',
            left: '30%;   ',
            border: '1px solid #fff',
            background: 'rgba(254, 254, 254, .6)',
            boxShadow: '0px 0 3px rgba(0,0,0,0.1)',
          }
        }),
        PostItDate = styled('em', {
          display:'block',
          float:'right'
        }),
        PostItTitle = styled('strong', {
          color: '#cc0000',
          clear:'both',
          display:'block',
          fontSize:'1.2rem',
          paddingBottom:'.25rem',
          paddingTop:'.4rem',
          textAlign:'center',
          textTransform:'capitalize'
        }),
        PostItSeparator = styled('span', {
          display:'block',
          fontSize:'.75rem',
          letterSpacing:'-2px'
        })
  const postItPosition = (indx,active) =>
  {
    console.log('active',active)
    const w = parseInt(postItWidth.replace('px','')),
          posNeg = Math.random() > .5 ? 1 : -1
    return {
      opacity: active ? 1 : .2,
      top:Math.random()*indx*(w)+Math.random()*10,
      left:Math.random()*indx*(w)+Math.random()*10,
      transform: `rotate(${Math.random()*4*posNeg}deg)`,
    }
  }
  const postItNotes = props.content.map((itm,indx) =>
  {
    return (
    <PostItNote key={itm.id} style={postItPosition(indx,itm.active)}>
      <PostItDate>{new Date().getTitleFormattedDate(itm.date)}</PostItDate>
      <PostItTitle>{itm.title}</PostItTitle>
      {itm.description && <PostItSeparator>~~~~~~~~~~~~~~</PostItSeparator>}
      {itm.description}
    </PostItNote>
    )
  })

  return <>{postItNotes}</>
}
Note.displayName = 'PostItNote'

export default Note