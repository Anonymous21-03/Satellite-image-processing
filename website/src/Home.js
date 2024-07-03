// Home.js
import React from 'react'
import Navbar from './Navbar'
import Body from './Body'
import Features from './Features'
import './Home.css'

const Home = () => {
  return (
    <div className='homepage' style={{margin: 0, padding: 0, width: '100%', minHeight: '100vh', overflow: 'hidden'}}>
      <Navbar />
      <Body />
      <Features/>
    </div>
  )
}

export default Home