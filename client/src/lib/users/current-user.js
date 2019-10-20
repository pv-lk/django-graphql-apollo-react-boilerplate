import { CURRENT_USER } from './graphql/queries.graphql'

export default apolloClient => apolloClient
  .query({
    query: CURRENT_USER
  })
  .then(({ data }) => {
    return { currentUser: data }
  })
  .catch(() => {
    return { currentUser: {} }
  })
