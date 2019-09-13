import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'

import App from './App'
import Client from './apollo/Client'

const AppWithProvider = () => (
  <BrowserRouter>
    <ApolloProvider client={ Client }>
      <App />
    </ApolloProvider>
  </BrowserRouter>
)

ReactDOM.render(<AppWithProvider />, document.getElementById('root'))

serviceWorker.register()
