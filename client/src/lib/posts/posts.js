import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import ALL_POSTS from './queries/AllPosts.graphql'
import POST_BY_ID from './queries/PostByID.graphql'

export const usePostsQuery = () => {
  const router = useRouter()

  const posts = useQuery(ALL_POSTS, {
    onCompleted: data => {
      return { posts: data }
    },
    onError: error => {
      console.log(error)
    }
  })

  const postByID = useQuery(POST_BY_ID, {
    variables: { id: router.query },
    onCompleted: data => {
      console.log(data)
    },
    onError: error => {
      console.log(error)
    }
  })

  // return [posts, postByID]
  return postByID
}
