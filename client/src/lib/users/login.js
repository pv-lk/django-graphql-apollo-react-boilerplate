import { useMutation, useApolloClient } from '@apollo/client'
import { useRouter } from 'next/router'
import * as yup from 'yup'
import cookies from '../cookies'
import TOKEN_AUTH from './mutations/TokenAuth.graphql'

export const useLoginMutation = () => {
  const client = useApolloClient()
  const router = useRouter()

  const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required()
  })

  const [login, loginResult] = useMutation(TOKEN_AUTH, {
    onCompleted: data => {
      // Cookies are set automatically by django-graphql-jwt
      // cookies.set({}, 'JWT', data.tokenAuth.auth, { maxAge: 60 * 60 * 24 * 30, sameSite: 'lax' })
      router.push('/')
      // client.cache.reset() // .then(() => { redirect()}
    },
    onError: error => {
      console.log(error.message)
    },
  })

  // mutation takes arguments (username, password)
  // returns data {token, payload {username, exp, original}, refreshExpiresIn}
  // console.log(client.cache.data)

  return [login, schema, loginResult]
}
