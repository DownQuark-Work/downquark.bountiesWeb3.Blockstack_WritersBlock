import type {WysiwygContextConstantsType} from './WysiwygTypes'

export type ContextJournalConstantsType =   'writersblock.Journal.JOURNAL_NAVIGATE_ENTRIES_FAILURE'
                                          | 'writersblock.Journal.JOURNAL_NAVIGATE_ENTRIES_INIT'
                                          | 'writersblock.Journal.JOURNAL_NAVIGATE_ENTRIES_SUCCESS'
                                          | 'writersblock.Journal.JOURNAL_SAVE_CONTENT_FAILURE'
                                          | 'writersblock.Journal.JOURNAL_SAVE_CONTENT_INIT'
                                          | 'writersblock.Journal.JOURNAL_SAVE_CONTENT_SUCCESS'
                                          | 'writersblock.Journal.JOURNAL_SAVE_CONTENT_SUCCESS_UPDATE_USER_FILES'
                                          | 'writersblock.Journal.LOAD_CONTENT_FAILURE'
                                          | 'writersblock.Journal.LOAD_CONTENT_INIT'
                                          | 'writersblock.Journal.LOAD_CONTENT_SUCCESS'
                                          | 'writersblock.Journal.SET_PRE_BLUR_TEXT'
                                          | 'writersblock.Journal.SET_PRE_FOCUS_TEXT'
                                          | 'writersblock.Journal.SET_REDO_ACTIVE'
                                          | 'writersblock.Journal.SET_UNSAVED_UPDATE'

export type ContextJournalStoreType = {|
  fileName:{
    dynamic?:string,
    current:string
  },
  landing?:{content?:string, title?:string},
  loaded:boolean,
  loading:boolean,
  original:{content:string, title:string},
  unsavedUpdate:boolean,
  updatedContent?:{content?:string, title?:string}
|}

// export type ContextWysiwygConstantsType = 'writersblock.Wysiwyg.WYSIWYG_BOLD_TOGGLE'
//                                           | 'writersblock.Wysiwyg.WYSIWYG_COPY'
//                                           | 'writersblock.Wysiwyg.WYSIWYG_CUT'
//                                           | 'writersblock.Wysiwyg.WYSIWYG_FORMAT_REMOVE'
//                                           | 'writersblock.Wysiwyg.WYSIWYG_HEADER_ROW_ADD'
//                                           | 'writersblock.Wysiwyg.WYSIWYG_HIGHLIGHT_SELECT'
//                                           | 'writersblock.Wysiwyg.WYSIWYG_HIGHLIGHT_SET'
//                                           | 'writersblock.Wysiwyg.WYSIWYG_ITALIC_TOGGLE'
//                                           | 'writersblock.Wysiwyg.WYSIWYG_LINK_SELECT'
//                                           | 'writersblock.Wysiwyg.WYSIWYG_LINK_SET'
//                                           | 'writersblock.Wysiwyg.WYSIWYG_LINK_UNLINK'
//                                           | 'writersblock.Wysiwyg.WYSIWYG_LIST'
//                                           | 'writersblock.Wysiwyg.WYSIWYG_PASTE'
//                                           | 'writersblock.Wysiwyg.WYSIWYG_REDO'
//                                           | 'writersblock.Wysiwyg.WYSIWYG_RESET'
//                                           | 'writersblock.Wysiwyg.WYSIWYG_STRIKE_CONTENT_EDIT'
//                                           | 'writersblock.Wysiwyg.WYSIWYG_STRIKE_SELECT'
//                                           | 'writersblock.Wysiwyg.WYSIWYG_UNDERLINE'
//                                           | 'writersblock.Wysiwyg.WYSIWYG_UNDO'
//                                           | 'writersblock.Wysiwyg.WYSIWYG_VIEW_TOGGLE'


export type JournalArticleFetchDataType = {
  content:string,
  created_by:string,
  created_on:Date,
  updated_on?:Date,
  id:string,
  title:string
}
export type JournalArticlePropsType = {
  content:?JournalArticleFetchDataType,
  loading:boolean
}

export type JournalBasePropsType = {|
  wysiwygDisplayed:boolean,
  classMaps:RefObjOfArrayStr
|}

export type JournalContentPropsType = {
  classMaps:{current:ObjOfArrayStr},
  content:string,
  toggleWysiwyg: (boolean) => void,
  wysiwygVisible:boolean
}

export type JournalPageLeftPropsType = {
  ...JournalBasePropsType,
  title:?string
}

export type JournalPageRightPropsType = {
  content:?string,
  ...JournalBasePropsType,
  updateJournalContent:stringVoidFncType
}
export type JournalPageRightMutationsRefType = {
  current: {
    preBlurText:string,
    initialText:string,
    unsavedUpdate:boolean
  }
}