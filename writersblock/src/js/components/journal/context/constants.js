import type {ContextJournalConstantsType} from '../../../../flow/components/JournalTypes'

import {createContextConstants} from '../../../utils/context'

export const JOURNAL_LOAD_CONTENT_FAILURE:ContextJournalConstantsType = 'writersblock.Journal.LOAD_CONTENT_FAILURE'
export const JOURNAL_LOAD_CONTENT_INIT:ContextJournalConstantsType = 'writersblock.Journal.LOAD_CONTENT_INIT'
export const JOURNAL_LOAD_CONTENT_SUCCESS:ContextJournalConstantsType = 'writersblock.Journal.LOAD_CONTENT_SUCCESS'
export const JOURNAL_NAVIGATE_ENTRIES_FAILURE:ContextJournalConstantsType = 'writersblock.Journal.JOURNAL_NAVIGATE_ENTRIES_FAILURE'
export const JOURNAL_NAVIGATE_ENTRIES_INIT:ContextJournalConstantsType = 'writersblock.Journal.JOURNAL_NAVIGATE_ENTRIES_INIT'
export const JOURNAL_NAVIGATE_ENTRIES_SUCCESS:ContextJournalConstantsType = 'writersblock.Journal.JOURNAL_NAVIGATE_ENTRIES_SUCCESS'
export const JOURNAL_PRE_BLUR_TEXT:ContextJournalConstantsType = 'writersblock.Journal.SET_PRE_BLUR_TEXT'
export const JOURNAL_PRE_FOCUS_TEXT:ContextJournalConstantsType = 'writersblock.Journal.SET_PRE_FOCUS_TEXT'
export const JOURNAL_REDO_ACTIVE:ContextJournalConstantsType = 'writersblock.Journal.SET_REDO_ACTIVE'
export const JOURNAL_SAVE_CONTENT_FAILURE:ContextJournalConstantsType = 'writersblock.Journal.JOURNAL_SAVE_CONTENT_FAILURE'
export const JOURNAL_SAVE_CONTENT_INIT:ContextJournalConstantsType = 'writersblock.Journal.JOURNAL_SAVE_CONTENT_INIT'
export const JOURNAL_SAVE_CONTENT_SUCCESS:ContextJournalConstantsType = 'writersblock.Journal.JOURNAL_SAVE_CONTENT_SUCCESS'
export const JOURNAL_UNSAVED_UPDATE:ContextJournalConstantsType = 'writersblock.Journal.SET_UNSAVED_UPDATE'

export const WysiwygConstantsEnum = { 'bold':1,
                                      'copy':2,
                                      'cut':3,
                                      'removeFormat':4,
                                      'insertHorizontalRule':5,
                                      'writersblock.Wysiwyg.WYSIWYG_HIGHLIGHT_SELECT':6,
                                      'writersblock.Wysiwyg.WYSIWYG_HIGHLIGHT_SET':7,
                                      'italic':8,
                                      'writersblock.Wysiwyg.WYSIWYG_LINK_SELECT':9,
                                      'writersblock.Wysiwyg.WYSIWYG_LINK_SET':10,
                                      'writersblock.Wysiwyg.WYSIWYG_LINK_UNLINK':11,
                                      'insertunorderedlist':12,
                                      'paste':13,
                                      'redo':14,
                                      'RESET_CUSTOM_FUNCTION':15,
                                      'writersblock.Wysiwyg.WYSIWYG_STRIKE_CONTENT_EDIT':16,
                                      'writersblock.Wysiwyg.WYSIWYG_STRIKE_SELECT':17,
                                      'underline':18,
                                      'undo':19,
                                      'writersblock.Wysiwyg.WYSIWYG_VIEW_TOGGLE':20
                                    }
export const WysiwygConstantsKey = {  WYSIWYG_BOLD_TOGGLE:'bold',
                                      WYSIWYG_COPY:'copy',
                                      WYSIWYG_CUT:'cut',
                                      WYSIWYG_FORMAT_REMOVE:'removeFormat',
                                      WYSIWYG_HEADER_ROW_ADD:'insertHorizontalRule',
                                      WYSIWYG_HIGHLIGHT_SELECT:'writersblock.Wysiwyg.WYSIWYG_HIGHLIGHT_SELECT', //Handled in the Wysiwyg Bar
                                      WYSIWYG_HIGHLIGHT_SET:'writersblock.Wysiwyg.WYSIWYG_HIGHLIGHT_SET', //Handled in the Wysiwyg Bar
                                      WYSIWYG_ITALIC_TOGGLE:'italic',
                                      WYSIWYG_LINK_SELECT:'writersblock.Wysiwyg.WYSIWYG_LINK_SELECT', //Handled in the Wysiwyg Bar
                                      WYSIWYG_LINK_SET:'writersblock.Wysiwyg.WYSIWYG_LINK_SET', //Handled in the Wysiwyg Bar
                                      WYSIWYG_LINK_UNLINK:'writersblock.Wysiwyg.WYSIWYG_LINK_UNLINK', //Handled in the Wysiwyg Bar
                                      WYSIWYG_LIST:'insertunorderedlist',
                                      WYSIWYG_PASTE:'paste',
                                      WYSIWYG_REDO:'redo',
                                      WYSIWYG_RESET:'RESET_CUSTOM_FUNCTION',
                                      WYSIWYG_STRIKE_CONTENT_EDIT:'writersblock.Wysiwyg.WYSIWYG_STRIKE_CONTENT_EDIT', //Handled in the Wysiwyg Bar // strikeThrough
                                      WYSIWYG_STRIKE_SELECT:'writersblock.Wysiwyg.WYSIWYG_STRIKE_SELECT',//Handled in the Wysiwyg Bar
                                      WYSIWYG_UNDERLINE:'underline',
                                      WYSIWYG_UNDO:'undo',
                                      WYSIWYG_VIEW_TOGGLE:'writersblock.Wysiwyg.WYSIWYG_VIEW_TOGGLE', //on hold
                                    }
export const WysiwygConstants = createContextConstants(WysiwygConstantsEnum)