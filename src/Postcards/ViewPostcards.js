import React, { useEffect, useState } from 'react';
import './ViewPostcards.css'; 

const ViewPostcards = () => { 
    const [gallery, setViewPostcards] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const userProfile = JSON.parse(localStorage.getItem('userProfile'));

        fetch("https://postexchange.icytools.cn/getGlobalGallery")
            .then(response => response.json())
            .then(data => {
                setViewPostcards(data.data.map(item => ({ ...item, clicked: false })));
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
        setViewPostcards(newGallery);
        setSelectedImage(newGallery[index].clicked ? index : null);
    };

    const handleMarkReceived = () => {
        // Handle marking the selected image as received
        console.log("Marked image as received:", selectedImage);
    };

    return (
        <div className="home-container">
            <div className="gallery-container">
                <h2>View Postcards</h2>
                <div className="gallery">
                    {gallery.map((item, index) => (
                        <div 
                            key={index} 
                            hihihi
                            className={`gallery-item ${item.clicked ? 'clicked' : ''}`}
                            onClick={() => handleImageClick(index)}
                        >
                            postcardimgUrl = item.postcardImage

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

export default ViewPostcards;
