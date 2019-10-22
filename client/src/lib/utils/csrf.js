import { setContext } from 'apollo-link-context'
import parseCookies from './parse-cookies'
import { CSRF_URL, PING_URL } from 'lib/config/urls'

let csrfToken

export const getCsrfToken = async () => {
  if (csrfToken == null) {
    const csrfToken = await fetch(CSRF_URL)
      .then(response => response.json())
      .then(data => data.csrfToken)
      .catch(error => console.error(error))
  }
  return csrfToken
}

const withCsrf = setContext(() => {
  if (csrfToken) return { csrfToken }

  return getCsrfToken().then(token => {
    csrfToken = token
    return { csrfToken }
  })
})

export const testRequest = async method => {
  const response = await fetch(PING_URL, {
    method: method,
    headers: method === 'POST' ? { 'X-CSRFToken': await getCsrfToken() } : {},
    credentials: 'include'
  })
  console.log(response)
  const data = await response.json()
  return data.result
}
