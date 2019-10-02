import type { ContextInitializerJournalType } from '../../../flow/context/InitializersType'

const journalContextDefault: ContextInitializerJournalType = {
  calendar: { activeMonth: new Date().getTime() },
  content:  { showWysiwyg:false },
  note:     { active:false, },
  postIt:   { active:false, }
}
export default journalContextDefault