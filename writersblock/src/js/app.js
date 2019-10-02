import "@babel/polyfill"
import React, { Fragment } from 'react'
import { render } from 'react-dom'
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader'
import {Prototypes} from './utils/prototypes'
import Root from './base/Root'

import { library } from '@fortawesome/fontawesome-svg-core'
// import { fab } from '@fortawesome/free-brands-svg-icons'
import { faBookmark as faBookmarkEmpty, faCopy as faCopyText, faHeart as faHeartActive } from '@fortawesome/free-regular-svg-icons'
import {
          faBan,
          faBold,
          faBookmark as faBookmarkFilled, // search?
          faBookReader, // User setting?
          faCircle,
          faCode, //switch to html
          faCopy as faPasteText,
          faCut,
          faEdit,
          faFeather, // user settings?
          faFeatherAlt, // user settings?
          faFileSignature,
          faHeart as faHeartInactive,
          faHighlighter,
          faItalic,
          faLink,
          faListUl,
          faMarker,
          faMinus, // header row?
          faMinusCircle, // highlighter option reset?
          faPaperclip, // launch notes?
          faParagraph,
          faRemoveFormat,
          faReply, // undo
          faSearch,
          faShare, // redo
          faSignature,
          faSquare,
          faStrikethrough,
          faTag,
          faTags,
          faWindowMinimize, // header row?
          faUnderline,
          faUnlink,
          faUndo, // clear
          faYinYang, // spinner?
        } from '@fortawesome/free-solid-svg-icons'

library.add(
faBan,
faBold,
faBookmarkEmpty,
faBookmarkFilled,
faBookReader,
faCircle,
faCode,
faCopyText,
faCut,
faEdit,
faFeather,
faFeatherAlt,
faFileSignature,
faHeartActive,
faHeartInactive,
faHighlighter,
faItalic,
faLink,
faListUl,
faMarker,
faMinus,
faMinusCircle,
faPaperclip,
faParagraph,
faPasteText,
faRemoveFormat,
faReply,
faSearch,
faShare,
faSignature,
faSquare,
faStrikethrough,
faTag,
faTags,
faUnderline,
faUndo,
faUnlink,
faWindowMinimize,
faYinYang,
)

Prototypes()

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer

const rootElem = document.getElementById('root')
if (rootElem)
{
  render(
    <AppContainer>
      <Root />
    </AppContainer>,
    rootElem
  )
}

if((module: any).hot && rootElem)
{
  (module: any).hot.accept('./base/Root', () =>
  {
    // eslint-disable-next-line global-require
    const NextRoot = require('./base/Root').default
    render(
      <AppContainer>
        <NextRoot />
      </AppContainer>,
      rootElem
    )
  })
}
