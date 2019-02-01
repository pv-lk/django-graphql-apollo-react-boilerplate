import React from 'react'
import { Link } from 'react-router-dom'
import { NavItem } from 'reactstrap'

// don't use NavLink from reactstrap--it nests an <a> within <Link>
const MainNavLink = props => (
    <NavItem>
    <Link to={ props.endpoint } className='nav-link'>
    { props.title }
  </Link>
    </NavItem>
)

export default MainNavLink
