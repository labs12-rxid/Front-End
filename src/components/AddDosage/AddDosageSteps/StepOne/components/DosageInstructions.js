import React from 'react';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const DosageInstructions = ({
  dosageInstruction,
  customInstruction,
  updateDosageInstruction
}) => {
  const handleDosageInstructionChange = value => {
    customInstruction.updateValue({ target: { value: '' } });
    if (dosageInstruction === value) {
      updateDosageInstruction('');
    } else {
      updateDosageInstruction(value);
    }
  };

  return (
    <CardContent className='dosage-instructions'>
      <Typography className='dosage-instructions-section-title' component='p'>
        How will you take this pill?
      </Typography>
      <CardContent className='dosage-instructions-interface'>
        <Button
          className={
            dosageInstruction === 'Before Meal'
              ? 'dosage-instructions-active'
              : 'dosage-instructions-inactive'
          }
          onClick={() => handleDosageInstructionChange('Before Meal')}
        >
          Before Meal
        </Button>
        <Button
          className={
            dosageInstruction === 'With Meal'
              ? 'dosage-instructions-active'
              : 'dosage-instructions-inactive'
          }
          onClick={() => handleDosageInstructionChange('With Meal')}
        >
          With Meal
        </Button>
        <Button
          className={
            dosageInstruction === 'After Meal'
              ? 'dosage-instructions-active'
              : 'dosage-instructions-inactive'
          }
          onClick={() => handleDosageInstructionChange('After Meal')}
        >
          After Meal
        </Button>
        <Button
          className={
            dosageInstruction === 'Without Meal'
              ? 'dosage-instructions-active'
              : 'dosage-instructions-inactive'
          }
          onClick={() => handleDosageInstructionChange('Without Meal')}
        >
          Without Meal
        </Button>
        <TextField
          className='dosage-instructions-text-field'
          label='custom instruction'
          value={customInstruction.value}
          onClick={() => handleDosageInstructionChange('')}
          onChange={customInstruction.updateValue}
          margin='normal'
          variant='outlined'
        />
      </CardContent>
    </CardContent>
  );
};

export default DosageInstructions;
