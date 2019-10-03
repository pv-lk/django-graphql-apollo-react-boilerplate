import React from 'react'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import Cookies from 'js-cookie'
import { withApollo } from '../apollo/withApollo'
import { Formik } from 'formik'
import { Paper, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { loginValidation, LoginForm } from '../components/users/forms/LoginForm'
import { TOKEN_AUTH } from '../components/users/graphql/mutations.graphql'

const useStyles = makeStyles(theme => ({
  paper: {
    flexGrow: 1,
    padding: theme.spacing(1)
  }
}))



const Login = () => {
  const client = useApolloClient()
  const classes = useStyles()

  const onCompleted = data => {
    Cookies.set('token', data.login.token)
    console.log(Cookies.get())
    client.cache.reset().then(() => {
      // redirect
      return <div>success</div>
    })
  }

  const [login, { loading, error }] = useMutation(TOKEN_AUTH, { onCompleted })

  const loginValues = {
    username: '',
    password: ''
  }

  if (error) return console.log(error)
  return (
    <Formik
      initialValues={loginValues}
      validationSchema={loginValidation}
      render={props => {
        return (
          <div>
            <Paper className={ classes.paper }>
              <LoginForm {...props} />
              <Button size="small" color="secondary">
                need to create an account?
              </Button>
            </Paper>
          </div>
        )
      }}
      onSubmit={async values => {
        console.log(values)
        console.log(error)
        login({ variables: values })
      }}
    />
  )
}

export default withApollo(Login)
