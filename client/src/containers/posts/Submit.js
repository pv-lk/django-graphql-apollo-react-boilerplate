import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


// import {
//     POST_QUERY
// } from '../../apollo'

export class Submit extends Component {
    state = {
    }

    render() {
        return (
            <div>
              { this.props.post.text }
            </div>
        )
    }
}
