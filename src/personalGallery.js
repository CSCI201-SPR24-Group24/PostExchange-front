import { useEffect } from "react";
import './personalGallery.css';
import { useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const PersonalGallery = () =>{

    const[gallery, setPersonalGallery] = useState([]);

    useEffect(() =>{
        const userProfile = JSON.parse(localStorage.getItem('userProfile'));

        if(userProfile){
            // fetch("https://postexchange.icytools.cn/getPersonalGallery",)
            fetch("https://postexchange.icytools.cn/getGlobalGallery",)
            .then(response => response.json())
            .then(data => {
                setPersonalGallery(data.data);
            })
        }


        },[]);

        // const handleImageClick = (index) => {
        //     const newGallery = gallery.map((item, i) => {
        //         if (i === index) {
        //             return { ...item, clicked: !item.clicked };
        //         } else {
        //             return { ...item, clicked: false };
        //         }
        //     });
        //     setReceivedPostcards(newGallery);
        //     setSelectedImage(newGallery[index].clicked ? index : null);
        // };
    
        // const handleMarkReceived = () => {
        //     // Handle marking the selected image as received
        //     console.log("Marked image as received:", selectedImage);
        // };


        const navigate = useNavigate();
        const handleClick = () => {
            // Handle click event
            navigate('/ViewPostcards');
          };
    
        const baseUrl = "https://file.postexchange.icytools.cn/img/";

        return(
           <div className="home-container">
          <div className="gallery-container">
            <h2>Personal gallery</h2>
                <div className="gallery">
                    {gallery.map((item, index) => (
                        <div key={index} className="gallery-item" onClick={handleClick}> {/* Attach onClick event handler */}
                        {/* <div key={index} className="gallery-item"> */}
                            <img src={baseUrl + `J49rFQpLHw.jpeg`} alt={item.img} />
                            <div className="number">
                                <h3></h3>
                                </div> {/* Separate div for numbering */}
                            </div>
                    ))}
                </div>
    
    
          </div>
        </div>
        )
}

export default PersonalGallery;