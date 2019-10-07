// import type { ContextInitializerJournalType } from '../../../flow/context/InitializersType'

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
  authResponseToken:{},
  hubUrl:{},
  gaiaAssociationToken:{},
  userInformationPopulated:false,
  userFiles:{
    privatePosts:'',
    publicPosts:''
  }
}
export default blockstackContextInitial


/*["username", "profile", "email", "decentralizedID", "identityAddress", "appPrivateKey", "coreSessionToken", "authResponseToken", "hubUrl", "gaiaAssociationToken"] */
/*PROFILE: ["@type", "@context", "api", "name", "description", "account", "image", "apps"] */
// TODO: [@mlnck] FINISH ~ finish destructuring above for flow