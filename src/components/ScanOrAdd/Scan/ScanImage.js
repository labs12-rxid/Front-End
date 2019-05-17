import React, { useState } from 'react';
import ImageCapture from './ImageCapture.js';
import { useToggle } from 'utilities/useToggle';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import parseMedStrengths from 'utilities/parseMedStrengths';

function ScanImage({ data, setData, ...props }) {
  const [photo, setPhoto] = useState(null);
  const [camera, toggleCamera] = useToggle(false);
  const photoSelect = event => setPhoto(event.target.files[0]);

  const magicClicker = event => {
    if (event.which === 32 || event.which === 13) {
      event.preventDefault();
      document.querySelector('#image-upload-button').click();
    }
  };

  const upload = async () => {
    if (!photo) {
      console.log('Need a photo!');
      return;
    }
    const photoEndpoint = `${process.env.REACT_APP_BACKEND}/api/upload`;
    const imgData = new FormData();
    imgData.append('image', photo, photo.filename);

    console.log('start');
    try {
      const results = await axios.post(photoEndpoint, imgData);
      const parsedResults = JSON.parse(results.data);
      parsedResults instanceof Array
      ? setData(parseMedStrengths(parsedResults))
      : setData(parseMedStrengths([parsedResults]));
    } catch(error) {
      console.error(error);
    }
    console.log('end');
  };

  const { classes } = props;

  return (
    <>
      <div>
        <h4>Option 1 - Identify by uploading an image</h4>
        <div>
          <p>Image Upload</p>
          <div>
            <label htmlFor='image-upload-button'>
              <input
                accept='image/*'
                className={classes.input}
                id='image-upload-button'
                onChange={photoSelect}
                type='file'
              />
              <Button
                variant='contained'
                component='span'
                className={classes.button}
                onKeyDown={magicClicker}
              >
                Upload
              </Button>
            </label>
              <Button onClick={toggleCamera}>Take Photo</Button>
          </div>
        </div>

        <Button variant='contained' onClick={upload}>Identify</Button>
      </div>
      <div>
        {photo && (
          <img
            src={URL.createObjectURL(photo)}
            alt='upload preview'
            style={{ maxWidth: '400px' }}
          />
        )}
      </div>
      {camera ? (
        <ImageCapture setPhoto={setPhoto} />
      ) : null}
    </>
  );
}

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  }
});

export default withStyles(styles)(ScanImage);
