import React from 'react'
import { CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2)
  }
}))

export default Loading = () => {
  const classes = useStyles()

  return (
    <CircularProgress className={ classes.progress } />
  )
}
