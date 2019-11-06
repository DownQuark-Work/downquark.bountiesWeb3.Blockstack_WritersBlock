import {WRITERS_BLOCK_BASE_FILES, WRITERS_BLOCK_BASE_FILES_ENUM, WRITERS_BLOCK_BASE_CONST, WRITERS_BLOCK_BASE_CONST_ENUM} from '../../../utils/blockstack'  
import {
  JOURNAL_LOAD_CONTENT_FAILURE,
  JOURNAL_LOAD_CONTENT_INIT,
  JOURNAL_LOAD_CONTENT_SUCCESS,
  JOURNAL_NAVIGATE_ENTRIES_FAILURE,
  JOURNAL_NAVIGATE_ENTRIES_INIT,
  JOURNAL_NAVIGATE_ENTRIES_SUCCESS,
  JOURNAL_SAVE_CONTENT_FAILURE,
  JOURNAL_SAVE_CONTENT_INIT,
  JOURNAL_SAVE_CONTENT_SUCCESS,
  JOURNAL_SAVE_CONTENT_SUCCESS_UPDATE_USER_FILES,
  } from './constants'

export const navigateJournalContent = (block,journal,entryFile) =>
{
  block.isNavigating = true
  block.dispatch({type:JOURNAL_NAVIGATE_ENTRIES_INIT, payload:entryFile})
  journal.dispatch({type:JOURNAL_NAVIGATE_ENTRIES_INIT, payload:entryFile})
  window.scrollTo(0,0)
  loadJournalContent(block,journal)
}

export const loadJournalContent = (block,journal) =>
{
  const postKind = journal.kind,//scalable for future
      postType = WRITERS_BLOCK_BASE_CONST_ENUM[postKind],
      postInfo = WRITERS_BLOCK_BASE_CONST[postType],
      postFileTitle = journal.currentDayFileExists,
      postLocation = postInfo.pathBucket,
      postOpts = postInfo.opts
  block.userSession.getFile(postLocation+postFileTitle,postOpts)
    .then(o =>
          {
            journal.dispatch({type:JOURNAL_LOAD_CONTENT_SUCCESS, payload:JSON.parse(o)})
            if(block.isNavigating)
            {
              block.dispatch({type:JOURNAL_NAVIGATE_ENTRIES_SUCCESS})
              journal.dispatch({type:JOURNAL_NAVIGATE_ENTRIES_SUCCESS})
            }
          })
    .catch(err => { console.error(err); alert(err); journal.dispatch({type:JOURNAL_LOAD_CONTENT_FAILURE})})
}

export const saveJournalContent = (block, journal) =>
{
  //show saving screen to disable further user interaction
  block.dispatch({type:JOURNAL_SAVE_CONTENT_INIT})

  const postKind = journal.storageType.toUpperCase(),
        postType = WRITERS_BLOCK_BASE_CONST_ENUM[postKind],
        postInfo = WRITERS_BLOCK_BASE_CONST[postType],
        postLocation = postInfo.pathBucket,
        postOpts = postInfo.opts,
        postFileTitle = new Date().CONTENT_FILE.formatDate() + '.json',
        postPath = postLocation+postFileTitle
  // create the daily post file
  const dailyFile = {
    id: postFileTitle.noExt(),
    title:journal.title,
    content:journal.content.rmClasses(),
    author:{...block.authorData}, // for public sharing
    meta:{
      created:journal.meta.created || new Date().getTime(),
      lastupdated:new Date().getTime(),
      totalupdates:parseInt(journal.meta.totalupdates) + 1
    }
  },
  postMapFile = {
    content: { postsMap:{...block.userFiles.postsMap}},
    opts: WRITERS_BLOCK_BASE_FILES[WRITERS_BLOCK_BASE_FILES_ENUM['MAP']].opts,
    path: WRITERS_BLOCK_BASE_FILES[WRITERS_BLOCK_BASE_FILES_ENUM['MAP']].path + WRITERS_BLOCK_BASE_FILES[WRITERS_BLOCK_BASE_FILES_ENUM['MAP']].name
  }
  // create the updated main file
  
  block.userSession.putFile(postPath, JSON.stringify(dailyFile), postOpts)
    .then(o=>
          {
            postMapFile.content.postsMap[dailyFile.id] = {kind:postKind,url:o}
            block.userSession.putFile(postMapFile.path, JSON.stringify(postMapFile.content), postMapFile.opts) // TODO: [@mlnck] UPDATE ~ DRY this
              .then(q =>
                    {
                      journal.dispatch({ type: JOURNAL_SAVE_CONTENT_SUCCESS, payload: { ...dailyFile, currentDayFileExists: postFileTitle } })
                      block.dispatch({ type: JOURNAL_SAVE_CONTENT_SUCCESS })
                      block.dispatch({ type: JOURNAL_SAVE_CONTENT_SUCCESS_UPDATE_USER_FILES, payload: { postsMap: postMapFile.content.postsMap } })
                      block.onFinishCallback(false)
                    })
              .catch(err => { console.error(err); alert(err); block.dispatch({ type: JOURNAL_SAVE_CONTENT_FAILURE }) })
          })
    .catch(err => { console.error(err); alert(err); block.dispatch({type:JOURNAL_SAVE_CONTENT_FAILURE})})
}