import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

// The array of messages to display in a loop
const messages = [
  "Generating your personalized financial plan...",
  "Putting your money to work for a brighter, more secure future...",
  "Translating the numbers into a clear, simple plan...",
  
];

const Loading = () => {
  const [currentMessage, setCurrentMessage] = useState(messages[0]);
  const [messageIndex, setMessageIndex] = useState(0);

  // useEffect hook to handle the message loop
  useEffect(() => {
    // Set a timer to change the message every 3 seconds (or any duration you prefer)
    const timer = setInterval(() => {
      // Update the index to show the next message in the array
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 3000); // 3000ms = 3 seconds

    // Cleanup function to clear the timer when the component unmounts
    return () => clearInterval(timer);
  }, []);

  // Update the displayed message whenever the index changes
  useEffect(() => {
    setCurrentMessage(messages[messageIndex]);
  }, [messageIndex]);

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
      <Typography variant="h6" sx={{ color: 'text.secondary' }}>
        {currentMessage}
      </Typography>
    </Box>
  );
};

export default Loading;