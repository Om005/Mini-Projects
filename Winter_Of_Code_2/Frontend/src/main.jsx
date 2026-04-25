import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from "@material-tailwind/react";
import { AppContextProvider } from './context/Appcontex.jsx';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <ThemeProvider>
      <AppContextProvider>

      <App />
      </AppContextProvider>
    </ThemeProvider>
  // </StrictMode>,
)
