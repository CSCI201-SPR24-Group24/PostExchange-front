// src/Navbar.js

import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';

const NavigationBar = ({loginToken, loginState}) => {

  
   useEffect(() => {
     const userProfile = JSON.parse(localStorage.getItem('userProfile'));
      if(userProfile) {
        console.log(userProfile);
      }
 }, []);



  if(loginToken) {
    console.log(loginToken);
  }

  // var prof_log = () => {
  //   if(loginToken !-= {}) {
  //     return (
  //       <React.Fragment>
  //         <LinkContainer to="/userprofile">
  //           <Nav.Link>User Profile</Nav.Link>
  //         </LinkContainer>
  //       </React.Fragment>
  //     );
  //   }
  //   return (
  //     <LinkContainer to="/login">
  //       <Nav.Link>Login</Nav.Link>
  //     </LinkContainer>
  //   );
  // }

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
            {loginState && <LinkContainer to="/postcards">
               <NavDropdown title="Postcards" id="basic-nav-dropdown">
                {/* <LinkContainer to="/postcards">
                  <NavDropdown.Item>Postcards</NavDropdown.Item>
                </LinkContainer> */}
                {loginState && (
                <LinkContainer to="/createpostcard">
                  <NavDropdown.Item>Create Postcard</NavDropdown.Item>
                </LinkContainer>
                )}
                {loginState && (
                <LinkContainer to="/receivedpostcard">
                  <NavDropdown.Item>Received Postcard</NavDropdown.Item>
                </LinkContainer>
                )}
              </NavDropdown>
            </LinkContainer>}
            {loginState ? (
            <LinkContainer to="/gallery">
              <NavDropdown title="Gallery" id="basic-nav-dropdown">
                <LinkContainer to="/gallery">
                  <NavDropdown.Item>Global Gallery</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/usergallery">
                  <NavDropdown.Item>Personal Gallery</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            </LinkContainer>
            ) : (
            <LinkContainer to="/gallery">
              <Nav.Link>Global Gallery</Nav.Link>
            </LinkContainer>
            )}
            {/* <LinkContainer to="/searchuser">
              <Nav.Link>Search User</Nav.Link>
            </LinkContainer> */}
            {loginState ? (
              <React.Fragment>
                <LinkContainer to="/userprofile">
                  <Nav.Link>User Profile</Nav.Link>
                </LinkContainer>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/signup">
                  <Nav.Link>Sign Up</Nav.Link>
                </LinkContainer>
              </React.Fragment>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
