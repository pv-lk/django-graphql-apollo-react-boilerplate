import React from 'react'
import { IconButton, Link, Menu, MenuItem } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginLeft: theme.spacing(2)
  }
}))

export const MainMenuCollapse = ({ appLinks, userAppLinks }) => {
  const classes = useStyles()
  // const [auth, setAuth] = React.useState(true)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  // const handleChange = e => {
  //   setAuth(e.target.checked)
  //   console.log('handle change')
  // }

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
      <IconButton
        aria-label="navigation"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <MenuIcon />
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
        {appLinks.map(link => (
          <MenuItem onClick={handleClose} key={link}>
            {link}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}
