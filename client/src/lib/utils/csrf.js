import React from 'react'
import nookies from 'nookies'
import { CSRF_URL } from 'lib/config/urls'

export default async (ctx = {}) => {
  const csrfToken = nookies.get(ctx).csrftoken
  if (csrfToken === null) {
    const response = await fetch(CSRF_URL)
      .then(response => response.json())
      .then(data => data.csrfToken)
      .catch(error => console.error(error))
    const data = await response.json()
    csrfToken = data.csrfToken
  }

  console.log(csrfToken)
  return csrfToken
}
