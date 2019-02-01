import React from 'react'
import Header from './components/Header'
import { Switch, Route } from 'react-router-dom'
import { Container } from 'reactstrap'

// Routes
import { LoginForm } from './components'

const App = () => (
  <div className="App">
    <Header />
    <Container>
      <Switch>
        <Route exact path="/login" component={ LoginForm } />
      </Switch>
    </Container>
  </div>
)


export default App
