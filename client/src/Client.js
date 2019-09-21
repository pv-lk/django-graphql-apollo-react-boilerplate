import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost'

const cache = new InMemoryCache()

export const client = new ApolloClient({
  cache,
  link: new HttpLink({
    onError: (e) => { console.log(e.graphQLErrors) },
    uri: 'http://localhost:8000/graphql',
    credentials: 'same-origin',
    headers: {
      authorization: localStorage.getItem('token')
    }
  })
})

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem('token')
  }
})
