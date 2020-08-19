import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import CURRENT_USER from './queries/CurrentUser.graphql'

export const useCheckAuth = () => {
  const router = useRouter()

  const authUser = useQuery(CURRENT_USER, {
    onCompleted: data => {
      return { currentUser: data.me }
      // if (data.me) {
      //   router.push('/')
      // }
    },
    onError: error => {
      // router.push('/login')

      return { currentUser: {}}
    }
  })

  const requireAuth = () => {
    if (authUser.error) {
      if (router.pathname !== '/login') router.push('/login')
    }
  }

  return [authUser, requireAuth]
}
