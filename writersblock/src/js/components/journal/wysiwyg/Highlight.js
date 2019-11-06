import type {WysiwygDecoratorCommonPropsType} from '../../../../flow/components/WysiwygTypes'

import React, {useRef} from 'react'
import { styled } from 'styletron-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {createContextConstants} from '../../../utils/context'
import {WysiwygConstantsEnum, WysiwygConstantsKey} from '../context/constants'

const HighLightDrawerComponent = (classMap:ObjOfArrayStr, setHighlightedFormat:$FlowCurrentBranch) =>
{
  const curSelection = window.getSelection(),
        highlightArray = Object.keys(classMap).filter(itm => !!~itm.indexOf('highlight-'))

console.dev('journal', 'curSelection',{...curSelection})
const clonedSelect = curSelection ? {
  begin:{
    element:curSelection.anchorNode,
    index:curSelection.anchorOffset
  },
  end:{
    element:curSelection.focusNode,
    index:curSelection.focusOffset
  },
  txt:{
    range:curSelection.rangeCount,
    selectedTxt:curSelection.toString()
  }
} : {}

const selectionRef = useRef(clonedSelect)

  const HighlightSelectionButton = styled('div', {
          cursor:'pointer',
          display:'inline-block',
          border:'1px solid #c9c9c9',
          borderRadius:'25%',
          height:'1rem',
          marginRight:'.2rem',
          marginBottom:'-.2rem',
          width:'1rem',
          ':hover': {
            borderColor:'#666'
          }
        }),
        HighlightComponents = highlightArray.map((itm) =>
        {
          const getHighlightInformation = (elm:$FlowCurrentBranch) =>
          {
            const applyTag =`<mark data-wysiwyg-class-map="${elm.currentTarget.getAttribute('datahighlightclassmap')}" class="${elm.currentTarget.getAttribute('datahighlightclass')}">`
            setHighlightedFormat('HIGHLIGHT', applyTag, selectionRef.current)
          }
          return <HighlightSelectionButton 
                    key={btoa(itm)}
                    className={classMap[itm][1]}
                    datahighlightclass={classMap[itm][1]}
                    datahighlightclassmap={itm}
                    onClick={e => getHighlightInformation(e)}
                  />
        })
  return HighlightComponents
}

const HighLight = (props:WysiwygDecoratorCommonPropsType) => //This is the background color example component
{
  const {commonCss, setDrawerContent, setFormat} = props,
        WysiwygDecoratorHighLight = styled('button', {...props.commonCss})

  return (
    <WysiwygDecoratorHighLight
      type="button"
      onClick={() => setFormat(WysiwygConstantsKey.WYSIWYG_HIGHLIGHT_SELECT)}
      onMouseOver={() => setDrawerContent({drawerComponent: HighLightDrawerComponent, message:'Please Select a Color From the Following: '})}
      onMouseOut={() => setDrawerContent({drawerComponent: HighLightDrawerComponent, message:'Please Select a Color From the Following: '})}>
        <FontAwesomeIcon icon='highlighter' size='2x'/>
      </WysiwygDecoratorHighLight>
  )
}
HighLight.displayName = 'WysiwygDecoratorHighLight'

export default HighLight