import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import MuiButton from '@material-ui/core/Button';

const UploadButton = withStyles({
  root: {
    textTransform: 'capitalize',
    background: 'rgba(32,32,32,0.1)',
    color: 'white'
  }
})(props => <MuiButton {...props} />);

const ImageInput = ({ photoSelect, buttonText, maskImage, ...props }) => {
  // Extremely breakable component, please be careful.

  const magicClicker = event => {
    if (event.which === 32 || event.which === 13) {
      event.preventDefault();
      document.querySelector(`#image-upload-input`).click();
    }
  }; // Makes accessible "clicking" possible.

  return (
    <div
      className='upload-button-container'
      style={{ color: 'rgba(0,0,0,0.5)' }}
    >
      <div
        style={{
          height: '350px',
          width: '350px',
          backgroundImage: `url(${maskImage})`,
          backgroundSize: 'cover',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <label htmlFor='image-upload-input'>
          <input
            accept='image/*'
            style={{ display: 'none' }}
            id='image-upload-input'
            onChange={photoSelect}
            type='file'
          />
          <UploadButton
            variant='contained'
            /* If you think this span is merely stylistic... */
            component='span'
            /* ...think again. */
            className='upload-button'
            onKeyDown={magicClicker}
          >
            Select Image for Upload!
          </UploadButton>
        </label>
      </div>
    </div>
  );
};

export default ImageInput;
