import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { withClientState } from 'apollo-link-state'
import { ApolloLink } from 'apollo-link'
// import { AUTH_TOKEN } from '../constants'

/* INITIALIZE CACHE AND LINK TO SERVER */
const cache = new InMemoryCache()

const httpLink = new HttpLink({
  onError: (e) => { console.log(e.graphQLErrors)},
  uri: 'http://localhost:8000/graphql',
  credentials: 'same-origin'
})

// const authLink = setContext((_, { headers }) => {
//   const token = localStorage.getItem(AUTH_TOKEN)
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : ''
//     }
//   }
// })

/* SET UP CLIENT WITH CACHE */
const stateLink = withClientState({
  cache,
  defaults: {
    currentTrack: null
  },
  resolvers: {
    Mutation: {
    }
  }
})

export default new ApolloClient({
  link: ApolloLink.from([
    stateLink,
  //  authLink,
    httpLink
  ]),
  cache: cache
})
