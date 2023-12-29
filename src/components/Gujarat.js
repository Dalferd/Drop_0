
import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import Slider from 'rc-slider';
import gujaratTopojson from './gujarat.json';
import { scaleLinear, interpolateRgb } from 'd3';
import './Gujarat.css';
import AIModule from './AIModule';

const GujaratMap = ({setDistrict}) => {
  const svgRef = useRef(null);
  const [districtRowNum, setDistrictRowNum] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [filePath, setFilePath] = useState('/data/DropRate21_22.json');
  const [selectedYear, setSelectedYear] = useState(2022);

  const gujaratGeojson = useMemo(() => {
    return topojson.feature(gujaratTopojson, gujaratTopojson.objects.districts);
  }, []);

  const handleYearChange = (year) => {
    setSelectedYear(year);
    setFilePath(`/data/DropRate${(year%100 )- 1}_${year % 100}.json`);
  };

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
    
    const colorScale = d3.scaleLinear().domain([0, maxValue]).range([0, 1]);  // The color range for gradient



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
        return d3.interpolateRgb('#e0f3db', '#43a2ca')(normalizedValue);
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
        d3.select(event.target).attr('fill', d3.interpolateRgb('#e0f3db', '#43a2ca')(normalizedValue))
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
      <div className='slider-container'>
        <label htmlFor="yearSlider" className="slider-label">Choose Year</label>
        <Slider
          id="yearSlider"
          min={2015}
          max={2022}
          step={1}
          value={selectedYear}
          marks={{ 2015: '2015', 2016: '2016', 2017: '2017', 2018: '2018', 2019: '2019', 2020: '2020', 2021: '2021',  2022: '2022' }}
          onChange={handleYearChange}
          className="custom-slider"
        />
      </div>
      <svg className='Map'
        ref={svgRef}
        width="150%"
        height="150%"
        viewBox={`0 0 800 800`}
      ></svg>
    </div>
  );
};

export default GujaratMap;
