import React from 'react';
import './Loader.css'; // Create a CSS file for styling
import loaderImage from './loader.png';

const Loader = () => {
  return (
    <div className="loader-container">
      <img src={loaderImage} alt="Loading..." className="loader-image" />
    </div>
  );
};

export default Loader;