import React from 'react'
import Header from './ui/Header'
import { Switch, Route } from 'react-router-dom'
import { Container } from 'reactstrap'

// Routes
import { Login } from './containers'

const App = () => (
  <div className="App">
    <Header />
    <Container>
      <Switch>
        <Route exact path="/login" component={ Login } />
      </Switch>
    </Container>
  </div>
)


export default App
