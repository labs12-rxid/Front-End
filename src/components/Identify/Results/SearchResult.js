import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
// import CircularProgress from '@material-ui/core/CircularProgress';
// import Image from './Image';
import ResultInfo from './ResultInfo';

const styles = {
  card: {
    border: '1px solid gray',
    margin: '2%',
    width: '96%'
  },
  info: {
    display: 'flex'
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  button: {
    width: '30%',
    height: '2.3rem',
    fontSize: '0.5rem',
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'Capitalize',
    boxShadow: '.1rem .1rem .1rem grey'
  },
  view: {
    backgroundColor: '#5AAC49'
  },
  add: {
    backgroundColor: '#2D90F5'
  },
  genericImage: {
    width: '100px',
    height: '100px'
  }
};

const SearchResult = ({
  classes,
  result,
  handleAddPill,
  handleAddPillReminders,
  setPill
}) => {
  const correctCasing = string => {
    const lowerCasedString = string.toLowerCase();
    return lowerCasedString[0].toUpperCase() + lowerCasedString.slice(1);
  };
  const formattedPill = {
    user_id: localStorage.getItem('userID'),
    med_name: correctCasing(
      result &&
        result.strength &&
        result.strength[0] &&
        result.strength[0][0] &&
        result.strength[0][0]
    ),
    med_color: correctCasing(result.color_text),
    med_shape: correctCasing(result.shape_text),
    med_strength:
      result &&
      result.strength &&
      result.strength[0] &&
      result.strength[0][1] &&
      parseInt(result.strength[0][1]),
    med_strength_unit:
      result &&
      result.strength &&
      result.strength[0] &&
      result.strength[0][2] &&
      result.strength[0][2]
  };

  return (
    <Card className={classes.card}>
      {/* Paper might not be necessary here */}
      <Paper>
        <CardContent className={classes.info}>
          <img
            className={classes.genericImage}
            src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEtm2tJxpsgbyWcy36iZ6tPxSyg-wLQNBLOzRqbiNCaq1iAy5O`}
            alt='A drug'
          />
          <ResultInfo result={result} correctCasing={correctCasing} />
          {/* <CircularProgress
            style={{
              marginLeft: '2rem',
              width: '3rem',
              height: '3rem'
            }}
            variant='static'
            value={90}
          /> */}
        </CardContent>
        <CardContent className={classes.buttons}>
          <Button
            onClick={e => {
              e.preventDefault();
              setPill(result);
              // history.push('/viewdetails');
            }}
            className={`${classes.button} ${classes.view}`}
          >
            View Details
          </Button>
          <Button
            onClick={e => {
              e.preventDefault();
              handleAddPill(formattedPill);
            }}
            className={`${classes.button} ${classes.add}`}
          >
            Add to Med List
          </Button>
          <Button
            onClick={e => {
              e.preventDefault();
              handleAddPillReminders(formattedPill);
            }}
            className={`${classes.button} ${classes.add}`}
          >
            Add with Reminder
          </Button>
        </CardContent>
      </Paper>
    </Card>
  );
};

export default withStyles(styles)(SearchResult);