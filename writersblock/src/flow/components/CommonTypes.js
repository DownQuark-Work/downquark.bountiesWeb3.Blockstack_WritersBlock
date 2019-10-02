export type CommonWrapperScrollablePropsType = {
  children: string | React$Node,
  direction?: 'x' | 'y',
  h?: string,
  w?: string,
  styles:ObjOfStr
}

type AnimationOptions = {
  name?:string,
  duration?:string,
  delay?:string,
  iterationCount?:number | string,
  direction?:string,
  timingFunction?:string,
  fillMode?:string,
}
export type CommonWrapperAnimatedPropsType = {
  children: string | React$Node,
  animOptions: AnimationOptions,
  animFrom: ObjOfStrOrNum,
  animTo: ObjOfStrOrNum,
  styleBase?: ObjOfStrOrNum,
}

export type LoadingPropsType = {
  backgroundRGBA?:string,
  charAmtRange?:Array<number>,
  color?:string,
  content?:string,
  fontSize?:string,
  letterSpacingDenominator?:number,
  lineAmtRange?:Array<number>,
  ms?:number,
  padding?:string,
  pretext?:string,
  pos?: 'TL' | 'TC' | 'TR' |
        'ML' | 'MC' | 'MR' |
        'BL' | 'BC' | 'BR',
  writingSpeedRange?:Array<number>,
  z?:number
}
export type LoadingLinePropsType = {
  color:string,
  content:string,
  fontSize:string,
  letterSpacingDenominator:number,
  lineAmt:number,
  lineCharAmt:Array<number>,
  ms:number,
  padding:string,
  pos:string,
  pretext:string,
  writingSpeed:number,
}