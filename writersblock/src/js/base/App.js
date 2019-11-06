import * as React from 'react'

type Props = {
  children: React.Node
}

const App = (props: Props) =>
{
  const { children } = props
  return <>{children}</>
}
// App.displayName = 'App'
export default App;
