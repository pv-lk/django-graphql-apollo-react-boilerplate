import { setContext } from 'apollo-link-context'
import { CSRF_URL } from 'lib/config/urls'

let csrfToken

const getFromDocument = () => {


}

const getFromEndpoint = async () => {
  try {
    const data = await fetch(CSRF_URL)
    return data.csrfToken
  } catch (error) {
    console.error(error)
  }
}

const getCsrfToken = async () => {
  if (csrfToken == null) {
    const csrfToken = await fetch(CSRF_URL)
  }
  return csrfToken
}

export default setContext((_, { headers }) => {

  return {
    headers: {
    ...headers,
    'X-CSRFToken': csrfToken // ? csrfToken : await getCsrfToken()
    },
    request: async operation => {
    }
  }
})
