import { version } from '../../../package.json'
//$FlowCurrentBranch
const localStorageJSON = JSON.parse(localStorage.getItem("blockstack-session"))
export const WRITERS_BLOCK_VERSION = version
export const USE_GAIA = (localStorageJSON && !!localStorageJSON.userData) || false

export const WRITERS_BLOCK_BASE_FILES_ENUM = {
  'MAP':0,
  'USER':1,
  'INTEGRATIONS':2
}

export const INTEGRATIONS = {
  TWO_HUNDRED_WAD:{
    entries:{
      _entryid/*from WB*/:{
        POST:0,//timestamp
        UPDATED:[],//array of timestamps
        uuid:0//from 200wad
      },
    },
    mostRecentCommit:0,//now
    nextEligibleToCommit:0,//1hr after mostRecentCommit
  }
}

// NOTE: for ALL base_files, for successsful population, the storeKey MUST === the first key within 'content' 
export const WRITERS_BLOCK_BASE_FILES = [
  {
    name: '_writersBlockListMap.json',
    content: { "postsMap": {} },
    path: '',
    storeKey: 'postsMap',
    opts: { decrypt: false, encrypt: false }
  },
  {
    name:'_writersBlockUsersSettings.json',
    content: {
      user:{
          semver: {
            mostRecentAcknowledgedVersion: WRITERS_BLOCK_VERSION,
            changelog:[] // array of files named as semver
          },
          settings: {
            pseudonym:'',
            publish:'private',
            pageview:'default',
          },
          integrations: {} //for Store>Integration key  mapping
        }
    },
    path:'',
    pathBucket:'user/',
    storeKey:'user',
    type:'USER',
    opts: {sign:true, verify:true}
  },
  {
    name:'_writersBlockIntegrations.json',
    content: {INTEGRATIONS},
    path:'',
    storeKey:'INTEGRATIONS',
    opts: {sign:true, verify:true}
  }
]

export const WRITERS_BLOCK_BASE_CONST_ENUM = {
  'PRIVATE':0,
  'PUBLIC':1
}
export const WRITERS_BLOCK_BASE_CONST = [
  {
    path:'',
    pathBucket:'private/',
    type:'PRIVATE',
    opts: {sign:true, verify:true}
  },
  {
    path: '',
    pathBucket:'public/',
    type:'PUBLIC',
    opts: { decrypt: false, encrypt:false }
  },
]