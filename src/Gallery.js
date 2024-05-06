import { useEffect, useState } from "react"
import './Gallery.css';


const Gallery = () =>{

    const [gallery, setGallery] = useState([]);


    useEffect(() =>{

        fetch("https://postexchange.icytools.cn/getGlobalGallery")
        .then(response => response.json())
        .then(data => {
            setGallery(data.data);
            console.log(gallery);
        })
        .catch(error => {
            console.error("Error fetching gallery data from SQL ", error);
        })
    }, []);

    const baseUrl = "https://file.postexchange.icytools.cn/img/";

    return(
       <div className="home-container">
      <div className="gallery-container">
        <h2>Global Gallery</h2>
            <div className="gallery">
                {gallery.map((item, index) => (
                    <div key={index} className="gallery-item">
                        <img src={baseUrl + `Fp4Mzvrt2W.png`} alt={item.img} />
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