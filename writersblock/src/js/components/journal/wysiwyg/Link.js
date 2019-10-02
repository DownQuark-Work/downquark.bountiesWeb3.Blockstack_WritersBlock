import type {WysiwygDecoratorCommonPropsType} from '../../../../flow/components/WysiwygTypes'

import React, {Fragment, useRef} from 'react'
import { styled } from 'styletron-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {createContextConstants} from '../../../utils/context'
import {WysiwygConstantsEnum, WysiwygConstantsKey} from '../context/constants'

const LinkDrawerComponent = (classMap:ObjOfArrayStr, setStrikethroughFormat:$FlowTesting) =>
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
            linkText:'#'
          }
        } : {}

  const selectionRef = useRef(clonedSelect),
        selectionReplacable = selectionRef.current.begin.element === selectionRef.current.end.element,
        strikethroughText = selectionReplacable
                              ? 'Optional Override Text'
                              : 'Optional text cannot be added when selection spans multiple elements'

  console.log('selectionRef', selectionRef)

  const LinkSelectionButton = styled('div', {
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
        handleLinkTextUpdate = (elm:$FlowTesting) =>
        { selectionRef.current.txt.linkText = elm.currentTarget.value },
        getStrikethroughInformation = (elm:$FlowTesting) =>
        {
          const applyLinkText = selectionRef.current.txt.linkText.length ? selectionRef.current.txt.linkText : '#',
                applyTag =`<a href="${applyLinkText}" target="_blank" data-wysiwyg-class-map="${elm.currentTarget.getAttribute('datahighlightclassmap')}" class="${elm.currentTarget.getAttribute('datahighlightclass')}">`
          setStrikethroughFormat('LINK', applyTag, selectionRef.current)
        }
  return (<>
            {selectionReplacable && <StrikethroughOptionalTextInput placeholder='http://' onChange={handleLinkTextUpdate} />}
            <LinkSelectionButton
              datahighlightclass={classMap.link[1]}
              datahighlightclassmap={'link'}
              onClick={e => getStrikethroughInformation(e)}>
                Add Link
            </LinkSelectionButton>
          <i style={{opacity:.6}}>{!selectionReplacable && strikethroughText}</i>
        </>)
}

const Link = (props:WysiwygDecoratorCommonPropsType) =>
{
  const {commonCss, setDrawerContent, setFormat} = props,
        WysiwygDecoratorLink = styled('button', {...props.commonCss})

  return (
    <WysiwygDecoratorLink
      type="button"
      // onClick={() => setFormat(WysiwygConstantsKey.WYSIWYG_LINK_SELECT)}
      onMouseOver={() => setDrawerContent({drawerComponent: LinkDrawerComponent, message:'Enter link url: '})}
      onMouseOut={() => setDrawerContent({drawerComponent: LinkDrawerComponent, message:'Enter link url: '})}>
        <FontAwesomeIcon icon='link' size='2x'/>
      </WysiwygDecoratorLink>
  )
}
Link.displayName = 'WysiwygDecoratorLink'

export default Link