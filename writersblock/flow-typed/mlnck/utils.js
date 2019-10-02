declare type Action = { type: string, payload?: any }
declare type boolArrayStringFncType = (bool) => string[]
declare type emptyFncType = () => void
declare type emptyNumberFncType = () => number
declare type emptyStringFncType = () => string
declare type emptyArrayStringFncType = () => string[]
declare type stringVoidFncType = (string) => void

declare type ObjOfArrayStr = {[key: string]: string[] }
declare type ObjOfBool = {[key: string]: boolean }
declare type ObjOfNum = {[key: string]: number }
declare type ObjOfStr = {[key: string]: string }
declare type ObjOfStrOrNum = {[key: string]: string | number }

declare type RefObjOfArrayStr = {current:ObjOfArrayStr}
declare type RefObjOfStr = {current:ObjOfStr}