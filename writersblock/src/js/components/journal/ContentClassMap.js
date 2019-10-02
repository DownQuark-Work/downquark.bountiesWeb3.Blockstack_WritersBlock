import React from 'react'
import { styled } from 'styletron-react'

import * as Decorator from './decorators'

const JournalContentClassMap = (props:{classMapRef:$FlowReactBug}) =>
{
  const JournalContentClasses = styled('div', { display:'none' })

  return (
      <JournalContentClasses className="journal-content-class-map" ref={props.classMapRef}>
        <Decorator.HeaderRow>header-row</Decorator.HeaderRow>
        <Decorator.HighLight color='YELLOW'>highlight-yellow</Decorator.HighLight>
        <Decorator.HighLight color='PINK'>highlight-pink</Decorator.HighLight>
        <Decorator.HighLight color='BLUE'>highlight-blue</Decorator.HighLight>
        <Decorator.HighLight color='GREEN'>highlight-green</Decorator.HighLight>
        <Decorator.HighLight color='ORANGE'>highlight-orange</Decorator.HighLight>
        <Decorator.Italic>italic</Decorator.Italic>
        <Decorator.Link href='#'>link</Decorator.Link>
        <Decorator.List>list-unordered</Decorator.List>
        <Decorator.List orderedList>list-ordered</Decorator.List>
        <Decorator.Paragraph firstParagraph>first-paragraph</Decorator.Paragraph>
        <Decorator.Paragraph>paragraph</Decorator.Paragraph>
        <Decorator.Strike replacement='strike-replacement'>strike</Decorator.Strike>
        <Decorator.Strong>strong</Decorator.Strong>
        <Decorator.Underline>underline</Decorator.Underline>
      </JournalContentClasses>
  )
}
JournalContentClassMap.displayName = 'JournalContentClassMap'

export default JournalContentClassMap