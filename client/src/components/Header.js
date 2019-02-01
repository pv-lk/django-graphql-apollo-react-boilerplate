import React from 'react'
import { withRouter } from 'react-router'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav } from 'reactstrap'
import LoginMenu from './users/LoginMenu'
import MainNavLink from '../ui/menus/MainNavLink'

class Header extends React.Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    return (
        <header className="App-header">
        <Navbar light expand="md">
        <NavbarBrand href="/" className="app-title">App Title</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
        <Nav className="ml-auto" navbar>
        <MainNavLink endpoint="/" title="home"/>
        </Nav>
        </Collapse>
        </Navbar>
        </header>
    )
  }
}

export default withRouter(Header)
