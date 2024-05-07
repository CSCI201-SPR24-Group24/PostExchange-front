import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Card, ListGroup } from 'react-bootstrap';
import './UserProfile.css';

const UserProfile = ({ loginToken, setLoginToken, setLoginState }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://postexchange.icytools.cn/getLoggedInUser', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        if (data.status === 'OK' && data.data) {
          setUser(data.data);
        } else {
          setUser(null); // Handle no user logged in
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        setUser(null); // Handle errors
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('https://postexchange.icytools.cn/doLogout', {
        method: 'GET',
        credentials: 'include',
      });
      setLoginToken(null);
      setLoginState(false);
      localStorage.removeItem('userProfile');
      sessionStorage.removeItem('userProfile');
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return <div>Loading user data...</div>;
  }

  return (
    <Container>
      <div className="profile-container">
        {user ? (
          <Card style={{ width: '18rem', margin: '20px auto' }}>
            <Card.Body>
              <Card.Title>{user.firstName} {user.lastName}</Card.Title>
              <Card.Text>
                {user.userBio}
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Email: {user.email}</ListGroup.Item>
              <ListGroup.Item>Country: {user.userCountry}</ListGroup.Item>
              <ListGroup.Item>Last login: {user.lastLoginTime}</ListGroup.Item>
              <ListGroup.Item>Postcards Sent: {user.numberSent}</ListGroup.Item>
              <ListGroup.Item>Postcards Received: {user.numberReceived}</ListGroup.Item>
              <ListGroup.Item>Last Donated: {user.lastDonated}</ListGroup.Item>
            </ListGroup>
          </Card>
        ) : (
          <div>No user logged in</div>
        )}
      </div>
      <Button className="logout-button" variant="primary" onClick={handleLogout}>Logout</Button>
    </Container>
  );
}

export default UserProfile;
