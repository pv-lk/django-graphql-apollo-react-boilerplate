// Post component
// Comment thread
import { useRouter } from 'next/router'
import { usePostsQuery } from '../../lib/posts/posts'

const Post = () => {
  const router = useRouter()
  const [_, getPostByID] = usePostsQuery()

  const { loading, data, error } = getPostByID(router.query.id)

  if (loading) return <p>Loading...</p>
  if (error) return <p>{ error.message }</p>

  console.log(data)

  return (
    <p>{ data.post.text }</p>
  )
}

export default Post
