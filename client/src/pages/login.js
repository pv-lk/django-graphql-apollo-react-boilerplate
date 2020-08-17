import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers'
import { useLoginMutation } from '../lib/users/login'
import { useCheckAuth } from '../lib/users/check-auth'
import { Field } from '../components/form-field'

const Login = () => {
  const [login, schema, { loading, error }] = useLoginMutation()
  const { handleSubmit, register, errors } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })
  const user = useCheckAuth()

  const onSubmit = e => {
    console.log(e)
    login({ variables: e })
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
            name="username"
            error={errors.username}
            register={register}
          />
          { errors.username?.message }
        </div>
        <div>
          <Field
            fieldType="password"
            name="password"
            error={errors.password}
            register={register}
          />
          { errors.password?.message }
        </div>
        <button type="submit">
          Log in
        </button>
        <p>Don't have an account? <Link href="/signup"><a>Sign up.</a></Link></p>
      </form>
    </>
  )
}

export default Login
