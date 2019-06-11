import React from 'react';
import CloudIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';

const ImageInput = ({ photoSelect, buttonText, subText, ...props }) => {
  // Extremely breakable component, please be careful.

  const magicClicker = event => {
    if (event.which === 32 || event.which === 13) {
      event.preventDefault();
      document.querySelector(`#image-upload-input`).click();
    }
  }; // Makes accessible "clicking" possible.

  return (
    <div className='upload-button-container'>
      <CloudIcon />
      <label htmlFor='image-upload-input'>
        <input
          accept='image/*'
          style={{ display: 'none' }}
          id='image-upload-input'
          onChange={photoSelect}
          type='file'
        />
        <Button
          variant='contained'
          /* If you think this span is merely stylistic... */
          component='span'
          /* ...think again. */
          className='upload-button'
          onKeyDown={magicClicker}
        >
          Upload {buttonText}
        </Button>
      </label>
      {subText && <p>{subText}</p>}
    </div>
  );
};

export default ImageInput;
