import { WRITERS_BLOCK_BASE_FILES, WRITERS_BLOCK_BASE_FILES_ENUM } from '../../utils/blockstack'
import {USER_SETTING_CHANGE_INIT,USER_SETTING_CHANGE_SUCCESS,USER_SETTING_CHANGE_FAILURE} from '../constants/store/user'
export const putFile = (dispatch, session, file) =>
{
    const {path, content, options} = file
    session.putFile(path,JSON.stringify({user:content}),options)
    .then(o => {
      session.getFile(path,options)
        .then(ob =>
              {
                //set state here - lifecycle event causes the animation to re-run
                dispatch({...content.settings, integrations:content.integrations, saving:false})
              })
      })
}

export const updateUserSettings = (dispatch, session, settings) =>
{
  let path = WRITERS_BLOCK_BASE_FILES[WRITERS_BLOCK_BASE_FILES_ENUM['USER']],
      userFileOpts = path.opts
      path = path.path + path.name
      
  
  const updateObj = {
    content: { ...settings },
    path,
    options: userFileOpts
  }
  putFile(dispatch, session, updateObj)
}