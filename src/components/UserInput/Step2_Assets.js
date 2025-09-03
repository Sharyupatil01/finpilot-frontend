import React, { useContext ,useState} from 'react';
import { AppContext } from '../../context/AppContext';
import { Box, Typography, TextField, Button, Stack } from '@mui/material';

const Step2Assets = () => {
  const { nextStep, prevStep, handleNestedInputChange, userInput } = useContext(AppContext);
  const [errors,setErrors]=useState({});
  const validate = () => {
    let newErrors = {};

    // Assets
    if (!userInput.assets.cash_equivalents) newErrors.cash_equivalents = "Cash & Savings is required.Enter 0 if not applicable.";
    else if (userInput.assets.cash_equivalents < 0) newErrors.cash_equivalents = "Cannot be negative";

    if (!userInput.assets.equity_investments) newErrors.equity_investments = "Equity Investments are required.Enter 0 if not applicable.";
    else if (userInput.assets.equity_investments < 0) newErrors.equity_investments = "Cannot be negative";

    // Liabilities
    if (!userInput.liabilities.high_interest_debt && userInput.liabilities.high_interest_debt !== 0) {
      newErrors.high_interest_debt = "High-Interest Debt is required.Enter 0 if not applicable.";
    } else if (userInput.liabilities.high_interest_debt < 0) {
      newErrors.high_interest_debt = "Cannot be negative";
    }

    if (!userInput.liabilities.loans_emi && userInput.liabilities.loans_emi !== 0) {
      newErrors.loans_emi = "Loan EMIs are required.Enter 0 if not applicable.";
    } else if (userInput.liabilities.loans_emi < 0) {
      newErrors.loans_emi = "Cannot be negative";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) nextStep();
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h5" align="center" gutterBottom>
         Your Financials
      </Typography>
      
      <Typography variant="h6">Assets</Typography>
      <TextField
        label="Cash & Savings (₹)"
        name="cash_equivalents"
        type="number"
        value={userInput.assets.cash_equivalents}
        onChange={(e) => handleNestedInputChange('assets', e)}
        variant="outlined"
        error={!!errors.cash_equivalents}
        helperText={errors.cash_equivalents}
        
      />
      <TextField
        label="Equity Investments (Stocks, MFs) (₹)"
        name="equity_investments"
        type="number"
        value={userInput.assets.equity_investments}
        onChange={(e) => handleNestedInputChange('assets', e)}
        variant="outlined"
        error={!!errors.equity_investments}
        helperText={errors.equity_investments}
        
      />

      <Typography variant="h6" sx={{ mt: 2 }}>Liabilities</Typography>
      <TextField
        label="High-Interest Debt (Credit Cards) (₹)"
        name="high_interest_debt"
        type="number"
        value={userInput.liabilities.high_interest_debt}
        onChange={(e) => handleNestedInputChange('liabilities', e)}
        variant="outlined"
        error={!!errors.high_interest_debt}
        helperText={errors.high_interest_debt}
      
      />
      <TextField
        label="Total Loan EMIs per month (₹)"
        name="loans_emi"
        type="number"
        value={userInput.liabilities.loans_emi}
        onChange={(e) => handleNestedInputChange('liabilities', e)}
        variant="outlined"
        error={!!errors.loans_emi}
        helperText={errors.loans_emi}
        
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button onClick={prevStep}>Back</Button>
        <Button variant="contained" onClick={handleNext}>Next</Button>
      </Box>
    </Stack>
  );
};

export default Step2Assets;