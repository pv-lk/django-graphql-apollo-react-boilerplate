import Cookies from '../utils/cookies'

const TOKEN_NAME = ''

export const useAuthToken = () => {
  const setAuthToken = (authToken) => Cookies.set(TOKEN_NAME, authToken)

  const removeAuthToken = () => Cookies.destroy(TOKEN_NAME)

  return [Cookies.get[TOKEN_NAME], setAuthToken, removeAuthToken]
}
