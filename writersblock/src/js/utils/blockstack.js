//$FlowCurrentBranch
const localStorageJSON = JSON.parse(localStorage.getItem("blockstack-session"))
export const USE_GAIA = (localStorageJSON && !!localStorageJSON.userData) || false

export const WRITERS_BLOCK_BASE_FILES_ENUM = {
  'PRIVATE':0,
  'PUBLIC':1
}

export const WRITERS_BLOCK_BASE_FILES = [
  {
    content: { "privatePosts": [] },
    name:'_writersBlockListPrivate.json',
    path:'',
    pathBucket:'private/',
    storeKey:'privatePosts',
    type:'PRIVATE',
    opts: {}
  },
  {
    content: { "publicPosts": [] },
    name: '_writersBlockListPublic.json',
    path: '',
    pathBucket:'public/',
    storeKey: 'publicPosts',
    type:'PUBLIC',
    opts: { decrypt: false, encrypt:false }
  }
]

export const createDeeplink = (uSess,type,link) =>
{
  const userData = JSON.parse(localStorage.getItem('blockstack-session'))
  if(type === WRITERS_BLOCK_BASE_FILES_ENUM['PRIVATE'])
  {
    console.log('private deeplink', userData)
    console.log('uSess,type,link',uSess,type,link)
    const encrypted = uSess.encryptContent(link),
          urlReadable = btoa(encrypted)
    console.log('----> encrypted',encrypted)
    console.log('--> urlReadable',urlReadable)

    const decryptURL = atob(urlReadable)
    console.log('decryptURL',decryptURL)
    const decrypt = uSess.decryptContent(decryptURL)
    console.log('<---- decrypt',decrypt)
  }
  else
  {
    //console.log('public deeplink')
    //forthcoming. Will need to encode userData.username &&  userData.profile.name
  }
}

export const parseDeeplink = (uSess,link) =>
{
  const decryptURL = atob(link)
  const decrypt = uSess.decryptContent(decryptURL)
  return decrypt
}