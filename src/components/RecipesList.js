import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';

const RecipesList = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/recipes/')
            .then((response) => response.json())
            .then((data) => {
              const sortedRecipes = data.sort((a, b) => a.name.localeCompare(b.name))
              setRecipes(sortedRecipes);
            })
            .catch((error) => console.error('Error fetching recipes:', error));
    }, []);

    return (
        <div>
            <h1>Recipes</h1>
              {recipes.length > 0 ? (
                recipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} id={recipe.id} />
                ))
              ) : (
                <p>No recipes found.</p>
              )}
        </div>
    );
};

export default RecipesList;
