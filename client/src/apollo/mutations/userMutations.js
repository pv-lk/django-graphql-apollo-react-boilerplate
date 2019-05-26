import gql from 'graphql-tag'

export const SIGNUP_MUTATION = gql`
  mutation SignupMutation($username: String!, $email: String!, $name: String!, $password: String!) {
    signup(authProvider: {
      username: {
        username: $username,
        password: $password
      }
    },
      email: $email,
      name: $name) {
        id
      }
  }
`

export const LOGIN_MUTATION = gql`
  mutation LoginMutation($username: String!, $password: String!) {
    login(username: {
        username: $username,
        password: $password }) {
      token
    }
  }
`
