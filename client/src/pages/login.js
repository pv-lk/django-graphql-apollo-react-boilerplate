import React from 'react'
import { Paper, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import withApollo from 'lib/with-apollo'
import checkCurrentUser from 'lib/users/current-user'
import redirect from 'lib/utils/redirect'
import { LoginForm } from 'components/users/forms/LoginForm'

const useStyles = makeStyles(theme => ({
  paper: {
    flexGrow: 1,
    padding: theme.spacing(1)
  }
}))

const LoginPage = () => {
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

LoginPage.getInitialProps = async ctx => {
  const { currentUser } = await checkCurrentUser(ctx.apolloClient)

  if (currentUser.me) {
    redirect(ctx, '/')
  }

  return {}
}

export default withApollo(LoginPage)
