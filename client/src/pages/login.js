import { useForm } from 'react-hook-form'
import { useAuth } from '../lib/users/use-auth'

const Login = () => {
  const { handleSubmit, register, errors } = useForm()

  const onSubmit = (e) => console.log(e.username)
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input name="username" ref={register()}/>
        </div>
        <div>
          <input name="password" type="password" ref={register()}/>
        </div>
        <button type="submit">
          Submit
        </button>
      </form>
    </>
  )
}

export default Login
