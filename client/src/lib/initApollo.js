import React from 'react'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import cookie from 'cookie'
import fetch from 'isomorphic-unfetch'

let apolloClient = null

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch
}

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 * @param  {Object} config
 */
function create (initialState, { getToken }) {
  const httpLink = createHttpLink({
    uri: 'http:localhost:8000/graphql',
    credentials: 'include'
  })

  const authLink = setContext((_, { headers }) => {
    const token = getToken()
    const csrfToken = cookie.parse('csrftoken') // this works with django-graphql-jwt
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
        'X-CSRFToken': csrfToken ? csrfToken : ''
      },
      cookies: {
        ...cookies
      }
    }
  })

  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState || {})
  })
}


/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 */
export function initApollo (...args) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(...args)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(...args)
  }

  return apolloClient
}
