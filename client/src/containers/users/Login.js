import React, { Component } from 'react'
import { AUTH_TOKEN } from '../../secrets'
import { Container, Button, Form } from 'react-bootstrap'
import { Mutation } from 'react-apollo'
import {
    LOGIN_MUTATION,
    SIGNUP_MUTATION
} from '../../apollo'



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
            <Container>
                <Form>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email address" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
</Form.Text>
                    </Form.Group>
                </Form>
            </Container>
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
