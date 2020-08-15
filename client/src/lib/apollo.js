esversion: 7

import { useMemo } from 'react'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { link } from './apollo-link'

let apolloClient

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: link,
    cache: new InMemoryCache(),
    credentials: 'include' })}

export function initApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient()
  //
  if (initialState) {
    _apolloClient.cache.restore(initialState)
  }

  if (typeof window === 'undefined') return _apolloClient
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function useApollo(initialState) {
  const store = useMemo(() => initApollo(initialState), [initialState])
  return store
}
