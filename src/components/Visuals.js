import React, { useEffect, useState } from 'react';
import './Visuals.css';
import TableComponent from './TableComponent';
import ChartComponent from './ChartComponent';
import GujaratMap from './Gujarat';
import GenderYearGraph from './GenderYearGraph';


function Visuals() {
    const [selectedRow, setSelectedRow] = useState(169);
    const [selectedYear, setSelectedYear] = useState('/data/DropRate21_22.json');

    const handleRowHover = (rowNum) => {
        setSelectedRow(rowNum);
    };

    const handleYearChange = (event) => {
      const year = event.target.value;
      setSelectedYear(year);
    };



    return (
        <div>
        <div className="Visuals">
          <div className="left-half">
            <div >
              <div className='dropdown-container'>
                <label htmlFor="yearDropdown" className="dropdown-button">Dropout Rates for</label>
                <select id="yearDropdown" value={selectedYear} onChange={handleYearChange} className="dropdown-content">
                  <option value="/data/DropRate14_15.json">2014-2015</option>
                  <option value="/data/DropRate15_16.json">2015-2016</option>
                  <option value="/data/DropRate16_17.json">2016-2017</option>
                  <option value="/data/DropRate17_18.json">2017-2018</option>
                  <option value="/data/DropRate18_19.json">2018-2019</option>
                  <option value="/data/DropRate19_20.json">2019-2020</option>
                  <option value="/data/DropRate20_21.json">2020-2021</option>
                  <option value="/data/DropRate21_22.json">2021-2022</option>
                </select>
              </div>
            <TableComponent  onRowHover={handleRowHover} filePath ={selectedYear}/>
            </div>
          </div>
          <div className="right-half">
            <div>
                <div>
                    <ChartComponent selectedRow={selectedRow} filePath ={selectedYear}/>
                </div>
                <div>
                    <GenderYearGraph selectedRow={selectedRow}/>
                </div>
            </div>
          </div>
        </div>
        
        <div style={{ width: 500, height: 500 }}>
            <h1>Gujarat Map</h1>
            <GujaratMap style={{ width: '100%', height: '100%' }} />
          </div>
          
        </div>
      );
}

export default Visuals;
