
import React from 'react'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import { Button } from '@material-ui/core'
import * as yup from 'yup'

export const signupValidation = yup.object({
  username: yup.string('username').required('username is required'),
  name: yup.string('name'),
  email: yup.string('email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup.string('password')
    .min(8, 'Password must contain at least 8 characters')
    .required('Enter your password'),
  confirmPassword: yup.string('Confirm your password')
    .required('Confirm your password')
    .oneOf([yup.ref('password')], 'Password does not match')
})

export const SignupForm = props => {
  const {
    values: { username, email, name, password, confirmPassword },
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isValid,
    isSubmitting
  } = props

  return (
    <Form onSubmit={ handleSubmit }>
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
        id='email'
        value={ email }
        label='email'
        type='email'
        helperText={ touched.email ? errors.email : '' }
        error= { touched.email && Boolean(errors.email) }
        onChange={ handleChange }
        onBlur={ handleBlur }
        component={ TextField }
        margin='dense'
        variant='outlined'
      />
      <Field
        id='name'
        value={ name }
        label='name'
        helperText={ touched.name ? errors.name : '' }
        error= { touched.name && Boolean(errors.name) }
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
      <Field
        id='confirmpassword'
        value={ confirmPassword }
        label='confirm password'
        type='password'
        helperText={ touched.confirmPassword ? errors.confirmPassword : '' }
        error= { touched.confirmPassword && Boolean(errors.confirmPassword) }
        onChange={ handleChange }
        onBlur={ handleBlur }
        component={ TextField }
        margin='dense'
        variant='outlined'
      />
      <Button type='submit' disabled={ !isValid || isSubmitting }>
        Submit
      </Button>
    </Form>
  )
}
