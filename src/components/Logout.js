import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    alert('Logged out successfully');
    navigate('/login', { replae: true });
  }

  return (
    <button onClick={handleLogout} style={StyleSheet.button}>
      Logout
    </button>
  )
};
const styles = {
  button: {
    backgroundColor: '#e63946',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
    fontSize: '16px',
  }
};

export default Logout
