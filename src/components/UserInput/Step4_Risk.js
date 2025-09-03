import React, { useContext,useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { generatePlan } from '../../services/api';
import {
  Box,
  Typography,
  Button,
  Stack,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';

const Step4Risk = () => {
  const { prevStep, userInput, handleRiskChange, setIsLoading, setError, setGeneratedPlan } = useContext(AppContext);

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!userInput.risk_profile_answers[0]) newErrors.q1 = "Please select an answer";
    if (!userInput.risk_profile_answers[1]) newErrors.q2 = "Please select an answer";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {

    // --- STEP 1: VALIDATION ---
    if (!validate()) return;

    setIsLoading(true);
    setError(null);
    // Check for empty fields before submitting
    // if (!userInput.name || !userInput.age || !userInput.monthly_income || !userInput.monthly_expenses ||
    //     !userInput.assets.cash_equivalents || !userInput.assets.equity_investments ||
    //     !userInput.liabilities.high_interest_debt || !userInput.liabilities.loans_emi ||
    //     userInput.goals.some(g => !g.name || !g.target_amount || !g.timeline_years) ||
    //     userInput.risk_profile_answers.includes(null)) {
    //       alert("Please fill out all required fields in every step before generating a plan.");
    //       return;
    // }
      
    // setIsLoading(true);
    // setError(null);
    try {
      // --- STEP 2: DATA CLEANUP AND TYPE CONVERSION ---
      const payload = {
        ...userInput,
        age: parseInt(userInput.age, 10),
        monthly_income: parseFloat(userInput.monthly_income),
        monthly_expenses: parseFloat(userInput.monthly_expenses),
        assets: {
          cash_equivalents: parseFloat(userInput.assets.cash_equivalents),
          equity_investments: parseFloat(userInput.assets.equity_investments),
          other_investments: parseFloat(userInput.assets.other_investments || 0),
        },
        liabilities: {
          high_interest_debt: parseFloat(userInput.liabilities.high_interest_debt),
          loans_emi: parseFloat(userInput.liabilities.loans_emi),
        },
        goals: userInput.goals.map(g => ({
            ...g,
            target_amount: parseFloat(g.target_amount),
            timeline_years: parseInt(g.timeline_years, 10)
        })),
        risk_profile_answers: userInput.risk_profile_answers.map(a => parseInt(a, 10))
      };
      
      const plan = await generatePlan(payload);
      setGeneratedPlan(plan);
    } catch (err) {
      // --- STEP 3: IMPROVED ERROR HANDLING ---
      // We now set the error state to the specific message string
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Stack spacing={4}>
      <Typography variant="h5" align="center" gutterBottom>
         Your Risk Profile
      </Typography>

      <FormControl component="fieldset">
        <FormLabel component="legend">1. If your investments dropped 20% in a month, you would:</FormLabel>
        <RadioGroup
          name="risk_question_1"
          value={userInput.risk_profile_answers[0]}
          onChange={(e) => handleRiskChange(0, e)}
        >
          <FormControlLabel value="1" control={<Radio />} label="Sell to prevent further loss (Low Risk)" />
          <FormControlLabel value="2" control={<Radio />} label="Do nothing and wait (Medium Risk)" />
          <FormControlLabel value="3" control={<Radio />} label="Invest more (High Risk)" />
        </RadioGroup>
        {errors.q1 && <Typography color="error">{errors.q1}</Typography>}
      </FormControl>

      <FormControl component="fieldset">
        <FormLabel component="legend">2. Which investment outcome do you prefer?</FormLabel>
        <RadioGroup
          name="risk_question_2"
          value={userInput.risk_profile_answers[1]}
          onChange={(e) => handleRiskChange(1, e)}
        >
          <FormControlLabel value="1" control={<Radio />} label="A guaranteed 5% return (Low Risk)" />
          <FormControlLabel value="2" control={<Radio />} label="High chance of 12% return, small chance of 2% loss (Medium Risk)" />
          <FormControlLabel value="3" control={<Radio />} label="50/50 chance of 25% return or 10% loss (High Risk)" />
        </RadioGroup>
        {errors.q2 && <Typography color="error">{errors.q2}</Typography>}
      </FormControl>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button onClick={prevStep}>Back</Button>
        <Button variant="contained" color="success" onClick={handleSubmit}>
          Generate My Plan
        </Button>
      </Box>
    </Stack>
  );
};

export default Step4Risk;