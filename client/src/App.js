import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Container } from '@material-ui/core'

import { Header } from './components/Header'
// Routes
import { Feed, Login, Submit } from './containers'

const App = () => (
  <div className="App">
    <Container>
      <Header />
      <Switch>
        <Route exact path="/" component={ Feed } />
        <Route exact path="/submit" component={ Submit } />
        <Route exact path="/login" component={ Login } />
      </Switch>
    </Container>
  </div>
)


export default App
