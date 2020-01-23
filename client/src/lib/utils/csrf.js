import { setContext } from 'apollo-link-context'
import parseCookies from './parse-cookies'
import { CSRF_URL, PING_URL } from 'lib/config/urls'

let csrfToken

export const getCsrfToken = async () => {
  const csrfToken = await (await fetch(CSRF_URL)
                         .then(res => {
                           return res.json()})
                         .then(data => {
                           return data.csrfToken
                         })
                         .catch(err => {
                           console.error(error)
                         })
                        )
  return csrfToken

  // fetch(CSRF_URL)
  //     .then(response => response.json())
  //     .then(data => data.csrfToken)
  //     .catch(error => console.error(error))
}

const withCsrf = setContext(() => {
  if (csrfToken) return { csrfToken }

  return getCsrfToken().then(token => {
    csrfToken = token
    console.log(csrfToken)
    return { csrfToken }
  })
})

export const testRequest = async method => {
  const token = csrfToken || await getCsrfToken()
  console.log(method)
  console.log(token)
  const response = await fetch(PING_URL, {
    method: method,
    headers: method === 'POST'
      ? { 'X-CSRFToken': token }
    : {},
    credentials: 'include'
  })
  console.log(response)
  const data = await response.json()
  console.log(data.result)
  return data.result
}
