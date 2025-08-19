import { useState } from 'react'
import './App.css'
import Login from './pages/login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Transactions from './pages/transactions'
import Budget from './pages/budget'
import Stats from './pages/stats'

export default function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />    
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/budget" element={<Budget />} />
      </Routes>
       
    </Router>
  )
}


