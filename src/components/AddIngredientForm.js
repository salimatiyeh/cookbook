import React, {useState} from 'react';
import axios from 'axios';

const AddIngredientForm = () => {
  const [ingredientName, setIngredientName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/ingredients/',
      { name: ingredientName },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      setMessage(`Added ${response.data.name}`);
      setIngredientName('');
    } catch (error) {
      setMessage('Failed to add ingredient.');
      console.error('Error:', error)
    }
  };

  return (
    <div>
      <h2>Add Ingredient</h2>
      <form onSubmit={handleSubmit}>
        <label>Ingredient Name:</label>
        <input
          type="text"
          value={ingredientName}
          onChange={(e) => setIngredientName(e.target.value)}
          required
        />
        <button type="submit">Add</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}

export default AddIngredientForm
