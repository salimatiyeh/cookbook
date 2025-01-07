// import React, { useState } from "react";

// const CreateRecipeForm = () => {
//   const [name, setName] = useState('');
//   const [ingredients, setIngredients] = useState('');
//   const [instructions, setInstructions] = useState('');
//   const [cookTime, setCookTime] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newRecipe = { name, ingredients, instructions, cookTime};
//     try {
//       const response = await fetch('http://127.0.0.1:8000/api/recipes/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newRecipe),
//       });
//       if (response.ok) {
//         alert('Recipe added successfully!');
//         setName('');
//         setIngredients('');
//         setInstructions('');
//         window.location.href = '/';
//       } else {
//         alert('Failed to add recipe.');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('An error occurred while adding the recipe.');
//     }
//   };
//   return (
//     <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
//       <div>
//         <h1>Create Recipe</h1>
//         <label>Recipe Name:</label>
//         <input
//           type="text"
//           placeholder="Enter recipe name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//           style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
//         />
//       </div>
//       <div>
//         <label>ingredients:</label>
//         <textarea
//           placeholder="Enter ingredients"
//           value={ingredients}
//           onChange={(e) => setIngredients(e.target.value)}
//           required
//           style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
//         />
//       </div>
//       <div>
//         <label>instructions:</label>
//         <textarea
//           placeholder="Enter instructions"
//           value={instructions}
//           onChange={(e) => setInstructions(e.target.value)}
//           required
//           style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
//         />
//       </div>
//       <div>
//         <label>cook time:</label>
//         <input
//           type="number"
//           value={cookTime}
//           onChange={(e) => setCookTime(e.target.value)}
//           min="0"
//           required
//         />
//       </div>
//       <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', cursor: 'pointer' }}>Add Recipe</button>
//     </form>
//   )
// }
// export default CreateRecipeForm;
import React, { useState, useEffect } from "react";
import axios from 'axios';

const CreateRecipeForm = () => {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [instructions, setInstructions] = useState('');
  const [cookTime, setCookTime] = useState('');

  // Fetch ingredients from the backend on component mount
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const token = localStorage.getItem('access_token');  // Get token for authorization
        const response = await axios.get('http://127.0.0.1:8000/api/ingredients/', {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setIngredients(response.data);  // Set fetched ingredients
      } catch (error) {
        console.error('Failed to fetch ingredients:', error);
      }
    };
    fetchIngredients();
  }, []);

  // Handle ingredient selection from the dropdown
  const handleIngredientChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedIngredients(selected);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRecipe = {
      name,
      ingredients: selectedIngredients,  // Send selected ingredient IDs
      instructions,
      cook_time: cookTime
    };

    try {
      const token = localStorage.getItem('access_token');  // Authorization
      const response = await fetch('http://127.0.0.1:8000/api/recipes/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newRecipe),
      });
      if (response.ok) {
        alert('Recipe added successfully!');
        setName('');
        setSelectedIngredients([]);
        setInstructions('');
        setCookTime('');
        window.location.href = '/';
      } else {
        alert('Failed to add recipe.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while adding the recipe.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
      <div>
        <h1>Create Recipe</h1>
        <label>Recipe Name:</label>
        <input
          type="text"
          placeholder="Enter recipe name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />
      </div>

      <div>
        <label>Ingredients:</label>
        <select
          multiple
          value={selectedIngredients}
          onChange={handleIngredientChange}
          required
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        >
          {ingredients.map((ingredient) => (
            <option key={ingredient.id} value={ingredient.id}>
              {ingredient.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Instructions:</label>
        <textarea
          placeholder="Enter instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          required
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />
      </div>

      <div>
        <label>Cook Time (minutes):</label>
        <input
          type="number"
          value={cookTime}
          onChange={(e) => setCookTime(e.target.value)}
          min="0"
          required
        />
      </div>

      <button
        type="submit"
        style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', cursor: 'pointer' }}
      >
        Add Recipe
      </button>
    </form>
  );
};

export default CreateRecipeForm;
