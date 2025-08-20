import { useState } from 'react'
import './App.css';
import Login from './pages/login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Transactions from './pages/transactions'
import Budget from './pages/budget'
import Stats from './pages/stats'
import ProtectedRoute from './dash-components/protectedRoute'

export default function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />    
        <Route
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
       /> 
        <Route 
          path="/transactions" 
          element={
            <ProtectedRoute>
              <Transactions />
            </ProtectedRoute>
          } 
        />
        <Route
          path="/stats" 
          element={
            <ProtectedRoute>
              <Stats />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/budget" 
          element={
            <ProtectedRoute>
              <Budget />
            </ProtectedRoute>
          } 
        />
      </Routes>
       
    </Router>
  )
}


