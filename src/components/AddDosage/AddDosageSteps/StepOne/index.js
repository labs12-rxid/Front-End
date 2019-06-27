import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import CapsulesPerDose from './components/CapsulesPerDose';
import LengthOfDosage from './components/LengthOfDosage';
import DosageFrequency from './components/DosageFrequency';
import DosageInstructions from './components/DosageInstructions';
import DosageTime from './components/DosageTime';
import StartDate from './components/StartDate';
import DosageDuration from './components/DosageDuration';
import PillCard from '../PillCard';

const StepOne = ({
  capsulesPerDose,
  updateCapsulesPerDose,
  lengthOfDosage,
  updateLengthOfDosage,
  dosageFrequency,
  updateDosageFrequency,
  weekdays,
  selectedDays,
  setWeekdays,
  dates,
  selectedDates,
  setDates,
  reminderData,
  setReminderData,
  customInstruction,
  dosageInstruction,
  updateDosageInstruction,
  setStartDate,
  nextStep,
  startDate,
  dosageDuration,
  setDosageDuration,
  med,
  medImage
}) => {
  const handleConfirmDosage = () => {
    if (!capsulesPerDose) {
      alert('please input the amount of capsules per dose');
    } else if (lengthOfDosage) {
      if (dosageFrequency) {
        if (
          dosageFrequency === 'weekly' &&
          selectedDays.length < lengthOfDosage
        ) {
          alert('please select a day of the week for each dose');
        } else if (
          dosageFrequency === 'monthly' &&
          selectedDates.length < lengthOfDosage
        ) {
          alert('please select a day of the month for each dose');
        } else if (!dosageDuration) {
          alert(
            'please define how long the dosage will last with dosage duration'
          );
        } else {
          nextStep();
        }
      } else {
        alert('please select a dosage frequency');
      }
    } else {
      alert('please select a length of dosage');
    }
  };
  return (
    <div className='add-dosage'>
      <Typography className='add-dosage-title' component='p'>
        Add Dosage
      </Typography>
      <Card className='add-dosage-card'>
        <PillCard med={med} medImage={medImage} />
        <CapsulesPerDose
          updateCapsulesPerDose={updateCapsulesPerDose}
          capsulesPerDose={capsulesPerDose}
        />
        <LengthOfDosage
          lengthOfDosage={lengthOfDosage}
          updateLengthOfDosage={updateLengthOfDosage}
        />
        <DosageFrequency
          lengthOfDosage={lengthOfDosage}
          dosageFrequency={dosageFrequency}
          updateDosageFrequency={updateDosageFrequency}
          selectedDays={selectedDays}
          weekdays={weekdays}
          setWeekdays={setWeekdays}
          selectedDates={selectedDates}
          dates={dates}
          setDates={setDates}
        />
        <DosageInstructions
          dosageInstruction={dosageInstruction}
          customInstruction={customInstruction}
          updateDosageInstruction={updateDosageInstruction}
        />
        <DosageTime
          reminderData={reminderData}
          setReminderData={setReminderData}
          lengthOfDosage={lengthOfDosage}
          dosageFrequency={dosageFrequency}
          selectedDays={selectedDays}
          selectedDates={selectedDates}
        />
        <StartDate startDate={startDate} setStartDate={setStartDate} />
        <DosageDuration
          dosageDuration={dosageDuration}
          setDosageDuration={setDosageDuration}
        />
        {/* <CardContent>Text Reminder</CardContent> */}
        <CardActions className='add-dosage-card-actions'>
          <Button className='add-dosage-cancel-btn'>Cancel</Button>
          <Button className='add-dosage-confirm-btn' onClick={handleConfirmDosage}>
            Confirm Dosage
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default StepOne;
