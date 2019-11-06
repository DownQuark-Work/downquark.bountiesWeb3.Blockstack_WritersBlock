// import type { ContextInitializerJournalType } from '../../../flow/context/InitializersType'
import { version } from '../../../../package.json'
import { IN_DEVELOPMENT } from '../../utils/testing'

const blockstackContextInitial: $FlowCurrentBranch = {
  appConfig:{},
  userSession:{},
  username:{},
  profile:{
    '@type':{},
    '@context':{},
    api:{},
    name:{},
    description:{},
    account:{},
    image:{},
    apps:{}
  },
  email:{},
  decentralizedID:{},
  identityAddress:{},
  appPrivateKey:{},
  coreSessionToken:{},
  authResponseToken:'',
  hubUrl:{},
  gaiaAssociationToken:{},
  userInformationPopulated:false,
  userFiles:{
    postsLoaded: false,
    postsMap:{},
  },
  version,
}
export default blockstackContextInitial