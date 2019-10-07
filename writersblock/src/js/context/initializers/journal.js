import type { ContextInitializerJournalType } from '../../../flow/context/InitializersType'

const journalContextDefault: ContextInitializerJournalType = {
  calendar: { activeMonth: new Date().getTime() },
  content:  { showWysiwyg:false },
  isLoading: false,
  isSaving: false,
  shallowlink:false, //to be used when navigating via SPA
  note:     { active:false, },
  postIt:   { active:false, }
}
export default journalContextDefault