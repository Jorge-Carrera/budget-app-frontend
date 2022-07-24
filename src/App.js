import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import NavBar from './Components/NavBar'

function App() {
  return (
    <div>
      <Router>
        <NavBar/>
        <main>
          
        </main>
      </Router>
    </div>
  )
}

export default App