import React from 'react';
import Camera, { IMAGE_TYPES, FACING_MODES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

export default function ImageCapture({ setPhoto }) {
  const onTakePhoto = dataURI => {
    let data = dataURI.split(',');
    let byteString; // initializes without declaring!

    if (data[0].includes('base64')) {
      byteString = atob(data[1]);
    } else {
      throw new Error('Not a base64 dataURI!');
    } // verifies working with base64

    let bufferArray = new Uint8Array(byteString.length);
    for (let byte = 0; byte < byteString.length; byte++) {
      bufferArray[byte] = byteString.charCodeAt(byte);
    } // reads char codes, not literal values!

    let blob = new Blob([bufferArray], { type: 'image/png' }); // binary => image
    setPhoto(blob); // sets data in state
  };

  const onCameraError = error => console.error('onCameraError', error);

  return (
    <Camera
      onTakePhoto={dataURI => {
        onTakePhoto(dataURI);
      }}
      onCameraError={error => {
        onCameraError(error);
      }}
      imageType={IMAGE_TYPES.PNG}
      idealFacingModes={FACING_MODES.ENVIRONMENT}
      isImageMirror={false}
      isSilentMode={false}
      isDisplayStartCameraError={true}
    />
  );
}
