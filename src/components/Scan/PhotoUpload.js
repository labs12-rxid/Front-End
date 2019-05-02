import React, { useState } from 'react';
import ImageCapture from './ImageCapture.js';
import axios from 'axios';

const PhotoUpload = props => {
  const [medImage, setMedImage] = useState(null);

  const [displayCamera, toggleDisplayCamera] = useState(false);

  const photoSelect = event => {
    setMedImage(event.target.files[0]);
  };

  const toggleCamera = () => {
    toggleDisplayCamera(!displayCamera);
  };

  const photoEndpoint = process.env.REACT_APP_IMAGE_STORE;

  const photoUpload = () => {
    const imgData = new FormData();
    imgData.append('image', medImage, medImage.name);
    axios.post(photoEndpoint, imgData);
  };

  return (
    <>
      <input
        type='file'
        accepts='image/*'
        capture='camera'
        onChange={photoSelect}
      />
      <button onClick={photoUpload}>Upload Picture?</button>
      <button onClick={toggleCamera}>take photo</button>
      {displayCamera ? <ImageCapture /> : null}
    </>
  );
};

export default PhotoUpload;
