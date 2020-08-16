import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers'
import { useSignupMutation } from '../lib/users/signup'
import { Field } from '../components/form-field'

const Signup = () => {
  const [signup, schema, { loading, error }] = useSignupMutation()

  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  const onSubmit = async e => {
    await signup({ variables: e })
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        { error && <p>{error.message}</p>}
        <div>
          <Field
            fieldType="text"
            name="username"
            error={errors.username}
            register={register}
          />
          {errors.username?.message}
        </div>
        <Field
          fieldType="text"
          name="email"
          error={errors.email}
          register={register}
        />
        <Field
          fieldType="password"
          name="password"
          error={errors.password}
          register={register}
        />
        <button type="submit">Sign up</button>
        <p>Already have an account? <Link href="/login"><a>Log in.</a></Link></p>
      </form>
    </>
  )
}

export default Signup
