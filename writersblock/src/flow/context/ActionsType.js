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
  opts?:{
    method?: string, // *GET, POST, PUT, DELETE, etc.
    mode?: string, // no-cors, *cors, same-origin
    cache?: string, // *default, no-cache, reload, force-cache, only-if-cached
    credentials?: string, // include, *same-origin, omit
    headers?: {
      'Content-Type'?: string // 'Content-Type': 'application/x-www-form-urlencoded', 'application/json'
    },
    redirect?: string, // manual, *follow, error
    referrer?: string, // no-referrer, *client
    body?: string //JSON.stringify(data) // body data type must match "Content-Type" header
  },
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