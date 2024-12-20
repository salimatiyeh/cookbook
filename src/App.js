import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import RecipesList from './components/RecipesList';
import CreateRecipeForm from './components/CreateRecipeForm';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<RecipesList />} />
          <Route path="/create" element={<CreateRecipeForm />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
