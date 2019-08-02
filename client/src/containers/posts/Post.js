import React, { Component } from 'react'
import { Mutation } from 'react-apollo'

// import {
//     POST_QUERY
// } from '../../apollo'

export class Post extends Component {
    render() {
        return (
            <div>
              { this.props.post.text }
            </div>
        )
    }
}
