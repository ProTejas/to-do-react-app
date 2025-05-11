import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import SignUp from './components/sign-up/SignUp.jsx'
import Login from './components/log-in/Login.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignUp />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/log-in' element={<Login />} />
      </Routes>
    </BrowserRouter>
    {/* <App /> */}
  </StrictMode>,
)