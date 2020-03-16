// Import packages
// Import packages
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

// Resources and custom components
import './App.css';
import Content from './content/Content'
import Footer from './nav/Footer'
import Header from './nav/Header'
import Nav from './nav/Nav'

const App = props => {
  // Declare state variables
  let [user, setUser] = useState(null)

  // Define an onload action to look for token
  useEffect(() => {
    decodeToken()
  }, [])

  // Helper functions
  const updateUser = newToken => {
    if (newToken) {
      // Store Token in localStorage
      localStorage.setItem('mernToken', newToken)
      decodeToken(newToken)
    }
    else {
      setUser(null)
    }
  }

  const decodeToken = existingToken => {
    let token = existingToken || localStorage.getItem('mernToken')

    if (token) {
      let decoded = jwtDecode(token)

      // If token is expired or not decodable, user is not logged in
      if (!decoded || Date.now() >= decoded.exp * 1000) {
        console.log('expired!')
        setUser(null)
      }
      else {
        setUser(decoded)
      }
    }
    else {
      setUser(null)
    }
  }

  return (
    <Router>
      <div className="App">
        <Nav updateUser={updateUser} user={user} />
        <Header />
        <Content updateUser={updateUser} user={user} />
        <Footer />
      </div>
    </Router>
  )
}

export default App
