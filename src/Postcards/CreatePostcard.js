import React, { useState } from 'react';
import FileUploader from './FileUploader';
import { Form, FormControl, ListGroup, ListGroupItem } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CreatePostcard.css';

function CreatePostcard() {
    const [user, setUser] = useState(null);
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [imageTag, setImageTag] = useState('');
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleSearchChange = (event) => {
        setSearchInput(event.target.value);
        if (event.target.value.length > 1) {
            searchUsers(event.target.value);
        } else {
            setSearchResults([]);
        }
    };

    const searchUsers = async (query) => {
        const response = await fetch(`https://postexchange.icytools.cn/searchUser?q=${query}`);
        const data = await response.json();
        if (data.status === 'OK') {
            setSearchResults(data.data);
        } else {
            setSearchResults([]);
        }
    };

    const handleSelectUser = (user) => {
        setUser(user);
        setSearchResults([]);
        setSearchInput('');
    };

    const getRandomUser = async () => {
        try {
            const response = await fetch('https://postexchange.icytools.cn/getRandUser', {
                method: 'GET',
                credentials: 'include',
            });
            if (!response.ok) throw new Error('Failed to fetch random user');
            const { data } = await response.json();
            console.log(user);
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
            alert("Sent postcard to " + user.firstName + " " + user.lastName);
            setSearchInput('');
            setImageTag('');
            setPreviewUrl(null);
            setUser(null);
        } catch (error) {
            console.error('Error sending postcard:', error);
        }
    };

    return (
        <div className="home-container">
            <div className="create-postcard-container">
                <h2>Create Postcard</h2>
                <FileUploader onUploadSuccess={setImageTag} setPreviewUrl={setPreviewUrl} previewUrl={previewUrl} />
                <Form className="search-container">
                    <FormControl
                        type="text"
                        placeholder="Search user"
                        className="search-input"
                        value={searchInput}
                        onChange={handleSearchChange}
                    />
                    <button type="button" className="search-button" onClick={getRandomUser}>Random User</button>
                </Form>
                {searchResults.length > 0 && (
                    <ListGroup className="search-results-list">
                        {searchResults.map((result) => (
                            <ListGroupItem key={result.userId} action onClick={() => handleSelectUser(result)}>
                                {result.firstName} {result.lastName} - {result.email}
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                )}
                <button variant="success" className="submit-button" onClick={handleSubmit}>Create Postcard</button>
                {user && (
                    <div className="user-details">
                        <h3>Selected User: {user.firstName} {user.lastName}</h3>
                        <p>Email: {user.email}</p>
                        <p>Country: {user.userCountry}</p>
                        <p>Bio: {user.userBio}</p>
                    </div>
                )}
            </div>
        </div>
    );    
}

export default CreatePostcard;
