import type {WysiwygDecoratorCommonPropsType} from '../../../../flow/components/WysiwygTypes'

import React, {Fragment, useRef} from 'react'
import { styled } from 'styletron-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {createContextConstants} from '../../../utils/context'
import {WysiwygConstantsEnum, WysiwygConstantsKey} from '../context/constants'

const StrikethroughDrawerComponent = (classMap:ObjOfArrayStr, setStrikethroughFormat:$FlowCurrentBranch) =>
{
  const curSelection = window.getSelection(),
        clonedSelect = curSelection ? {
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
            selectedTxt:curSelection.toString(),
            overwriteText:'',
            overwriteClass:null
          }
        } : {}

  const selectionRef = useRef(clonedSelect),
        selectionReplacable = selectionRef.current.begin.element === selectionRef.current.end.element,
        strikethroughText = selectionReplacable
                              ? 'Optional Override Text'
                              : 'Optional text cannot be added when selection spans multiple elements'

  console.log('selectionRef', selectionRef)

  const StrikethroughSelectionButton = styled('div', {
          backgroundColor:'rgba(185,185,185,.4)',
          cursor:'pointer',
          display:'inline-block',
          border:'1px solid #c9c9c9',
          borderRadius:'.2rem',
          color: '#222',
          fontFamily:'monospace',
          fontSize:'.75rem',
          marginLeft: '.2rem',
          marginRight:'.2rem',
          padding:'.1rem',
          ':hover': {
            borderColor:'#666'
          }
        }),
        StrikethroughOptionalTextInput = styled('input', {
          marginLeft:'.4rem',
          marginRight:'.4rem',
          minWidth:'50%'
        }),
        handleOverwriteTextUpdate = (elm:$FlowCurrentBranch) =>
        { selectionRef.current.txt.overwriteText = elm.currentTarget.value },
        getStrikethroughInformation = (elm:$FlowCurrentBranch) =>
        {
          const applyTag =`<s data-wysiwyg-class-map="${elm.currentTarget.getAttribute('datahighlightclassmap')}" class="${elm.currentTarget.getAttribute('datahighlightclass')}">`
          if (selectionRef.current.txt.overwriteText.length)
          {
            selectionRef.current.txt.overwriteClass = [
              elm.currentTarget.getAttribute('dataoverwriteclassmap'), 
              elm.currentTarget.getAttribute('dataoverwriteclass')
            ]
          }
          setStrikethroughFormat('STRIKETHROUGH', applyTag, selectionRef.current)
        }
  return (<>
            {selectionReplacable && <StrikethroughOptionalTextInput placeholder={strikethroughText} onChange={handleOverwriteTextUpdate} />}
            <StrikethroughSelectionButton
              datahighlightclass={classMap.strike[1]}
              datahighlightclassmap={'strike'}
              dataoverwriteclass={classMap['strike-replacement'][1]}
              dataoverwriteclassmap={classMap['strike-replacement'][0]}
              onClick={e => getStrikethroughInformation(e)}>
                Apply Strikethrough
            </StrikethroughSelectionButton>
          <i style={{opacity:.6}}>{!selectionReplacable && strikethroughText}</i>
        </>)
}

const Strikethrough = (props:WysiwygDecoratorCommonPropsType) =>
{
  const {commonCss, setDrawerContent, setFormat} = props,
        WysiwygDecoratorStrikethrough = styled('button', {...props.commonCss})

//will need to make sure queryCommandSupported('sup') works before allowing edit
  return (
    <WysiwygDecoratorStrikethrough
      type="button"
      // onClick={() => setFormat('strikeThrough')}
      onMouseOver={() => setDrawerContent({drawerComponent: StrikethroughDrawerComponent, message:''})}
      onMouseOut={() => setDrawerContent({drawerComponent: StrikethroughDrawerComponent, message:''})}>
        <FontAwesomeIcon icon='strikethrough' size='2x'/>
      </WysiwygDecoratorStrikethrough>
  )
}
Strikethrough.displayName = 'WysiwygDecoratorStrikethrough'

export default Strikethrough