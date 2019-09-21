import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Container, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Login } from './containers/users/Login'
import { AllPosts } from './containers/posts/AllPosts'
import Header from './components/Header'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}))

function App() {
  const classes = useStyles()
  return (
    <Box className={ classes.root }>
      <Header />
      <Container>
        <Switch>
          <Route exact path="/" component={ AllPosts } />
          <Route exact path="/login" component={ Login } />
        </Switch>
      </Container>
    </Box>
  )
}

export default App
