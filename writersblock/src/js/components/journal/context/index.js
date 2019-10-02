import type { ContextJournalConstantsType,
              ContextJournalStoreType,} from '../../../../flow/components/JournalTypes'

import React, {useReducer} from 'react'
import JournalReducer from './reducer'

const landingPageContent = `<p data-wysiwyg-class-map="first-paragraph">Let's start with... because it's <b>free</b>, <i>easy</i> to use, and you even get access to <u>every single line</u> of code that powers it!<br>Just in case you want to verify that I'm not doing anything fishy with your data.</p>

<p><mark data-wysiwyg-class-map="highlight-pink">FEATURES</mark>:</p>
<ul>
  <li><i><u><b>
    Security</b></u></i> - <i>Writers Block</i> is distributed. What's that mean? Well it means that all of those people out there who want to break into a database and steal all of your secrets are just out of luck. <a href="https://github.com/blockstack/gaia" target="_blank" data-wysiwyg-class-map="link">Read more about Gaia</a>.<br><br>
  </li><li><b><i><u>
    Honesty</u></i></b> - Honorable intent is so hard to find on the internet nowadays. You deserve to know what goes on behind the scenes with the code that you interact with on a daily basis. Well <a href="https://github.com/dq-mlnck/blockstack/tree/master/writersblock" target="_blank" data-wysiwyg-class-map="link">here it is</a>. Take a look around, be cautious or brazen, recreate it on your own computer. There's nothing stopping you... well, other than the fact you will miss out <a href="https://trello.com/b/XRLSPiD6/writersblock" target="_blank" data-wysiwyg-class-map="link">on all of this</a>!<br><br>
  </li><li><b><i><u>
    Simplicity</u></i></b> - Although&nbsp;<s data-wysiwyg-class-map="strike">pens and pencils<sup data-wysiwyg-class-map="strike-replacement">Journals</sup></s>&nbsp;are all the rage these days, they have less functionality than the&nbsp;<i>Writers Block</i>&nbsp;and takes twice as long to format easy to use. Allowing the options to stay at the bottom of the page, near your fingers you will be adding multiple highlights to your heart's content without even realizing that you're wearing a smile. Makes you just want to -<mark data-wysiwyg-class-map="highlight-green">Get Started</mark>- right away, huh?
    </li>
</ul>

<p>&nbsp;<br/>&nbsp;</p>

<p><mark data-wysiwyg-class-map="highlight-green">GETTING STARTED</mark>:</p>

<p>
  What makes the aforementioned -<mark data-wysiwyg-class-map="highlight-pink">Features</mark>- possible? <a href="https://blockstack.org" target="_blank" data-wysiwyg-class-map="link">Blockstack</a>!<br>
  And what in the world is Blockstack? Watch <a href="https://www.youtube.com/watch?v=7SmC7AuZNWY&amp;feature=youtu.be" target="_blank" data-wysiwyg-class-map="link">this short video</a> to find out about Blockstack.
</p>

<p>Back already? Well let's keep going!</p>

<p>You'll want to create a free account that will instantly allow you access to <mark data-wysiwyg-class-map="highlight-orange">ANY</mark> of the Blockstack applications available. That's right, <mark data-wysiwyg-class-map="highlight-blue"><i>One account to rule them all</i></mark>!</p>

<p>Once your new shiny Blockstack ID is in hand Blockstack will ask you to grant access to the Writers Block app. That's right, <i><mark data-wysiwyg-class-map="highlight-yellow">The power is yours</mark></i>!</p>

<p>After that, you have only to <b><i>click</i></b> on the title or text of the journal and you will be able to begin your writing adventures.</p>

<hr>

<p>So whether you are an <i>elegant poet</i>, a <b>successful novelist</b>, or just like watching what shows up on the screen as your cat walks <s data-wysiwyg-class-map="strike">8j4bfg7sgokjrgh<sup data-wysiwyg-class-map="strike-replacement"> </sup></s> over your keyboard, there's fun to be had by everyone... or at the very least, <a href="https://trello.com/b/XRLSPiD6/writersblock" target="_blank" data-wysiwyg-class-map="link">one of these upcoming features</a> will surely give you hope!</p>

<p>It's <i><mark data-wysiwyg-class-map="highlight-pink">GREAT</mark></i> to meet you, even if a little one sided. But we can change that! </p><p>
Reach out and let me know what you think of the app. Both the good and the bad will be greatly appreciated to help ensure the best experience for everyone involved.<br/>
And while you're at it, you can<mark data-wysiwyg-class-map="highlight-blue"> cast a vote</mark> for which upcoming feature will be developed next!</p>`

export const JournalContextInitial:ContextJournalStoreType = {
  landing:{content:landingPageContent,title:'why writers block?'},
  loaded:false,
  loading:true,
  original:{content:'...', title:'Loading'},
  unsavedUpdate:false,
}

export const JournalContext:$FlowReactBug = React.createContext(JournalContextInitial)
// export const JournalContext = React.createContext<ContextJournalStoreType>(JournalContextInitial)