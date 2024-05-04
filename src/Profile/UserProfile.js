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
    fetch('https://postexchange.icytools.cn/doLogout', {
      method: 'GET',
      credentials: 'include',
    });
    localStorage.setItem('userProfile', null);
    sessionStorage.setItem('userProfile', null);
    navigate('/');
  };

  const randUser = async e => {
    try {
      const response = await fetch(`https://postexchange.icytools.cn/getRandUser`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        console.log(response);
        throw new Error('Login error');
      }

      const logResp = await response.json();
      console.log('Success:', logResp);
    } catch (error) {

    }
  };

  return (
    <Container className="mt-5">
      <div>User Profile Page (in separate folder)</div>
      <Button variant="primary" type="submit" onClick={handleSumbit}>
        Logout
      </Button>
      <Button type="submit" onClick={randUser}>
        Random User
      </Button>
    </Container>
  );
};


export default UserProfile;