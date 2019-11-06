import type { ContextJournalConstantsType,
              ContextJournalStoreType,} from '../../../../flow/components/JournalTypes'

import React, {useReducer} from 'react'
import JournalReducer from './reducer'

export const loggedInDefaultTitle = 'Welcome to Writers Block!'
export const loggedInDefaultContent = `<p data-wysiwyg-class-map="paragraph"><b><u>CONGRATULATIONS!!</u></b></p>
<p data-wysiwyg-class-map="paragraph"><br></p>
<p data-wysiwyg-class-map="paragraph">You have successfully signed into <mark data-wysiwyg-class-map="highlight-pink">WRITERS BLOCK</mark>!</p>
<p data-wysiwyg-class-map="paragraph"><br></p>
<p data-wysiwyg-class-map="paragraph"><b><mark data-wysiwyg-class-map="highlight-yellow">tldr;</mark></b> There's a lot of good info about <mark data-wysiwyg-class-map="highlight-blue">WRITERS BLOCK</mark> below. But click anywhere on the paper to start <u><i>your</i></u> own writing!</p>
<p data-wysiwyg-class-map="paragraph"><br></p>
<hr><p data-wysiwyg-class-map="paragraph"><br></p>
<p data-wysiwyg-class-map="paragraph">While this serves it's purpose for now <b><i>PLEASE</i></b>&nbsp;do <u>not</u>&nbsp;think that this is all there is planned.</p>
<p data-wysiwyg-class-map="paragraph"><br></p>
<p data-wysiwyg-class-map="paragraph">Watching our own words appear on a <s data-wysiwyg-class-map="strike">blank piece of paper<sup data-wysiwyg-class-map="strike-replacement">monitor</sup></s> creates a feeling like no other. And there is <mark data-wysiwyg-class-map="highlight-green">no</mark>&nbsp;denying that allowing others to view your creations brings with it another kind of <mark data-wysiwyg-class-map="highlight-orange"><i>magic</i></mark>.</p>
<p data-wysiwyg-class-map="paragraph"><br></p>
<p data-wysiwyg-class-map="paragraph">Together <b><i>WE</i></b> can make this much more than a daily writing application. If you can spare a few moments <a href="https://trello.com/b/XRLSPiD6/writersblock" target="_blank" data-wysiwyg-class-map="link">CHECK THIS OUT</a>! A roadmap has already been started, the ideas are just beginning, <i>and</i> I realize that you will have your own opinions too.</p>
<p data-wysiwyg-class-map="paragraph"><br></p>
<p data-wysiwyg-class-map="paragraph">Well... I <i>want</i>&nbsp;to hear them!</p>
<p data-wysiwyg-class-map="paragraph"><br></p>
<p data-wysiwyg-class-map="paragraph">The <i>"Community Voting for What's Next</i>&nbsp;card in Trello was created to make it easy to get your thoughts and ideas straight from <mark data-wysiwyg-class-map="highlight-blue">WRITERS BLOCK</mark>.</p>
<p data-wysiwyg-class-map="paragraph"><br></p>
<p data-wysiwyg-class-map="paragraph">Spread the word, enlist your <b>friends</b>, enlist your <i>enemies</i>. Let's make a writing application that everyone will enjoy, because <b><i><mark data-wysiwyg-class-map="highlight-orange">EVERYONE</mark></i></b> can have a hand in creating it!</p>
<p data-wysiwyg-class-map="paragraph"><br></p>
<p data-wysiwyg-class-map="paragraph">Thanks all!</p>`

export const loggedInInstructionsTitle = 'You\'re in! ... What should you do next?!'
export const loggedInInstructionsContent = `<p data-wysiwyg-class-map="paragraph"><b><u>Great</u> Question!</b></p>
<p data-wysiwyg-class-map="paragraph"><br></p>
<p data-wysiwyg-class-map="paragraph">You have successfully signed into <mark data-wysiwyg-class-map="highlight-pink">WRITERS BLOCK</mark>!</p>`

export const landingPageTitle = 'Why Writers Block?'
export const landingPageContent = `<p data-wysiwyg-class-map="first-paragraph">Let's start with... because it's <b>free</b>, <i>easy</i> to use, and you even get access to <u>every single line</u> of code that powers it!<br>Just in case you want to verify that I'm not doing anything fishy with your data.</p>

<p><mark data-wysiwyg-class-map="highlight-pink">FEATURES</mark>:</p>
<ul>
  <li><i><u><b>
    Security</b></u></i> - <i>Writers Block</i> is distributed. What's that mean? Well it means that all of those people out there who want to break into a database and steal all of your secrets are just out of luck. <a href="https://github.com/blockstack/gaia" target="_blank" data-wysiwyg-class-map="link">Read more about Gaia</a>(&lt;- this is a clickable link).<br><br>
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

export const loadingPageTitle = 'Locating Your Journal'
export const loadingPageContent = 'Why did we use the Dewey Decimal System for this?!'

export const JournalContextInitial:ContextJournalStoreType = {
  journalEntry:{},
  entryData: {
    todaysDate: null,
    todaysDateFile: null,
    currentEntryDate:null,
    currentEntryDateFile:null
  },
  fileName: {
    current: '' //this is the current day's fie
  },
  currentDayFileExists:null, // this is the current Day's file from navigation [string and false are valid values] null is ignored
  default: null,
  landing: { content: landingPageContent, title: landingPageTitle}, // shown to logged in user with no content for the current day
  loaded:false,
  loading:true,
  meta:{created:null,lastupdated:null,totalupdates:0},
  original:{content:'Flipping to today\'s page...', title:'Retrieving Your Journal'}, // only shown when user has saved content
  unsavedUpdate:false,
}

export const JournalContext:$FlowReactBug = React.createContext(JournalContextInitial)
// export const JournalContext = React.createContext<ContextJournalStoreType>(JournalContextInitial)