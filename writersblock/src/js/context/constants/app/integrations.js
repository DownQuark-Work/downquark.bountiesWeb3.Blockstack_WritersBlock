const API_TWO_HUNDRED_WAD_BASE_URI = 'https://200wordsaday.com/api'
const API_TWO_HUNDRED_WAD_POST_URI = 'POST:/texts'
const API_TWO_HUNDRED_WAD_UPDATE_URI = 'PUT:/texts/{uuid}'
// flowtype takes care of this validation // const API_TWO_HUNDRED_WAD_PARAMS = [['api_key','REQUIRED'],['title','REQUIRED'],['content'],['status','published'],['canonical_url']]
export const API_TWO_HUNDRED_WAD = {API_TWO_HUNDRED_WAD_BASE_URI, API_TWO_HUNDRED_WAD_POST_URI, API_TWO_HUNDRED_WAD_UPDATE_URI}

export const INTEGRATION_KEYS = [
  'TWO_HUNDRED_WAD'
]
export const INTEGRATIONS = {}
INTEGRATIONS[INTEGRATION_KEYS[0]] = {
  cta:'Enter you API Key in the field to be able to post to your 200 Words A Day account',
  instructions:'You can find your private key in your Settings page in the "Your API Key" section.',
  key:INTEGRATION_KEYS[0],
  name:'200 Words A Day',
  url:'http://200wordsaday.com/',
}