import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa'; 
import './CreatePostcard.css';

function FileUploader({ onUploadSuccess, setPreviewUrl, previewUrl }) {
    const [file, setFile] = useState(null);

    const handleFileChange = async (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));  
            await uploadFile(selectedFile);
        }
    };

    const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
    
        try {
            const response = await fetch('https://postexchange.icytools.cn/uploadFile', {
                method: 'POST',
                credentials: 'include',
                body: formData, 
            });
            if (!response.ok) throw new Error('Failed to upload file');
            const responseData = await response.json();  // Assuming your response is a valid JSON
            if (responseData.status === "OK" && responseData.data && responseData.data.tag) {
                onUploadSuccess(responseData.data.tag);  // Correctly accessing the tag
            } else {
                throw new Error('No tag found in the response');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };    

    return (
        <div className="file-upload-container">
            <label htmlFor="file-upload" className="file-upload-label">
                {previewUrl ? (
                    <img src={previewUrl} alt="Uploaded" className="image-preview" />
                ) : (
                    <FaPlus size={50} color="gray" />
                )}
                <input id="file-upload" type="file" onChange={handleFileChange} />
            </label>
        </div>
    );
}

export default FileUploader;
