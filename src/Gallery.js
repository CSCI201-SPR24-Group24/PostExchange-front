import { useEffect, useState } from "react"
import './Gallery.css';
import { baseAPIDomain } from "./App/App";


const Gallery = () =>{

    const [gallery, setGallery] = useState([]);


    useEffect(() =>{

        fetch(`https://${baseAPIDomain}/getGlobalGallery`)
        .then(response => response.json())
        .then(data => {
            setGallery(data.data);
            console.log(gallery);
        })
        .catch(error => {
            console.error("Error fetching gallery data from SQL ", error);
        })
    }, []);

    const baseUrl = `https://file.${baseAPIDomain}/img`;

    return(
       <div className="home-container">
      <div className="gallery-container">
        <h2>Global Gallery</h2>
            <div className="gallery">
                {gallery.map((item, index) => (
                    <div key={index} className="gallery-item">
                        <img 
                            src={`${baseUrl}/${item.postcardImage}`} 
                            alt={`Postcard from user ${item.userIDSent} to user ${item.userIDReceived}`} 
                        />
                        <div className="number">
                            <h3>{index + 1}</h3>
                            </div> {/* Separate div for numbering */}
                        </div>
                ))}
            </div>


      </div>
    </div>
    )

    


}

export default Gallery;