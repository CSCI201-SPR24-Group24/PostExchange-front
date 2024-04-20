import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import NavigationBar from './navBar';

const LoginForm = ({setLogin}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Login Submitted', { email, password });
    // Add your logic to handle the login submission here

    const user = 
    {
        "status": "OK",
        "data": {
            "userId": "1",
            "email": "johndoe@example.com",
            "firstName": "John",
            "lastName": "Doe",
            "lastLoginTime": "2024-04-10 03:03:27",
            "numberSent": 5,
            "numberReceived": 3,
            "userCountry": "US",
            "userBio": "Just a regular guy who loves traveling.",
            "profilePicture": "profile1.jpg",
            "lastDonated": "2023-04-01"
        }
    };

    localStorage.setItem('userProfile', JSON.stringify(user));
    sessionStorage.setItem('userProfile', JSON.stringify(user));
    
    setLogin(true);
    navigate('/');
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <h2 className="mb-3">Login</h2>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;