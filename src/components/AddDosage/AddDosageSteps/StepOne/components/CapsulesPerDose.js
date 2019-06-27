import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import Card from '@material-ui/core/Card';

const CapsulesPerDose = ({ updateCapsulesPerDose, capsulesPerDose }) => {
  const handleIncrementCapsulesPerDose = () => {
    updateCapsulesPerDose(capsulesPerDose + 1);
  };
  const handleDecrementCapsulesPerDose = () => {
    if (capsulesPerDose > 0) {
      updateCapsulesPerDose(capsulesPerDose - 1);
    }
  };

  return (
    <CardContent className='capsules-per-dose'>
      <Typography className='capsules-per-dose-section-title' component='p'>
        Dosage Quantity
      </Typography>
      <Card className='capsules-per-dose-interface'>
        <Typography className='capsules-per-dose-interface-title' component='p'>
          Number of Capsules per dose
        </Typography>

        <Button onClick={handleDecrementCapsulesPerDose}>
          <RemoveIcon className='capsules-per-dose-btn' />
        </Button>

        <Typography className='capsules-per-dose-display' component='p'>
          {capsulesPerDose}
        </Typography>

        <Button onClick={handleIncrementCapsulesPerDose}>
          <AddIcon className='capsules-per-dose-btn' />
        </Button>
      </Card>
    </CardContent>
  );
};

export default CapsulesPerDose;
