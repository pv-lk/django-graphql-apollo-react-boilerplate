import React, { Component } from 'react'
import { Post } from './Post'

export class Feed extends Component {
    render() {
        const postsToRender = [
            {
                id: '1',
                text: 'test post please ignore',
            },
            {
                id: '2',
                text: 'no really',
            },
        ]

        return (
            <div>
              { postsToRender.map( post =>  <Post key={ post.id } post={ post }/> ) }
            </div>
        )
    }
}
