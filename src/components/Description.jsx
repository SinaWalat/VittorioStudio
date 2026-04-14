import React from 'react';
import './Description.css';

const Description = ({ title, text }) => {
  return (
    <div className="description-section container">
      <div className="description-content">
        <h2 className="description-title">{title}</h2>
        <p className="description-text">
          {text}
        </p>
      </div>
    </div>
  );
};

export default Description;
