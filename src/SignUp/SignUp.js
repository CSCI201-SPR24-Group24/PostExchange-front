import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { md5 } from 'js-md5';

const SignUp = ({loginToken, setLoginToken, setLoginState}) => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    country: '',
    userBio: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // if(loginToken) {
  //   navigate("/userprofile");
  // }

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log('Login Submitted', { email, password });
    // // Add your logic to handle the login submission here

    try {
      // sign the user up
      console.log(formData);
      formData.password = md5(formData.password);

      var apiCall = 'https://postexchange.icytools.cn/doRegisterUser?';

      Object.keys(formData).forEach((key) => {
        apiCall = apiCall.concat(`${key}=${formData[key]}&`)
      });
      
      console.log(apiCall);

      const response = await fetch(apiCall, {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        console.log(response);
        throw new Error('Signup error');
      }

      const signResp = await response.json();
      console.log('Success:', signResp);


      // log the user in
      const lResponse = await fetch(`https://postexchange.icytools.cn/doLogin?email=${formData.email}&password=${formData.password}`, {
        method: 'POST',
        credentials: 'include',
      });


      if (!lResponse.ok) {
        console.log(lResponse);
        throw new Error('Login error');
      }

      const logResp = await lResponse.json();
      console.log('Success:', logResp);
      setLoginToken(logResp.data);
      setLoginState(true);

      localStorage.setItem('userProfile', JSON.stringify(logResp));
      sessionStorage.setItem('userProfile', JSON.stringify(logResp));
    
      navigate('/');



    //   setLoginToken(logResp.data);
    //   setLoginState(true);

    //   localStorage.setItem('userProfile', JSON.stringify(logResp));
    //   sessionStorage.setItem('userProfile', JSON.stringify(logResp));
    
    //   navigate('/');

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
      <Form.Group controlId="userName">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          maxLength="25"
          required
        />
      </Form.Group>

      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="firstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          maxLength="25"
          required
        />
      </Form.Group>

      <Form.Group controlId="lastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          maxLength="25"
          required
        />
      </Form.Group>

      <Form.Group controlId="country">
        <Form.Label>Country</Form.Label>
        <Form.Control
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          maxLength="2"
          required
        />
      </Form.Group>

      <Form.Group controlId="userBio">
        <Form.Label>Bio</Form.Label>
        <Form.Control
          as="textarea"
          name="userBio"
          value={formData.userBio}
          onChange={handleChange}
          maxLength="6000"
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Register
      </Button>
    </Form>

        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;