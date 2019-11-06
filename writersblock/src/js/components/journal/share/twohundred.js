import React, {useContext} from 'react'
import { styled, withStyle } from 'styletron-react'
import {DataUri} from '../../../context/constants/app/journal'

import { WritersBlockContext } from '../../../base/Root'
import {ActionApi} from '../../../context/actions'
import {API_TWO_HUNDRED_WAD} from '../../../context/constants/app/integrations'
import {INTEGRATIONS} from '../../../utils/blockstack'
import * as IntegrationConstants from '../../../context/constants/store/integration'

const TwoHundred = (props) =>
{
  const TwoHLi = styled('li',{
          ...props.comstyle,
          marginBottom:'-3px',
          position:'relative',
          ':hover':{transform: 'rotate(45deg)'}
        }),
        TwoH = styled('div', {
          backgroundImage: `url(${DataUri.TWOHUNDRED_WAD[0]})`,
          backgroundPosition: 'center',
          backgroundSize:'contain',
          backgroundRepeat: 'no-repeat',
          backgroundSize:'100%',
          height: props.comstyle.height,
          width: props.comstyle.width,
        }),
        TwoHSub = withStyle(TwoH, {
          position:'absolute',
          top:0,
          visibility:'hidden',
          ':hover':{visibility:'visible'}
        })
  
  const {writersBlockStore, writersBlockDispatch} = useContext(WritersBlockContext),
  submitEntry = () =>
  {
    // console.log('SUBMITTING props.apiInfo',props.apiInfo)
    // console.log('Using API_TWO_HUNDRED_WAD:',API_TWO_HUNDRED_WAD)
    // console.log('Filling this out if successful INTEGRATIONS',INTEGRATIONS)
    // console.log('Place it all on a (maybe new key "integrations") when done:',props.integrationInfo)
    // console.log('props',props)
    
    const handleApiResponse = (obj) =>
    {
      console.log('handleApiResponse: CALLBACK Obj',obj)
      writersBlockDispatch(({type:IntegrationConstants.INTEGRATION_LOAD_SUCCESS,payload:{...obj}}))
    }

    const apiParams = {
      access_rights:'public',//"public"/"protected"/"private"
      api_key: props.apiInfo,
      title:encodeURI(props.fileInfo.title),
      content:encodeURI(props.fileInfo.content),
      status:'published', //published || draft
      canonical_url:props.deeplink
    },
    postPut = writersBlockStore.Integration.TWO_HUNDRED_WAD.entries[props.fileInfo.id] ? 'PUT' :  'POST'
  
    const queryStr = ActionApi.formatParams('URL_QUERY',apiParams),
          url = API_TWO_HUNDRED_WAD.API_TWO_HUNDRED_WAD_BASE_URI
                + API_TWO_HUNDRED_WAD[`API_TWO_HUNDRED_WAD_${postPut}_URI`].split(':')[1]
                + queryStr
    const apiSubmission = {
      callback:handleApiResponse,
      url,
      opts: {
        method: API_TWO_HUNDRED_WAD[`API_TWO_HUNDRED_WAD_${postPut}_URI`].split(':')[0]
      }
    }
    console.log('SENDING apiSubmission',apiSubmission,'TO: ActionApi')
    writersBlockDispatch({type:IntegrationConstants.INTEGRATION_LOAD_INIT})
    ActionApi.ApiFetch(apiSubmission)

    /*
    callback:any,
  extended?: { [key:string]: any },
  mock?:any, // data to be used in place of a real call
  url:string,
     */
    // actionApi()
//writersBlock.User.integrations
//INTEGRATIONS.TWO_HUNDRED_WAD
    //You can only publish one post per hour
    /*
    TWO_HUNDRED_WAD:{
    entries:{
      _entryid:{
        POST:0,//timestamp
        UPDATED:[],//array of timestamps
        id:0,//from WB
        uuid:0//from 200wad
      },
    },
    mostRecentCommit:0,//now
    nextEligibleToCommit:0,//1hr after mostRecentCommit
  }
    */

  }

  return (
    <TwoHLi onMouseOver={e=>props.toolTipFn('Two Hundred Words a Day')} onClick={submitEntry}>
      <TwoH />
      <TwoHSub />
    </TwoHLi>
  )
}
TwoHundred.displayName = 'TwoHundred'

export default TwoHundred