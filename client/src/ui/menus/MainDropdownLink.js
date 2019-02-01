import React from 'react'
import { Link } from 'react-router-dom'
import { DropdownItem } from 'reactstrap'

const MainDropdownLink = props => (
    <Link to={ props.endpoint }>
    <DropdownItem>{ props.title }</DropdownItem>
    </Link>
)

export default MainDropdownLink
