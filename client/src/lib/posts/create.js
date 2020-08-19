import { useMutation } from '@apollo/client'
import * as yup from 'yup'
import CREATE_POST from './mutations/CreatePost.graphql'

export const useCreatePostMutation = () => {

  const schema = yup.object().shape({
    text: yup.string().required().max(250)
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
