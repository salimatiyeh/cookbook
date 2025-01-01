import React, { useState, useEffect, useCallback } from 'react';
import RecipeCard from './RecipeCard';

const RecipesList = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  const refreshAccessToken = useCallback(async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    try {
      const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('access_token', data.access);
        return data.access;
      } else {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        return null;
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
      return null;
    }
  }, []);

  const fetchRecipes = useCallback(async (retry = true) => {
    let token = localStorage.getItem('access_token');
    try {
      const response = await fetch('http://127.0.0.1:8000/api/recipes/', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 401 && retry) {
        const newToken = await refreshAccessToken();
        if (newToken) {
          return fetchRecipes(false);  // Retry fetch
        } else {
          setError('Session expired. Please log in again.');
          return;
        }
      }

      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      setError('Failed to fetch recipes.');
    }
  }, [refreshAccessToken]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  return (
    <div>
      <h1>Recipes</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))
      )}
    </div>
  );
};

export default RecipesList;
