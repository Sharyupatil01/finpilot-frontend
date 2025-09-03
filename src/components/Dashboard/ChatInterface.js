import React, { useState, useContext, useRef, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { chatWithAgent } from '../../services/api';
import { Box, TextField, Button, Paper, Typography, Stack, CircularProgress } from '@mui/material';

const ChatInterface = () => {
  const {
    userInput,
    generatedPlan,
    chatHistory,
    isChatting,
    setIsChatting,
    addUserMessageToChat,
    addAssistantMessageToChat
  } = useContext(AppContext);

  const [currentMessage, setCurrentMessage] = useState('');
  const chatBoxRef = useRef(null);

  // Auto-scroll to the bottom when new messages are added
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const newUserMessage = currentMessage;
    addUserMessageToChat(newUserMessage);
    setCurrentMessage('');
    setIsChatting(true);

    try {
      const payload = {
        userProfile: userInput,
        generatedPlan: generatedPlan,
        chatHistory: [...chatHistory, { role: 'user', content: newUserMessage }],
        newQuestion: newUserMessage
      };
      const response = await chatWithAgent(payload);
      addAssistantMessageToChat(response.response);
    } catch (error) {
      addAssistantMessageToChat(`Sorry, I encountered an error: ${error.message}`);
    } finally {
      setIsChatting(false);
    }
  };

  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Chat With Your Co-Pilot
      </Typography>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Box
          ref={chatBoxRef}
          sx={{ height: '300px', overflowY: 'auto', mb: 2, border: '1px solid #e0e0e0', p: 2, borderRadius: 1 }}
        >
          {chatHistory.map((msg, index) => (
            <Box
              key={index}
              sx={{
                textAlign: msg.role === 'user' ? 'right' : 'left',
                mb: 1,
              }}
            >
              <Paper
                elevation={1}
                sx={{
                  display: 'inline-block',
                  p: 1,
                  bgcolor: msg.role === 'user' ? 'primary.main' : 'grey.200',
                  color: msg.role === 'user' ? 'primary.contrastText' : 'text.primary',
                }}
              >
                <Typography variant="body2">{msg.content}</Typography>
              </Paper>
            </Box>
          ))}
          {isChatting && <CircularProgress size={20} />}
        </Box>
        <Stack direction="row" spacing={1}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Ask a question about your plan..."
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            disabled={isChatting}
          />
          <Button variant="contained" onClick={handleSendMessage} disabled={isChatting}>
            Send
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default ChatInterface;