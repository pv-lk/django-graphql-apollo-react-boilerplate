import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import CURRENT_USER from './queries/CurrentUser.graphql'

export const useCheckAuth = () => {
  const router = useRouter()

  const user = useQuery(CURRENT_USER, {
    onCompleted: data => {
      console.log(data.me)
      return { currentUser: data.me }
      // if (data.me) {
      //   router.push('/')
      // }
    },
    onError: error => {
      // router.push('/login')
      if (router.pathname !== '/login') router.push('/login')
      return { currentUser: {}}
    }
  })
}
