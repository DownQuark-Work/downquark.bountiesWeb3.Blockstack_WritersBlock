import React, { Fragment, useEffect, useRef, useState } from 'react'
import { styled } from 'styletron-react'

type Props = {
    css?:any,
    type?: string //future builds with differnt images/emojis/etc
}
const InlineLoader = (props: Props) =>
{
    const InlineLoaderDiv = styled('div', {
      background:'transparent',
        display:'inline-block',
        ...props.css
    })
    //allClocks results in jumpiness as hand positions switch
  // const allClocks = ['🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚', '🕛', '🕜', '🕝', '🕞', '🕟', '🕠', '🕡', '🕢', '🕣', '🕤', '🕥', '🕦', '🕧'],
  const clocks = ['🕑', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚', '🕛'],
        [curClock, setCurClock] = useState(clocks[0])
    let curClockIndex = useRef(0)

    useEffect(() =>
    {
      let clockInterval = setInterval(() =>
      {
        setCurClock(clocks[curClockIndex.current++ % clocks.length])
      },100)
      
      //cleanup
      return () => { clearInterval(clockInterval); }
    }, [clocks])

    return (
        <InlineLoaderDiv>
          {curClock}
        </InlineLoaderDiv>
    )
}
InlineLoader.displayName = 'InlineLoader'

export default InlineLoader