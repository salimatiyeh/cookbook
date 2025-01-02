import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditRecipeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    name: '',
    ingredients: '',
    instructions: '',
    cook_time: '',
  })

  useEffect(() => {
    const fetchRecipe = async () => {
      const token = localStorage.getItem('access_token');
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/recipes/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setRecipe(response.data)
      } catch (error) {
        console.error('Failed to fetch recipe:', error);
      }
    };
    fetchRecipe();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({...recipe, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    try {
      await axios.put(`http://127.0.0.1:8000/api/recipes/${id}/`, recipe, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Recipe updated successfully');
      navigate(`/recipes/${id}`);
    } catch (error) {
      alert('Failed to update recipe');
      console.error('Error updating recipe:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Recipe</h2>
      <label>Name:</label>
      <input
        name="name"
        value={recipe.name}
        onChange={handleChange}
      />
      <label>Ingredients:</label>
      <textarea
        name="ingredients"
        value={recipe.ingredients}
        onChange={handleChange}
      />
      <label>Instructions:</label>
      <textarea
        name="instructions"
        value={recipe.instructions}
        onChange={handleChange}
      />
      <label>Cook Time (minutes):</label>
      <input
        name="cook_time"
        value={recipe.cook_time}
        onChange={handleChange}
      />
      <button type="submit">Update Recipe</button>
    </form>
  )
}

export default EditRecipeForm;
