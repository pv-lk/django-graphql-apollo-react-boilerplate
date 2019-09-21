import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Formik } from 'formik'
import { Paper, Button } from '@material-ui/core'
import { loader } from 'graphql.macro'
import { makeStyles } from '@material-ui/core/styles'
import { loginValidation, LoginForm } from './forms/LoginForm'
// import { AUTH_TOKEN } from '../../constants'
const LOGIN_MUTATION = loader('./graphql/Login.graphql')

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1)
  }
}))

export const Login = () => {
  // const authToken = localStorage.get(AUTH_TOKEN)
  const classes = useStyles()
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION)
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
            <Paper className={ classes.root }>
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
