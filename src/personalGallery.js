import { useEffect } from "react";
import './personalGallery.css';


const PersonalGallery = () =>{

    useEffect(() =>{
        const userProfile = JSON.parse(localStorage.getItem('userProfile'));



        },[]);

    return(
        <h1>Personal Gallery</h1>
    )
}

export default PersonalGallery;