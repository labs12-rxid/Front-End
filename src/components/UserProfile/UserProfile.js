import React, { useState } from 'react';
import { connect } from 'react-redux';
import MuiButton from '@material-ui/core/Button';
import MuiTextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import ImageUpload from 'components/ImageUpload';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary.js';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import { editUser, deleteUser, fetchUser } from 'actions';
import { useInput } from 'utilities/useInput';
import { useToggle } from 'utilities/useToggle';

const DeleteButton = withStyles({
  root: {
    textTransform: 'capitalize',
    background: '#D00A1B',
    color: 'white'
  }
})(props => <MuiButton {...props} />);

DeleteButton.muiName = 'Button';

const SaveButton = withStyles({
  root: {
    textTransform: 'capitalize',
    background: '#40AB48',
    color: 'white'
  }
})(props => <MuiButton {...props} />);

SaveButton.muiName = 'Button';

const TextField = withStyles({
  root: {
    width: '350px',
    margin: '7px 0 20px 0'
  }
})(props => <MuiTextField {...props} />);

TextField.muiName = 'TextField';

const DisabledTextField = withStyles({
  root: {
    width: '350px',
    margin: '7px 0 20px 0',
    background: '#E6E7E8'
  }
})(props => <MuiTextField {...props} />);

DisabledTextField.muiName = 'TextField';

const NewAvatarButton = withStyles({
  root: {
    textTransform: 'capitalize',
    background: '#40AB48',
    color: 'white'
  }
})(props => <MuiButton {...props} />);

const CancelUploadButton = withStyles({
  root: {
    textTransform: 'capitalize',
    background: '#D00A1B',
    color: 'white'
  }
})(props => <MuiButton {...props} />);

const UserProfile = ({ editUser, deleteUser, user, history }) => {
  const username = user.username ? user.username : null;
  const [uploading, setUploading] = useToggle();

  const [photo, setPhoto] = useState();
  const firstName = useInput();
  const lastName = useInput();
  const phone = useInput();

  React.useEffect(() => {
    if (user.first_name) {
      firstName.setValue(user.first_name);
    }
    if (user.last_name) {
      lastName.setValue(user.last_name);
    }
    if (user.phone) {
      phone.setValue(user.phone);
    } // eslint-disable-next-line
  }, []);

  const requestEditUser = e => {
    e.preventDefault();
    editUser({
      id: user.id,
      first_name: firstName.value,
      last_name: lastName.value,
      phone: phone.value
    });
  };

  const requestDeleteUser = e => {
    e.preventDefault();
    deleteUser(user.id);
    history.push('/');
  };

  const upload = async () => {
    if (!photo) {
      console.log('Need a photo!');
      return;
    }

    // prettier-ignore
    const photoEndpoint = `${process.env.REACT_APP_BACKEND}/api/users/${user.id}/avatar`;
    const postData = new FormData();
    postData.append('image', photo);

    try {
      const results = await axios.post(photoEndpoint, postData);
      if (results.data.message.search(/success/i) > -1) {
        fetchUser(user.id);
      } else {
        console.error(results, 'Failure?');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const clearUpload = () => {
    setUploading();
    setPhoto();
  };

  return (
    <div className='user-profile'>
      <div className='user-profile-banner'>My Profile</div>
      <div className='user-profile-content'>
        <div className='user-image-upload'>
          <p className='user-image-upload-label'>User Image Upload</p>
          <div
            className='user-image-upload-component'
            style={{ display: 'flex', flexFlow: 'column nowrap' }}
          >
            <ErrorBoundary>
              <div style={{ height: '350px', width: '350px' }}>
                {!uploading ? (
                  <img
                    style={{
                      objectFit: 'cover',
                      height: '100%',
                      width: '100%'
                    }}
                    src={
                      user.profile_image_url
                        ? `/users/images/${user.profile_image_url}`
                        : `/images/avatar-3.png`
                    }
                    alt='you'
                  />
                ) : (
                  <ImageUpload
                    maskImage={
                      user.profile_image_url
                        ? `/users/images/${user.profile_image_url}`
                        : `/images/avatar-3.png`
                    }
                    photo={photo}
                    setPhoto={setPhoto}
                  />
                )}
              </div>
              <div>
                {' '}
                {!uploading ? (
                  <NewAvatarButton onClick={setUploading}>
                    Upload New Image?
                  </NewAvatarButton>
                ) : (
                  <React.Fragment>
                    <CancelUploadButton
                      onClick={clearUpload}
                      style={{ margin: '0 5px' }}
                    >
                      Cancel?
                    </CancelUploadButton>
                    <NewAvatarButton
                      onClick={upload}
                      style={{ margin: '0 5px' }}
                    >
                      {' '}
                      Upload Image!{' '}
                    </NewAvatarButton>
                  </React.Fragment>
                )}
              </div>
            </ErrorBoundary>
          </div>
        </div>
        <div className='user-profile-inputs'>
          <p className='user-profile-input-label'>Username</p>
          <DisabledTextField
            disabled
            id='outlined-bare'
            defaultValue={username}
            margin='normal'
            variant='outlined'
          />
          <p className='user-profile-input-label'>First Name</p>
          <TextField
            id='outlined-bare'
            value={firstName.value}
            onChange={firstName.updateValue}
            margin='normal'
            variant='outlined'
          />
          <p className='user-profile-input-label'>Last Name</p>
          <TextField
            id='outlined-bare'
            value={lastName.value}
            onChange={lastName.updateValue}
            margin='normal'
            variant='outlined'
          />
          <p className='user-profile-input-label'>Phone Number</p>
          <TextField
            id='outlined-bare'
            value={phone.value}
            onChange={phone.updateValue}
            margin='normal'
            variant='outlined'
          />
        </div>
      </div>
      <div className='user-profile-buttons'>
        <DeleteButton
          tabIndex='-1'
          variant='contained'
          onClick={requestDeleteUser}
        >
          Delete Account
        </DeleteButton>
        <SaveButton variant='contained' onClick={requestEditUser}>
          Save Profile
        </SaveButton>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.userReducer.user
});

export default connect(
  mapStateToProps,
  { editUser, deleteUser, fetchUser }
)(withRouter(UserProfile));
