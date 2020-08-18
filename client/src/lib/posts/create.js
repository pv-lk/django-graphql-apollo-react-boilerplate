import { useMutation } from '@apollo/client'
// import { useRouter } from 'next/router'
import * as yup from 'yup'
import CREATE_POST from './mutations/CreatePost.graphql'

export const useCreatePostMutation = () => {
  // const client = useApolloClient()
  // const router = useRouter()

  const schema = yup.object().shape({
    text: yup.string().required()
  })

  const [createPost, createPostResult] = useMutation(CREATE_POST, {
    onCompleted: data => {
      console.log(data)
    },
    onError: error => {
      console.log(error)
    }
  })

  return [createPost, schema, createPostResult]
}
