type ContextJournalCalendarType = { activeMonth: Date }
type ContextJournalCalendarPostItType = { active:boolean, }
type ContextJournalContentType = { showWysiwyg:boolean }
type ContextJournalNoteType = { active:boolean, }
export type ContextJournalType = {
  calendar: ContextJournalCalendarType,
  content:  ContextJournalContentType,
  note:     ContextJournalNoteType,
  postIt:   ContextJournalCalendarPostItType
}

export type ContextLandingType = {
  cookiesAccept: boolean,
  gdprAccept: boolean,
  optIn?: boolean,
}

export type ContextUserType = {
  email?: string,
  emailVerified: boolean,
  firstName: string,
  lastName: string,
  salt?: string,
}

export type ContextWritersBlockType = {
  Journal: ContextJournalType,
  Landing: ContextLandingType,
  User: ContextUserType
}