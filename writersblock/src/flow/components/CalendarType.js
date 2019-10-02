type CellTaskType = { id:string }

export type CellPropsType = {
  active:boolean,
  date:number,
  epoch:number,
  task:?CalendarFetchDataType
}
export type ColumnDayPropsType = {day:string}

type PostItType = {
  id: string,
  active: boolean,
  created_by: string,
  created_on: Date,
  date: number,
  description: string,
  title: string,
}
export type PostItPropsType = {
  content: Array<PostItType>
}

export type SkeuomorphPropsType = {
  active:boolean,
  date:string,
  description?:string,
  title:string,
}

export type CalendarFetchDataType = {
  id:string,
  created_by:string,
  created_on:Date,
  updated_on?:Date,
  date:Date
}
export type WeekPropsType = {
  content:Array<CalendarFetchDataType>,
  dates:number[],
  epochs:number[],
  weekPosition:number
}
export type WeekRowsPropsType = {
  activeDate:Date,
  content:Array<CalendarFetchDataType>
}