import React from 'react'
import { Button, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginLeft: theme.spacing(2)
  }
}))

export const MainMenuHorizontal = () => {
  const classes = useStyles()
  return (
    <div>
      <Button className={classes.menuButton}>Home</Button>
      <Button className={classes.menuButton}>Login / Signup</Button>
    </div>
  )
}
