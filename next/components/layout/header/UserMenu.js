import React from 'react'
import Link from 'next/link'
import { IconButton, Menu, MenuItem } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginLeft: theme.spacing(2)
  }
}))

export const UserMenu = () => {
  const classes = useStyles()
  const [auth, setAuth] = React.useState(true)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleChange = e => {
    setAuth(e.target.checked)
    console.log('handle change')
  }

  const handleMenu = e => {
     setAnchorEl(e.currentTarget)
    console.log('handle menu')
  }

  const handleClose = () => {
    setAnchorEl(null)
    console.log('handle close')
  }

  return (
    <div>
      {auth && (
        <div>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
            className={ classes.menuButton }
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleChange}>Logout</MenuItem>
          </Menu>
        </div>
      )}
    </div>
  )
}
