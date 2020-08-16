import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import CURRENT_USER from './queries/CurrentUser.graphql'

export const useAuth = () => {
  const router = useRouter()

  const user = useQuery(CURRENT_USER, {
    onCompleted: data => {
      if (data.me) {
        router.push('/')
      }
    },
    onError: error => {
      router.push('/login')
    }
  })
  return user
}
