import React from 'react'
import { withApollo } from '../lib/withApollo'
import { Paper, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { LoginForm } from '../components/users/forms/LoginForm'

const useStyles = makeStyles(theme => ({
  paper: {
    flexGrow: 1,
    padding: theme.spacing(1)
  }
}))

const Login = () => {
  const classes = useStyles()

  return (
    <>
      <Paper className={classes.paper}>
        <LoginForm />
        <Button size="small" color="secondary">
          need to create an account?
        </Button>
      </Paper>
    </>
  )
}

export default withApollo(Login)
