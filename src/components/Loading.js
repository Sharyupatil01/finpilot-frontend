import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';

// The array of messages to display in a loop
const messages = [
  "Generating your personalized financial plan...",
  "Putting your money to work for a brighter, more secure future...",
  "Translating the numbers into a clear, simple plan...",
];

const Loading = () => {
  // CORRECTED: State now holds the index (a number), not the message string.
  const [messageIndex, setMessageIndex] = useState(0);

  // useEffect hook to handle the message loop
  useEffect(() => {
    // Set a timer to change the message every 3 seconds
    const timer = setInterval(() => {
      // This logic correctly updates the index, wrapping around to the start
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 3000); // 3000ms = 3 seconds

    // Cleanup function to clear the timer when the component unmounts
    return () => clearInterval(timer);
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '20vh',
        textAlign: 'center',
        p: 4,
      }}
    >
      <CircularProgress size={60} sx={{ mb: 3, color: '#8133d5' }} />
      <Typography variant="h6" sx={{ color: 'text.secondary' }}>
        {/* CORRECTED: Use the index from state to display the correct message */}
        {messages[messageIndex]}
      </Typography>
    </Box>
  );
};

export default Loading;