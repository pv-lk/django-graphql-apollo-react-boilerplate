import React from 'react'
import { useForm } from 'react-hook-form'
import { useLoginMutation } from '../lib/users/login'
import { withApollo } from '../lib/apollo'

const SignupPage = () => {
  const [login, loginMutationResult] = useLoginMutation()
  const { handleSubmit, register } = useForm()
  const onSubmit = values => {
    console.log(values)
    login({ variables: values})
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input name="username" ref={register({ required: true })} />
        </div>
        <div>
          <input name="password" type="password" ref={register()} />
        </div>
        <div>
          <input name="confirmPassword"/>
        </div>
        <div>
          <input name="email" />
        </div>
        <div>
          <input name="name" />
        </div>
        <button type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}

export default withApollo()(LoginPage)
