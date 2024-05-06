import { useEffect } from "react";
import './personalGallery.css';
import { useState } from "react";


const PersonalGallery = () =>{

    const[gallery, setPersonalGallery] = useState([]);

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


        },[]);

        const baseUrl = "https://file.postexchange.icytools.cn/img/";

        return(
           <div className="home-container">
          <div className="gallery-container">
            <h2>Your Gallery</h2>
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

export default PersonalGallery;