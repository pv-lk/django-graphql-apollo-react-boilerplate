import gql from "graphql-tag"

const POST_QUERY =  gql`
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


const FEED_QUERY = gql`
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

export { POST_QUERY, FEED_QUERY }
