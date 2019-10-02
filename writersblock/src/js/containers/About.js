import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

const About = () =>
{

  return (
    <div>
      Linking works
      <hr />
      <Link to='/'>Go To Landing Page</Link>
    </div>
  )
}
About.displayName = 'AboutPage'

export default About