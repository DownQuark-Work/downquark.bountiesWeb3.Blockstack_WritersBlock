import React,  {useContext, useRef, useState} from 'react'
import { styled, withStyle } from 'styletron-react'
import * as blockstack from 'blockstack'

import { WritersBlockContext } from '../../base/Root'
import { updateUserSettings } from '../../context/actions/BlockStack'
import { USER_SETTINGS_CONCEAL } from '../../context/constants/store/landing'
import { USER_SETTING_APPLY_CHANGES } from '../../context/constants/store/user'
import { INTEGRATIONS } from '../../context/constants/app/integrations'
import { DataUri } from  '../../context/constants/app/journal'

import Loading from '../loading'

import { cornerBorder, dynamicCornerBorder } from '../../utils/ui'

type Props = {
  children: Array<React$Element<any>>
}
const Content = (props:Props) =>
{
  const { writersBlockStore, writersBlockDispatch } = useContext(WritersBlockContext),
        [userSettings, setUserSettings] = useState({...writersBlockStore.User.settings, integrations:writersBlockStore.User.integrations, saving:false})
  console.dev('settings', 'usersettings'.toUpperCase(), userSettings)
  
  const UserSettingsClose = styled('div',{
          cursor:'pointer',
          fontFamily: "monospace",
          fontSize:'1.15rem',
          height: '25px',
          left:0,
          lineHeight:'25px',
          position:'absolute',
          textAlign:'center',
          top:0,
          width:'25px',
          ':hover': { background: 'rgba(200,200,200,.7)' }
        }),
        UserSettingsContent = styled('div', {
          color:'#222',
          fontFamily:"monospace",
          fontSize: '1.15rem',
          paddingBottom: '0',
          paddingLeft:'5%',
          paddingRight:'5%',
          paddingTop: '0',
          position:'static',
          textAlign: 'center',
          top: '6px',
          width: '100%',
        }),
        UserSettingsChangeLog = styled('pre',props => ({
          display: props.$newVersion ? 'block':'none'
        })),
        UserSettingsGroup = styled('div',{margin:0,padding:0}),
        UserSettingsHeader = styled('p', {
          fontSize: '1.15rem',
          marginBottom: '0',
          marginLeft: '0',
          marginRight: '0',
          marginTop: '10px',
          textAlign: 'center',
        }),
        UserSettingsLink = styled('a',{
          backgroundImage: `url(${DataUri.LINK[0]})`,
          backgroundPosition: 'bottom',
          backgroundRepeat: 'repeat-x',
          backgroundSize:'3rem',
          color: 'inherit',
          textDecoration: 'none'
        }),
        UserSettingsParagraph = withStyle(UserSettingsHeader, {
          fontSize:'1rem',
          marginTop:'1rem',
          textAlign: 'left'
        }),
        UserSettingsHelp = withStyle(UserSettingsParagraph, {
          color:'darkgray',
          cursor:'pointer',
          display:'inlineBlock',
          fontSize:'.75rem',
          marginTop:0,
          paddingTop:0,
          ':after':{
            content:'"..."',
          },
          ':hover':{
            ':after':{
              content:'": " attr(data-help)'
            }
          }
        }),
        UserSettingsInput = styled('input',{
          background: 'none',
          border:'none',
          borderBottom:'1px dotted',
          fontFamily: 'monospace'
        }),
        UserSettingsDisabled = { background: 'rgba(200,200,200,.3)', color:'rgba(150,150,150,.8)', pointerEvents:'none'},
        UserSettingsChoice = styled('span',props => {
          const dynBorder = props.$integrated 
                                ? props.$active
                                    ? dynamicCornerBorder({
                                        borderWidth: '3px', 
                                        color: '#222', 
                                        cornerCoverage: '10px', 
                                        lineHeight: '18px', 
                                        margin: '10px',
                                        padding: '10px' })
                                    : {border : '1px dashed rgba(150,150,150,.8)'}
                                  : UserSettingsDisabled
          return { ...dynBorder,
                    cursor: props.$integrated ? 'pointer' : 'cursor',
                    display:'inline-block',
                    lineHeight: '18px',
                    margin: '10px',
                    padding: '10px',
            ':hover': { backgroundColor: props.$integrated ? 'rgba(200,200,200,.7)' : '' }
          }
        }),
        savingOpts = {
            backgroundRGBA: 'rgba(50,50,50,.7)',
            charAmtRange:[3,8],
            color:'darkgray',
            lineAmtRange:[3,5],
            pos:'MC',
            padding:'15px 0 0 15px',
            z:50
          },
        SavingUser = (<> 
                        <div style={{
                            textAlign:'center',
                            color:'darkgray',
                            marginTop:'20px',
                            position:'relative',
                            fontSize:'24px',
                            zIndex:105}}>
                          Updating Your Settings
                        </div>
                        <Loading {...savingOpts} />
                      </>)

  let inputVals = {}, pseudonym = ''
  const handleInputChange = (e) => { inputVals[e.target.getAttribute('name')] = e.target.value },
        thirdParties = Object.values(INTEGRATIONS).map(itm => 
        {
          const defaultVal = userSettings.integrations && userSettings.integrations[itm.key] || ''
          return (<form data-group='third-parties' data-value='' onSubmit={e => handleUserSettingsChange(e)} key={btoa(itm.key)} style={{borderTop:'2px solid lightgray', marginTop:'10px', paddingTop:'8px'}}>
                <UserSettingsLink href={itm.url} target="_blank" rel="noopener noreferrer">{itm.name}</UserSettingsLink>: <UserSettingsInput onChange={e => handleInputChange(e)} name={itm.key} defaultValue={defaultVal} />
                <UserSettingsParagraph $style={{fontSize:'12px'}}>{itm.cta}</UserSettingsParagraph>
                <UserSettingsHelp data-help={itm.instructions}>more info</UserSettingsHelp>
              </form>)
        })

  const handleUserSettingsChange = (e) =>
  {
    e.preventDefault()
    //only update when active button is clicked or pseudonym is submitted
    if (e.target.tagName !== 'FORM' && e.target.childElementCount){ return false }

    function mapTextToVal(group,s)
    {
      if(group === 'publish'){ return s}
      if(s === 'Blank Page'){ return 'blank'}
      if(s === 'Instuctional Text'){ return 'instructions'}
      return 'default'
    }

    const settingsGroup = e.currentTarget.getAttribute('data-group'),
          userSession = writersBlockStore.Blockstack.userSession,
          {pseudonym, ...inputIntegrations} = inputVals,
          {integrations, ...settings} = userSettings
    let userSetting = {
      ...settings,
      pseudonym: pseudonym || userSettings.pseudonym,
    }
    if(e.target.tagName !== 'FORM') { userSetting[settingsGroup] = mapTextToVal(settingsGroup,e.target.innerHTML).toLowerCase()}
    userSetting = {
        ...writersBlockStore.User,
        settings: {...userSetting},
        integrations : {
          ...userSettings.integrations,
          ...inputIntegrations
        }
      }

    setUserSettings({...userSettings.settings, saving:true})
    updateUserSettings(setUserSettings, userSession, userSetting)
  }
  const isActiveSetting = (group, value) =>
  {
    // tmp hardcode until able to parse it
    if (group === 'publish' && value === userSettings.publish) { return true }
    if (group === 'pageview' && value === userSettings.pageview) { return true }
    return false
  }
  
  const closeSettings = () =>
  { writersBlockDispatch({ type: USER_SETTING_APPLY_CHANGES, payload: {...userSettings} })
    writersBlockDispatch({ type: USER_SETTINGS_CONCEAL }) }
  const blockstackLogout = (e) => { blockstack.signUserOut(window.location.origin) }

  return (
    <UserSettingsContent>
    {userSettings.saving && SavingUser}
      <UserSettingsClose onClick={closeSettings}>X</UserSettingsClose>
      <UserSettingsHeader>
        PROFILE SETTINGS<br/>
        [<span onClick={blockstackLogout} style={{cursor:'pointer', fontSize:'.75rem'}}>logout</span>]
      </UserSettingsHeader>
      <UserSettingsChangeLog $newVersion={false}>
        View Changes:<br />
        <pre></pre>
      </UserSettingsChangeLog>
      <UserSettingsParagraph></UserSettingsParagraph>

      <UserSettingsGroup $style={{ textAlign: 'right' }}>
        <form data-group={'pseudonym'} data-value='' onSubmit={e => handleUserSettingsChange(e)}>
        Pseudonym: <UserSettingsInput onChange={e => handleInputChange(e)} name="pseudonym" defaultValue={userSettings.pseudonym} />
        </form>
      </UserSettingsGroup>
      <UserSettingsParagraph>&nbsp;</UserSettingsParagraph>
      <UserSettingsParagraph $style={{ fontSize: '12px', marginTop: '5px', textAlign: 'center' }}><span style={UserSettingsDisabled}>Grayed Out Text</span> indicates options in <a href="https://trello.com/b/XRLSPiD6/writersblock" rel="noopener noreferrer" target="_blank">active development</a><br />👇 Scroll down to see more!</UserSettingsParagraph>
      <UserSettingsParagraph>
        Default Story Publish Setting: <br />
        <sub>(can be overwritten on individual stories)</sub>
      </UserSettingsParagraph>
      <UserSettingsGroup data-group={'publish'} onClick={(e) => handleUserSettingsChange(e)}>
        <UserSettingsChoice $active={isActiveSetting('publish','private')} $integrated>Private</UserSettingsChoice>
        <UserSettingsChoice $active={isActiveSetting('publish', 'public')} $integrated>Public</UserSettingsChoice>
      </UserSettingsGroup>

      {false && <UserSettingsGroup>
        <UserSettingsParagraph>
          Do you have other accounts you would like to see your writings on?
          <sub>(more will be coming soon)</sub>
        </UserSettingsParagraph>
            {thirdParties}
      </UserSettingsGroup>}

      <UserSettingsParagraph>&nbsp;</UserSettingsParagraph>
      <UserSettingsParagraph>Which of the following would you like to see when the application initially loads?:</UserSettingsParagraph>
      <UserSettingsGroup data-group={'pageview'} onClick={(e) => handleUserSettingsChange(e)}>
        <UserSettingsChoice $active={isActiveSetting('pageview', 'default')} $integrated>Welcome Text</UserSettingsChoice>
        {/* <UserSettingsChoice $active={isActiveSetting('pageview', 'instructions')} $integrated>Instuctional Text</UserSettingsChoice> */}
        <UserSettingsChoice $active={isActiveSetting('pageview', 'blank')} $integrated>Blank Page</UserSettingsChoice>
        <UserSettingsChoice>Instuctional Text</UserSettingsChoice>
        <UserSettingsChoice>Random Writing Prompt</UserSettingsChoice>
        <UserSettingsChoice>Random Fact of the Day</UserSettingsChoice>
        <UserSettingsChoice>Your Own Markov Story</UserSettingsChoice>
        <UserSettingsChoice $style={{ lineHeight:'14px' }}>Randomly Selected User Story<br/><sub>(marked public by the author)</sub></UserSettingsChoice>
      </UserSettingsGroup>

      <UserSettingsGroup>
        {/* <UserSettingsParagraph>&nbsp;</UserSettingsParagraph>
        <UserSettingsParagraph>Generate report based on your past activity within the app? <sub style={{verticalAlign:'unset'}}>(may take a few minutes to complete)</sub></UserSettingsParagraph>
        <UserSettingsParagraph>&nbsp;</UserSettingsParagraph> */}
        <UserSettingsParagraph $style={{ textAlign: 'right' }}><sub>version: {writersBlockStore.Blockstack.version}</sub></UserSettingsParagraph>
      </UserSettingsGroup>
    </UserSettingsContent>
  )
}
Content.displayName = 'UserSettingsContent'

export default Content