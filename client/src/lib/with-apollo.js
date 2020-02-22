import React, { useMemo } from 'react'
import Head from 'next/head'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from '@apollo/react-hooks'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { API_URL } from './config/urls'
import nookies from 'nookies'

/**
 * Creates and provides the apolloContext
 * to a next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern.
 * @param {Function|Class} PageComponent
 * @param {Object} [config]
 * @param {Boolean} [config.ssr=true]
 */
export default PageComponent => {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    const client = useMemo(() => {
      // We pass in the apolloClient directly when using getDataFromTree
      if (apolloClient) {
        return apolloClient
      }

      // Otherwise initClient using apolloState
      return initApollo(apolloState, {
        getCsrfToken: () => nookies.get().csrftoken,
        getAuthToken: () => nookies.get().JWT,
      })
    }, [])
    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    )
  }

  if (process.env.NODE_ENV !== 'production') {
    // Find correct display name
    const displayName =
      PageComponent.displayName || PageComponent.name || 'Component'

    // Warn if old way of installing apollo is used
    if (displayName === 'App') {
      console.warn('This withApollo HOC only works with PageComponents.')
    }

    // Set correct display name for devtools
    WithApollo.displayName = `withApollo(${displayName})`
  }

  WithApollo.getInitialProps = async ctx => {
    const { AppTree, req, res } = ctx

    const apolloClient = (ctx.apolloClient = initApollo(
      {},
      {
        getCsrfToken: () => nookies.get(ctx).csrftoken,
        getAuthToken: () => nookies.get(ctx).JWT,
        // cookies: ctx.req ? ctx.req.headers.cookie : ''
      }
    ))

    const pageProps = PageComponent.getInitialProps
      ? await PageComponent.getInitialProps(ctx)
      : {}

    if (res && res.finished) {
      return {}
    }

    if (typeof window === 'undefined') {
      try {
        const { getDataFromTree } = await import('@apollo/react-ssr')
        await getDataFromTree(
          <AppTree
            pageProps={{
              ...pageProps,
              apolloClient
            }}
          />
        )
      } catch (error) {
        console.error('Error while running `getDataFromTree`', error)
      }

      Head.rewind()
    }

    const apolloState = apolloClient.cache.extract()

    return {
      ...pageProps,
      apolloState
    }
  }

  return WithApollo
}

let apolloClient = null
/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 */
const initApollo = (...args) => {
  // Create a new client for every server-side request
  if (typeof window === 'undefined') {
    return createApollo(...args)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = createApollo(...args)
  }

  return apolloClient
}

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 * @param  {Object} config
 */
const createApollo = (
  initialState = {},
  { getAuthToken, getCsrfToken, cookies }
) => {
  const fetchOptions = {}

  // If you are using a https_proxy, add fetchOptions with 'https-proxy-agent' agent instance
  // 'https-proxy-agent' is required here because it's a sever-side only module
  if (typeof window === 'undefined') {
    if (process.env.https_proxy) {
      fetchOptions.agent = new (require('https-proxy-agent'))(
        process.env.https_proxy
      )
    }
  }

  const httpLink = createHttpLink({
    uri: API_URL,
    credentials: 'include'
  })

  const authLink = setContext((_, { headers }) => {
    const jwt = getAuthToken()
    const csrf = getCsrfToken()
    // console.log(jwt)
    return {
      headers: {
        ...headers,
        authorization: jwt ? `JWT ${jwt}` : '',
        'X-CSRFToken': csrf ? csrf : ''
      },
      cookies: {
        ...cookies
      }
    }
  })

  const isBrowser = typeof window !== 'undefined'
  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser,
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState)
  })
}
