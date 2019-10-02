import React, { useDebugValue, useState, useEffect, useLayoutEffect } from 'react';

export const useJournalContent = (cntnt:string, classMap:{current:ObjOfArrayStr}, wysiwygVisible:boolean) =>
{
  const [journalContent, setJournalContent] = useState(null);
  useLayoutEffect(() =>
    {
      if(cntnt)
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
                const classedItm = itm.replace(elemMatch,`$1 class="${elemKey ? classMap.current[elemKey][1] : ''}"`)
                return classedItm
              })
        setJournalContent(classed.join(splitStr));
      }
    },
    [classMap, cntnt, wysiwygVisible]
  )
  // console.log('journalContent',journalContent)
  // useDebugValue(journalContent);
  return journalContent
}

export const useJournalContentMouseLeave = (curContent:string, origContent:string) =>
{
  const [newContent, setNewContent] = useState(origContent)

  useLayoutEffect(() =>
  {
    if(curContent !== origContent)
    {
      console.log('update to curContent',curContent)
    }
  },
  [curContent, origContent])

  return newContent
}

export const useWysiwygConfig = (curConfig:$FlowTesting) =>
{
  // console.log('This function will return what buttons in the Wysiwyg are (de)activated')
  console.log('This function will be used to allow user interactions for extended wysiwyg funtionality')
  console.log('This will be activated by BaseWysiwyg.js when the useEffect function has been created successfully');
    // pick the highlighter color
    // allow strikethrough additional text
      /// etc
  const [wysiwygConfig, setWysiwygConfig] = useState(null);

  useEffect(() =>
    {
      console.log('curConfig',curConfig)
      curConfig && setWysiwygConfig(curConfig);
    },
    [curConfig]
  )

  // // useDebugValue(WysiwygConfig);
  return wysiwygConfig;
}


//Generic Hook Info
    //https://reactjs.org/docs/hooks-faq.html#how-to-read-an-often-changing-value-from-usecallback
    /*
      If the new state is computed using the previous state, you can pass a function to setState.
      - const [count, setCount] = useState(initialCount)
      - <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
    */
    //https://reactjs.org/docs/hooks-reference.html#usedebugvalue
    //https://reactjs.org/docs/hooks-reference.html#usememo
      /* useCallback(fn, deps) is equivalent to useMemo(() => fn, deps) */
    //https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
    //https://reactjs.org/docs/hooks-reference.html#cleaning-up-an-effect
    //https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects
    //https://reactjs.org/docs/hooks-reference.html#timing-of-effects
      //https://reactjs.org/docs/hooks-reference.html#uselayouteffect

  //Custom Hook Creation Info
    //https://reactjs.org/docs/hooks-custom.html#extracting-a-custom-hook
    /* we can call useState and useEffect many times in one component, and they will be completely independent. */
      //https://reactjs.org/docs/hooks-state.html#tip-using-multiple-state-variables
      //https://reactjs.org/docs/hooks-effect.html#tip-use-multiple-effects-to-separate-concerns
    //https://reactjs.org/docs/hooks-custom.html#tip-pass-information-between-hooks

  //Error \ Debug
    //https://reactjs.org/warnings/invalid-hook-call-warning.html