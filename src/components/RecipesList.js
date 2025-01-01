// import React, { useState, useEffect } from 'react';
// import RecipeCard from './RecipeCard';

// const RecipesList = () => {
//   const [recipes, setRecipes] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       const token = localStorage.getItem('token');  // Get token from localStorage
//       try {
//         const response = await fetch('http://127.0.0.1:8000/api/recipes/', {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         });

//         if (response.status === 401) {
//           // Unauthorized - redirect to login or display error
//           setError('Session expired. Please log in again.');
//           return;
//         }

//         const data = await response.json();
//         const sortedRecipes = data.sort((a, b) => a.name.localeCompare(b.name));
//         setRecipes(sortedRecipes);
//       } catch (error) {
//         console.error('Error fetching recipes:', error);
//         setError('Failed to fetch recipes. Please try again later.');
//       }
//     };

//     fetchRecipes();
//   }, []);

//   return (
//     <div>
//       <h1>Recipes</h1>
//       {error ? (
//         <p>{error}</p>  // Display error if request fails
//       ) : (
//         recipes.length > 0 ? (
//           recipes.map((recipe) => (
//             <RecipeCard key={recipe.id} recipe={recipe} id={recipe.id} />
//           ))
//         ) : (
//           <p>No recipes found.</p>
//         )
//       )}
//     </div>
//   );
// };

// export default RecipesList;

import React, { useState, useEffect, useCallback } from 'react';
import RecipeCard from './RecipeCard';

const RecipesList = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  // Memoize the token refresh to prevent re-creation on every render
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
  }, []);  // Only created once when the component mounts

  // Memoize the fetchRecipes function to prevent re-creation
  const fetchRecipes = useCallback(async (retry = true) => {
    const token = localStorage.getItem('access_token');
    try {
      const response = await fetch('http://127.0.0.1:8000/api/recipes/', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 401 && retry) {
        // If unauthorized, refresh token and retry
        const newToken = await refreshAccessToken();
        if (newToken) {
          return fetchRecipes(false);  // Retry but don't refresh again
        } else {
          setError('Session expired. Please log in again.');
          return;
        }
      }

      const data = await response.json();
      const sortedRecipes = data.sort((a, b) => a.name.localeCompare(b.name));
      setRecipes(sortedRecipes);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setError('Failed to fetch recipes. Please try again later.');
    }
  }, [refreshAccessToken]);  // Only depends on the stable refreshAccessToken

  // Trigger fetchRecipes when the component mounts
  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);  // No more warning here

  return (
    <div>
      <h1>Recipes</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        recipes.length > 0 ? (
          recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} id={recipe.id} />
          ))
        ) : (
          <p>No recipes found.</p>
        )
      )}
    </div>
  );
};

export default RecipesList;
