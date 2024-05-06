// import { useEffect } from "react";
// import './personalGallery.css';
// import { useState } from "react";


// const PersonalGallery = () =>{

//     const[gallery, setPersonalGallery] = useState([]);

//     useEffect(() =>{
//         const userProfile = JSON.parse(localStorage.getItem('userProfile'));

//         if(userProfile){
//             fetch("https://postexchange.icytools.cn/getPersonalGallery",
//         {credentials: 'include'}
//     )
//             .then(response => response.json())
//             .then(data => {
//                 setPersonalGallery(data.data);
//                 console.log(data);
//             })
//         }


//         },[]);

//         const baseUrl = "https://file.postexchange.icytools.cn/img/";

//         return(
//            <div className="home-container">
//           <div className="gallery-container">
//             <h2>Your Gallery</h2>
//                 <div className="gallery">
//                     {gallery.map((item, index) => (
//                         <div key={index} className="gallery-item">
//                             <img src={baseUrl + `J49rFQpLHw.jpeg`} alt={item.img} />
//                             <div className="number">
//                                 <h3></h3>
//                                 </div> {/* Separate div for numbering */}
//                             </div>
//                     ))}
//                 </div>
    
    
//           </div>
//         </div>
//         )
// }

// export default PersonalGallery;

import { useEffect } from "react";
import './personalGallery.css';
import { useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { useRef } from 'react';

const PersonalGallery = () =>{

    const[gallery, setPersonalGallery] = useState([]);
    const [isFlipped, setIsFlipped] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();
    const prevCount = useRef(1);

    var userReceived = 1;
    var userSent = 1;
    var dateSent = '1/23/34';
    var postcardPicture;
    var postcardMsg = 'hello';

    useEffect(() =>{
        const userProfile = JSON.parse(localStorage.getItem('userProfile'));

        if(userProfile){
            fetch("https://postexchange.icytools.cn/getPersonalGallery",
        {credentials: 'include'}
    )
            .then(response => response.json())
            .then(data => {
                setPersonalGallery(data.data);
                console.log(data);
            })
        }
    

        const handleClick = (index, item) => {
            // Handle click event
            // setSelectedImageIndex(index);

            const newGallery = gallery.map((item, i) => {
                if (i === index) {
                    return { ...item, clicked: !item.clicked };
                } else {
                    return { ...item, clicked: false };
                }
            });
            // setSelectedImage(newGallery[index].clicked ? index : null);
            setSelectedImage(item);

            const galleryElements = document.querySelectorAll('.gallery-container');
            galleryElements.forEach(element => {
                element.style.display = 'none';
            });

            const viewElements = document.querySelectorAll('.viewPostcard-container');
            viewElements.forEach(viewElement => {
                const galleryElement = viewElement.querySelector('.viewGallery');
                viewElement.style.display = 'block'; // Hide the viewPostcard-container
            });


            const backButton = document.querySelectorAll('.go-back');
            backButton.forEach(element => {
                element.style.display = 'block';
            });
        };

        

        const handleGoBack = () => {
            setSelectedImage(null);
    
            const galleryElements = document.querySelectorAll('.gallery-container');
            galleryElements.forEach(element => {
                element.style.display = 'block';
            });
    
            const viewElements = document.querySelectorAll('.viewPostcard-container');
            viewElements.forEach(viewElement => {
                const galleryElement = viewElement.querySelector('.viewGallery');
                // galleryElement.classList.remove('flip'); // Remove the 'flip' class from the gallery element
                viewElement.style.display = 'none'; // Hide the viewPostcard-container
            });

            const backButton = document.querySelectorAll('.go-back');
            backButton.forEach(element => {
                element.style.display = 'none';
            });
        };

        // const prevCount = useRef(1);

        const handleImageClick = (image) => {
            setIsFlipped(!isFlipped);
            prevCount.current += 1;
            console.log("Count: " + prevCount.current);
            
            var viewPostcardContainer = document.querySelector('.viewGallery');
            viewPostcardContainer.classList.toggle('flip'); // Toggle the 'flip' class
            
            const frontCard = document.querySelectorAll('.front');
            const backCard = document.querySelectorAll('.back');

            userReceived = image.userIDReceived
            userSent = image.userIDSent
            dateSent = image.timeSent
            postcardPicture = image.postcardImage
            postcardMsg = image.postcardMessage
            
            if (prevCount.current % 2 === 0) {
                frontCard.forEach(element => {
                    element.style.display = 'none';
                });

                backCard.forEach(element => {
                    element.style.display = 'flex';
                    console.log("back is shown");
                });
            } else {
                frontCard.forEach(element => {
                    element.style.display = 'flex';
                });

                backCard.forEach(element => {
                    element.style.display = 'none';
                    console.log("back is hidden");
                });
            }
        };

        
    
        const baseUrl = "https://file.postexchange.icytools.cn/img/";

        return(
            <div className="home-container">
            <div className="gallery-container">
            <h2>Personal gallery</h2>
                <div className="gallery">
                    {gallery.map((item, index) => (
                        <div key={index} className="gallery-item" onClick={() => handleClick(index, item)}> {/* Attach onClick event handler */}
                        {/* <div key={index} className="gallery-item"> */}
                            <img src={baseUrl + `J49rFQpLHw.jpeg`} alt={item.img} />
                            <div className="number">
                                <h3></h3>
                                </div> {/* Separate div for numbering */}
                            </div>
                    ))}
                </div>
            </div>
            {/* <div className="viewPostcard-container" style={{ display: selectedImageIndex !== null ? 'block' : 'none' }}> */}
            <div className="viewPostcard-container" style={{ display: 'none' }}>
                <div className="viewGallery" onClick={handleImageClick(gallery[selectedImage])}>
                    
                    <div className="front">
                        <img src={baseUrl + `J49rFQpLHw.jpeg`} alt="Front of postcard" />
                    </div>
                    <div className="back" style={{display:'none'}} >
                        <div className="backInfo">
                            <p><b>Date Sent: </b><span style={{ textDecoration: 'underline' }}>{dateSent}</span></p>
                            <p><b>To: </b><span style={{ textDecoration: 'underline' }}>{userReceived}</span></p>
                            <p><b>From: </b><span style={{ textDecoration: 'underline' }}>{userSent}</span></p>
                        </div>
                        <div className="verticalLine"></div>
                        <div className="backMessage">
                            <p><b>Postcard Message</b></p>
                            <p style={{ textDecoration: 'underline' }}>{postcardMsg}</p>
                        </div>
                    </div>
                    <div className="revealPostcardMsg">
                        <p><b>Click to Reveal Postcard Content!</b></p>
                    </div>
                </div>
            </div> 
            <button className="go-back" style={{display:'none'}} onClick={handleGoBack}>Go Back</button>
            
            

        </div>
        )
}
)}

export default PersonalGallery;