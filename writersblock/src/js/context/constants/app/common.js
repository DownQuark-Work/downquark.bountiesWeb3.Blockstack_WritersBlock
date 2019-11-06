export const api = {
  url: {
    BASE: 'https://my.api.mockaroo.com',
    CALENDAR: '/calendar.json?key=98c241f0',
    JOURNAL: '/journal.json?key=98c241f0',
    NOTES: '/notes.json?key=98c241f0',
    POST_IT: '/postit.json?key=98c241f0',
  }
}
export const MediaQuery = {
  TABLET_PLUS:'@media only screen and ( min-width: 50em )'
}

export const feedbackStatus = {
    Encryption: {
      ERROR:'writersblock.feedbackStatus.Error.ENCRYPTION',
      ERROR_RESPONSE:{title: 'Unable to read entry 😔',
                      content: `<p>The requested resource could not be displayed. While it does exist it seems that you do not have the required priveleges to view it.</p>
                      <p>If you own the entry (or know who does) you can edit the private or public setting by using the journal's calendar to select the desired entry.</p>
                      <p><i>Fingers Crossed!</i>🤞</p>`},
      ERROR_RESPONSE_USER_LOGGED_OUT:{title: 'Unable to be read entry',
                                      content: `<p>The requested resource could not be displayed. While it does exist it seems that you do not have the required priveleges to view it.</p>
                                      <p>Currently, you are not logged in. If you log in and try again you may get better results~</p>
                                      <p><i>Fingers Crossed!</i>🤞</p>`},
      SUCCESS:'writersblock.feedbackStatus.Success.ENCRYPTION',
      SUCCESS_RESPONSE:{title:'yay',content:'you'}
    },
    Load: {
      ERROR:'writersblock.feedbackStatus.Error.LOAD',
      ERROR_RESPONSE:{title: 'Unable to load data 😔',
                      content: `<p>The requested resource could not be loaded. We are not 100% sure it exists.</p>
                      <p>If you double check the url you are entering and try again you may get better results~</p>
                      <p><i>Fingers Crossed!</i>🤞</p>`},
      SUCCESS:'writersblock.feedbackStatus.Success.LOAD',
      SUCCESS_RESPONSE:{title:'yay',content:'you'}
    }
}