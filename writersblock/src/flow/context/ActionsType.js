import type {CalendarFetchDataType} from '../components/CalendarType'
import type {JournalArticleFetchDataType} from '../components/JournalTypes'

export type FetchCalendarContentCallbackDataType = {
  content: Array<CalendarFetchDataType>,
  loading?: boolean
}
type FetchCalendarContentCallbackType = (FetchCalendarContentCallbackDataType) => void //I think this is unneeded now

type FetchCalendarCellDataType = {
  id: string,
  'created_by': string,
  'created_on': string,
  date: number,
  description?: string,
  title: 'string',
}

export type FetchJournalContentCallbackDataType = {
  content: ?JournalArticleFetchDataType,
  loading?: boolean
}
type FetchJournalContentCallbackType = (FetchJournalContentCallbackDataType) => void //I think this is unneeded now

export type FetchActionPropsType = {
  callback:any,
  // callback:<FetchedData>(FetchedData) => void,
  extended?: { [key:string]: any },
  mock?:any, // data to be used in place of a real call
  url:string,
}

export type TimeInteractionActionPropsType = {
  extended?: { [key:string]: any },
  hasStartedBoolean: boolean,
  isActiveBooleans: boolean[],
  isActiveCallback: (IntervalID) => void,
  isNotActiveCallback: emptyFncType,
  ms:number,
}