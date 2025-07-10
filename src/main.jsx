import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom' // Pastikan ini diimpor dengan huruf 'B' kapital

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Perbaiki ini: Gunakan BrowserRouter dengan huruf kapital 'B' */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)