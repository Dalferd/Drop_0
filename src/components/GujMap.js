
import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import Slider from 'rc-slider';
import gujaratTopojson from './gujarat.json';
import { scaleLinear, interpolateRgb } from 'd3';
import './GujMap.css';
import AIModule from './AIModule';

const GujMap = ({setDistrict}) => {
  const svgRef = useRef(null);
  const [districtRowNum, setDistrictRowNum] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [filePath, setFilePath] = useState('/data/DropRate19_20.json');
  const [selectedYear, setSelectedYear] = useState(2022);

  const gujaratGeojson = useMemo(() => {
    return topojson.feature(gujaratTopojson, gujaratTopojson.objects.districts);
  }, []);

//   const handleYearChange = (year) => {
//     setSelectedYear(year);
//     setFilePath(`/data/DropRate${(year%100 )- 1}_${year % 100}.json`);
//   };

  useEffect(() => {
    const fetchData = async (filePath) => {
      try {
        const response = await fetch(filePath);
        const json = await response.json();
        // console.log('Fetched Data:', json);
        setTableData(json);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData(filePath);
  }, [filePath]);

  useEffect(() => {

    if (!tableData || tableData.length === 0 ) {
      return;
    }

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();
    const width = 800;
    const height = 800;
    const projection = d3.geoMercator().fitSize([width, height], gujaratGeojson);
    const pathGenerator = d3.geoPath().projection(projection);

    // Find the maximum value of "Overall_3" in the tableData
    const maxValue = Math.max(...tableData.map(entry => entry["Overall_3"]));
    
    const colorScale = d3.scalePow().exponent(2).domain([0, maxValue]).range([0, 1]);  // The color range for gradient



    svg
      .selectAll('path')
      .data(gujaratGeojson.features)
      .enter()
      .append('path')
      .attr('d', pathGenerator)
      .attr('fill', 'white')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', '1')
      .attr('fill', (d) => {
        const value = tableData[d.properties.dt_code]
          ? tableData[d.properties.dt_code]['Overall_3']
          : 0;
        const normalizedValue = colorScale(value);
        return d3.interpolateRgb('#9ce1d8', '#25796d')(normalizedValue);
      })
      .on('mouseover', (event, d) => {
        d3.select(event.target).attr('fill', 'rgba(0, 200, 200, 1');
        setDistrictRowNum(d.properties.dt_code);
      })
      .on('mouseout', (event) => {
        const value = tableData[event.target.__data__.properties.dt_code]
          ? tableData[event.target.__data__.properties.dt_code]['Overall_3']
          : 0;
        const normalizedValue = colorScale(value);
        d3.select(event.target).attr('fill', d3.interpolateRgb('#9ce1d8', '#25796d')(normalizedValue))
        .on('click', (event, d) => {
          setDistrict(tableData[d.properties.dt_code]?.Location || "Gujarat");
          // <AIModule/>
        });

        setDistrictRowNum(null);
      })
      .append('title')  // Add title element for tooltip
      .text((d) => tableData[d.properties.dt_code]?.Location || "");

      // Apply CSS to make the title immediately accessible
      svg.selectAll('path title').style('pointer-events', 'none');

  }, [gujaratGeojson, tableData]);


  return (
    <div >
     
      <svg className='GujMap'
       
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox={`0 0 800 800`}
      ></svg>
    </div>
  );
};

export default GujMap;
