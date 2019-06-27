import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PillCard from '../PillCard';
import ScheduleCards from './ScheduleCards.js';

const DataDisplay = ({ title, data }) => (
  <div className='confirm-dosage-data-display'>
    <Typography component='p'>{title}</Typography>
    <Typography className='confirm-dosage-data-display-data' component='p'>
      {data}
    </Typography>
  </div>
);

const StyledHr = () => <hr className='confirm-dosage-hr' />;

const StepTwo = ({
  med,
  medImage,
  capsulesPerDose,
  lengthOfDosage,
  dosageFrequency,
  dosageInstruction,
  customInstruction,
  dosageDuration,
  startDate,
  setStep,
  handleAddPill
}) => {
  return (
    <div className='confirm-dosage'>
      <section className='confirm-dosage-section'>
        <Typography className='confirm-dosage-section-title' component='p'>
          Confirm Dosage Schedule
        </Typography>
        <Card className='confirm-dosage-section-container'>
          <PillCard med={med} medImage={medImage} />
          <Card className='confirm-dosage-section-container-card'>
            <Typography className='confirm-dosage-section-container-card-title'>
              SCHEDULE
            </Typography>
            <CardContent>
              <DataDisplay
                title='Dosage Quantity'
                data={
                  capsulesPerDose +
                  (capsulesPerDose > 1
                    ? ' capsules'
                    : capsulesPerDose === 0
                    ? ' capsules'
                    : ' capsule')
                }
              />
              <StyledHr />
              <DataDisplay
                title='Length of Dosage'
                data={lengthOfDosage + 'X'}
              />
              <StyledHr />
              <DataDisplay title='Dosage Frequency' data={dosageFrequency} />
              <StyledHr />
              <DataDisplay
                title='Dosage Instruction'
                data={customInstruction.value || dosageInstruction}
              />
              <StyledHr />
              <DataDisplay
                title='Dosage Duration'
                data={`${dosageDuration} - ${
                  dosageDuration === 1 ? 'week' : 'weeks'
                }`}
              />
              <StyledHr />
              <DataDisplay title='Start Date' data={startDate} />
            </CardContent>
            <CardActions className='confirm-dosage-section-actions'>
              <Button
                className='confirm-dosage-section-actions-edit'
                onClick={() => setStep(0)}
              >
                Edit Schedule
              </Button>
              <Button
                className='confirm-dosage-section-actions-save'
                onClick={() => handleAddPill()}
              >
                Save Dosage
              </Button>
            </CardActions>
          </Card>
        </Card>
      </section>
      <section className='schedule-cards-section'>
        <ScheduleCards />
      </section>
    </div>
  );
};

export default StepTwo;
