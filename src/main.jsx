import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import GlobalStyle from './styles/globalStyles.js';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './routes/index.jsx';
import AppProvider from './hooks/index.jsx';
import { Elements } from '@stripe/react-stripe-js';
import stripe from './config/stripeConfig.js';
import { ThemeProvider } from 'styled-components';
import { standardTheme } from './styles/themes/standerd.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={standardTheme}>
    <AppProvider>
      <Elements stripe={stripe}>
        <BrowserRouter>
        <Router  />
        </BrowserRouter>
      </Elements>
      <GlobalStyle />
      <ToastContainer />
    </AppProvider>
    </ThemeProvider>
  </StrictMode>,
);
