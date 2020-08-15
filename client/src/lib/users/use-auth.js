import { useMutation, useQuery, useApolloClient } from '@apollo/client'
import { useRouter } from 'next/router'
import cookies from '../cookies'
import TOKEN_AUTH from './mutations/TokenAuth.graphql'
import REFRESH_TOKEN from './mutations/RefreshToken.graphql'
import CREATE_USER from './mutations/CreateUser.graphql'
import REVOKE_TOKEN from './mutations/RevokeToken.graphql'
// import VERIFY_TOKEN from './mutations/VerifyToken.graphql'
import CURRENT_USER from './queries/CurrentUser.graphql'

export const useAuth = () => {
  const client = useApolloClient()
  const router = useRouter()

  const { me, loading, error } = useQuery(CURRENT_USER)
  const [mutateLogin, loginResult] = useMutation(TOKEN_AUTH)
  const [mutateSignup] = useMutation(CREATE_USER)

  const login = values => {
    mutateLogin({
      variables: values,
      update: data => {
        router.push('/')
      },
      onCompleted: data => {
        cookies.set({}, 'JWT', data.tokenAuth.auth, { maxAge: 60 * 60 * 24 * 30,
                                                      sameSite: 'lax' })
        router.push('/')
        // client.cache.reset() // .then(() => { redirect() })
      },
      onError: error => {
        console.log(error)
      }
    })
  }

  const currentUser = () => {
    console.log(me)
  }

  const logout = () => {
    // add logout mutation when token expiration is set
    // const [logout, { data }] = useMutation(REVOKE_TOKEN)
    // remove jwt cookie
    // update cache to remove [me]
    // redirect
    cookies.destroy({}, 'JWT')
  }

  return {
    login,
    loginResult
  }
}
