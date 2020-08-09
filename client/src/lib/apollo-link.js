import { HttpLink, from } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
// import { parse } from 'cookie'
import cookies from './cookies'

let csrfToken, authToken

async function getCsrfToken() {
  // this needs to be refetched every time a POST request is made
  csrfToken = csrfToken ?? cookies.get().csrftoken

  if (!csrfToken) {
    const response = await fetch(process.env.CSRF_URL)
    const data = await response.json()
    csrfToken = data.csrfToken
  }

  console.log('csrf ' + csrfToken)

  return csrfToken
}

const csrfLink =
  setContext(async (_, { headers }) => {
    return {
      headers: {
        ...headers,
        'X-CSRFToken': await getCsrfToken() || '' }}})

const authLink =
      setContext((_, { headers }) => {
        if (!authToken)
          authToken = cookies.get().JWT
        return {
          headers: {
            ...headers,
            authorization: authToken ? `JWT ${authToken}` : '' }}})

const errorLink =
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
          graphQLErrors.map(
            ({ message, locations, path }) =>
            console.log(`[GraphQL error]:Message: ${message}, Location: ${locations}, Path: ${path}`))
        if (networkError)
          console.log(`[Network error]: ${networkError}`)
        if (networkError.statusCode === 401)
          authToken = null
        if (networkError.statusCode === 403)
          csrfToken = null })

const httpLink = new HttpLink({
  uri: process.env.GRAPHQL_URL, // 'http://localhost:8000/graphql/',
    // credentials: 'include',
    // fetch,
})

export const link = from([
    csrfLink,
    authLink,
    errorLink,
    httpLink
  ])
