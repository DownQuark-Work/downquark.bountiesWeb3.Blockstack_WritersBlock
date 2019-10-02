import React from 'react'
import { styled } from 'styletron-react'

const TitleBreak = () =>
{
  const JournalDecoratorTitleBreak = styled('div', {})

  return (
    <JournalDecoratorTitleBreak data-wysiwyg-class-map='title-break'>
      I think this will remain unused until we start switching it out
    </JournalDecoratorTitleBreak>
  )
}
TitleBreak.displayName = 'JournalDecoratorTitleBreak'

export default TitleBreak