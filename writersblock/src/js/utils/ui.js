export const activeBorder = {
  backgroundColor:'#efefef',
  borderBottomColor: 'rgba(151, 1, 1,1)',
  borderLeftColor: 'rgba(151, 1, 1,1)',
  borderRightColor: 'rgba(151, 1, 1,1)',
  borderTopColor: 'rgba(151, 1, 1,1)',
  borderBottomLeftRadius: '75px 275px',
  borderBottomRightRadius: '275px 75px',
  borderTopRightRadius: '75px 205px',
  borderTopLeftRadius: '205px 75px',
  borderBottomStyle: 'solid',
  borderLeftStyle: 'ridge',
  borderRightStyle: 'none',
  borderTopStyle: 'none',
  borderBottomWidth: '3px',
  borderLeftWidth: '2px',
  borderRightWidth: '10px',
  borderTopWidth: '9px',
  position:'relative',
  ':before': {
    content: '""',
    right: '0',
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: '0',
    
    borderBottomColor: 'rgba(151, 1, 1,1)',
    borderLeftColor: 'rgba(151, 1, 1,1)',
    borderRightColor: 'rgba(151, 1, 1,1)',
    borderTopColor: 'rgba(151, 1, 1,1)',
    
    borderBottomLeftRadius: '75px 275px',
    borderBottomRightRadius: '175px 175px',
    borderTopRightRadius: '350px 165px',
    borderTopLeftRadius: '190px 185px',
    
    borderBottomStyle:'none',
    borderLeftStyle:'none',
    borderRightStyle:'solid',
    borderTopStyle:'ridge',

    borderBottomWidth: '3px',
    borderLeftWidth: '2px',
    borderRightWidth: '3px',
    borderTopWidth: '1px',
  }
}
export const cornerBorder = () =>
{
  return {
    background: `linear-gradient(to right, black 4px, transparent 4px) 0 0/20px 20px no-repeat,
    linear-gradient(to right, black 4px, transparent 4px) 0 100%/20px 20px no-repeat,
    linear-gradient(to left, black 4px, transparent 4px) 100% 0/20px 20px no-repeat,
    linear-gradient(to left, black 4px, transparent 4px) 100% 100%/20px 20px no-repeat,
    linear-gradient(to bottom, black 4px, transparent 4px) 0 0/20px 20px no-repeat,
    linear-gradient(to bottom, black 4px, transparent 4px) 100% 0/20px 20px no-repeat,
    linear-gradient(to top, black 4px, transparent 4px) 0 100%/20px 20px no-repeat,
    linear-gradient(to top, black 4px, transparent 4px) 100% 100%/20px 20px no-repeat`,
    lineHeight: '40px',
    margin: '20px'
  }
}
export const dynamicCornerBorder = (props) =>
{
  const { borderWidth, color, cornerCoverage, lineHeight, margin, padding } = props
  return {
    background: `linear-gradient(to right, ${color} ${borderWidth}, transparent ${borderWidth}) 0 0/${cornerCoverage} ${cornerCoverage} no-repeat,
    linear-gradient(to right, ${color} ${borderWidth}, transparent ${borderWidth}) 0 100%/${cornerCoverage} ${cornerCoverage} no-repeat,
    linear-gradient(to left, ${color} ${borderWidth}, transparent ${borderWidth}) 100% 0/${cornerCoverage} ${cornerCoverage} no-repeat,
    linear-gradient(to left, ${color} ${borderWidth}, transparent ${borderWidth}) 100% 100%/${cornerCoverage} ${cornerCoverage} no-repeat,
    linear-gradient(to bottom, ${color} ${borderWidth}, transparent ${borderWidth}) 0 0/${cornerCoverage} ${cornerCoverage} no-repeat,
    linear-gradient(to bottom, ${color} ${borderWidth}, transparent ${borderWidth}) 100% 0/${cornerCoverage} ${cornerCoverage} no-repeat,
    linear-gradient(to top, ${color} ${borderWidth}, transparent ${borderWidth}) 0 100%/${cornerCoverage} ${cornerCoverage} no-repeat,
    linear-gradient(to top, ${color} ${borderWidth}, transparent ${borderWidth}) 100% 100%/${cornerCoverage} ${cornerCoverage} no-repeat`,
    lineHeight,
    margin,
    padding
  }
}

export const dynamicBorder = () =>
{
  const corner1 = (Math.random() * 10) + 220,
        corner2 = (Math.random() * 10) + 10

  return {
    borderBottomColor: `rgba(4, 6, 5, ${Math.max(.3,Math.random())})`,
    borderLeftColor: `rgba(4, 6, 5, ${Math.max(.3,Math.random())})`,
    borderRightColor: `rgba(4, 6, 5, ${Math.max(.3,Math.random())})`,
    borderTopColor: `rgba(4, 6, 5, ${Math.max(.3,Math.random())})`,
    borderBottomRightRadius: `${corner1}px ${corner2}px`,
    borderBottomLeftRadius: `${corner1}px ${corner2}px`,
    borderTopLeftRadius: `${corner1}px ${corner2}px`,
    borderTopRightRadius: `${corner1}px ${corner2}px`,
    borderBottomStyle: Math.random() > .7 ? 'none' : 'solid',
    borderLeftStyle: Math.random() > .9 ? 'none' : 'solid',
    borderRightStyle: Math.random() > .8 ? 'none' : 'solid',
    borderTopStyle: Math.random() > .9 ? 'none' : 'solid',
    borderBottomWidth: `${Math.random() > .5 ? 1 : 2}px`,
    borderLeftWidth: `${Math.random() > .5 ? 1 : 2}px`,
    borderRightWidth: `${Math.random() > .5 ? 1 : 2}px`,
    borderTopWidth: `${Math.random() > .5 ? 1 : 2}px`,
  }
}

export const dynamicBorderHover = {
  backgroundColor: 'rgba(248,236,194,.8)',
  borderBottomColor: `rgba(4, 6, 5, ${Math.max(.3, Math.random())})`,
  borderLeftColor: `rgba(4, 6, 5, ${Math.max(.3, Math.random())})`,
  borderRightColor: `rgba(4, 6, 5, ${Math.max(.3, Math.random())})`,
  borderTopColor: `rgba(4, 6, 5, ${Math.max(.3, Math.random())})`,
}