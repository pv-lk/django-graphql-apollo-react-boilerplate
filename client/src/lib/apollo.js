import React from 'react'
import App from 'next/app'
import fetch from 'isomorphic-unfetch'
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  from,
  InMemoryCache,
} from '@apollo/client'
import { setContext } from '@apollo/link-context'
import { onError } from '@apollo/link-error'
import { getCsrfToken } from './utils/csrf'
import Cookies from './utils/cookies'

// On the client, we store the Apollo Client in the following variable.
// This prevents the client from reinitializing between page transitions.
let globalApolloClient = null

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch
}


/**
 * Installs the Apollo Client on NextPageContent
 * or NextAppContext. Useful if you want to use apolloClient
 * inside getStaticProps, getStaticPaths or getServerProps
 * @param { NextPageContext | NextAppContext } ctx
 */

export const initOnContext = (ctx) => {
  const inAppContext = Boolean(ctx.ctx)
  console.log('inappcontext')
  console.log(inAppContext)

  // We consider installing `withApollo({ ssr: true})` on global App level
  // as antipattern since it disables project wide Automatic Static Optimization.
  if (process.env.NODE_ENV === 'development') {
    if (inAppContext) {
      console.warn(
        'Warning: You have opted-out of Automatic Static Optimization due to `withApollo`in `pages/_app`.\n' +
          'Read more: https://err.sh/next.js/opt-out-auto-static-optimization\n'
      )
    }
  }

  // Initialize ApolloClient if not already done
  const apolloClient =
    ctx.apolloClient ||
    initApolloClient(ctx.apolloState || {}, inAppContext ? ctx.ctx : ctx)

  // We send the Apollo Client as a prop to the component to avoid calling initApollo()
  // twice on the server.
  // Otherwise, the component would have to call initApollo() again but this time
  // Without the context.  Once that happens, the following code will make sure
  // we send the prop as `null` to the browser.
  apolloClient.toJSON = () => null

  // Add apolloClient to NextPageContext & NextAppContext.
  // This allows us to consume the apolloClient inside our
  // custom `getServerSideProps({ apolloClient })`.
  ctx.apolloClient = apolloClient
  if (inAppContext) {
    ctx.ctx.apolloClient = apolloClient
  }
  return ctx
}


const createApolloClient = (initialState, ctx) => {

  const csrfLink = setContext(async (_, { headers }) => {
    const csrfToken = await getCsrfToken(ctx)
    return {
      headers: {
        ...headers,
        'X-CSRFToken': csrfToken || ''
      },
    }
  })

  const authLink = setContext((_, { headers }) => {
    const authToken = Cookies.get().JWT
    return {
      headers: {
        ...headers,
        authorization: authToken ? `JWT ${authToken}` : ''
      },
    }
  })

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )

  if (networkError) console.log(`[Network error]: ${networkError}`)
})

  const httpLink = new HttpLink({
    uri: 'http://localhost:8000/graphql/',
    credentials: 'include',
    fetch,
  })

  const link = from([
    csrfLink,
    authLink,
    errorLink,
    httpLink
  ])

  console.log('createApolloClient')
  console.log(link)
  // the `ctx` will only be present on the server.
  // Use it to extract auth headers (ctx.req) or similar.
  return new ApolloClient({
    ssrMode: Boolean(ctx),
    link: link,
    cache: new InMemoryCache().restore(initialState),
    connectToDevTool: true
  })
}

/**
 * Always creates a new Apollo client on the server
 * Creates or reuses Apollo client in the browser.
 * @param { NormalizedCacheObject } initialState
 * @param { NextPageContext } ctx
 */

const initApolloClient = (initialState, ctx) => {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    console.log('initApolloClient ssr')
    return createApolloClient(initialState, ctx)
  }

  if (!globalApolloClient) {
    console.log('initApolloClient csr')
    globalApolloClient = createApolloClient(initialState, ctx)
  }

  return globalApolloClient
}

/**
 * Creates a withApollo HOC
 * that provides the apolloContext
 * to a next.js Page or AppTree.
 * @param { Object } withApolloOptions
 * @param { Boolean } [withApolloOptions.ssr = false]
 * @returns {(PageComponent: ReactNode) => ReactNode}
 */

export const withApollo = ({ ssr = false } = {}) => (PageComponent) => {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    let client
    if (apolloClient) {
      // Happens on: getDataFromTree & next.js ssr
      client = apolloClient
    } else {
      // Happens on: next.js csr
      client = initApolloClient(apolloState, undefined)
      console.log(client)
    }
    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    )
  }

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== 'production') {
    const displayName =
      PageComponent.displayName || PageComponent.name || 'Component'
    WithApollo.displayName = `withApollo(${displayName})`
  }

  if (ssr || PageComponent.getServerSideProps) {
    WithApollo.getServerSideProps = async (ctx) => {
      const inAppContext = Boolean(ctx.ctx)
      const { apolloClient } = initOnContext(ctx)

      // Run wrapped getServerSideProps methods
      let pageProps = {}
      if (PageComponent.getServerSideProps) {
        pageProps = await PageComponent.getServerSideProps(ctx)
      } else if (inAppContext) {
        pageProps = await App.getServerSideProps(ctx)
      }

      // Only on the server:
      if (typeof window === 'undefined') {
        const { AppTree } = ctx
        // When redirecting, the response is finished.
        // No point in continuing to render
        if (ctx.res && ctx.res.finished) {
          return pageProps
        }

        // Only if dataFromTree is enabled
        if (ssr && AppTree) {
          try {
            // Import '@apollo/react-ssr' dynamically.
            // We don't want to have this in our client bundle.
            const { getDataFromTree } = await import('@apollo/react-ssr')

            // Since AppComponents and PageComponents have different context types
            // we need to modify their props a little.
            let props
            if (inAppContext) {
              props = { ...pageProps, apolloClient }
            } else {
              props = { pageProps: { ...pageProps, apolloClient } }
            }
            // Take the Next.js AppTree, determine which queries are needed to render,
            // and fetch them. This method can be pretty slow since it renders
            // your entire AppTree once for every query.  Check out apollo fragments
            // if you want to reduce the number of rerenders.
            // https:www.apollographql.com/docs/react/data/fragments/
            await getDataFromTree(<AppTree {...props} />)
          } catch (error) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the data.error prop:
            // https:www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            console.error('Error while running `getDataFromTree`', error)
          }
        }
      }

      return {
        ...pageProps,
        // Extract query data from the Apollo store
        apolloState: apolloClient.cache.extract(),
        // Provide the client for ssr.  As soon as this payload
        // gets JSON.stringified it will remove itself.
        apolloClient: ctx.apolloClient,
      }
    }
  }

  return WithApollo
}
