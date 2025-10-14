import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import GlobalStyle from './styles/globalStyles.js';
import { ToastContainer } from 'react-toastify';
import { RouterProvider } from 'react-router-dom';
import { routes } from './routes/index.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes}/>
    <GlobalStyle />
    <ToastContainer />
  </StrictMode>,
);
