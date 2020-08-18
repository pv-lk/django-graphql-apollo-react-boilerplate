import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers'
import { useCreatePostMutation } from '../lib/posts/create'
import { useCheckAuth } from '../lib/users/check-auth'
import { Field } from '../components/form-field'

const Submit = () => {
  const [createPost, schema, { loading, error }] = useCreatePostMutation()
  const { handleSubmit, register, errors } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })
  const user = useCheckAuth()

  const onSubmit = e => {
    console.log(e)
    createPost({ variables: e })
  }

  if (user && user.data && user.data.me) return <p>Redirecting...</p>
  if (loading) return <p>...</p>

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>{error?.message}</p>
        <div>
          <Field
            fieldType="text"
            name="text"
            error={errors.text}
            register={register}
          />
          { errors.text?.message }
        </div>
        <button type="submit">
          Submit
        </button>
      </form>
    </>
  )
}

export default Submit
