declare class Date extends Date {
  getDaysOfWeek:emptyArrayStringFncType,
  getEpochRange:([Date, Date]) => [number, number],
  getFullCalendarDates:(Date) => {epoch:number[],numbered:number[]},
  getMonthsOfYear:boolArrayStringFncType,
  getTitleFormattedDate:emptyStringFncType,
  getNamedDay:(number,boolean) => string,
  getNamedMonth:(number,boolean) => string,
  getRandomDate:(?number,?number) => Date
}

declare class Math extends Math {
  msInDay:() => number
}

declare class String extends String {
  removeClasses:(string) => string
}