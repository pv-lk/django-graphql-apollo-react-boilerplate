import { useMutation, useApolloClient } from '@apollo/client'
import { useRouter } from 'next/router'
import cookies from '../cookies'
import DELETE_TOKEN_COOKIE from './mutations/DeleteTokenCookie.graphql'

export const useLogoutMutation = () => {
  const client = useApolloClient()
  const router = useRouter()

  const [logout, logoutResult] = useMutation(DELETE_TOKEN_COOKIE, {
    onCompleted: data => {
      console.log(data)
      // django-graphql-jwt removes cookie
      // cookies.destroy({}, 'JWT')
      cookies.destroy({}, 'csrftoken')
      client.resetStore()
      router.push('/login')
      console.log(client.cache)
    },
    onError: error => {
      console.log(error.message)
    },
  })

  // mutation takes arguments (username, password)
  // returns data {token, payload {username, exp, original}, refreshExpiresIn}

  return [logout, logoutResult]
}
