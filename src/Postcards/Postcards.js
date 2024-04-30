import React from 'react';
import './Postcards.css'; 
import { useEffect } from "react";
import { useState } from "react";

const Postcards = () => { 

    const[gallery, setPostcards] = useState([]);

    useEffect(() =>{
        const userProfile = JSON.parse(localStorage.getItem('userProfile'));

        if(userProfile){
            
            //fetch(`https://postexchange.icytools.cn/getpostcardNotReceived?user=${userProfile}`,)
            fetch("https://postexchange.icytools.cn/getGlobalGallery",)
            .then(response => response.json())
            .then(data => {
                setPostcards(data.data);
            })
            .catch(error => {
                console.error("Error fetching gallery data from SQL ", error);
            })

        } else{
            fetch("https://postexchange.icytools.cn/getGlobalGallery",)
            .then(response => response.json())
            .then(data => {
                setPostcards(data.data);
            })
            .catch(error => {
                console.error("Error fetching gallery data from SQL ", error);
            })
        }


        },[]);

        const baseUrl = "https://file.postexchange.icytools.cn/img/";

        return(
           <div className="home-container">
          <div className="gallery-container">
            <h2>Postcards</h2>
                <div className="gallery">
                    {gallery.map((item, index) => (
                        <div key={index} className="gallery-item">
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

export default Postcards;