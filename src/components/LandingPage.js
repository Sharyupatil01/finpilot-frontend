import React from 'react';
// MODIFIED: Removed FavoriteIcon import
import { Box, Typography, Button } from '@mui/material';

// We reuse the animation keyframes from App.js for a consistent feel
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

const LandingPage = ({ onGetStarted }) => {
  const darkPurple = '#0D0B1A';

  return (
    <>
      <style>{animations}</style>
      <Box
        sx={{
          height: '100vh',
          width: '100vw',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          p: 4,
          background: `linear-gradient(-45deg, ${darkPurple}, #1a1625, #221c35, ${darkPurple})`,
          backgroundSize: '400% 400%',
          animation: 'gradientShift 20s ease infinite',
          color: '#e0d7ff',
          position: 'relative', 
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontWeight: 700,
            fontSize: { xs: '3rem', md: '5rem' },
            mb: 2,
            animation: 'fadeIn 1s ease-out',
            background: "linear-gradient(90deg, #8133d5ff, #b94386ff, #336acbff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Welcome to FinPilot
        </Typography>

        <Typography
          variant="h6"
          sx={{
            mb: 4,
            maxWidth: '600px',
            color: '#bbaed9',
            animation: 'fadeIn 1.5s ease-out',
            fontWeight: 400,
          }}
        >
          Your AI-Powered Financial Co-Pilot for a smarter, clearer path to your goals.
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={onGetStarted}
          sx={{
            animation: 'fadeIn 2s ease-out',
            fontSize: '1.2rem',
            px: 5,
            py: 1.5,
            borderRadius: '50px',
          }}
        >
          Get Started
        </Button>

        {/* --- MODIFIED CREDIT LINE (Heart removed, text combined) --- */}
        <Typography
          variant="body2"
          sx={{
            position: 'absolute',
            bottom: 24,
            width: '100%',
            textAlign: 'center',
            fontStyle: 'italic', // Kept the italic font style
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: '0.9rem',
          }}
        >
          Made by Team Lumina
        </Typography>
        {/* --- End of changed code --- */}

      </Box>
    </>
  );
};

export default LandingPage;