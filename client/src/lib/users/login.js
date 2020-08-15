esversion: 8
import { useMutation, useApolloClient } from '@apollo/client'
import { useRouter } from 'next/router'
import cookies from '../cookies'
import TOKEN_AUTH from './mutations/TokenAuth.graphql'

export const useLoginMutation = () => {
  const client = useApolloClient()
  const router = useRouter()

  const [login, loginResult] = useMutation(TOKEN_AUTH, {
    onCompleted: data => {
      cookies.set({}, 'JWT', data.tokenAuth.auth, { maxAge: 60 * 60 * 24 * 30, sameSite: 'lax' })
      router.push('/')
      // client.cache.reset() // .then(() => { redirect()}
    },
    onError: error => {
      console.log(error)
    },
  })

  // mutation takes arguments (username, password)
  // returns data {token, payload {username, exp, original}, refreshExpiresIn}
  // console.log(client.cache.data)

  return [login, loginResult]
}
