export const createContextConstants = (o:ObjOfStrOrNum, s?:string ):ObjOfStr => 
{
  const obj:ObjOfStr = {}
  for (let k:string in o)
  {
    const newKey = k.split('.').pop()
    if(s && newKey === s){ return {k:k}}
    obj[newKey] = k
  }
  return obj
}