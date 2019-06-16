import React from 'react';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const StartDate = ({ startDate, setStartDate }) => {
  const formatMomentDate = dateData => {
    dateData = dateData.split('');
    let date =
      dateData[6] +
      dateData[7] +
      dateData[8] +
      dateData[9] +
      '-' +
      dateData[0] +
      dateData[1] +
      '-' +
      dateData[3] +
      dateData[4];

    return date;
  };

  const todaysDate = formatMomentDate(moment(Date.now()).format('L'));

  const handleStartDateChange = e => {
    setStartDate(e.target.value);
  };

  return (
    <CardContent className='start-date'>
      <Typography className='start-date-section-title' component='p'>
        Start Date
      </Typography>
      <Button
        className={
          startDate === todaysDate ? 'start-date-active' : 'start-date-inactive'
        }
        onClick={() => setStartDate(todaysDate)}
      >
        Today
      </Button>
      <Button
        className={
          startDate ===
          formatMomentDate(
            moment(todaysDate)
              .add(1, 'days')
              .format('L')
          )
            ? 'start-date-active'
            : 'start-date-inactive'
        }
        onClick={() =>
          setStartDate(
            formatMomentDate(
              moment(todaysDate)
                .add(1, 'days')
                .format('L')
            )
          )
        }
      >
        Tomorrow
      </Button>
      <TextField
        className='start-date-text-field'
        id='date'
        type='date'
        value={startDate}
        onChange={handleStartDateChange}
        InputLabelProps={{
          shrink: true
        }}
      />
    </CardContent>
  );
};

export default StartDate;
