import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import { Header } from './ui/Header'
// Routes
import { Login } from './containers'

const App = () => (
  <div className="App">
    <Container>
      <Header />
      <Switch>
        <Route exact path="/login" component={ Login } />
      </Switch>
    </Container>
  </div>
)


export default App
