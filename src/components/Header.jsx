import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { tokenContext } from '../Context/TokenContext';

function Header() {

  const nav = useNavigate()

  const { tokenStatus, setTokenStatus } = useContext(tokenContext)

  const handleLogout = () => {
    sessionStorage.clear()
    toast.info("User Logged Out !!")
    setTokenStatus(false)
    nav('/')
  }

  return (
    <>
      <Navbar className="bg-primary" style={{ height: '70px' }}>
        <Container>
          <Navbar.Brand href="#home" className='text-white fw-bold'>
            <i className="fa-solid fa-diagram-project fa-lg" />
            {' '}
            ProjectFair
          </Navbar.Brand>
          <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
        </Container>
      </Navbar>
    </>
  )
}

export default Header