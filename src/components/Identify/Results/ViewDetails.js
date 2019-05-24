import React from 'react';
// import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import withStyles from '@material-ui/core/styles/withStyles';

import { tablet } from 'scss/mediaVariables';

const styles = theme => ({
  card: {
    width: '75%',
    height: '100%',
    minHeight: '60vh',
    display: 'flex',
    border: '1px solid gray',
    borderRadius: '5px',
    padding: '2rem',
    margin: '2.5rem auto',
    flexWrap: 'wrap'
  },
  no: {
    backgroundColor: '#5AAC49'
  },
  yes: {
    backgroundColor: '#3490F5'
  },
  buttons: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between'
  },
  button: {
    width: '25%',
    height: '3.5rem',
    fontSize: '1rem',
    color: 'white',
    textTransform: 'Capitalize',
    boxShadow: '.2rem .2rem .1rem grey',
    [`${tablet}`]: {
      height: '5rem',
      width: '30%'
    }
  },
  cancel: {
    background: 'black'
  },
  add: {
    background: '#5AAC49'
  },
  addRem: {
    background: '#2D90F5'
  },
  static: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F3F5',
    fontWeight: 'bold',
    fontSize: '16px',
    width: '12rem',
    height: '2.5rem',
    padding: '5px'
  },
  dynamic: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '2.5rem',
    fontSize: '.8rem',
    border: '1px solid #F0F3F5',
    width: '100%',
    padding: '5px'
  },
  genericImage: {
    width: '225px',
    height: '225px',
    margin: '2.5rem 5rem 0 5rem',
    [`${tablet}`]: {
      margin: '0 auto'
    }
  },
  row: {
    display: 'flex'
  },
  right: {
    display: 'flex',
    flexDirection: 'column',
    // Height should be a percentage of the container
    height: '50vh',
    justifyContent: 'space-evenly'
  }
});

const ViewDetails = ({ classes, pill, addPill, setPill, imageLink }) => {
  const correctCasing = string => {
    const lowerCasedString = string.toLowerCase();
    return lowerCasedString[0].toUpperCase() + lowerCasedString.slice(1);
  };

  const formattedPill = {
    user_id: localStorage.getItem('userID'),
    med_name: correctCasing(
      pill &&
        pill.strength &&
        pill.strength[0] &&
        pill.strength[0][0] &&
        pill.strength[0][0]
    ),
    med_color: correctCasing(pill.color_text),
    med_shape: correctCasing(pill.shape_text),
    med_strength:
      pill &&
      pill.strength &&
      pill.strength[0] &&
      pill.strength[0][1] &&
      parseInt(pill.strength[0][1]),
    med_strength_unit:
      pill &&
      pill.strength &&
      pill.strength[0] &&
      pill.strength[0][2] &&
      pill.strength[0][2]
  };
  console.log('Wow im here!!', pill);
  return (
    <div className={classes.card}>
      <div className={classes.left}>
        <img
          className={classes.genericImage}
          // src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEtm2tJxpsgbyWcy36iZ6tPxSyg-wLQNBLOzRqbiNCaq1iAy5O`}
          src={imageLink}
          alt='A drug'
        />
      </div>
      <div className={classes.right}>
        <div className={classes.row}>
          <Typography className={classes.static}>Pill Name:</Typography>
          <Typography className={classes.dynamic}>
            {correctCasing(pill.strength[0] && pill.strength[0][0])}
          </Typography>
        </div>
        <div className={classes.row}>
          <Typography className={classes.static}>Imprint:</Typography>
          <Typography className={classes.dynamic}>{pill.imprint}</Typography>
        </div>
        <div className={classes.row}>
          <Typography className={classes.static}>Color:</Typography>
          <Typography className={classes.dynamic}>{pill.color_text}</Typography>
        </div>
        <div className={classes.row}>
          <Typography className={classes.static}>Strength:</Typography>
          <Typography className={classes.dynamic}>
            {pill.strength[0] && pill.strength[0][1]}
            {pill.strength[0] && pill.strength[0][2]}
          </Typography>
        </div>{' '}
        <div className={classes.row}>
          <Typography className={classes.static}>DEA Schedule:</Typography>
          <Typography className={classes.dynamic}>
            {pill.DEA_schedule}
          </Typography>
        </div>
        <div className={classes.row}>
          <Typography className={classes.static}>Drug Code:</Typography>
          <Typography className={classes.dynamic}>
            {pill.product_code}
          </Typography>
        </div>
        <div className={classes.row}>
          <Typography className={classes.static}>Label Author:</Typography>
          <Typography className={classes.dynamic}>{pill.author}</Typography>
        </div>
      </div>
      <div className={classes.buttons}>
        <Button
          onClick={e => {
            e.preventDefault();
            setPill(null);
          }}
          className={`${classes.button} ${classes.cancel}`}
        >
          Cancel
        </Button>
        <Button
          onClick={e => {
            e.preventDefault();
            addPill(formattedPill);
          }}
          className={`${classes.button} ${classes.add}`}
        >
          Add to Med List
        </Button>
        <Button
          onClick={e => {
            e.preventDefault();
            addPill(formattedPill, 'adddosage');
          }}
          className={`${classes.button} ${classes.addRem}`}
        >
          Add with Reminder
        </Button>
      </div>
    </div>
  );
};

export default withStyles(styles)(ViewDetails);
