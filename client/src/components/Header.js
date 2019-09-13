import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar,
         Button,
         IconButton,
         Menu,
         MenuItem,
         Toolbar,
         Typography } from '@material-ui/core'
import { MenuIcon, AccountCircle } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

export class Header extends React.Component {
  render() {
    const classes = useStyles()
    // const authToken = localStorage.getItem(AUTH_TOKEN)
    const authToken = 'auth-token'
    return (
      <div className={ classes.root }>
        <AppBar>
          <Toolbar>
            <Typography className={ classes.title }>
              boilerplate
            </Typography>
            <Button className={ classes.button } to='/'>
              Home
            </Button>
            { authToken ? (
              <Button>Logout</Button>
            ) : (
              <Button>Login / Register</Button>
            )}
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}
