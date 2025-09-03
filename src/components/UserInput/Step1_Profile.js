import React, { useContext ,useState} from 'react';
import { AppContext } from '../../context/AppContext';
import { Box, Typography, TextField, Button, Stack } from '@mui/material';

const Step1Profile = () => {
  const { nextStep, handleInputChange, userInput } = useContext(AppContext);
  const  [errors,setErrors]=useState({});
  const validate = () => {
    let newErrors = {};

    if (!userInput.name.trim()) newErrors.name = "Full Name is required";
    if (!userInput.age) newErrors.age = "Age is required";
    else if (userInput.age <= 0) newErrors.age = "Age must be positive";

    if (!userInput.monthly_income) newErrors.monthly_income = "Income is required";
    else if (userInput.monthly_income < 0) newErrors.monthly_income = "Income cannot be negative";

    if (!userInput.monthly_expenses) newErrors.monthly_expenses = "Expenses are required";
    else if (userInput.monthly_expenses < 0) newErrors.monthly_expenses = "Expenses cannot be negative";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) nextStep();
  };
  return (
    <Stack spacing={3}>
      <Typography variant="h5" align="center" gutterBottom >
         Your Profile
      </Typography>
      <TextField
        label="Full Name"
        name="name"
        value={userInput.name}
        onChange={handleInputChange}
        variant="outlined"
        error={!!errors.name}
        helperText={errors.name}
        
      />
      <TextField
        label="Age"
        name="age"
        type="number"
        value={userInput.age}
        onChange={handleInputChange}
        variant="outlined"
         error={!!errors.age}
        helperText={errors.age}
    
      />
      <TextField
        label="Monthly Take-Home Income (₹)"
        name="monthly_income"
        type="number"
        value={userInput.monthly_income}
        onChange={handleInputChange}
        variant="outlined"
         error={!!errors.monthly_income}
        helperText={errors.monthly_income}

      />
      <TextField
        label="Average Monthly Expenses (₹)"
        name="monthly_expenses"
        type="number"
        value={userInput.monthly_expenses}
        onChange={handleInputChange}
        variant="outlined"
         error={!!errors.monthly_expenses}
        helperText={errors.monthly_expenses}
   
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
  <Button
    variant="contained"
    onClick={handleNext}
    
  >
    Next
  </Button>
</Box>

    </Stack>
  );
};

export default Step1Profile;