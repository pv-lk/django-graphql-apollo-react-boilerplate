// Post component
// Comment thread
import { useRouter } from 'next/router'
import { usePostsQuery } from '../../lib/posts/posts'

const Post = () => {
  const router = useRouter()
  const { loading, error, data } = usePostsQuery()

  // console.log(usePostsQuery())

  if (loading) return <p>Loading...</p>
  if (error) return <p>{ error.message }</p>

  console.log(data)

  return (
    <p>{ data.text }</p>
    // <p>not yet</p>
  )
}

export default Post
