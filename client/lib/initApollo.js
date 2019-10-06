import React from 'react'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'isomorphic-unfetch'
import { apolloLink } from './apolloLink'

let apolloClient = null

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch
}

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 */
export function initApolloClient (...args) {
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

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 * @param  {Object} config
 */
const create = (initialState, { getToken }) => {

  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: typeof window === 'undefined', // Disables forceFetch on the server (so queries are only run once)
    link: apolloLink,
    cache: new InMemoryCache().restore(initialState || {})
  })
}
