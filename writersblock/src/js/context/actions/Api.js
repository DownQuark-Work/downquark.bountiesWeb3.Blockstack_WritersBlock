import type {FetchActionPropsType} from '../../../flow/context/ActionsType'
type formatParamsTypeType = 'URL_QUERY' | 'POST' | 'PUT'

// export const formatParams = <curParamType>(type:formatParamsTypeType, curParams:curParamType):string =>
export const formatParams = (type:formatParamsTypeType, curParams:any):string =>
{
  let url = '?',
      body = {}
  
  switch(type)
  {
    case 'URL_QUERY':
      for(let k in curParams)
      { url += `${k}=${curParams[k]}&` }
      return url.replace(/.$/,'')
    case 'POST':
    case 'PUT':
  }
}

export const ApiFetch = (props:FetchActionPropsType) =>
{
  const ext = props.extended || {}
  if(props.mock)
  {
  //   // console.info('NO ASYNC CALL MADE - using mock data')
  //   // console.info('-->',props.url)
  //   props.callback({content:props.mock, ...ext})
  }
else if(true) //false to return w/o making a live call (for dev)
  {
    fetch(props.url)
      .then(obj => obj.json()).catch(e => console.error('x:',e))
        .then(jsn => props.callback({content:jsn, ...ext}) ).catch(e => console.error('xx:',e))
    /*
    async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
// }
    */
  }
  else
  {
    console.log('NO ACTUAL CALL BEING MADE .. ENABLE WHEN READY')
    // TODO: [@mlnck] UPDATE ~ LOOK TO THIS LOCATION AND THE ABOVE GROUP OF CODE WHEN READY TO IMPLEMENT MARKOV HOMEPAGES
    setTimeout(()=>props.callback({ props, ...ext}), 2000)
    
  }
  
}

{/*
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
    // TODO: [@mlnck] UPDATE ~ LOOK TO THIS LOCATION AND THE ABOVE GROUP OF CODE WHEN READY TO IMPLEMENT MARKOV HOMEPAGES
    props.callback({ content: any, ...ext})
  }
  
*/}
