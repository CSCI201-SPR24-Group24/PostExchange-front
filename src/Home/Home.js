import React from 'react';
import './Home.css'; 

const Home = () => {
  const isLoggedIn = true; 

  const postcardImages = [
    'samplepostcard1.jpg',
    'samplepostcard2.jpeg',
    'samplepostcard3.jpeg',
    'samplepostcard4.jpg',
    'samplepostcard5.jpeg',
  ];

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
        </div>
      </div>
      <div className="activities-container">
      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <img src={`/4494329.png`} alt="Postcard Logo" className="recent-activity-logo" />
        <div className="activity-entry">
             <span className="activity-text">Nnaemeka just sent a postcard to New York!</span> <span className="timestamp">Just now</span>
        </div>
        <div className="activity-entry">
            <span className="activity-text">Aanish just sent a postcard to Florida!</span> <span className="timestamp">3 min ago</span>
        </div>
        {/* More activities */}
        </div>
        <div className="information">
            <h3>Information</h3>
            <div className="information-content">
                <div className="information-text">
                <p>Join us at PostExchange, where every postcard bridges the gap between worlds, capturing memories and fostering connections. Our platform is your portal to a world of shared vistas and heartfelt messages, blending the personal touch of traditional postcards with the ease of modern technology.</p>
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
