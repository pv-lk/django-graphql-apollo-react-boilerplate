import React from 'react'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import { Button } from '@material-ui/core'
import * as yup from 'yup'

export const loginValidation = yup.object({
  username: yup.string('username'),
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
    <form onSubmit={ handleSubmit }>
      <Field
        id='username'
        value={ username }
        label='username'
        helperText={ touched.username ? errors.username : '' }
        error= { touched.username && Boolean(errors.username) }
        onChange={ handleChange }
        onBlur={ handleBlur }
        component={ TextField }
        margin='dense'
        variant='outlined'
      />
      <Field
        id='password'
        value={ password }
        label='password'
        type='password'
        helperText={ touched.password ? errors.password : '' }
        error= { touched.password && Boolean(errors.password) }
        onChange={ handleChange }
        onBlur={ handleBlur }
        component={ TextField }
        margin='dense'
        variant='outlined'
      />
      <Button type='submit' disabled={ !isValid  || isSubmitting  }>
        Submit
      </Button>
    </form>
  )
}
