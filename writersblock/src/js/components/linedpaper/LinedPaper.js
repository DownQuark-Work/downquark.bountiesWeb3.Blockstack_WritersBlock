import React,  {useState} from 'react'
import { styled } from 'styletron-react'

type Props = {
  children: Array<React$Element<any>>
}
const Content = (props:Props) =>
{
  const [notes, setNotes] = useState(props.children)
  const handleBlur = (e) =>
  {
    console.log('====================================');
    console.log('Handling Blur');
    console.log('e',e)
    console.log('====================================');
  }
  const getNotesParagraphs = () =>
  {
    return notes.map((itm,indx) => <LinedPaperParagraph key={btoa(itm.props.children)}>{itm.props.children}</LinedPaperParagraph>)
  }

  const LinedPaperContent = styled('div', {
          color:'#000F55',
          fontFamily:"Gloria Hallelujah",
          fontSize: '1.75rem',
          paddingBottom: '0',
          paddingLeft:'5%',
          paddingRight:'5%',
          paddingTop: '0',
          position:'absolute',
          textAlign: 'center',
          top: '6px',
          width: '100%',
        }),
        LinedPaperParagraph = styled('p', {
          fontSize: '1.5rem', //24px
          marginBottom: '30px 0',
          marginLeft: '0',
          marginRight: '0',
          marginTop: '30px',
          textAlign: 'left',
        })

  const linedParagraphs = getNotesParagraphs()

  return (
    <LinedPaperContent contentEditable onBlur={handleBlur} suppressContentEditableWarning>
      {linedParagraphs}
    </LinedPaperContent>
  )
}
Content.displayName = 'LinedPaperContent'

export default Content