import React from 'react';
import './CriticalDist.css';

const CriticalDist = () => {
  const districts = ['Chhotaudepur', 'MahiSagar', 'Tapi'];
  const specificValues =  ['14.51%', '13.31%', '12.23%'];


  // Function to generate a decreasing alpha value for row colors
  const getRowColor = (index) => {
    const baseColor = '#d43d2b';
    const alpha = 0.8 - (index * 0.3); // Decreasing alpha value

    return `rgba(${parseInt(baseColor.slice(1, 3), 16)}, ${parseInt(baseColor.slice(3, 5), 16)}, ${parseInt(baseColor.slice(5, 7), 16)}, ${alpha})`;
  };

  return (
    <div className="actionTileCrit">
      <table className="critical-table">
        <thead>
          <tr>
            <th colSpan="3" className='CriticalTitle'>Critical Districts</th>
          </tr>
        </thead>
        <tbody className='tbody'>
          {districts.map((district, index) => (
            <tr key={index} className={index === 0 ? 'row-district-aCrit' : 'row-lighterCrit'} style={{ backgroundColor: getRowColor(index) }}>
              <td>{district}</td>
              <td className='PercentCrit'>{specificValues[index]}</td>
              <td>Secondary</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CriticalDist
