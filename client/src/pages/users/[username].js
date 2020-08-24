// Display username, name, bio, date joined
// show submitted posts
import { useRouter } from 'next/router'

const UserProfile = () => {
  const router = useRouter()

  const { username } = router.query
  return (
    <p>{ username }</p>
  )
}

export default UserProfile
