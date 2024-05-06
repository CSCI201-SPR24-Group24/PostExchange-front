import React, { useState } from 'react';
import FileUploader from './FileUploader';
import './CreatePostcard.css';

function CreatePostcard() {
    const [user, setUser] = useState(null);
    const [searchInput, setSearchInput] = useState('');
    const [imageTag, setImageTag] = useState('');

    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
    };

    const getRandomUser = async () => {
        try {
            const response = await fetch('https://postexchange.icytools.cn/getRandUser', {
                method: 'GET',
                credentials: 'include',
            });
            if (!response.ok) throw new Error('Failed to fetch random user');
            const { data } = await response.json();
            setUser(data);
        } catch (error) {
            console.error('Error fetching random user:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            return;
        }
        try {
            const response = await fetch('https://postexchange.icytools.cn/createPostcard', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    userTo: user.userId,
                    imageTag: imageTag,
                })
            });
            if (!response.ok) throw new Error('Failed to send postcard');
            setSearchInput('');
            setImageTag('');
            setUser(null);
        } catch (error) {
            console.error('Error sending postcard:', error);
        }
    };

    return (
        <div className="create-postcard-container">
            <FileUploader onUploadSuccess={setImageTag} />
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search user"
                    className="search-input"
                    value={searchInput}
                    onChange={handleSearchChange}
                />
                <button className="search-button" onClick={getRandomUser}>Random User</button>
            </div>
            <button className="submit-button" onClick={handleSubmit}>Create Postcard</button>
            {user && (
                <div className="user-details">
                    <h3>Selected User: {user.firstName} {user.lastName}</h3>
                    <p>Email: {user.email}</p>
                    <p>Country: {user.userCountry}</p>
                    <p>Bio: {user.userBio}</p>
                </div>
            )}
        </div>
    );
}

export default CreatePostcard;
