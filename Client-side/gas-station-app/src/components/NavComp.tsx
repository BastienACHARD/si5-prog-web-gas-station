import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from "react-router-dom";

import Home from './Home';
import Logo from "../assets/logo.png"
import Statistics from './Statistics';

export default class NavComp extends Component {
    render() {
        return (
            <div style={{width:"100%"}}>
            <Router>

                    <Navbar bg="dark" variant={"dark"} expand="lg">
                    <img style={{width:"4%",height:"5%"}} src={Logo}></img>

                        <Navbar.Brand style={{width:"6%",height:"5%"}} >
                            
                            <h2>Gazify</h2></Navbar.Brand>
                        <Navbar.Collapse id="navbarScroll">

                            <Nav
                                className="mr-auto my-2 my-lg-0"
                                style={{ maxHeight: '100px' ,marginLeft:"80%"}}
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