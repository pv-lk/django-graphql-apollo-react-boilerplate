import { useEffect } from 'react'
import { useLogoutMutation } from '../lib/users/logout'

const Logout = () => {
  const [logout] = useLogoutMutation()

  useEffect(() => { logout() }, [logout])

  return <p>Logging out...</p>
}

export default Logout
