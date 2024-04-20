// src/Navbar.js

import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, } from 'react-bootstrap';
//import NavDropdown from 'react-bootstrap/NavDropdown';

const NavigationBar = ({isLoggedIn}) => {


  useEffect(() => {
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));
  }, []);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Post Exchange</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/postcards">
              <Nav.Link>Postcards</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/gallery">
              <Nav.Link>Gallery</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/searchuser">
              <Nav.Link>Search User</Nav.Link>
            </LinkContainer>
            {isLoggedIn ? (
              <React.Fragment>
                <LinkContainer to="/userprofile">
                  <Nav.Link>User Profile</Nav.Link>
                </LinkContainer>
              </React.Fragment>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
