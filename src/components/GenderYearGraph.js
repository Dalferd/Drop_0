import React, { useState, useEffect, useRef } from 'react';
import './GenderYearGraph.css';
import Chart from 'chart.js/auto';

const GenderYearGraph = ({ selectedRow }) => {
  const [mode, setMode] = useState(1);
  const [tablesArray, setTablesArray] = useState([]);
  const [fetchingStatus, setFetchingStatus] = useState('Fetching files...');
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Girls',
        borderColor: 'pink',
        data: [],
      },
      {
        label: 'Boys',
        borderColor: 'blue',
        data: [],
      },
      {
        label: 'Overall',
        borderColor: 'orange',
        data: [],
      },
    ],
  });
  const canvasId2 = "genderYearChart";
  const chartInstance = useRef(null);
  const files = [
    '/data/DropRate14_15.json',
    '/data/DropRate15_16.json',
    '/data/DropRate16_17.json',
    '/data/DropRate17_18.json',
    '/data/DropRate18_19.json',
    '/data/DropRate19_20.json',
    '/data/DropRate20_21.json',
    '/data/DropRate21_22.json',
  ];

  useEffect(() => {

    const fetchData = async () => {
      try {
        const fetchPromises = files.map(async (file) => {
          const response = await fetch(file);
          const tableData = await response.json();
          return tableData;
        });

        const fetchedTables = await Promise.allSettled(fetchPromises);
        const successfulTables = fetchedTables
          .filter((result) => result.status === 'fulfilled')
          .map((result) => result.value);
        setTablesArray(successfulTables);
        setFetchingStatus('');
      } catch (error) {
        console.error('Error fetching data:', error);
        setFetchingStatus('Error fetching files.');
      }
    };

    fetchData();
  }, []);


  useEffect(() => {


    if (!tablesArray || tablesArray.length === 0 || ( mode !== 1 && mode !== 2 && mode !== 3)) {
      return;
    }
    if (selectedRow === null) {
      selectedRow = 169;
    }

    const labels = tablesArray.map((table, index) => 2015 + index);
    var girlsData = [];
    var boysData = [];
    var overallData = [];
    

    switch(mode){
      case 1: 
        girlsData = tablesArray.map((table) => table[selectedRow].Girls_1);
        boysData = tablesArray.map((table) => table[selectedRow].Boys_1);
        overallData = tablesArray.map((table) => table[selectedRow].Overall_1);
        break;
      case 2:
        girlsData = tablesArray.map((table) => table[selectedRow].Girls_2);
        boysData = tablesArray.map((table) => table[selectedRow].Boys_2);
        overallData = tablesArray.map((table) => table[selectedRow].Overall_2);
        break;
      case 3:
        girlsData = tablesArray.map((table) => table[selectedRow].Girls_3);
        boysData = tablesArray.map((table) => table[selectedRow].Boys_3);
        overallData = tablesArray.map((table) => table[selectedRow].Overall_3);
        break;
      default:
        break;
    }
    
    // console.log(overallData);
    const newChartData = {
      labels,
      datasets: [
        { label: 'Girls', borderColor: 'PaleGreen', data: girlsData },
        { label: 'Boys', borderColor: 'Purple', data: boysData },
        { label: 'Overall', borderColor: 'OrangeRed', data: overallData },
      ],
    };

    setChartData(newChartData);

    // Check if the chart instance exists and update it
    if (chartInstance.current) {
      chartInstance.current.data = newChartData;
      chartInstance.current.update();
    } else {
      // Create a new chart only if the canvas reference is available
      if (document.getElementById(canvasId2)) {
        chartInstance.current = new Chart(document.getElementById(canvasId2), {
          type: 'line',
          data: newChartData,
          options: {
            maintainAspectRatio: true,
            responsive: false,
            scales: {
              x: {
                ticks: {
                  font: {
                    size: 12, // Adjust the font size for the x-axis labels
                  },
                },
              },
              y: {
                ticks: {
                  font: {
                    size: 12, // Adjust the font size for the y-axis labels
                  },
                },
              },
            },
          },
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                boxWidth: 40,
                padding: 20,
                color: 'black',
                font: {
                  size: 14, // Adjust the font size for the legend labels
                },
              },
            },
          },
        });
      }
    }

    // Cleanup function to destroy the chart when the component unmounts
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
    

  }, [selectedRow, tablesArray, mode]);


  const switchMode = (selectedMode) => {
    setMode(selectedMode);
  };

  return (
    <div className='lines'>
      <div className="mode-buttons">
        <button onClick={() => switchMode(1)} className={mode === 1 ? 'active' : ''}>
          Primary
        </button>
        <button onClick={() => switchMode(2)} className={mode === 2 ? 'active' : ''}>
          Higher Primary
        </button>
        <button onClick={() => switchMode(3)} className={mode === 3 ? 'active' : ''}>
          Secondary
        </button>
      </div>
      <canvas id={canvasId2} width="650" height="300"></canvas>
    </div>
  );
};

export default GenderYearGraph;
