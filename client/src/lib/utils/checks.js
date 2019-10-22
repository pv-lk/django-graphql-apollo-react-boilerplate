import { CURRENT_USER } from './graphql/queries.graphql'

export const checkCurrentUser = apolloClient => {
  apolloClient
  .query({
    query: CURRENT_USER
  })
  .then(({ data }) => {
    return { currentUser: data }
  })
  .catch(() => {
    return { currentUser: {} }
  })
}

export const isServer = () => {
  return typeof window === 'undefined'
}
