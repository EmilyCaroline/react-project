import React from 'react';

import './Navbar.css';
import Logo from './logo/Logo';
import Searchbar from './searchbox/Searchbox';
import Actions from './actions/actions';
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';


import 'bootstrap/dist/css/bootstrap.min.css';


export default function navBar() {
    return (
    <Navbar collapseOnSelect expand="md" bg="light" variant="light" className="myNav" >
    <Navbar.Brand href="/"><Logo/></Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto" s>
        {/* <Nav.Link href="#features">Features</Nav.Link>
        <Nav.Link href="#pricing">Pricing</Nav.Link>
        <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown> */}
        <Searchbar/>
        </Nav>
        <Nav>
            <Nav.Link eventKey={2} href="/">
                <Actions/>
            </Nav.Link>
        </Nav>
    </Navbar.Collapse>
    </Navbar>
)
}