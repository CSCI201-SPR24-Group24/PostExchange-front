import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const UserProfile = ({loginToken, setLoginToken, setLoginState}) => {
  const navigate = useNavigate();
//   if(!loginToken) {
//     navigate("/login");
//   }

  const handleSumbit = async e => {
    e.preventDefault();
    setLoginToken(null);
    setLoginState(false);
    navigate('/');
  };

  return (
    <Container className="mt-5">
      <div>User Profile Page (in separate folder)</div>
      <Button variant="primary" type="submit" onClick={handleSumbit}>
        Logout
      </Button>
    </Container>
  );
};


export default UserProfile;