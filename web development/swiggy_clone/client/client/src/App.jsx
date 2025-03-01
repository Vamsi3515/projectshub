import React from 'react'
import Home from './vendorDashboard/pages/Home.jsx'
import './App.css'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home />} />
        </Routes>
    </div>
  )
}

export default App