import React from 'react';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const DosageDuration = ({ dosageDuration, setDosageDuration }) => {
  return (
    <CardContent className='dosage-duration'>
      <Typography className='dosage-duration-section-title' component='p'>
        Dosage Duration
      </Typography>
      <Card className='dosage-duration-interface'>
        <Typography className='dosage-duration-interface-title' component='p'>
          Number of weeks
        </Typography>

        <Button
          onClick={
            dosageDuration > 0
              ? () => setDosageDuration(dosageDuration - 1)
              : null
          }
        >
          <RemoveIcon className='dosage-duration-btn' />
        </Button>

        <Typography className='dosage-duration-display' component='p'>
          {dosageDuration}
        </Typography>

        <Button onClick={() => setDosageDuration(dosageDuration + 1)}>
          <AddIcon className='dosage-duration-btn' />
        </Button>
      </Card>
    </CardContent>
  );
};

export default DosageDuration;
