import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import { AppBar, Hidden, Link, Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { MainMenuHorizontal } from './menus/MainMenuHorizontal'
import { MainMenuCollapse } from './menus/MainMenuCollapse'
import { UserMenu } from './menus/UserMenu'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1)
  },
  title: {
    flexGrow: 1
  }
}))

const Header = () => {
  const classes = useStyles()

  // Pass array of site navigation links to both collapsed and expanded menus.
  const links = [
    <Link to="/" component={RouterLink}>
      All
    </Link>
  ]
  // site navigation for authenticated users
  const userLinks = [
    <Link to="/" component={RouterLink}>
      Feed
    </Link>,
    <Link to="/submit" component={RouterLink}>
      Submit
    </Link>
  ]

  return (
    <AppBar position="relative" className={classes.root}>
      <Toolbar>
        <Typography className={classes.title}>boilerplate</Typography>
        <Link to="" component={RouterLink}>
          Home
        </Link>
        <Link to="/login" component={RouterLink}>
          Login
        </Link>
        <Hidden smDown>
          <MainMenuHorizontal appLinks={links} userAppLinks={userLinks} />
        </Hidden>
        <Hidden mdUp>
          <MainMenuCollapse appLinks={links} userAppLinks={userLinks} />
        </Hidden>
        <UserMenu />
      </Toolbar>
    </AppBar>
  )
}

export default withRouter(Header)
