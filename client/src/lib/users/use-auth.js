import { useMutation, useQuery, useApolloClient } from '@apollo/client'
import { useRouter } from 'next/router'
import cookies from '../cookies'
import TOKEN_AUTH from './mutations/TokenAuth.graphql'
import REFRESH_TOKEN from './mutations/RefreshToken.graphql'
import REVOKE_TOKEN from './mutations/RevokeToken.graphql'
// import VERIFY_TOKEN from './mutations/VerifyToken.graphql'
import CURRENT_USER from './queries/CurrentUser.graphql'

export const useAuth = () => {
  const client = useApolloClient()

  const login = values => {
    // first check for current user -> redirect home

    const onLoginCompleted = data => {
      cookies.set(_, 'JWT', data.tokenAuth.auth)
      client.cache.reset() // .then(() => { redirect()})
    }
    const onLoginError = error => {
      console.log(error)
    }

    const [mutateLogin, { error }] = useMutation(
      TOKEN_AUTH,{
        onCompleted: onLoginCompleted,
        onError: onLoginError })

    // mutation takes arguments (username, password)
    // returns data {token, payload {username, exp, original}, refreshExpiresIn}

  }

  const currentUser = () => {
    // if jwt cookie & cache.user -> return user
    // if jwt cookie & no cache.user -> run useQuery(CURRENT_USER), set returned user object in cache
    // else redirect to login

    const [me, { loading, error }] = useQuery(CURRENT_USER)
  }

  const logout = () => {
    // add logout mutation when token expiration is set
    // const [logout, { data }] = useMutation(REVOKE_TOKEN)
    // remove jwt cookie
    // update cache to remove [me]
    // redirect
  }

  // const refreshToken = () => {

  // }

  return {
    login,
    currentUser
  }
}
