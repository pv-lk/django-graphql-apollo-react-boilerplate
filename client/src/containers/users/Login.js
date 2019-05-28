import React, { Component } from 'react'
import { AUTH_TOKEN } from '../../secrets'
import { Button, Form } from 'react-bootstrap'
import FormInput from '../../ui/forms/FormInput'
import { Mutation } from 'react-apollo'
import { LOGIN_MUTATION,
         SIGNUP_MUTATION } from '../../apollo'



export class Login extends Component {
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
      <Form>
        <h4>{login ? 'Login' : 'Sign Up'}</h4>
        <FormInput fieldName='username'
                   value={ username }
                   update={ e => this.setState(
                       { username: e.target.value })}/>
        {!login && (
           <FormInput fieldName='email'
                      fieldType='email'
                      value={ email }
                      update={ e => this.setState(
                          { email: e.target.value})} />
        )}
        {!login && (
           <FormInput fieldName='name'
                      value={ name }
                      update={ e => this.setState(
                          { name: e.target.value })} />

        )}
        <FormInput fieldName='password'
                   fieldType='password'
                   value={ password }
                   update={ e => this.setState(
                       { password: e.target.value })} />

        <Mutation mutation={ login ? LOGIN_MUTATION : SIGNUP_MUTATION }
                  variables={{ username, email, name, password }}
                  onCompleted={ data => this._confirm(data) }>
          { mutation => (
            <Button onClick={ mutation }>
              {login ? 'login' : 'create account'}
            </Button>
          )}
        </Mutation>

        <Button color='link' onClick={() => this.setState({ login: !login })}>
          { login ? 'need to sign up?' : 'already have an account?' }
        </Button>
      </Form>
    )
  }

  _confirm = async data => {
    const { token } = this.state.login ? data.login : data.signup
    this._saveUserData(token)
    this.props.history.push(`/`)
  }

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
    console.log(localStorage)
  }
}
