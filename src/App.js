import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import RecipesList from './components/RecipesList';
import CreateRecipeForm from './components/CreateRecipeForm';
import Login from './components/Login';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

const App = () => {

  return (
    <Router>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={
            <PrivateRoute>
              <RecipesList />
            </PrivateRoute>
          } />
          <Route path="/create" element={
            <PrivateRoute>
              <CreateRecipeForm />
            </PrivateRoute>
          } />
          <Route path="/login" element={<Login />} />
          </Routes>
      </div>
    </Router>
  )
}

export default App;
