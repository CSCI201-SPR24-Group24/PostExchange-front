import React, { useState } from 'react';
import FileUploader from './FileUploader';

function CreatePostcard() {
    const [user, setUser] = useState(null); // to store the selected or random user
    const [searchInput, setSearchInput] = useState(''); // to store search input by the user
    const [imageTag, setImageTag] = useState(''); // to store image tag

    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleImageTagChange = (e) => {
        setImageTag(e.target.value);
    };

    const getRandomUser = async () => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            alert('Please select a user before sending a postcard.');
            return;
        }
        try {
            const response = await fetch('https://postexchange.icytools.cn/createPostcard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    userTo: user.id, // Assuming 'id' is the user identifier expected by the API
                    imageTag: imageTag, // Optional image tag
                })
            });
            if (!response.ok) throw new Error('Failed to send postcard');
            alert('Postcard sent successfully!');
            // Reset the form and user selection
            setImageTag('');
            setUser(null);
        } catch (error) {
            console.error('Error sending postcard:', error);
            alert('Failed to send postcard. Please try again.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Search user"
                    value={searchInput}
                    onChange={handleSearchChange}
                />
                <button type="button" onClick={getRandomUser}>Random User</button>
                <FileUploader />
                <button type="submit" onClick={handleSubmit}>Create Postcard</button>
            </form>
            {user && <div>Selected User: {user.name}</div>}
        </div>
    );
}

export default CreatePostcard;
