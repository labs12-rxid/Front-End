import React, { useState } from 'react';
import { useInput } from '../../utilities/useInput';
import Card from '@material-ui/core/Card';
import StepOne from './AddPillSteps/StepOne';
import StepTwo from './AddPillSteps/StepTwo';

const AddPill = () => {
  const name = useInput();
  const imprint = useInput();
  const [color, setColor] = useState(0);
  const [shape, setShape] = useState(0);
  const [capsulesPerDose, setCapsulesPerDose] = useState(0);
  const [lengthOfDosage, setLenghOfDosage] = useState(0);
  const [dosageFrequency, setDosageFrequency] = useState(0);
  const [dosageConsumptionMethod, setDosageConsumptionMethod] = useState(0);
  const updateColor = color => {
    setColor(color);
  };
  const updateShape = shape => {
    setShape(shape);
  };
  const updateCapsulesPerDose = amount => {
    setCapsulesPerDose(amount);
  };
  const updateLengthOfDosage = value => {
    setLenghOfDosage(value);
  };
  const updateDosageFrequency = value => {
    setDosageFrequency(value);
  };
  const updateDosageConsumptionMethod = value => {
    setDosageConsumptionMethod(value);
  };
  const [step, setStep] = useState(0);
  const nextStep = () => {
    setStep(step + 1);
  };
  const steps = [
    <StepOne
      nextStep={nextStep}
      name={name}
      imprint={imprint}
      color={color}
      shape={shape}
      updateColor={updateColor}
      updateShape={updateShape}
    />,
    <StepTwo
      capsulesPerDose={capsulesPerDose}
      updateCapsulesPerDose={updateCapsulesPerDose}
      lengthOfDosage={lengthOfDosage}
      updateLengthOfDosage={updateLengthOfDosage}
      dosageFrequency={dosageFrequency}
      updateDosageFrequency={updateDosageFrequency}
      dosageConsumptionMethod={dosageConsumptionMethod}
      updateDosageConsumptionMethod={updateDosageConsumptionMethod}
    />
  ];
  return <Card>{steps[step]}</Card>;
};

export default AddPill;
