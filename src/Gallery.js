import { useEffect, useState } from "react"
import './Gallery.css';


const Gallery = () =>{

    const [gallery, setGallery] = useState([]);


    useEffect(() =>{

        fetch("https://postexchange.icytools.cn/getGlobalGallery")
        .then(response => response.json())
        .then(data => {
            console.log(data.data);
            setGallery(data.data);
        })
        .catch(error => {
            console.error("Error fetching gallery data from SQL ", error);
        })
    }, []);

    return(
       <div className="home-container">
      <div className="gallery-container">
        <h2>Global gallery</h2>
            <img src = {`https://file.postexchange.icytools.cn/img/tul5ASm33H.jpg`} />


      </div>
    </div>
    )

    


}

export default Gallery;