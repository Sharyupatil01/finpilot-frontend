// NEW: Import useState from React
import React, { useContext, useState } from 'react'; 
import Loading from './components/Loading';
import { AppContext } from './context/AppContext';
import {
  Box,
  Typography,
  Alert,
} from '@mui/material';
import MainForm from './components/UserInput/MainForm';
import PlanDashboard from './components/Dashboard/PlanDashboard';
// NEW: Import the LandingPage component you just created
import LandingPage from './components/LandingPage'; 
import './App.css';

// CSS keyframes for background animation and text fade-in
const animations = `
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`;

function App() {
  const { generatedPlan, isLoading, error } = useContext(AppContext);
  
  // NEW STATE: This will control which view is shown. Defaults to true.
  const [showLandingPage, setShowLandingPage] = useState(true);

  // A cohesive dark color palette
  const darkPurple = '#0D0B1A';
  const textLight = 'rgba(200, 200, 220, 0.9)';
  
  // NEW HANDLER: This function will be called when the "Get Started" button is clicked.
  const handleGetStarted = () => {
    setShowLandingPage(false);
  };

  // NEW LOGIC: If showLandingPage is true, we only render the LandingPage component.
  if (showLandingPage) {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  // If showLandingPage is false, we render the main application as before.
  return (
    <>
      <style>{animations}</style>

      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: `linear-gradient(-45deg, ${darkPurple}, #1a1625, #221c35, ${darkPurple})`,
          backgroundSize: '400% 400%',
          animation: 'gradientShift 20s ease infinite',
        }}
      >
        <Box
          sx={{
            p: 4,
            width: '100%',
            maxWidth: 'none',
            backgroundColor: 'rgba(15, 12, 30, 0.9)',
          }}
        >
          {isLoading ? (
            <Loading />
          ) : error ? (
            <Alert severity="error" sx={{ mt: 4 }}>
              {error}
            </Alert>
          ) : generatedPlan ? (
            <PlanDashboard />
          ) : (
            <MainForm />
          )}
        </Box>
      </Box>
    </>
  );
}

export default App;
