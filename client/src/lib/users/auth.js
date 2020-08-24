import dynamic from 'next/dynamic'
import cookies from 'lib/cookies'
import { useQuery } from '@apollo/client'
import CURRENT_USER from './queries/CurrentUser.graphql'

export const Login = dynamic(() => import('pages/login'))

export const useAuth = () => {

  const isAuthenticated = async ctx => {
    return cookies.get(ctx).JWT ?? null
  }

  const { user, userLoading, userError } = () => {
    return useQuery(CURRENT_USER)
  }

  return [ isAuthenticated, { user, userLoading, userError }]
}
