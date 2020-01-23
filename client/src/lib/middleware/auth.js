import { setContext } from 'apollo-link-context'

export default setContext((_, { headers }) => {
    const jwt = getAuthToken()
    console.log(jwt)
    return {
      headers: {
        ...headers,
        authorization: jwt ? `JWT ${jwt}` : ''
        // 'X-CSRFToken': csrf ? csrf : ''
      },
      cookies: {
        ...cookies
      }
    }
  })
