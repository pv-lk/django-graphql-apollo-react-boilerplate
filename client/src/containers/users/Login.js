import React, { Component } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import { Button } from '@material-ui/core'
import * as yup from 'yup'
import { SignupForm, signupValidation } from './forms/SignupForm'
import { LoginForm, loginValidation } from './forms/LoginForm'
import { loader } from 'graphql.macro'
import { LOGIN_MUTATION, SIGNUP_MUTATION } from '../../apollo'
import { AUTH_TOKEN } from '../../secrets'


const Signup = () => {
  const [ signupUser, { loading, error }] = useMutation(SIGNUP_MUTATION)

  return (
    <Formik
      initialValues={{
        username: '',
        email: '',
        name: '',
        password: '',
        confirmPassword: ''
      }}
      onSubmit={ (values,  {setSubmitting }) => signupUser({ variables: values }) }
      render={ ({ submitForm, isSubmitting, values, setFieldValue }) => (
        <Form/>
      )}
    >
    </Formik>
  )
}

export const Login = () => {
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION, {
    onCompleted({ login }) {
      localStorage.setItem('token', login)
      client.writeData({ data: { isLoggedIn : true } })
    }
  })

  if (loading) return <Loading />
  if (error) return <p>An error occurred</p>

  return <LoginForm login={ login } />
}

export class ayyLogin extends Component {
  state = {
    login: true,
    username: '',
    email: '',
    name: '',
    password: ''
  }

  render() {
    const { login, username, email, name, password } = this.state
    return (
      <React.Fragment>
        <Formik
          initialValues={{ username: '', email: ''}}
          validationSchema={ login ? loginValidation : signupValidation }
        >
      </Formik>
        <Mutation
          mutation={ login ? LOGIN_MUTATION : SIGNUP_MUTATION }
          variables={{ username, email, name, password }}
          onCompleted={ data => this._confirm(data) }>
          { mutation => (
            <div onClick={ mutation }>
            { login ? 'login' : 'create account' }
            </div>
          )}
        </Mutation>
        <Button
          size='small'
          color='secondary'
          onClick={() => this.setState({ login: !login })}>
          {login ? 'need to create an account?' : 'already have an account?'}
        </Button>
      </React.Fragment>
    )
  }




  _confirm = async data => {
    const { token } = this.state.login ? data.login : data.signup
    this._saveUserData(token)
    this.props.history.push(`/`)
  }

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
  }
}
