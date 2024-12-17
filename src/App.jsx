import { useContext, useState } from 'react'
import './App.css'
import './bootstrap.min.css'
import Landing from './pages/Landing'
import Allprojects from './pages/Allprojects'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Footer from './components/Footer'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { tokenContext } from './Context/TokenContext'

function App() {

  const [count, setCount] = useState(0)

  const { tokenStatus, setTokenStatus } = useContext(tokenContext)

  return (
    <>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/dash' element={tokenStatus ? <Dashboard /> : <Auth />} />
        <Route path='/projects' element={tokenStatus ? <Allprojects /> : <Auth />} />
        <Route path='/auth' element={<Auth />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </>
  )
}

export default App
