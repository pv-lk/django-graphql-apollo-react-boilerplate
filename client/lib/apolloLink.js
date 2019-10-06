import React from 'react'
import { from } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'
import Cookie from 'js-cookie'

export const apolloLink = () => {
  const fetchOptions = {}

  let csrftoken

  const getCsrfToken = async () => {
    if (csrftoken) return csrftoken
    csrftoken = await fetch('http://localhost:8000/csrf')
      .then(response => response.json())
      .then(data => data.csrftoken)
    return await csrftoken
  }

  // If you are using a https_proxy, add fetchOptions with 'https-proxy-agent' agent instance
  // 'https-proxy-agent' is required here because it's a sever-side only module
  if (typeof window === 'undefined') {
    if (process.env.https_proxy) {
      fetchOptions.agent = new (require('https-proxy-agent'))(
        process.env.https_proxy
      )
    }
  }

  const httpLink = createHttpLink({
    uri: 'http://localhost:8000/graphql',
    credentials: 'include',
    fetch,
    fetchOptions
  })

  const authMiddleware = setContext((_, { headers }) => {
    const token = Cookie.get('JWT')
    return {
      headers: {
        ...headers,
        authorization: token ? `JWT ${token}` : ''
      }
    }
  })

  const csrfMiddleware = async (operation) => {
    const csrftoken = await getCsrfToken()
    Cookie.set('csrftoken', csrftoken)
    operation.setContext({
      headers: {
        ...headers,
        'X-CSRFToken': csrftoken
      }
    })
  }

  return from([
    authMiddleware,
    // csrfMiddleware,
    httpLink
  ])
}
