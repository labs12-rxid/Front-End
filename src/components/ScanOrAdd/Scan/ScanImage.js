import React, { useState } from 'react';
import ImageCapture from './ImageCapture.js';
import { useToggle } from 'utilities/useToggle';
import axios from 'axios';
import CloudIcon from '@material-ui/icons/CloudUpload';
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
    <section className='option1-container'>
      <div className='image-container'>
        <h4>Option 1 - Identify by uploading pill image</h4>
        <div className='image-upload'>
          <h5>Pill Image Upload</h5>
          <div className='upload-button-container'>
            <CloudIcon />
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
                className='upload-button'
                onKeyDown={magicClicker}
              >
                Upload front image of pill
              </Button>
            </label>
<<<<<<< HEAD
              <Button onClick={toggleCamera}>Take Photo</Button>
=======
            <p>or drag and drop them here</p>
>>>>>>> 726b991859e5410b1fba9962e9087d1fac4c8004
          </div>
          {state && state.hasVideo && (
            <Button style={{ display: 'none' }} onClick={toggleCamera}>
              Take Photo
            </Button>
          )}
          <Button onClick={upload} className='identify-button'>
            Identify Pill
          </Button>
        </div>
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
      <section className='directions'>
        <h2>Steps To Identify Pill</h2>
        <h3>OPTION - 1</h3>
        <article>
          <ol>
            <li>
              Upload front image of your pill displaying numbers and/or letters.
            </li>
            <li>
              Upload back image of your pill <span>(optional).</span>
            </li>
            <li>
              Click <strong>"Identify Pill"</strong> to get details about your
              pill.
            </li>
          </ol>
        </article>
      </section>
    </section>
  );
}

const styles = theme => ({
  input: {
    display: 'none'
  }
});

export default withStyles(styles)(ScanImage);
