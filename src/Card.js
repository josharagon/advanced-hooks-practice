import React, { useContext } from 'react';
import ThemeContext from './ThemeContext'
import './Card.css';

const Card = ({ title, description, id, deleteIdea, isFavorited }) => {
  const value = useContext(ThemeContext);

  return (
    <div className={`card ${value}`}>
      <h3>{title}</h3>
      <p>{description}</p>
      <button onClick={() => deleteIdea(id)}>🗑</button>
    </div>
  )
}

export default Card;
