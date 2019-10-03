import React from 'react'
import { Button, TextField } from '@material-ui/core'
import * as yup from 'yup'

const validationSchema = yup.object({
  username: yup.string('username').min(8),
  password: yup.string('password')
})

export const LoginForm = props => {
  const {
    values: { username, password },
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isValid,
    isSubmitting
  } = props

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
      <Button type="submit" color="primary" disabled={!isValid || isSubmitting}>
        Submit
      </Button>
    </form>
  )
}
