import 'bootstrap/dist/css/bootstrap.css'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'

import React from 'react'



 export default function Header() {
  return (

    <div className="App">
    <Navbar bg="dark" variant="dark"
      sticky="top" expand="sm" collapseOnSelect>
      <Navbar.Brand>
        Gas Application
      </Navbar.Brand>

      <Navbar.Toggle className="coloring" />
      <Navbar.Collapse>
        <Nav>
         
          <Nav.Link href="#blog">Home</Nav.Link>
          <Nav.Link href="#about-us">Statistics</Nav.Link>
        </Nav>
      </Navbar.Collapse>

    </Navbar>

  </div>
  );
}

