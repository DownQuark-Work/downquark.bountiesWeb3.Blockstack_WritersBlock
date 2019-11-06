import React, { useCallback, useDebugValue, useEffect, useLayoutEffect, useRef, useState } from 'react';

export const useJournalContent = (cntnt:string, classMap:{current:ObjOfArrayStr}, wysiwygVisible:boolean) =>
{
  //if below ever starts acting up we have an option to refactor.
  //will be a good amount of effor but would bring us back in-line with styletron
    // https://www.styletron.org/api/#usestyletron
  const [journalContent, setJournalContent] = useState(cntnt);
  useLayoutEffect(() =>
    {
      if(cntnt.length)
      {
        const splitStr = 'data-wysiwyg-class-map',
              classless = cntnt.replace(/(\s?class="[\w\d\s"]*)/g,'').replace(/first-paragraph/g,'paragraph'),
              classes = classless.replace('paragraph',wysiwygVisible ? 'paragraph' : 'first-paragraph'),
              classesArr = classes.split(splitStr),
              classed = classesArr.map(itm =>
              {
                const elemMatch = /([\w-]+")/
                let elemKey = itm.match(elemMatch)
                    elemKey = elemKey && elemKey[0].replace('"','')
                const classedItm = itm.replace(elemMatch,`$1 class="${(elemKey && classMap.current[elemKey]) ? classMap.current[elemKey][1] : ''}"`)
                return classedItm
              })
        setJournalContent(classed.join(splitStr))
      }
      else { setJournalContent('') }
    },
    [classMap, cntnt, wysiwygVisible]
  )
  // console.dev('journal', 'journalContent',journalContent)
  return journalContent
}

export const useWysiwygConfig = (curConfig:$FlowCurrentBranch) =>
{
  // This function will return what buttons in the Wysiwyg are (de)activated
    // This function will be used to allow user interactions for extended wysiwyg funtionality
    // This will be activated by BaseWysiwyg.js when the useEffect function has been created successfully
      // pick the highlighter color
      // allow strikethrough additional text
        /// etc
  const [wysiwygConfig, setWysiwygConfig] = useState(null);

  useEffect(() =>
    {
      curConfig && setWysiwygConfig(curConfig);
    },
    [curConfig]
  )

  return wysiwygConfig;
}

export const useHover = () =>
{
  const [value, setValue] = useState(false);
	
  // Wrap in useCallback so we can use in dependencies below
  const handleMouseOver = useCallback(() => setValue(true), []);
  const handleMouseOut = useCallback((e) =>
  {
    if(//data-allow-children will not cause rolloff when mouse over a child element
      ref.current.getAttribute('data-allow-children')
      && !ref.current.contains(e.toElement)
    ){ setValue(false) }
  }, []);

  // Keep track of the last node passed to callbackRef
  // so we can remove its event listeners.
  const ref = useRef();
  
  // Use a callback ref instead of useEffect so that event listeners
  // get changed in the case that the returned ref gets added to
  // a different element later. With useEffect, changes to ref.current
  // wouldn't cause a rerender and thus the effect would run again.
  const callbackRef = useCallback(
    node =>
    {
      if (ref.current)
      {
        ref.current.removeEventListener("mouseover", handleMouseOver)
        ref.current.removeEventListener("mouseout", handleMouseOut)
      }

      ref.current = node

      if (ref.current)
      {
        ref.current.addEventListener("mouseover", handleMouseOver)
        ref.current.addEventListener("mouseout", (e) => handleMouseOut(e))
      }
    },
    [handleMouseOver, handleMouseOut]
  );
  // console.warn('RESET DEFAULT TO `[callbackRef, value]` WHEN FINISHED DEBUG')
  // return [callbackRef, true]
  return [callbackRef, value]
}