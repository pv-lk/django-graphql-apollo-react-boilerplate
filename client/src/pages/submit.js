import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers'
import { useCreatePostMutation } from 'lib/posts/create'
import { Field } from 'components/form-field'
import { useRouter } from 'next/router'
import { Login, useAuth } from 'lib/users/auth'

const Submit = ({ ...props }) => {
  const router = useRouter()
  const [createPost, schema, { loading, error }] = useCreatePostMutation()
  const { handleSubmit, register, errors } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  // auth block
  useEffect (() => {
    if (props.auth) return
    router.replace(router.route, '/login', { shallow: true })
    }, [props.auth])

  if (!props.auth) return <Login/>
  // end auth block

  const [_, {user, userLoading, userError }] = useAuth()

  const onSubmit = e => {
    createPost({ variables: e })
  }

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
          { user?.username }
        </div>
        <button type="submit">
          Submit
        </button>
      </form>
    </>
  )
}

export const getServerSideProps = async ctx => {
  const [isAuthenticated] = useAuth()
  return {
    props: {
      auth: await isAuthenticated(ctx)
    }
  }
}

export default Submit
