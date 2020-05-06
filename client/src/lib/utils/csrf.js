import Cookies from './cookies'

let csrfToken

export const getCsrfToken = async ctx => {
  csrfToken = csrfToken || Cookies.get(ctx).csrftoken

  if (!csrfToken) {
    const response = await fetch('http://localhost:8000/csrf/')
    const data = await response.json()
    csrfToken = data.csrfToken
    Cookies.set(ctx, 'csrftoken', csrfToken)
  }

  return csrfToken
}
