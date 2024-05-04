import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { md5 } from 'js-md5';

const Login = ({loginToken, setLoginToken, setLoginState}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // if(loginToken) {
  //   navigate("/userprofile");
  // }

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log('Login Submitted', { email, password });
    // // Add your logic to handle the login submission here

    try {
      var hash = md5(password);
      console.log(email);
      console.log(hash);

      const response = await fetch(`https://postexchange.icytools.cn/doLogin?email=${email}&password=${hash}`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        console.log(response);
        throw new Error('Login error');
      }

      const logResp = await response.json();
      console.log('Success:', logResp);
      setLoginToken(logResp.data);
      setLoginState(true);

      localStorage.setItem('userProfile', JSON.stringify(logResp));
      sessionStorage.setItem('userProfile', JSON.stringify(logResp));
    
      navigate('/');

    } catch (error) {
      console.log('Error: ', error);
      setError("Incorrect username or password");
    }

  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error}</Alert>} 
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

export default Login;