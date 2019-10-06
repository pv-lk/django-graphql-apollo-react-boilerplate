import React from 'react'
import { Formik } from 'formik'
import { Button, TextField } from '@material-ui/core'

function CustomTextField(fieldName, labelText) {
  return (
    <TextField
      id={fieldName}
      value={fieldName}
      label={labelText}
      helperText={touched.fieldName ? errors.fieldName : ''}
      error={touched.fieldName && Boolean(errors.fieldName)}
      onChange={handleChange}
      onBlur={handleBlur}
      margin="dense"
      variant="outlined"
    />
  )
}
export const CustomForm = () => {
  const client = useApolloClient()

  const onCompleted = data => {
    Cookies.set('token', data.login.token)
    console.log(Cookies.get())
    client.cache.reset().then(() => {
      // redirect
      return <div>success</div>
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
