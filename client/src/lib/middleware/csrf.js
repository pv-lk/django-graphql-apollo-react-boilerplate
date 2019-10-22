import { setContext } from 'apollo-link-context'
import { CSRF_URL } from 'lib/config/urls'

let csrfToken

const getCsrfToken = async () => {
  if (csrfToken == null) {
    const csrfToken = await fetch(CSRF_URL)
      .then(response => response.json())
      .then(data => data.csrfToken)
      .catch(error => console.error(error))
  }
  return csrfToken
}

export default setContext((_, { headers }) => {

  return {
    headers: {
    ...headers,
    'X-CSRFToken': csrfToken ? csrfToken : await getCsrfToken()
  }
  }
})
