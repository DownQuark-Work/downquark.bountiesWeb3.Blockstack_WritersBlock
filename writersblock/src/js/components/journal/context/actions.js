import {WRITERS_BLOCK_BASE_FILES, WRITERS_BLOCK_BASE_FILES_ENUM} from '../../../utils/blockstack'  
import {
  JOURNAL_LOAD_CONTENT_FAILURE,
  JOURNAL_LOAD_CONTENT_INIT,
  JOURNAL_LOAD_CONTENT_SUCCESS,
  JOURNAL_NAVIGATE_ENTRIES_FAILURE,
  JOURNAL_NAVIGATE_ENTRIES_INIT,
  JOURNAL_NAVIGATE_ENTRIES_SUCCESS,
  JOURNAL_SAVE_CONTENT_FAILURE,
  JOURNAL_SAVE_CONTENT_INIT,
  JOURNAL_SAVE_CONTENT_SUCCESS
  } from './constants'

export const navigateJournalContent = (block,journal,entryFile) =>
{
  block.isNavigating = true
  block.dispatch({type:JOURNAL_NAVIGATE_ENTRIES_INIT})
  journal.dispatch({type:JOURNAL_NAVIGATE_ENTRIES_INIT, payload:entryFile})
  loadJournalContent(block,journal)
}

export const loadJournalContent = (block,journal) =>
{
  if(journal.currentDayFileExists)
  {
    const postType = WRITERS_BLOCK_BASE_FILES_ENUM['PRIVATE'],//scalable for future
        postInfo = WRITERS_BLOCK_BASE_FILES[postType],
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
}

export const saveJournalContent = (block, journal) =>
{
  //show saving screen to disable further user interaction
  block.dispatch({type:JOURNAL_SAVE_CONTENT_INIT})
    //phase 2 - allowing public publishing
  const postType = WRITERS_BLOCK_BASE_FILES_ENUM['PRIVATE'],
        postInfo = WRITERS_BLOCK_BASE_FILES[postType],
        postLocation = postInfo.pathBucket,
        postOpts = postInfo.opts,
        postFileTitle = new Date().getContentFileFormattedDate() + '.json',
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
  }
  // create the updated main file
  const baseFilePath = postInfo.name,
        updatedFiles = block.userFiles[postInfo.storeKey]
    // console.log('updatedFiles',updatedFiles)
    if(updatedFiles[0] !== postFileTitle){ updatedFiles.unshift(postFileTitle) }
  

  block.userSession.putFile(postPath, JSON.stringify(dailyFile), postOpts)
    .then(o=>
          {
            const baseFileContent = {}

            baseFileContent[postInfo.storeKey] = updatedFiles
            block.userSession.putFile(baseFilePath, JSON.stringify(baseFileContent), postOpts) // TODO: [@mlnck] UPDATE ~ DRY this
              .then(p=>
                    {
                      journal.dispatch({type:JOURNAL_SAVE_CONTENT_SUCCESS, payload:{...dailyFile,currentDayFileExists:postFileTitle}})
                      block.dispatch({type:JOURNAL_SAVE_CONTENT_SUCCESS})
                      block.onFinishCallback(false)
                    })
              .catch(err => { console.error(err); alert(err); block.dispatch({type:JOURNAL_SAVE_CONTENT_FAILURE})})
          })
    .catch(err => { console.error(err); alert(err); block.dispatch({type:JOURNAL_SAVE_CONTENT_FAILURE})})
}