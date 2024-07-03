import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import { FaBeer, FaUpload, FaHome, FaQuestionCircle } from 'react-icons/fa'
import { AiOutlineUser, AiOutlineLogin } from 'react-icons/ai'

const Navbar = ({ isLoggedIn, username, handleLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownMenuRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      if (scrollY > 100) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    const handleClickOutside = event => {
      if (
        dropdownMenuRef.current &&
        !dropdownMenuRef.current.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('click', handleClickOutside)

    // Cleanup function to remove the event listeners
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const handleMouseEnter = () => {
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    setIsOpen(false)
  }

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className='logo'>
        <img src='/logo.jpeg' alt='logo' />
      </div>
      <ul className='mid-options'>
        <li className='home'>
          <Link to='/'>
            <FaHome /> Home
          </Link>
        </li>
        <li className='about'>
          <Link to='/about'>
            <FaQuestionCircle /> About
          </Link>
        </li>
        <li className='upload'>
          <Link to='/contact'>
            <FaUpload /> Contact
          </Link>
        </li>
        <li className='features'>
          {/* Replace FaCodeCompare with desired icon */}
          <FaBeer /> Features
          <ul className='features-dropdown'>
            <li>
              <Link to='/landcover'>Land Cover Classification</Link>
            </li>
            <li>
              <Link to='/ChangeDetection'>Change Detection</Link>
            </li>
            <li>
              <Link to='/VegetationMonitoring'>Vegetation Monitoring</Link>
            </li>
          </ul>
        </li>
      </ul>
      <ul className='right-options'>
        {isLoggedIn ? (
          <li className='user-info'>
            <div
              className='username'
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {username}
              <span className='arrow-down'></span>
              <div
                className={`dropdown-menu ${isOpen ? 'show' : ''}`}
                ref={dropdownMenuRef}
              >
                <Link to='/profile'>Profile</Link>
                <Link to='/settings'>Settings</Link>
                <Link to='/' onClick={handleLogout}>
                  Logout
                </Link>
              </div>
            </div>
          </li>
        ) : (
          <>
            <li className='signup'>
              <Link to='/register'>
                <AiOutlineUser /> Sign Up
              </Link>
            </li>
            <li className='signin'>
              <Link to='/Login'>
                <AiOutlineLogin /> Sign In
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
