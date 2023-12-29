import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './ChartComponent.css';
import Chart from 'chart.js/auto';

const ChartComponent = ({ selectedRow,filePath }) => {
  const [chartData, setChartData] = useState({
    labels: ["General", "OBC", "SC", "ST"],
    datasets: [
    {
      label: '',
      backgroundColor: ['rgba(255, 99, 132, 0.6)'],
      data: [0],
    },
    {
      label: '',
      backgroundColor: ['rgba(255, 99, 132, 0.6)'],
      data: [0],
    },
    {
      label: '',
      backgroundColor: ['rgba(255, 99, 132, 0.6)'],
      data: [0],
    },
  ],});
  const [district, setDistrict] = useState(null);
  const [tableData, setTableData] = useState([]);
  const canvasRef = useRef(null);
  const chartInstance = useRef(null);

  

  useEffect(() => {
    const fetchData = async (filePath) => {
      try {
        const response = await fetch(filePath);
        const json = await response.json();
        setTableData(json);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData(filePath);
  },[filePath]);


  useEffect(() => {
    if (!tableData || tableData.length === 0 ) {
      return;
    }

    const updateChart = () => {
      if(selectedRow === null){
        selectedRow = 168;
      }
      const districtIndex =   selectedRow - 4;
      setDistrict(tableData[districtIndex]['Location']);
      const generalIndex = districtIndex;
      const obcIndex = districtIndex + 1;
      const scIndex = districtIndex + 2;
      const stIndex = districtIndex + 3;

      const newChartData = {
        labels: [tableData[generalIndex]['Social Category'], tableData[obcIndex]['Social Category'], tableData[scIndex]['Social Category'], tableData[stIndex]['Social Category']],
        datasets: [
          {
            label: 'Primary',
            backgroundColor: ['rgba(255, 99, 132, 0.8)', 'rgba(255, 99, 132, 0.8)', 'rgba(255, 99, 132, 0.8)', 'rgba(255, 99, 132, 0.8)'],
            data: [tableData[generalIndex]['Overall_1'], tableData[obcIndex]['Overall_1'], tableData[scIndex]['Overall_1'], tableData[stIndex]['Overall_1']],
          },
          {
            label: 'Higher-Primary',
            backgroundColor: ['rgba(54, 162, 235, 0.8)', 'rgba(54, 162, 235, 0.8)', 'rgba(54, 162, 235, 0.8)', 'rgba(54, 162, 235, 0.8)'],
            data: [tableData[generalIndex]['Overall_2'], tableData[obcIndex]['Overall_2'], tableData[scIndex]['Overall_2'], tableData[stIndex]['Overall_2']],
          },
          {
            label: 'Secondary',
            backgroundColor: ['rgba(255, 206, 86, 0.8)', 'rgba(255, 206, 86, 0.8)', 'rgba(255, 206, 86, 0.8)', 'rgba(255, 206, 86, 0.8)'],
            data: [tableData[generalIndex]['Overall_3'], tableData[obcIndex]['Overall_3'], tableData[scIndex]['Overall_3'], tableData[stIndex]['Overall_3']],
          },
        ],
      };

      setChartData(newChartData);

      // Check if the chart instance exists and update it
      if (chartInstance.current) {
        chartInstance.current.data = newChartData;
        chartInstance.current.update();
      } else {
        // Create a new chart only if the canvas reference is available
        if (canvasRef.current) {
          chartInstance.current = new Chart(canvasRef.current, {
            type: 'bar',
            data: newChartData,
            options: {
              maintainAspectRatio: true,
              responsive: false,
              scales: {
                x: {
                  stacked: false,
                },
                y: {
                  stacked: false,
                  beginAtZero: true,
                },
              },
              plugins: {
                legend: {
                  position: 'bottom',
                  labels: {
                    boxWidth: 20,
                    padding: 20,
                    font: {
                      size: 14,
                    },
                  },
                },
              },
            },
          });
        }
      }
    };
  
      updateChart();
 
  }, [tableData, selectedRow]);

  

  return (
    <div className='chart'>
      <div className= 'getAnalysis'>
        <h4 className='div1'>{district}</h4> 
        <Link to={{ pathname: "/CastAnalysis", search: `?district=${selectedRow}` }} className='button-link'>Get Caste Analysis</Link>
      </div>
      <div>
        <canvas ref={canvasRef} width="650" height="300"></canvas>
      </div>
    </div>
  );
};

export default ChartComponent;
