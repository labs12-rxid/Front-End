import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import MuiCardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
// import CircularProgress from '@material-ui/core/CircularProgress';
// import Image from './Image';
import ResultInfo from './ResultInfo';
import { tablet, mobile, desktop } from 'scss/mediaVariables';

const CardContent = withStyles({
  root: {
    padding: '0',
    border: 'none'
  }
})(props => <MuiCardContent {...props} />);

CardContent.muiName = 'CardContent';

const styles = {
  card: {
    border: '1px solid #d6d8dd',
    margin: '2%',
    width: '510px',
    padding: '12px',
    boxShadow: 'none',
    [desktop]: {
      width: '90%',
      margin: '20px auto 0px auto'
    }
  },
  info: {
    display: 'flex'
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '.5rem'
  },
  button: {
    fontSize: '1rem',
    color: 'white',
    fontWeight: '300',
    textTransform: 'Capitalize'
  },
  view: {
    backgroundColor: '#5AAC49',
    width: '132px',
    [tablet]: {
      width: '28%'
    },
    [mobile]: {
      width: '28%'
    }
  },
  add: {
    backgroundColor: '#2D90F5',
    width: '116px',
    [tablet]: {
      width: '22%'
    },
    [mobile]: {
      width: '22%'
    }
  },
  rem: {
    backgroundColor: '#2D90F5',
    width: '160px',
    [tablet]: {
      width: '40%'
    },
    [mobile]: {
      width: '40%'
    }
  },
  genericImage: {
    width: '85px',
    height: '85px'
  }
};

const SearchResult = ({ classes, result, addPill, setPill, setImageLink }) => {
  console.log('SEARCH RESULT: ', result);
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

  const imageSrc =
    result.image_id !== null
      ? `https://s3.amazonaws.com/labs12-rxidstore/reference/${result.image_id}`
      : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEtm2tJxpsgbyWcy36iZ6tPxSyg-wLQNBLOzRqbiNCaq1iAy5O`;

  return (
    <Card className={classes.card}>
      <CardContent className={classes.info}>
        <img className={classes.genericImage} src={imageSrc} alt='A drug' />
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
      <div className={classes.buttons}>
        <Button
          onClick={e => {
            e.preventDefault();
            setImageLink(imageSrc);
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
            addPill(formattedPill);
          }}
          className={`${classes.button} ${classes.add}`}
        >
          Add Pill
        </Button>
        <Button
          onClick={e => {
            e.preventDefault();
            // setImage(imageSrc);
            addPill(formattedPill, 'adddosage');
          }}
          className={`${classes.button} ${classes.rem}`}
        >
          Add with Reminder
        </Button>
      </div>
    </Card>
  );
};

export default withStyles(styles)(SearchResult);
