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