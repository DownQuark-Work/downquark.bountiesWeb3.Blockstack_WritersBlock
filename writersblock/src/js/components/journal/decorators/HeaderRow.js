import React from 'react'
import { styled } from 'styletron-react'

const HeaderRow = () =>
{
  const elementType = 'hr',
        JournalDecoratorHeaderRow = styled(elementType, {
          backgroundColor: '#000',
          border: '0',
          height: '2px',
          margin: '1em 0',
        }),
        WysiwygClassMap = `header-row`


  return (
    <JournalDecoratorHeaderRow data-wysiwyg-class-map={WysiwygClassMap}/>
  )
}
HeaderRow.displayName = 'JournalDecoratorHeaderRow'

export default HeaderRow