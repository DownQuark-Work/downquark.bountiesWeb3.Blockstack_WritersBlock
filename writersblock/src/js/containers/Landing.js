import React, {useContext, useReducer, useRef} from 'react'
import {styled} from 'styletron-react'
import { WritersBlockContext } from '../base/Root'
import JournalBase from '../components/journal/Base'
import JournalClassMap from '../components/journal/ContentClassMap'

import * as blockstack from 'blockstack'

// import bootstrapCSS  from '../context/constants/app/cssBootstrap'
// import landingCSS from '../context/constants/app/cssLanding'
// import landingImage from '../context/constants/app/datauri/landing-writersblock'

const Landing = () =>
{
  const blockstackSignIn = (e) =>
  { e.preventDefault()
    e.stopPropagation()
    blockstack.redirectToSignIn()
  }

  const classMapRef:RefObjOfArrayStr = useRef({})

  const configureClassMap = (ref:HTMLDivElement) =>
  {
    if(Object.keys(classMapRef.current).length){ return}

    const parseClasses = (itm:$FlowReactBug) =>
    {
      for(let i:number=0; i<itm.attributes.length; i++)
      {
        if(itm.attributes[i].name === 'data-wysiwyg-class-map')
        {
          const attrMap = itm.attributes[i].value
          classMapRef.current[attrMap] = [itm.tagName.toLowerCase(), itm.className]
          break;
        }
      }
    }
    const getRecursiveClasses = (itm:Node) =>
    {
      if(itm.childNodes.length > 1)
      {
        for(let j:number=0; j<itm.childNodes.length; j++)
        {
          //https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
          if(itm.childNodes[j].nodeType === 1){ getRecursiveClasses(itm.childNodes[j]) }
        }
      }
      parseClasses(itm)
    }
    ref.childNodes.forEach((itm:Node,indx) => { getRecursiveClasses(itm) })
  }

  const Container = styled('div', {
          float: 'left',
          padding: '1em',
          width:  '100%'
        }),
        Wrapper = styled('div', {
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: '80em'
        })


  return (
    <Wrapper> 
      <Container>
        <JournalClassMap classMapRef={classMap => classMap && configureClassMap(classMap) } />
        <JournalBase wysiwygDisplayed={false} classMaps={classMapRef} />
      </Container>
      {/* {!calendarContent.loading && <PostItBase />} */}
      {/* <LinedPaperBase>
        <p>These are your notes</p>
        <p>They will be visible only to you and will remain persistent from day to day.</p>
      </ LinedPaperBase> */}
    </Wrapper>
  )
}
Landing.displayName = 'LandingPage'

export default Landing