import { useContext, useState } from 'react'
import './App.css'
import './bootstrap.min.css'
import Landing from './pages/Landing/Landing'
import Allprojects from './pages/Allprojects/Allprojects'
import Auth from './pages/Auth/Auth'
import Dashboard from './pages/Dashboard/Dashboard'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { tokenContext } from './Context/TokenContext'

function App() {

  const [count, setCount] = useState(0)

  const { tokenStatus, setTokenStatus } = useContext(tokenContext)

  return (
    <>
      <Header />
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
