import React from "react";

const RecipeCard = ( { recipe, id } ) => {
  const { name,  ingredients, instructions } = recipe;

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>{name}</h2>
      <p><strong>Ingredients:</strong> {ingredients}</p>
      <p><strong>Instructions:</strong> {instructions}</p>
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
  },
  title: {
    margin: "0 0 8px",
    fontSize: "20px",
    color: "#333",
  },
};

export default RecipeCard;
