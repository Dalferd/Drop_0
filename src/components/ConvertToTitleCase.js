import React from 'react';

const ConvertToTitleCase = ({ inputWord }) => {
  // Function to convert the word to title case
  const convertToTitleCase = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };

  return (
    <div>
      {convertToTitleCase(inputWord)}
    </div>
  );
};

export default ConvertToTitleCase;
