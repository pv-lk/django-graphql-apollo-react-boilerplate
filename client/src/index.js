import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
// import 'bootstrap/dist/css/bootstrap.css'
// import './assets/stylesheets/application.scss'

import App from './App'
import Client from './Client'

const AppWithProvider = () => (
  <BrowserRouter>
    <ApolloProvider client={ Client }>
      <App />
    </ApolloProvider>
  </BrowserRouter>
)

ReactDOM.render(<AppWithProvider />, document.getElementById('root'));

serviceWorker.register();
