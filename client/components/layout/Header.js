import React from 'react'
import { AppBar, Hidden, Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { MainMenuHorizontal } from './header/MainMenuHorizontal'
import { MainMenuCollapse } from './header/MainMenuCollapse'
import { UserMenu } from './header/UserMenu'
import Link from '../common/Link'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1)
  },
  title: {
    flexGrow: 1
  }
}))

export const Header = () => {
  const classes = useStyles()

  // Pass array of site navigation links to both collapsed and expanded menus.
  const links = [
    <Link href="/">All</Link>,
    <Link href="/login">Login</Link>
  ]
  // site navigation for authenticated users
  const userLinks = [
    <Link href="/">Feed</Link>,
    <Link href="/">Submit</Link>
  ]


  return (
    <AppBar position="relative" className={classes.root}>
      <Toolbar>
        <Typography className={classes.title}>boilerplate</Typography>
        <Link href="/" name="Home" />
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
