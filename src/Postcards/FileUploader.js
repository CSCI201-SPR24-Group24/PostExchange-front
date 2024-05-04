import React, { useState } from 'react';

function FileUploader() {
    const [file, setFile] = useState(null);
    const [imageTag, setImageTag] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]); // Capture the first file
    };

    const uploadFile = async () => {
        if (!file) {
            alert('Please select a file to upload.');
            return;
        }
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('https://postexchange.icytools.cn/uploadFile', {
                method: 'POST',
                body: formData, // multipart/form-data is set automatically with FormData
            });
            if (!response.ok) throw new Error('Failed to upload file');
            const data = await response.json();
            setImageTag(data.tag); // Assume the server returns an object with a tag
            alert('File uploaded successfully!');
            updatePostcardImage(data.tag);
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Failed to upload file. Please try again.');
        }
    };

    const updatePostcardImage = async (tag) => {
        try {
            const response = await fetch('https://postexchange.icytools.cn/updatePostcardImage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    imageTag: tag
                })
            });
            if (!response.ok) throw new Error('Failed to update postcard image');
            alert('Postcard image updated successfully!');
        } catch (error) {
            console.error('Error updating postcard image:', error);
            alert('Failed to update postcard image. Please try again.');
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={uploadFile}>Upload File</button>
            {imageTag && <div>Image Tag: {imageTag}</div>}
        </div>
    );
}

export default FileUploader;
