import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

// MUI Imports
import { Box, Stepper, Step, StepLabel, Paper } from '@mui/material';

// Step Component Imports
import Step1Profile from './Step1_Profile';
import Step2Assets from './Step2_Assets';
import Step3Goals from './Step3_Goals';
import Step4Risk from './Step4_Risk';

const steps = ['Your Profile', 'Your Financials', 'Your Goals', 'Risk Profile'];

const MainForm = () => {
  const { activeStep } = useContext(AppContext);

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <Step1Profile />;
      case 1:
        return <Step2Assets />;
      case 2:
        return <Step3Goals />;
      case 3:
        return <Step4Risk />;
      default:
        throw new Error('Unknown step');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box>
        {getStepContent(activeStep)}
      </Box>
    </Paper>
  );
};

export default MainForm;