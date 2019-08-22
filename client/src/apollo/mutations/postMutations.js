import gql from 'graphql-tag'

export const CREATE_POST_MUTATION = gql`
  mutation CreatePostMutation($text: String!) {
    create_post(text: $text)
  }
`

export const LIKE_MUTATION = gql`
`
