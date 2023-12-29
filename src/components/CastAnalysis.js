import React, { useEffect, useRef, useState } from 'react';
import './CastAnalysis.css';
import Chart from 'chart.js/auto';


function CastAnalysis () {
  
  const [districtRowNum, setDistrictRowNum] = useState(165);
  const [district, setDistrict] = useState(null);
  const [filePath, setFilePath] = useState('/data/DropRate21_22.json');
  const [tableData, setTableData] = useState([]);
  const canvasRef1 = useRef(null);
  const canvasRef2 = useRef(null);
  const canvasRef3 = useRef(null);
  const chartInstance1 = useRef(null);
  const chartInstance2 = useRef(null);
  const chartInstance3 = useRef(null);

  const handleYearChange = (event) => {
    const year = event.target.value;
    setFilePath(year);
  };

  const filteredTableData = tableData.filter((item) => {
    return ( item['Social Category'] === 'General');
  });

  useEffect(() => {
    const fetchData = async (filePath) => {
      try {
        const response = await fetch(filePath);
        const json = await response.json();
        setTableData(json);
        setDistrict(json[districtRowNum]['Location']);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData(filePath);
  },[filePath]);

  useEffect(() => {
    if (tableData.length > 0) {
      const generalIndex = districtRowNum;
      const obcIndex = generalIndex + 1;
      const scIndex = generalIndex + 2;
      const stIndex = generalIndex + 3;

      if (chartInstance1.current) {
        chartInstance1.current.destroy();
      }
      if (chartInstance2.current) {
        chartInstance2.current.destroy();
      }
      if (chartInstance3.current) {
        chartInstance3.current.destroy();
      }
      

      const ctx1 = canvasRef1.current.getContext('2d');
      const ctx2 = canvasRef2.current.getContext('2d');
      const ctx3 = canvasRef3.current.getContext('2d');

      const data1 = {
        labels: [tableData[generalIndex]['Social Category'],tableData[obcIndex]['Social Category'],tableData[scIndex]['Social Category'],tableData[stIndex]['Social Category']],
        datasets: [{
          label: 'Primary',
          data: [
            tableData[generalIndex]['Overall_1'],
            tableData[obcIndex]['Overall_1'],
            tableData[scIndex]['Overall_1'],
            tableData[stIndex]['Overall_1']
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }]
      };

      const data2 = {
        labels: [tableData[generalIndex]['Social Category'],tableData[obcIndex]['Social Category'],tableData[scIndex]['Social Category'],tableData[stIndex]['Social Category']],
        datasets: [{
          label: 'Higher Primary',
          data: [
            tableData[generalIndex]['Overall_2'],
            tableData[obcIndex]['Overall_2'],
            tableData[scIndex]['Overall_2'],
            tableData[stIndex]['Overall_2']
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }]
      };

      const data3 = {
        labels: [tableData[generalIndex]['Social Category'],tableData[obcIndex]['Social Category'],tableData[scIndex]['Social Category'],tableData[stIndex]['Social Category']],
        datasets: [{
          label: 'Secondary',
          data: [
            tableData[generalIndex]['Overall_3'],
            tableData[obcIndex]['Overall_3'],
            tableData[scIndex]['Overall_3'],
            tableData[stIndex]['Overall_3']
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }]
      };

      chartInstance1.current = new Chart(ctx1, {
        type: 'polarArea',
        data: data1,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          aspectRatio: 1, 
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Primary'
            }
          }
        }
      });

      chartInstance2.current = new Chart(ctx2, {
        type: 'polarArea',
        data: data2,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          aspectRatio: 1, 
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Higher Primary'
            }
          }
        }
      });

      chartInstance3.current = new Chart(ctx3, {
        type: 'polarArea',
        data: data3,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          aspectRatio: 1, 
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Secondary'
            }
          }
        }
      });
    }
  }, [tableData, districtRowNum]);


  const handleDistrictChange = (event) => {
    const selectedDistrictRowNum = event.target.value;
    setDistrictRowNum(selectedDistrictRowNum -1);
    setDistrict(tableData[selectedDistrictRowNum - 1]?.['Location']);
  };


  return (
    <div className='Analysis'>
      <h1 className='PgTitle'>Caste Analysis</h1>
      <div className='selecters'>

      <div className='dropdown-container'>
        
        <select
          id="districtDropdown"
          value={districtRowNum+1}
          onChange={handleDistrictChange}
          className="dropdown-content"
        >
          {filteredTableData.map((item, index) => (
            <option key={index} value={item['Index']}>
              {item['Location']}
            </option>
          ))}
        </select>
      </div>


      <div className='dropdown-container'>
        <label htmlFor="yearDropdown" className="dropdown-button">Dropouts for</label>
        <select id="yearDropdown" value={filePath} onChange={handleYearChange} className="dropdown-content">
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

      </div>
      
      <div className="chart-container">
        <div className='polarChart'>
          <canvas id="chart1" ref={canvasRef1}></canvas>
        </div>
        <div className='polarChart'>
          <canvas id="chart2" ref={canvasRef2}></canvas>
        </div>
        <div className='polarChart'>
          <canvas id="chart3" ref={canvasRef3}></canvas>
        </div>
      </div>
    </div>
  );

}
export default CastAnalysis;