import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { Box, Grid, Typography, Paper } from '@mui/material';
import PlanCard from './PlanCard';
import SimulationTabs from './SimulationTabs'; // <-- IMPORT THE REAL COMPONENT
import ChatInterface from './ChatInterface';   // <-- IMPORT THE REAL COMPONENT

const PlanDashboard = () => {
  const { generatedPlan, userInput } = useContext(AppContext);

  if (!generatedPlan) {
    return <Typography>No plan generated yet.</Typography>;
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Your Personalized Financial Plans, {userInput.name}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here are two distinct strategies our AI has crafted based on your unique profile and goals.
        </Typography>
      </Paper>
      
      <Box
        sx={{
          display: 'flex',
        
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4,
          width: '100%',
        }}
      >
        <Box sx={{ flex: 1, backgroundColor: '#7845dfff', p: 3, borderRadius: 2 }}>
          <PlanCard plan={generatedPlan.sentinel_plan} title="The Sentinel Plan" />
        </Box>
        <Box sx={{ flex: 1, backgroundColor: '#7845dfff', p: 2, borderRadius: 2 }}>
          <PlanCard plan={generatedPlan.voyager_plan} title="The Voyager Plan" />
        </Box>
      </Box>

      {/* --- RENDER THE REAL COMPONENTS --- */}
      <SimulationTabs />
      <ChatInterface />
    </Box>
  );
};

export default PlanDashboard;
