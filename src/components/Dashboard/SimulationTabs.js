import React, { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { simulateScenarios } from '../../services/api';
import { Box, Tabs, Tab, Typography, Button, CircularProgress, Alert } from '@mui/material';

const SimulationTabs = () => {
  const { userInput, simulationResults, setSimulationResults, isSimulating, setIsSimulating } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState(0);
  const [error, setError] = useState(null);

  const handleRunSimulation = async () => {
    setIsSimulating(true);
    setError(null);
    try {
      const results = await simulateScenarios(userInput);
      setSimulationResults(results);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <Box sx={{ mt: 5  }}>
      <Typography variant="h5" align="center" gutterBottom>
        Economic Forecaster
      </Typography>
      <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 3 }}>
        Stress-test your financial plan against different AI-generated economic futures to understand potential risks and opportunities.
      </Typography>

      <Box textAlign="center" mb={4}>
        <Button variant="contained" onClick={handleRunSimulation} disabled={isSimulating}>
          {isSimulating ? <CircularProgress size={24} /> : "Simulate the Future"}
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      {simulationResults && (
        <Box  sx={{ 
            border: '1px solid #9e81d7ff', 
            borderRadius: 2 , 
            backgroundColor:'black', 
            boxShadow: '0 0 6px 1px rgba(158, 129, 215, 0.6)', 
          }}>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} centered>
            {simulationResults.scenarios.map((scenario, index) => (
              <Tab label={scenario.name} key={index} />
            ))}
          </Tabs>
          {simulationResults.scenarios.map((scenario, index) => (
            <TabPanel value={activeTab} index={index} key={index}>
              <Typography variant="h6" gutterBottom>{scenario.name}</Typography>
              <Typography variant="body2" sx={{  mb: 2 }}>{scenario.narrative}</Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Revised Goal Timelines:</Typography>
              {Object.entries(scenario.projected_timelines).map(([goal, timeline]) => (
                <Typography key={goal} variant="body2">{goal}: <strong>{timeline}</strong></Typography>
              ))}
            </TabPanel>
          ))}
        </Box>
      )}
    </Box>
  );
};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simulation-tabpanel-${index}`}
      aria-labelledby={`simulation-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

export default SimulationTabs;