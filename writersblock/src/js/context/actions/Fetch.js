import type {FetchActionPropsType} from '../../../flow/context/ActionsType'

import {landingPageContent} from '../../components/journal/context/index'

export default (props:FetchActionPropsType) =>
{
  const ext = props.extended || {}
  if(props.mock)
  {
    // console.info('NO ASYNC CALL MADE - using mock data')
    // console.info('-->',props.url)
    props.callback({content:props.mock, ...ext})
  }
  else if(false)
  {
    fetch(props.url)
    .then(obj => obj.json())
    .then(jsn => props.callback({content:jsn, ...ext}) )
  }
  else
  {
    console.log('LOOK TO THIS LOCATION AND THE ABOVE GROUP OF CODE WHEN READY TO IMPLEMENT MARKOV HOMEPAGES')
    props.callback({content:landingPageContent, ...ext})
  }
  
}