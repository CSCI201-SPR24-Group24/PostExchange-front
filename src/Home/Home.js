import './Home.css'; 
import React, { useEffect, useState, useRef } from 'react';

const Home = () => {
  const isLoggedIn = true; 

  const postcardImages = [
    'samplepostcard1.jpg',
    'samplepostcard2.jpeg',
    'samplepostcard3.jpeg',
    'samplepostcard4.jpg',
    'samplepostcard5.jpeg',
  ];

  const [activities, setActivities] = useState([]);
  const [postcards, setPostcards] = useState([]);
  const [stats, setStats] = useState({});
  const ws = useRef(null);

  useEffect(() => {
    fetch("https://postexchange.icytools.cn/getHomepageData")
      .then(response => response.json())
      .then(data => {
        if (data.status === "OK" && data.data) {
          const loadedActivities = data.data.activities.filter(activity => 
            activity.postcardId &&
            activity.postcardImage &&
            activity.userIDSent &&
            activity.userNameSent &&
            activity.userCountrySent &&
            activity.userIDReceived &&
            activity.userNameReceived &&
            activity.userCountryReceived
          )
          .slice(0, 7);


          setActivities(loadedActivities);
          setPostcards(data.data.postcards.slice(0, 5));
          setStats({
            numMembers: data.data.numMembers,
            numPostcardReceived: data.data.numPostcardReceived,
            numPostcardTravelling: data.data.numPostcardTravelling,
            numPostcardReceived6Months: data.data.numPostcardReceived6Months,
            numDonatedLast6Months: data.data.numDonatedLast6Months
          });

          loadedActivities.forEach(activity => {
            fetch(`https://postexchange.icytools.cn/getPostcard?id=${activity.postcardId}`)
              .then(res => res.json())
              .then(postcardData => {
                if (postcardData.status === 'OK') {
                  setActivities(prevActivities => prevActivities.map(act => 
                    act.postcardId === activity.postcardId ? {...act, ...postcardData.data} : act
                  ));
                }
              })
              .catch(error => console.error(`Failed to fetch for postcard ${activity.postcardId}`, error));
          });
        }
      })
      .catch(error => {
        console.error("Failure in fetching homepage data", error);
      });

      
    ws.current = new WebSocket('wss://postexchange.icytools.cn/activity_socket');

    ws.current.onopen = () => {
      console.log('WebSocket is connected');
    };

    ws.current.onmessage = (e) => {
      const message = JSON.parse(e.data);
      if (message.type === "SEND") {
        const newActivity = {
          postcardId: message.data.postcardId,
          userIDSent: message.data.fromUserId,
          userNameSent: message.data.fromUserName,
          userCountrySent: message.data.fromUserCountry,
          userIDReceived: message.data.toUserId,
          userNameReceived: message.data.toUserName,
          userCountryReceived: message.data.toUserCountry,
        };

        fetch(`https://postexchange.icytools.cn/getPostcard?id=${message.data.postcardId}`)
          .then(res => res.json())
          .then(postcardData => {
            if (postcardData.status === 'OK') {
              newActivity.timeSent = postcardData.data.timeSent;
              setActivities(prevActivities => [newActivity, ...prevActivities.slice(0, 6)]);
            }
          })
          .catch(error => console.error(`Failed fetch for postcard with ID ${message.data.postcardId}`, error));
      }
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket Error: ', error);
    };

    ws.current.onclose = () => {
      console.log('WebSocket is now disconnected');
    };

    return () => {
      ws.current.close();
    };

  }, []);

  

  return (
    <div className="home-container">
      <div className="gallery-container">
        <h2>Gallery of Last 5 Postcards</h2>
        <div className="postcard-gallery">
          {postcardImages.map((imageName, index) => (
            <img
                key={index}
                src={`/${imageName}`} 
                alt={`Postcard ${index + 1}`}
                className="postcard-image"
            />
          ))}
          {/*{postcards.map((postcard, index) => (
            <img
              key={index}
              src={`https://file.postexchange.icytools.cn/img/${postcard.postcardImage}`}
              alt={`Postcard from user ${postcard.userIDSent} to user ${postcard.userIDReceived}`}
              className="postcard-image"
            />
          ))}*/}
        </div>
      </div>
      <div className="activities-container">
      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <img src={`/4494329.png`} alt="Postcard Logo" className="recent-activity-logo" />
        <div className="activity-list">
          {activities.map((activity, index) => (
            <div key={index} className="activity-entry">
              <span className="activity-text">
                <span className="username" style={{color: "navy"}}>{activity.userNameSent}</span>
                  {" from " + activity.userCountrySent + " sent a postcard to "}
                  <span className="username" style={{color: "navy"}}>{activity.userNameReceived}</span>
                  {" in " + activity.userCountryReceived + "            "}
                </span>
                <span className="timestamp">
                {activity.timeSent ? new Date(activity.timeSent).toDateString() : 'Date not available'}
              </span>
            </div>
          ))}
        </div>

        </div>
        <div className="information">
            <h3>Information</h3>
            <div className="information-content">
            <div className="information-text">
            <ul>
            <li>Total Members: <span className="stats-number">{stats.numMembers}</span></li>
            <li>Postcards Received: <span className="stats-number">{stats.numPostcardReceived}</span></li>
            <li>Postcards Travelling: <span className="stats-number">{stats.numPostcardTravelling}</span></li>
            <li>Postcards Received in Last 6 Months: <span className="stats-number">{stats.numPostcardReceived6Months}</span></li>
            <li>Donations in Last 6 Months: <span className="stats-number">{stats.numDonatedLast6Months}</span></li>
            </ul>
            </div>
            <div className="information-image">
             <img src={`/5077969.png`} alt="Postcard Being Sent" />
            </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Home;