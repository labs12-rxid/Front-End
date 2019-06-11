import React from 'react';
import { useToggle } from 'utilities/useToggle';
import ImageCapture from 'components/ImageUpload/ImageCapture.js';
import ImageInput from 'components/ImageUpload/ImageInput.js';
import MaskedInput from 'components/ImageUpload/MaskedInput.js';
import IconButton from '@material-ui/core/IconButton';
import AddAPhoto from '@material-ui/icons/AddAPhoto';

const ImageUpload = ({
  buttonText,
  subText,
  photo,
  setPhoto,
  maskImage,
  ...props
}) => {
  // Hook in this component by providing it with the parts of a seState hook.
  // It will set a photo appropriately! Then just write an upload handler to post it where you want it.
  const [camera, toggleCamera] = useToggle(false);
  const photoSelect = event => setPhoto(event.target.files[0]);
  // const styles = maskImage ? {
  //   display: 'flex',
  //   flexFlow: 'column nowrap'
  // }

  return (
    <div style={{ display: 'flex', flexFlow: 'row nowrap' }}>
      <figure className='image-upload-figure'>
        {camera ? (
          <ImageCapture toggleCamera={toggleCamera} setPhoto={setPhoto} />
        ) : !photo ? (
          maskImage ? (
            <MaskedInput
              buttonText={buttonText}
              subText={subText}
              photoSelect={photoSelect}
              maskImage={maskImage}
            />
          ) : (
            <ImageInput
              buttonText={buttonText}
              subText={subText}
              photoSelect={photoSelect}
            />
          )
        ) : (
          <img src={URL.createObjectURL(photo)} alt='preview' />
        )}
      </figure>
      <div style={{ display: 'flex', flexFlow: 'row nowrap' }}>
        <IconButton
          className='camera'
          aria-label='Use Camera For Picture'
          onClick={toggleCamera}
        >
          <AddAPhoto />
        </IconButton>
      </div>
    </div>
  );
};

export default ImageUpload;
