import React, {useState} from 'react'
import { styled } from 'styletron-react'
import Fb from './facebook'
import Twit from './twitter'
import Two from './twohundred'

import InlineLoader from '../../loading/inline'
import { createDeepLink } from '../../../utils/context'

const ShareEntry = (props) =>
{
  const [socialLink, setSocialLink] = useState(''),
        Shareables = styled('ul', (props) => ({
          listStyleType:'none',
          marginRight: '-3rem', // half of width
          opacity:props.$active ? '1' : '.2',
          padding:0,
          pointerEvents:props.$active ? 'auto' : 'none',
          position:'absolute',
          right: '25%',
          textAlign:'center',
          top: '-30px',
          width:'6rem', // max li width * amt of icons,
        })),
        ShareableToolTip = styled('p', {
          border:'1px solid',
          bottom:'15px',
          color:'rgba(105,105,105,.6)',
          left: '-1rem',
          pointerEvents:'none',
          position:'absolute',
          textAlign:'center',
          visibility:socialLink ? 'visible' : 'hidden',
          width: '8rem',
        }),
        commonLiStyles = {
          color:'dimgray',
          cursor:'pointer',
          display:'inline-block',
          fontSize:'1.5rem',
          height:'1.5rem',
          marginBottom:'.25rem',
          marginLeft:'.25rem',
          marginRight:'.25rem',
          marginTop:'.25rem',
          padding:0,
          width:'1.5rem',
          ':hover':{color:'#222'}
        },
        inlineLoaderCSS = {
          fontSize:'40px',
          position:'relative',
          right:'calc(25% - 20px)',
          top:'-20px',
          zIndex: 10,
        }

  const deepLinkUrl = 'http://writersblock.downquark.work/entry/'+createDeepLink(props.fileInfo.url),
        hideShareableToolTip = () => {setSocialLink(null)},
        showShareableToolTip = (e) => {setSocialLink(e)}



  return (<div style={{position:'relative',textAlign:'right'}}>
            {props.integrationLoading && <InlineLoader css={inlineLoaderCSS} />}
            
            <Shareables $active={!props.integrationLoading} onMouseLeave={hideShareableToolTip}>
              <ShareableToolTip>{socialLink}</ShareableToolTip>
              <Fb toolTipFn={showShareableToolTip} comstyle={commonLiStyles} deeplink={deepLinkUrl} />
              {props.apisAvailable && props.apisAvailable.hasOwnProperty('TWO_HUNDRED_WAD')
                  && !!props.apisAvailable['TWO_HUNDRED_WAD'].length
                    && <Two
                      toolTipFn={showShareableToolTip}
                      comstyle={commonLiStyles}
                      deeplink={deepLinkUrl}
                      apiInfo={props.apisAvailable['TWO_HUNDRED_WAD']}
                      fileInfo={props.fileInfo}
                      integrationInfo={props.integrationInfo}
                    />}
              <Twit toolTipFn={showShareableToolTip} comstyle={commonLiStyles} deeplink={deepLinkUrl} />
            </Shareables>
          </div>
  )
}
ShareEntry.displayName = 'ShareEntry'

export default ShareEntry