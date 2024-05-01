import React, { useEffect, useState } from 'react';
import './ReceivedPostcards.css'; 

const ReceivedPostcards = () => { 
    const [gallery, setReceivedPostcards] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const userProfile = JSON.parse(localStorage.getItem('userProfile'));

        // fetch("https://postexchange.icytools.cn/getpostcardNotReceived")
        fetch("https://postexchange.icytools.cn/getGlobalGallery")
            .then(response => response.json())
            .then(data => {
                setReceivedPostcards(data.data.map(item => ({ ...item, clicked: false })));
            })
            .catch(error => {
                console.error("Error fetching gallery data from SQL ", error);
            });
    }, []);

    const baseUrl = "https://file.postexchange.icytools.cn/img/";

    const handleImageClick = (index) => {
        const newGallery = gallery.map((item, i) => {
            if (i === index) {
                return { ...item, clicked: !item.clicked };
            } else {
                return { ...item, clicked: false };
            }
        });
        setReceivedPostcards(newGallery);
        setSelectedImage(newGallery[index].clicked ? index : null);
    };

    const handleMarkReceived = () => {
        // Handle marking the selected image as received
        console.log("Marked image as received:", selectedImage);
    };

    return (
        <div className="home-container">
            <div className="gallery-container">
                <h2>Postcards</h2>
                <div className="gallery">
                    {gallery.map((item, index) => (
                        <div 
                            key={index} 
                            className={`gallery-item ${item.clicked ? 'clicked' : ''}`}
                            onClick={() => handleImageClick(index)}
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
