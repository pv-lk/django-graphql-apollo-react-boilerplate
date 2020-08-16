import { useMutation, useApolloClient } from '@apollo/client'
import { useRouter } from 'next/router'
import * as yup from 'yup'
import CREATE_USER from './mutations/CreateUser.graphql'

export const useSignupMutation = () => {
  const client = useApolloClient()
  const router = useRouter()

  const schema = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
  })

  const [signup, signupResult] = useMutation(CREATE_USER, {
    onCompleted: (data) => {
      // send confirmation email
      router.push('/login')
      // client.cache.reset() // .then(() => { redirect()}
    },
    onError: (error) => {
      // handle errors
      // 1. user already exists (email or username)
      if (error.message && error.message.includes('already exists')) {
        if (error.message.includes('username')) {
          error.message = 'An account with this username already exists.'
        }
        else if (error.message.includes('email')) {
          error.message = 'An account is already registered with this email address.'
        }

      }
      console.log(error.message)
    },
  })

  // mutation takes arguments (username, password)
  // returns data {token, payload {username, exp, original}, refreshExpiresIn}
  // console.log(client.cache.data)

  return [signup, schema, signupResult]
}
