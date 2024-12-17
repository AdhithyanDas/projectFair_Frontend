import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ContextApi from './Context/ContextApi.jsx'
import TokenContext from './Context/TokenContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ContextApi>
        <TokenContext>
          <App />
        </TokenContext>
      </ContextApi>
    </BrowserRouter>
  </StrictMode>,
)
