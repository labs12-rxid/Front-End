import React from 'react';
import Button from '@material-ui/core/Button';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';

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

const StepTwo = props => {
  const handleIncrementCapsulesPerDose = () => {
    props.updateCapsulesPerDose(props.capsulesPerDose + 1);
  };
  const handleDecrementCapsulesPerDose = () => {
    if (props.capsulesPerDose > 0) {
      props.updateCapsulesPerDose(props.capsulesPerDose - 1);
    }
  };
  const handleLengthOfDosageChange = value => {
    if (props.lengthOfDosage === value) {
      props.updateLengthOfDosage(0);
    } else {
      props.updateLengthOfDosage(value);
    }
  };
  const handleDosageFrequencyChange = value => {
    if (props.dosageFrequency === value) {
      props.updateDosageFrequency('');
    } else {
      props.updateDosageFrequency(value);
    }
  };
  const handleDosageInstructionChange = value => {
    props.customInstruction.updateValue({ target: { value: '' } });
    if (props.dosageInstruction === value) {
      props.updateDosageInstruction('');
    } else {
      props.updateDosageInstruction(value);
    }
  };

  const handleStartDateChange = e => {
    props.setStartDate(e.target.value);
    // let date = moment(e.target.value).format('L');
    // date = date.split('');
    // date[2] = '-';
    // date[5] = '-';
    // date = date.join('');
    // let newDate = moment(Date.now()).format('L');
    // console.log(newDate);
    // console.log(date);
  };
  const formattedStartDate = date => {};
  // const handlePrevStep = () => {
  //   props.prevStep();
  // };
  const handleConfirmDosage = () => {
    props.nextStep();
  };
  // const handleSkip = () => {
  //   props.nextStep();
  // };
  return (
    <form>
      <CardContent style={{ display: 'flex' }}>
        <Typography component='p'>Dosage Quantity</Typography>
        <Card style={{ display: 'flex' }}>
          <Typography component='p'>Number of Capsules per dose</Typography>

          <Button onClick={handleDecrementCapsulesPerDose}>
            <RemoveIcon />
          </Button>

          <Typography component='p'>{props.capsulesPerDose}</Typography>

          <Button onClick={handleIncrementCapsulesPerDose}>
            <AddIcon />
          </Button>
        </Card>
      </CardContent>
      <CardContent>
        Length of Dosage
        <Button
          style={{
            background: props.lengthOfDosage === 1 ? '#2D90F5' : '',
            color: props.lengthOfDosage === 1 ? 'white' : ''
          }}
          onClick={() => handleLengthOfDosageChange(1)}
        >
          1x - Once
        </Button>
        <Button
          style={{
            background: props.lengthOfDosage === 2 ? '#2D90F5' : '',
            color: props.lengthOfDosage === 2 ? 'white' : ''
          }}
          onClick={() => handleLengthOfDosageChange(2)}
        >
          2x - Twice
        </Button>
        <Button
          style={{
            background: props.lengthOfDosage === 3 ? '#2D90F5' : '',
            color: props.lengthOfDosage === 3 ? 'white' : ''
          }}
          onClick={() => handleLengthOfDosageChange(3)}
        >
          3x - Thrice
        </Button>
      </CardContent>
      <CardContent>
        Dosage Frequency
        <Button
          style={{
            background: props.dosageFrequency === 'daily' ? '#2D90F5' : '',
            color: props.dosageFrequency === 'daily' ? 'white' : ''
          }}
          onClick={() => handleDosageFrequencyChange('daily')}
        >
          Daily
        </Button>
        <Button
          style={{
            background: props.dosageFrequency === 'weekly' ? '#2D90F5' : '',
            color: props.dosageFrequency === 'weekly' ? 'white' : ''
          }}
          onClick={() => handleDosageFrequencyChange('weekly')}
        >
          Weekly
        </Button>
        <Button
          style={{
            background: props.dosageFrequency === 'monthly' ? '#2D90F5' : '',
            color: props.dosageFrequency === 'monthly' ? 'white' : ''
          }}
          onClick={() => handleDosageFrequencyChange('monthly')}
        >
          Monthly
        </Button>
      </CardContent>
      <CardContent>
        How will you take this pill?
        <Button
          style={{
            background:
              props.dosageInstruction === 'Before Meal' ? '#2D90F5' : '',
            color: props.dosageInstruction === 'Before Meal' ? 'white' : ''
          }}
          onClick={() => handleDosageInstructionChange('Before Meal')}
        >
          Before Meal
        </Button>
        <Button
          style={{
            background:
              props.dosageInstruction === 'With Meal' ? '#2D90F5' : '',
            color: props.dosageInstruction === 'With Meal' ? 'white' : ''
          }}
          onClick={() => handleDosageInstructionChange('With Meal')}
        >
          With Meal
        </Button>
        <Button
          style={{
            background:
              props.dosageInstruction === 'After Meal' ? '#2D90F5' : '',
            color: props.dosageInstruction === 'After Meal' ? 'white' : ''
          }}
          onClick={() => handleDosageInstructionChange('After Meal')}
        >
          After Meal
        </Button>
        <Button
          style={{
            background:
              props.dosageInstruction === 'Without Meal' ? '#2D90F5' : '',
            color: props.dosageInstruction === 'Without Meal' ? 'white' : ''
          }}
          onClick={() => handleDosageInstructionChange('Without Meal')}
        >
          Without Meal
        </Button>
        <TextField
          label='custom instruction'
          value={props.customInstruction.value}
          onClick={() => handleDosageInstructionChange('')}
          onChange={props.customInstruction.updateValue}
          margin='normal'
        />
      </CardContent>
      <CardContent>Dosage Time of Day</CardContent>
      <CardContent>
        Start Date
        <Button
          style={{
            background: props.startDate === todaysDate ? '#2D90F5' : '',
            color: props.startDate === todaysDate ? 'white' : ''
          }}
          onClick={() => props.setStartDate(todaysDate)}
        >
          today
        </Button>
        <Button
          style={{
            background:
              props.startDate ===
              formatMomentDate(
                moment(todaysDate)
                  .add(1, 'days')
                  .format('L')
              )
                ? '#2D90F5'
                : '',
            color:
              props.startDate ===
              formatMomentDate(
                moment(todaysDate)
                  .add(1, 'days')
                  .format('L')
              )
                ? 'white'
                : ''
          }}
          onClick={() =>
            props.setStartDate(
              formatMomentDate(
                moment(todaysDate)
                  .add(1, 'days')
                  .format('L')
              )
            )
          }
        >
          tomorrow
        </Button>
        <TextField
          id='date'
          label='Birthday'
          type='date'
          value={props.startDate}
          onChange={handleStartDateChange}
          // className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
        />
      </CardContent>
      <CardContent style={{ display: 'flex' }}>
        <Typography component='p'>Dosage Duration</Typography>
        <Card style={{ display: 'flex' }}>
          <Typography component='p'>Number of days</Typography>

          <Button
            onClick={
              props.dosageDuration > 0
                ? () => props.setDosageDuration(props.dosageDuration - 1)
                : null
            }
          >
            <RemoveIcon />
          </Button>

          <Typography component='p'>{props.dosageDuration}</Typography>

          <Button onClick={() => props.setDosageDuration(props.dosageDuration + 1)}>
            <AddIcon />
          </Button>
        </Card>
      </CardContent>
      <CardContent>Text Reminder</CardContent>
      {/* <Button onClick={handlePrevStep}>Back</Button> */}
      <Button onClick={handleConfirmDosage}>Confirm Dosage</Button>x{' '}
    </form>
  );
};

export default StepTwo;
