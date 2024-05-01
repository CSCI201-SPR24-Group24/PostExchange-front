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


        const navigate = useNavigate();

        const handleClick = (index) => {
            // Handle click event
            // setSelectedImageIndex(index);

            const galleryElements = document.querySelectorAll('.gallery-container');
            galleryElements.forEach(element => {
                element.style.display = 'none';
            });

            const viewElements = document.querySelectorAll('.viewPostcard-container');
            viewElements.forEach(element => {
                element.style.display = 'block';
            });
        };

        const handleGoBack = () => {
            // setSelectedImageIndex(null);
    
            const galleryElements = document.querySelectorAll('.gallery-container');
            galleryElements.forEach(element => {
                element.style.display = 'block';
            });
    
            const viewElements = document.querySelectorAll('.viewPostcard-container');
            viewElements.forEach(element => {
                element.style.display = 'none';
            });
        };
    
        const baseUrl = "https://file.postexchange.icytools.cn/img/";

        return(
            <div className="home-container">
            <div className="gallery-container">
            <h2>Personal gallery</h2>
                <div className="gallery">
                    {gallery.map((item, index) => (
                        <div key={index} className="gallery-item" onClick={() => handleClick(index)}> {/* Attach onClick event handler */}
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
            <div className="viewPostcard-container" style={({display: 'none'})}>

                
                <img src={baseUrl + `J49rFQpLHw.jpeg`}></img>
                <button className="go-back" onClick={handleGoBack}>Go Back</button>
                {/* {selectedImageIndex !== null && (
                    <>
                        {<img src={baseUrl + `J49rFQpLHw.jpeg`} alt={gallery[selectedImageIndex].img} />}
                        <button onClick={handleGoBack}>Go Back</button>
                    </>
                )} */}
            </div>
        </div>
        )
}

export default PersonalGallery;