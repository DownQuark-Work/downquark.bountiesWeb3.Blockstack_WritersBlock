// // https://reactjs.org/docs/code-splitting.html#suspense
// // https://reactjs.org/docs/context.html#consuming-multiple-contexts
// // https://reactjs.org/docs/context.html#dynamic-context
// // https://reactjs.org/docs/error-boundaries.html#introducing-error-boundaries
// // https://reactjs.org/docs/events.html#composition-events
// // https://reactjs.org/docs/forms.html
// // https://reactjs.org/docs/fragments.html
// // https://reactjs.org/docs/higher-order-components.html
// // https://reactjs.org/docs/hooks-intro.html
// //  // https://reactjs.org/docs/hooks-rules.html#explanation
// //    // https://reactjs.org/docs/hooks-reference.html
// // https://reactjs.org/docs/portals.html
// // https://reactjs.org/docs/react-api.html#reactpurecomponent
// // https://reactjs.org/docs/render-props.html
// // https://reactjs.org/docs/uncontrolled-components.html#the-file-input-tag
// // https://reactjs.org/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down

// // https://react-redux.js.org/next/api/hooks#usedispatch
// // https://react-redux.js.org/next/api/hooks#useselector

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
