export const Prototypes = () => 
{
  Date.prototype.getDaysOfWeek = () => ['Sun','Mon','Tues','Wed','Thu','Fri','Sat'];
  Date.prototype.getTitleFormattedDate = () => `${ new Date().getMonth()+1}.${new Date().getDate()} ${new Date().getFullYear()}`
  Date.prototype.getMonthsOfYear = (returnFullName:boolean) => returnFullName
                                                                ? ["January", "February", "March", "April", "May","June","July", "August", "September", "October", "November","December"]
                                                                : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  Date.prototype.getNamedMonth = (indx:number, returnFullName:boolean) => returnFullName
                                                                ? ["January", "February", "March", "April", "May","June","July", "August", "September", "October", "November","December"][indx]
                                                                : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][indx]
  Date.prototype.getNamedDay = (indx:number, returnFullName:boolean) => returnFullName
                                                                ? ['Sunday','Monday','Tuesday','Wedday','Thuday','Friday','Saturday'][indx]
                                                                : ['Sun','Mon','Tues','Wed','Thu','Fri','Sat'][indx]
  Date.prototype.getEpochRange = (startDate, endDate) => [new Date(startDate).getTime(), new Date(endDate).getTime()]
  Date.prototype.getRandomDate = (past,future) =>
  { //defaults to a 30 day range with `new Date()` as mid-point
    const currentTime = new Date().getTime(),
          dayInMS = 1000*60*60*24,
          offsetFuture = (future || 15)*dayInMS,
          offsetPast = (past || 15)*dayInMS,
          rangeEnd = currentTime+offsetFuture,
          rangeStart = currentTime-offsetPast,
          timestamp = Math.random()*rangeEnd-rangeStart
    return new Date(timestamp)
  }
  Date.prototype.getFullCalendarDates = (dt:Date) =>
  {
    const first = new Date(dt.getFullYear(), dt.getMonth(), 1),
          last = new Date(dt.getFullYear(), dt.getMonth() + 1, 0),
          startDay = new Date(first).getDay(),
          endDay = new Date(last).getDay(),
          startDayEpoch = new Date(first).getTime(),
          endDayEpoch = new Date(last).getTime(),
          daysInMonth = new Date(dt.getFullYear(), 
                                  dt.getMonth()+1,0).getDate(),
          daysLastMonth = new Date(dt.getFullYear(), 
                                  dt.getMonth(),0).getDate(),
          retDates = {
            numbered:[],
            epoch:[]
          },
          msInDay = 24*60*60*1000,
          totalIndexes = (startDay+daysInMonth > 5*7) ? 6*7 : 5*7
    for(let i=0; i<totalIndexes; i++)
    {
      if(i < startDay)
      {
        retDates.epoch.push(startDayEpoch-((startDay-i)*msInDay))
        retDates.numbered.push(daysLastMonth-(startDay-i)+1)
      }
      else if(i < daysInMonth+startDay)
      {
        retDates.epoch.push(startDayEpoch+((i-startDay)*msInDay))
        retDates.numbered.push(i-startDay+1)
      }
      else
      {
        retDates.epoch.push(startDayEpoch+((i-startDay)*msInDay))
        retDates.numbered.push(i-(daysInMonth+startDay)+1)
      }
    }
    return retDates
  }

  //MATH
  Math.msInDay = () => {return 24*60*60*1000}
  
  //STRING
  String.prototype.removeClasses = (a) => a.replace(/(\s?class="[\w\d\s"]*)/g,'')
}