import cookie from 'cookie'
import { CSRF_URL, PING_URL } from 'lib/config/urls'

let csrfToken

const getCsrfToken = async () => {
  if (csrfToken === null) {
    csrfToken = await fetch(CSRF_URL, {
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data => data.csrfToken)
      .catch(error => console.error(error))
  }

  return csrfToken
}

const testRequest = async method => {
  const response = await fetch(PING_URL, {
    method: method,
    headers: (
      method === 'POST'
        ? { 'X-CSRFToken': await getCsrfToken() }
        : {}
    ),
    credentials: 'include'
  })
  const data = await response.json()
  return data.result
}

const setCsrfHeader = (req, res) => {
  res.header('X-CSRFToken', req.csrfToken())
}
