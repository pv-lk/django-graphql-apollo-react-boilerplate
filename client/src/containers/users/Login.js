import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'

import { AUTH_TOKEN } from '../../secrets'
import {
    LOGIN_MUTATION,
    SIGNUP_MUTATION
} from '../../apollo'



export class Login extends Component {
    state = {
        login: false,
        username: '',
        email: '',
        name: '',
        password: ''
    }

    render() {
        const { login, username, email, name, password } = this.state
        return (
              <Form>
                <h4>{ login ? 'Login' : 'Sign up'}</h4>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Username</Form.Label>
                      <Form.Control placeholder="Enter username"
                                    value={ username }
                                    update={ e => this.setState(
                                        { username: e.target.value })} />
                    </Form.Group>
                {!login && (
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email address"
                                      value={ email }
                                      update={ e => this.setState(
                                          { email: e.target.value })} />
                        <Form.Text className="text-muted">
                          We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                )}
                {!login && (
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control placeholder="Enter name" />
                    </Form.Group>
                )}
                <Form.Row>
                  <Form.Group as={ Col } controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                      {!login && (
                          <Form.Text className="text-muted">
                          Password must be at least 8 characters.
                        </Form.Text>
                      )}
                    </Form.Group>
                {!login && (
                    <Form.Group as={ Col } controlId="formConfirmPassword">
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control type="password" placeholder="Reenter password" />
                    </Form.Group>
                )}
                </Form.Row>
                <Button type="submit">Submit</Button>
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
