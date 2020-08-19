import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import ALL_POSTS from './queries/AllPosts.graphql'
import POST_BY_ID from './queries/PostByID.graphql'

export const usePostsQuery = () => {
  const router = useRouter()

  const getAllPosts = () => {
    return useQuery(ALL_POSTS, {
      onCompleted: data => {
        return { posts: data }
      },
      onError: error => {
        console.log(error)
      }
    })
  }

  const getPostByID = id => {
    return useQuery(POST_BY_ID, {
      variables: { id: id },
      onCompleted: data => {
        console.log(data)
        return { post: data.post }
      },
      onError: error => {
        console.log(error)
      },
    })
  }

  // const getPostsByUser = username => {
  //   const postByUser = useQuery(POST_BY_USER, {
  //     variables: {}
  //   })
  // }

  return [getAllPosts, getPostByID]
  // return postByID
}
