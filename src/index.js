import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AppProvider } from './context/AppContext';

// MUI Imports 

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { deepPurple, pink } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: deepPurple[400],   // purple accent
    },
    secondary: {
      main: pink[400],         // neon pink accent
    },
    background: {
      default: '#0d0b1a',      // dark purple-black background
      paper: '#1a1625',        // darker paper cards
    },
    text: {
      primary: '#e0d7ff',      // soft off-white
      secondary: '#bbaed9',    // muted purple text
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', sans-serif",
    h3: { fontWeight: 700, letterSpacing: '0.5px' },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundImage: 'linear-gradient(145deg, #1a1625, #0d0b1a)',
        },
      },
    },
   MuiButton: {
  styleOverrides: {
    root: {
      borderRadius: 12,
      padding: '10px 24px',
      backgroundColor: deepPurple[400],
      color: '#fff',
      fontWeight: 500,
      textTransform: 'none',
      boxShadow: 'none',
      '&:hover': {
        backgroundColor: '#594071ff', // darker shade on hover
        boxShadow: 'none',
      },
    },
  },
},

  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* A simple baseline stylesheet */}
        <App />
      </ThemeProvider>
    </AppProvider>
  </React.StrictMode>
);