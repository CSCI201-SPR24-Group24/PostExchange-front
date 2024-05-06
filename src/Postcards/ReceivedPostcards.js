import React, { useEffect, useState } from 'react';
import './ReceivedPostcards.css'; 

const ReceivedPostcards = () => { 
    const [gallery, setReceivedPostcards] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const userProfile = JSON.parse(localStorage.getItem('userProfile'));

    
        // fetch("https://postexchange.icytools.cn/getGlobalGallery")
        fetch("https://postexchange.icytools.cn/getpostcardNotReceived",
            {credentials: 'include'}
        )
            .then(response => response.json())
            .then(data => {
                setReceivedPostcards(data.data.map(item => ({ ...item, clicked: false })));
            })
            .catch(error => {
                console.error("Error fetching gallery data from SQL ", error);
            });
    }, []);

    const baseUrl = "https://file.postexchange.icytools.cn/img/";

    const handleImageClick = (index, item) => {
        const newGallery = gallery.map((item, i) => {
            if (i === index) {
                return { ...item, clicked: !item.clicked };
            } else {
                return { ...item, clicked: false };
            }
        });
        setReceivedPostcards(newGallery);
        // setSelectedImage(newGallery[index].clicked ? newGallery[index] : null);
        setSelectedImage(item);
    };

    const handleMarkReceived = () => {
        // Handle marking the selected image as received
        console.log("Marked image as received:", selectedImage);

        // assuming selectedImage contains the postcardID attribute
        const postcardID = selectedImage.postcardId;
        console.log("Postcard id: " + postcardID);
        
        fetch(`https://postexchange.icytools.cn/markReceived?postcardID=${postcardID}`,
        {credentials: 'include',
        method: 'POST'}
    )
        .then(response => {
            // Check if the request was successful (status code 200)
            if (response.ok) {
                // Show a success message
                window.alert("Postcard has been marked as received");
                // Reload the page
                window.location.reload();
            } else {
                // Handle errors
                console.error('Error marking postcard as received:', response.statusText);
                // Show an error message
                window.alert("Failed to mark postcard as received. Please try again later.");
            }
        })
        .catch(error => {
            console.error('Error marking postcard as received:', error);
            // Show an error message
            window.alert("Failed to mark postcard as received. Please check your internet connection.");
        });
    };

    return (
        <div className="home-container">
            <div className="gallery-container">
                <h2>Received Postcards</h2>
                <div className="gallery">
                    {gallery.map((item, index) => (
                        <div 
                            key={index} 
                            className={`gallery-item ${item.clicked ? 'clicked' : ''}`}
                            onClick={() => handleImageClick(index, item)}
                        >
                            <img 
                                src={baseUrl + `J49rFQpLHw.jpeg`} 
                                alt={item.img} 
                            />
                            <div className="number">
                                <h3></h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {selectedImage !== null && (
                <button className="marked-received" onClick={handleMarkReceived}>
                    Marked as Received
                </button>
            )}
        </div>
    );
}

export default ReceivedPostcards;
