// SchoolTable.js
import React, { useEffect, useState } from 'react';
import './SchoolTable.css';

const SchoolTable = () => {
  const [schoolData, setSchoolData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('data/schools.json');
        const data = await response.json();
        setSchoolData(data.schools);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>School Data Table</h2>
      <div className='tablename'>
      <table id="schoolTable">
        <thead>
          <tr>
            <th>Location</th>
            <th>Overall Primary</th>
            <th>Overall Upper Primary</th>
            <th>Overall Secondary</th>
          </tr>
        </thead>
        <tbody>
          {schoolData.map((school) =>
            school.data.map((entry, index) => (
              <tr key={index}>
                <td>{school.location}</td>
                <td>{entry.social_category}</td>
                <td>{entry.overall_primary}</td>
                <td>{entry.overall_upper_primary}</td>
                <td>{entry.overall_secondary}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default SchoolTable;
