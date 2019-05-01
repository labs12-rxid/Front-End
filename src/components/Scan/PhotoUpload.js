import React, { useState } from 'react';
import axios from 'axios';

const PhotoUpload = props => {
  const [ selfie, setSelfie ] = useState(null);

  const photoSelect = event => {
    setMedImage(event.target.files[0]);
  };

  const photoEndpoint = process.env.REACT_APP_IMAGE_STORE

  const photoUpload = () => {
    const imgData = new FormData();
    imgData.append('image', medImage, medImage.name);
    axios.post(photoEndpoint, imgData)
  };

  return (
    <>
      <input type="file" onChange={photoSelect} />
      <button onClick={photoUpload}>Upload Picture?</button>
    </>
  )
}

export default PhotoUpload;