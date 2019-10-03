import CURRENT_USER from '../components/users/graphql/queries'

export default apolloClient =>
  apolloClient
    .query({
      query: CURRENT_USER
    })
    .then(({ data }) => {
      return { loggedInUser: data }
    })
    .catch(() => {
      // Fail gracefully
      return { loggedInUser: {} }
    })
