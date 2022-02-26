import React, { Component } from 'react'
import { Navbar, NavDropdown, Form, FormControl, Button, Nav } from 'react-bootstrap'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from "react-router-dom";

import Home from './Home';

import Statistics from './Statistics';

export default class NavComp extends Component {
    render() {
        return (
            <div style={{width:"100%"}}>
            <Router>

                    <Navbar bg="dark" variant={"dark"} expand="lg">
                        <Navbar.Brand href="#">Gazify</Navbar.Brand>
                        <Navbar.Collapse id="navbarScroll">
                            <Nav
                                className="mr-auto my-2 my-lg-0"
                                style={{ maxHeight: '100px' }}
                                navbarScroll
                            >
                                <Nav.Link as={Link} to="/home">Home</Nav.Link>
                                <Nav.Link as={Link} to="/statistic">Statistics</Nav.Link>

                            </Nav>

                        </Navbar.Collapse>
                    </Navbar>
                <div>

      <Switch>
                        
                        <Route path="/statistic">
                            <Statistics />
                        </Route>
                        <Route path="/">
                            <Home />
                        </Route>
                     </Switch>

                </div>
            </Router>
            </div>
        )
    }
}