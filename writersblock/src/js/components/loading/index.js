import type {LoadingLinePropsType, LoadingPropsType} from '../../../flow/components/CommonTypes'

import React, {Fragment, useEffect, useState} from 'react'
import {styled} from 'styletron-react'

// import {ActionTimeIteration} from '../../context/actions'

const LoadingLine = (props:LoadingLinePropsType):React$Node =>
{
  const {
    color,
    content,
    fontSize,
    letterSpacingDenominator,
    lineAmt,
    lineCharAmt,
    ms,
    padding,
    pos,
    pretext,
    writingSpeed} = props,
    bottom = ~pos.indexOf('B') ? 0 : 'unset',
    fsNum = parseInt(fontSize.replace(/\D/g,'')),
    fsMeasure = fontSize.replace(/\d/g,''),
    left = ~pos.indexOf('L') ? 0 : 'unset',
    letterSpacing = `-${fsNum/letterSpacingDenominator}${fsMeasure}`,
    marginTop = ~pos.indexOf('M') ? `-${fsNum/2}${fsMeasure}` : 'unset',
    right = ~pos.indexOf('R') ? 0 : 'unset',
    textAlign = ~pos.indexOf('R') ? 'right' : ~pos.indexOf('C') ? 'center' : 'left',
    top = ~pos.indexOf('T') ? 0 : ~pos.indexOf('M') ? '50%' : 'unset'
  
  const [loadingContent, setLoadingContent] = useState(0)

  const Line = styled('p', {
      bottom,
      color,
      fontSize,
      left,
      letterSpacing,
      lineHeight:fontSize,
      marginBottom:0,
      marginTop,
      padding,
      position:'absolute',
      right,
      textAlign,
      fontStyle:'italic',
      top,
      width:'100%'
    })
  
  const txt = [],
        totOffset = (lineAmt-1) * fsNum
  let   charsInPrevLines = 0

  for(let i=0; i<lineAmt; i++)
  {
    const curLoadingContent = () =>
    {
      const charactersOnCurrentLine = Math.min(Math.max(loadingContent-charsInPrevLines,0), lineCharAmt[i]),
            currentLineContent = Array.from({length:charactersOnCurrentLine}, () => props.content)
      i === 0 && pretext.length && currentLineContent.unshift(pretext)
      charsInPrevLines += lineCharAmt[i]
      return currentLineContent
    }

    const curOffset = i*fsNum,
          midPt = Math.floor(lineAmt/2),
        fnlOffset = top === 'unset' ? {bottom:(totOffset-curOffset)+fsMeasure}
                      : top === '50%' ? 
                          i<=midPt
                            ? {marginTop:(-1*totOffset+(midPt*fsNum)-(fsNum/2)+curOffset)+fsMeasure} // fsNum/2 is original margin-top offset (for use with single line)
                            : {marginTop:0, paddingTop:(curOffset-(midPt*fsNum)-(fsNum/2*(lineAmt%2?1:-1)))+fsMeasure} // need to account for original offset
                      : {top:curOffset+fsMeasure}

    txt.push( <Line key={i} style={fnlOffset}>{curLoadingContent()}</Line> )
  }

  useEffect(() =>
  {
    
    let interval = null,
        isActive = loadingContent < charsInPrevLines
    if (isActive)
    {
      interval = setInterval(() => 
      { setLoadingContent(loadingContent => loadingContent + 1); }, ms)
    }
    else if (!isActive && loadingContent !== 0)
    {
      clearInterval(interval)
      setLoadingContent(0)
    }
    return () => clearInterval(interval)
  }, [charsInPrevLines, loadingContent, ms])

  return <>{txt}</>
}

let lineAmtPersist = null,
    lineCharAmtPersist = null
      
const Loading =  (props:LoadingPropsType):React$Node =>
{
  const {charAmtRange, lineAmtRange, writingSpeedRange} = props,
        charAmtMax = (charAmtRange && charAmtRange[1]) ||  10,
        charAmtMin = (charAmtRange && charAmtRange[0]) ||  1,
        color = props.color || '#000',
        content = props.content || '~',
        fontSize = props.fontSize || '3rem',
        letterSpacingDenominator = props.letterSpacingDenominator || 6, //not sure why, but 6 is a pretty solid default
        lineAmtMax = (lineAmtRange && lineAmtRange[1]) ||  5,
        lineAmtMin = (lineAmtRange && lineAmtRange[0]) ||  1,
        lineAmt = lineAmtPersist || Math.round(Math.random()*lineAmtMax+lineAmtMin),
        lineCharAmt = lineCharAmtPersist || Array.from({length: lineAmt}, () => Math.round(Math.random()*charAmtMax+charAmtMin)),
        ms = props.ms || 150,
        padding = props.padding || '1rem',
        pos = props.pos || 'TL',
        pretext = props.pretext || '',
        writingSpeedMax = (writingSpeedRange && writingSpeedRange[0]) ||  5,
        writingSpeedMin = (writingSpeedRange && writingSpeedRange[0]) ||  1,
        writingSpeed = Math.round(Math.random()*writingSpeedMax+writingSpeedMin),
        lineProps = {color, content, fontSize, letterSpacingDenominator, lineAmt, lineCharAmt, ms, padding, pos, pretext, writingSpeed}

  lineAmtPersist = lineAmt
  lineCharAmtPersist = lineCharAmt

  const LoadingWrapper = styled('div', {
          backgroundColor: props.backgroundRGBA || 'rgba(255,255,255,.7)',
          height:'100%',
          left:0,
          position:'fixed',
          top:0,
          zIndex: props.z || 100,
          width:'100%'
        })
  return (<LoadingWrapper>
            {LoadingLine(lineProps)}
          </LoadingWrapper>)
}
Loading.displayName = 'Loading'

export default Loading