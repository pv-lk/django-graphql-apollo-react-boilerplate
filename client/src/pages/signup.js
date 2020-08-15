esversion: 8

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers'
import * as yup from 'yup'
import { useSignupMutation } from '../lib/users/signup'
import { Field } from '../components/form-field'

const schema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required()

})

const Signup = () => {
  const [signup, signupResult] = useSignupMutation()
  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = (e) => {
    console.log(e)
    signup({ variables: e })
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field
          fieldType="text"
          name="username"
          error={errors.username}
          register={register}
        />
        {errors.username?.message}
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
      </form>
    </>
  )
}

export default Signup
