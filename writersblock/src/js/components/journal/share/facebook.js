import React from 'react'
import { styled } from 'styletron-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const FaceBook = (props) =>
{
  const Fb = styled('li', {...props.comstyle}),
        fbText='I just finished writing in my decentralized daily journal. Read it here:',
        fbLink=`http://www.facebook.com/sharer.php?u=${props.deeplink}&t=${fbText}`,
        fbDataHref=`http://writersblock.downquark.work/${props.deeplink}`,
        fbSharer=`https://www.facebook.com/sharer/sharer.php?u=${props.deeplink}&amp;src=sdkpreparse`
          //50365371121 - Switch when app is populated
  const dialogLink= `http://www.facebook.com/dialog/feed?  
        app_id=50365371121&  
        link=${props.deeplink}&
        name=Writers%20Block&  
        caption=Daily%20Journal& 
        description=${fbText}&
        message=${fbText}&
        redirect_uri=${props.deeplink}`

  const handleFaceBookClick = () => {
    FB.ui({
      method: 'share',
      display:'popup',
      hashtag:'#writersBlock',
      quote:fbText,
      href:props.deeplink,
      redirect_uri:props.deeplink
    }, function(response){ console.log('response',response) });
  }

  return (
    <Fb>
      <FontAwesomeIcon onMouseOver={e=>props.toolTipFn('Facebook')} onClick={handleFaceBookClick} icon={['fab', 'facebook']}/>
    </Fb>
  )
}
FaceBook.displayName = 'FaceBook'

export default FaceBook