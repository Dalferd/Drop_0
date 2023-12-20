import React from 'react';
import './BestPerformers.css';

const BestPerformers = () => {
  const districts = ['Vadodara', 'JunaGadh', 'Dohad'];
  const specificValues =  ['0.36%', '0.42%', '0.62%'];


  // Function to generate a decreasing alpha value for row colors
  const getRowColor = (index) => {
    const baseColor = '#50C878';
    const alpha = 0.9 - (index * 0.3); // Decreasing alpha value

    

    return `rgba(${parseInt(baseColor.slice(1, 3), 16)}, ${parseInt(baseColor.slice(3, 5), 16)}, ${parseInt(baseColor.slice(5, 7), 16)}, ${alpha})`;
  };

  return (
    <div className="actionTile">
      <table className="best-performers-table">
        <thead>
          <tr>
            <th colSpan="3" className='PerformerTitle'>Best Performers</th>
          </tr>
        </thead>
        <tbody className='tbody'>
          {districts.map((district, index) => (
            <tr key={index} className={index === 0 ? 'row-district-a' : 'row-lighter'} style={{ backgroundColor: getRowColor(index) }}>
              <td>{district}</td>
              <td className='Percent'>{specificValues[index]}</td>
              <td>Secondary</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BestPerformers;


