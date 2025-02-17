import React from "react";
import { useNavigate } from "react-router-dom";

const RecipeCard = ( { recipe } ) => {
  const { name,  ingredients, instructions, cook_time } = recipe;
  const navigate = useNavigate();

  const handleClick = () => {
    recipe.id && navigate(`/recipes/${recipe.id}`)
  };

  return (
    <div onClick={handleClick} style={styles.card}>
      <h2 style={styles.title}>{name}</h2>
      <p><strong>Ingredients:</strong> {ingredients}</p>
      <p><strong>Instructions:</strong> {instructions}</p>
      <p><strong>Cook Time:</strong> {cook_time ? `${cook_time} minutes` : 'N/A' }</p>
    </div>
  )
}

const styles = {
  card: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "16px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f9f9f9",
    cursor: "pointer",
  },
  title: {
    margin: "0 0 8px",
    fontSize: "20px",
    color: "#333",
  },
};

export default RecipeCard;
