import gql from "graphql-tag"

export const FEED_QUERY = gql`
  {
    posts {
      id
      createdAt
      text
      author {
        id
        username
      }
    }
  }
`
