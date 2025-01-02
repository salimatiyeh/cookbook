import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const RecipeShow = () => {
  const { id } = useParams();  // Get the recipe ID from the URL
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      const token = localStorage.getItem('access_token');
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/recipes/${id}/`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setRecipe(data);
        } else if (response.status === 404) {
          setError('Recipe not found.');
        } else {
          setError('Failed to load recipe.');
        }
      } catch (error) {
        setError('An error occurred while fetching recipe details.');
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!recipe) return <p>Loading recipe...</p>;

  return (
    <div>
      <h1>{recipe.name}</h1>
      <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
      <p><strong>Instructions:</strong> {recipe.instructions}</p>
      <p><strong>Cook Time:</strong> {recipe.cook_time || 'N/A'} minutes</p>
    </div>
  );
};

export default RecipeShow;
