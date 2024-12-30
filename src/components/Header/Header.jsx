import React, { useContext, useEffect, useState } from 'react'
import './Header.css'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { tokenContext } from '../../Context/TokenContext';

function Header() {

  const nav = useNavigate()

  const { tokenStatus, setTokenStatus } = useContext(tokenContext)

  const isLoggedIn = sessionStorage.getItem('token')

  const handleLogout = () => {
    sessionStorage.clear()
    toast.info("Successfully logged Out!")
    setTokenStatus(false)
    nav('/')
  }

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('selectedTheme') || 'light';
  });

  useEffect(() => {
    document.querySelector('body').setAttribute('data-theme', theme);
    localStorage.setItem("selectedTheme", theme)
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <>
      <Navbar className='navbar fixed-top'>
        <Container >
          <Navbar.Brand href="#home" className='fw-bold nav-head'>
            <i className="fa-solid fa-diagram-project fa-lg" />
            {' '}
            Project Fair
          </Navbar.Brand>
          <button className={theme === 'light' ? 'text-black toggle-btn ms-auto' : 'toggle-btn ms-auto'} style={{ color: '#ffbf00' }} onClick={toggleTheme}>
            <i className={theme === 'light' ? 'fas fa-moon' : 'fas fa-sun'}></i>
          </button>

          {
            isLoggedIn &&
            <button className='btn logout-btn ms-3' onClick={handleLogout}>Logout</button>
          }
        </Container>
      </Navbar >
    </>
  )
}

export default Header