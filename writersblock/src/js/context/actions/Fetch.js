import type {FetchActionPropsType} from '../../../flow/context/ActionsType'

export default (props:FetchActionPropsType) =>
{
  const ext = props.extended || {}
  if(props.mock)
  {
    console.info('NO ASYNC CALL MADE - saving mockaroo api reqs')
    console.info('-->',props.url)
    props.callback({content:props.mock, ...ext})
  }
  else
  {
    fetch(props.url)
    .then(obj => obj.json())
    .then(jsn => props.callback({content:jsn, ...ext}) )
  }
  
}