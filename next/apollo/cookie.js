import React from 'react'
import fetch from 'isomorphic-unfetch'
import Cookies from 'js-cookie'

let csrftoken = null

export const getCsrfToken = async () => {
  if (csrftoken) return csrftoken
  csrftoken = await fetch('http://localhost:8000/csrf')
    .then(response => response.json())
    .then(data => data.csrftoken)
  return await csrftoken
}
