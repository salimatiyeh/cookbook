import React from "react";
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <ul style={styles.navItem}>
        <li style={styles.navItem}>
          <Link to="/" style={styles.link}>Home</Link>
        </li>
        <li styles={styles.navItem}>
          <Link to="/create" style={styles.link}>Create Recipe</Link>
        </li>
        <li>
          <Link to="/login" style={styles.link}>Login</Link>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    padding: "10px 20px",
    backgroundColor: "#333",
    color: "white",
  },
  navList: {
    listStyle: "none",
    display: "flex",
    justifyContent: "space-around",
    margin: 0,
    padding: 0,
  },
  navItem: {},
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "18px",
  },
}

export default Navbar
