import {getFile, UserSession} from 'blockstack'
import { feedbackStatus } from '../context/constants/app/common'


export const createContextConstants = (o:ObjOfStrOrNum, s?:string ):ObjOfStr => 
{
  const obj:ObjOfStr = {}
  for (let k in o)
  {
    const newKey = k.split('.').pop()
    if(s && newKey === s){ return {k:k}}
    obj[newKey] = k
  }
  return obj
}

const convertBase = (value, from_base, to_base) => {
  var range = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/'.split('');
  var from_range = range.slice(0, from_base);
  var to_range = range.slice(0, to_base);
  
  var dec_value = String(value).split('').reverse().reduce(function (carry, digit, index) {
    if (from_range.indexOf(digit) === -1) throw new Error('Invalid digit `'+digit+'` for base '+from_base+'.');
    return carry += from_range.indexOf(digit) * (Math.pow(from_base, index));
  }, 0);
  
  var new_value = '';
  while (dec_value > 0) {
    new_value = to_range[dec_value % to_base] + new_value;
    dec_value = (dec_value - (dec_value % to_base)) / to_base;
  }
  return new_value || '0';
}

export const createDeepLink = (link) => encodeURI(
  link.replace('http','').replace('/private/','][').replace('/public/','[]').replace(':\/\/','[[')
    .replace(/\./g,'[').replace(/\//g,']').replace(/(\d{8})/,(dt)=>convertBase(dt+'',10,32))
)
export const parseDeepLink = (link) => 'http' + decodeURI(link)
    .replace('[[','://').replace(/(\]\[|\[\])(\w+)(?=\[)/,(dt)=> dt.slice(0,2)+convertBase(dt.replace(/(\]\[|\[\])/,''),32,10))
      .replace('][','/private/').replace('[]','/public/').replace(/\[/g,'.').replace(/\]/g,'/')

const renderEntry = (entry) =>
{
  const payload = {
    loaded:true,
    loading:false,
    content:'',
    title:'',
    ...entry.entry,
    meta:{
      created:'',
      lastupdated:'',
      totalupdates:'',
      ...entry.entry.meta,
    }
  },
  action ={ type:'writersblock.Journal.LOAD_CONTENT_SUCCESS', payload } // TODO: [@mlnck] UPDATE ~ Why couldn't I import LOAD_CONTENT_SUCCESS
renderEntry.dispatch(action)
}
const parseEncryption = (cntnt) =>
{
  const uS = JSON.parse(localStorage.getItem('blockstack-session')),
        userLoggedIn = (uS.hasOwnProperty('userData'))
  
  if(!userLoggedIn)
  {
    return renderEntry({
      status: feedbackStatus.Encryption.ERROR,
      entry: feedbackStatus.Encryption.ERROR_RESPONSE_USER_LOGGED_OUT
    })
  }

  let decrypt
  try
    { decrypt = new UserSession().decryptContent(cntnt.cipherText) }
  catch(e)
  {
    return renderEntry({
      status: feedbackStatus.Encryption.ERROR,
      entry: feedbackStatus.Encryption.ERROR_RESPONSE
    })
  }

  return renderEntry({
    status: feedbackStatus.Encryption.SUCCESS,
    entry: JSON.parse(decrypt)
  })
}

export const handleDeepLink = (link, deeplinkDispatch) =>
{
  renderEntry.dispatch = deeplinkDispatch
  
  const loadContent = async (lnk) =>
  {
    const response = await fetch(lnk, {mode: 'cors'});
    return await response.json()
  }
  loadContent(link)
    .then(o => {
      if(o.signature){parseEncryption(o)}
      else
      {
        return renderEntry({
          status: feedbackStatus.Encryption.SUCCESS,
          entry: o
        })
      }
    })
    .catch(e => {
      return renderEntry({
        status: feedbackStatus.Load.ERROR,
        entry: feedbackStatus.Load.ERROR_RESPONSE
      })
    })
}
// console.log(createDeepLink("https://gaia.blockstack.org/hub/1PegnPFeWthyJ7SAeQYg9nZRUnb3qcPouQ/public/20191030.json"));
// console.log(createDeepLink('https://gaia.blockstack.org/hub/1PegnPFeWthyJ7SAeQYg9nZRUnb3qcPouQ/private/20191029.json'));
// console.log(parseDeepLink('s%5B%5Bgaia%5Bblockstack%5Borg%5Dhub%5D1PegnPFeWthyJ7SAeQYg9nZRUnb3qcPouQ%5B%5Dj85pm%5Bjson'))
// s%5B%5Bgaia%5Bblockstack%5Borg%5Dhub%5D1PegnPFeWthyJ7SAeQYg9nZRUnb3qcPouQ%5D%5Bj85pl%5Bjson //29-PRIVATE
// s%5B%5Bgaia%5Bblockstack%5Borg%5Dhub%5D1PegnPFeWthyJ7SAeQYg9nZRUnb3qcPouQ%5B%5Dj85pm%5Bjson //30-PUBLIC
