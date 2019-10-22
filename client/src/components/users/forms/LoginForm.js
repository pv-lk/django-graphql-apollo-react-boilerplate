import React from 'react'
import { Formik } from 'formik'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import { Button, TextField } from '@material-ui/core'
import * as yup from 'yup'
import cookie from 'cookie'
import { TOKEN_AUTH } from 'lib/users/graphql/mutations.graphql'
import redirect from 'lib/utils/redirect'
// import cookieLogin from 'lib/users/login'

const validationSchema = yup.object({
  username: yup.string('username').min(8),
  password: yup.string('password')
})

const initialValues = {
  username: '',
  password: ''
}

export const LoginForm = () => {
  const client = useApolloClient()

  const onCompleted = data => {
    console.log(data)
    // django-graphql-jwt automatically sets browser cookie 'JWT'
    // for other backends, set manually
    // document.cookie = cookie.serialize('token', data.tokenAuth.token, {
    //   maxAge: 30 * 24 * 60 * 60
    // })
    client.cache.reset().then(() => {
      redirect({}, '/')
    })
  }

  const onError = error => {
    console.log(error)
  }

  const [login, { loading, error }] = useMutation(TOKEN_AUTH, {
    onCompleted,
    onError
  })

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      render={({
        values: { username, password },
        touched,
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isValid,
        isSubmitting
      }) => {
        return (
          <form onSubmit={handleSubmit}>
            <TextField
              id="username"
              value={username}
              label="username"
              helperText={touched.username ? errors.username : ''}
              error={touched.username && Boolean(errors.username)}
              onChange={handleChange}
              onBlur={handleBlur}
              margin="dense"
              variant="outlined"
            />
            <TextField
              id="password"
              value={password}
              label="password"
              type="password"
              helperText={touched.password ? errors.password : ''}
              error={touched.password && Boolean(errors.password)}
              onChange={handleChange}
              onBlur={handleBlur}
              margin="dense"
              variant="outlined"
            />
            <Button
              type="submit"
              color="primary"
              disabled={!isValid || isSubmitting}
            >
              Submit
            </Button>
          </form>
        )
      }}
      onSubmit={async values => {
        login({ variables: values })
      }}
    />
  )
}
