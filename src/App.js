import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RecipesList from './components/RecipesList';
import CreateRecipeForm from './components/CreateRecipeForm';
import Login from './components/Login';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import RecipeShow from './components/RecipeShow';
import EditRecipeForm from './components/EditRecipeForm';
import AddIngredientForm from './components/AddIngredientForm';

const App = () => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('access_token'));

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
          <Route path="/recipes/:id" element={
            <PrivateRoute>
              <RecipeShow />
            </PrivateRoute>
          } />
          <Route path="/recipes/:id/edit" element={
            <PrivateRoute>
              <EditRecipeForm />
            </PrivateRoute>
          } />
           <Route path="/add-ingredient" element={
              <PrivateRoute>
                <AddIngredientForm />
              </PrivateRoute>
          } />
          <Route path="/login" element={<Login setAuthToken={setAuthToken} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
