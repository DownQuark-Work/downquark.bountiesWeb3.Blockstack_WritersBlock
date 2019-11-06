import React from 'react'
import { styled } from 'styletron-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Twitter = (props) =>
{
  const Twit = styled('li', {...props.comstyle}),
        TwitHref = styled('a',{color:'dimgray',':hover':{color:'#222'}}),
        twitterText='I%20just%20finished%20writing%20in%20my%20decentralized%20daily%20journal.%20Read%20it%20here:'

  const dL = `https://twitter.com/intent/tweet?text=${twitterText}%20${props.deeplink}`

  return (
      <Twit onMouseOver={e=>props.toolTipFn('Twitter')}>
        <TwitHref id="twitter-tweet" className="twitter-share-button" href={dL}
              data-size="large"><FontAwesomeIcon icon={['fab', 'twitter']}/></TwitHref>
      </Twit>
  )
}
Twitter.displayName = 'Twitter'

export default Twitter