import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const LengthOfDosage = ({ lengthOfDosage, updateLengthOfDosage }) => {
  const handleLengthOfDosageChange = value => {
    if (lengthOfDosage === value) {
      updateLengthOfDosage(0);
    } else {
      updateLengthOfDosage(value);
    }
  };

  return (
    <CardContent className='length-of-dosage'>
      <Typography className='length-of-dosage-section-title' component='p'>
        Length of Dosage
      </Typography>
      <Button
        className={
          lengthOfDosage === 1
            ? 'length-of-dosage-active'
            : 'length-of-dosage-inactive'
        }
        onClick={() => handleLengthOfDosageChange(1)}
      >
        1x - Once
      </Button>
      <Button
        className={
          lengthOfDosage === 2
            ? 'length-of-dosage-active'
            : 'length-of-dosage-inactive'
        }
        onClick={() => handleLengthOfDosageChange(2)}
      >
        2x - Twice
      </Button>
      <Button
        className={
          lengthOfDosage === 3
            ? 'length-of-dosage-active'
            : 'length-of-dosage-inactive'
        }
        onClick={() => handleLengthOfDosageChange(3)}
      >
        3x - Thrice
      </Button>
    </CardContent>
  );
};

export default LengthOfDosage;
