
import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import Slider from 'rc-slider';
import gujaratTopojson from './gujarat.json';
import { scaleLinear, interpolateRgb } from 'd3';
import './Gender.css';

const Gender = () => {
  const svgRef1 = useRef(null);
  const svgRef2 = useRef(null);
  const svgRef3 = useRef(null);
  const [district, setDistrict] = useState("Gujarat");
  const [districtRowNum, setDistrictRowNum] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [filePath, setFilePath] = useState('/data/DropRate21_22.json');
  const [selectedYear, setSelectedYear] = useState(2022);
  const [label1, setLabel1] = useState("");
  const [label2, setLabel2] = useState("");
  const [label3, setLabel3] = useState("");


  const gujaratGeojson = useMemo(() => {
    return topojson.feature(gujaratTopojson, gujaratTopojson.objects.districts);
  }, []);

  const handleYearChange = (year) => {
    setSelectedYear(year);
    setFilePath(`/data/DropRate${(year%100 )- 1}_${year % 100}.json`);
  };

  const handleDistrictClick = (event, d) => {
    setDistrict(tableData[d.properties.dt_code]?.Location || "Gujarat");
    setDistrictRowNum(d.properties.dt_code);
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

    const svg1 = d3.select(svgRef1.current);
    svg1.selectAll('*').remove();
    const svg2 = d3.select(svgRef2.current);
    svg2.selectAll('*').remove();
    const svg3 = d3.select(svgRef3.current);
    svg3.selectAll('*').remove();
    const width = 800;
    const height = 800;
    const projection = d3.geoMercator().fitSize([width, height], gujaratGeojson);
    const pathGenerator = d3.geoPath().projection(projection);

   
    const maxValue1 = Math.max(...tableData.map(entry => entry["Girls_3"]));
    const maxValue2 = Math.max(...tableData.map(entry => entry["Boys_3"]));
    const maxValue3 = Math.max(...tableData.map(entry => Math.abs(entry["Girls_3"]- entry["Boys_3"])));
     

    const colorScale1 = scaleLinear()
    .domain([0, maxValue1]) 
    .range(['white', '#ff1493']);
    const colorScale2 = scaleLinear()
    .domain([0, maxValue2]) 
    .range(['white', '#8a2be2']);
    const colorScale3 = scaleLinear()
    .domain([0, maxValue3]) 
    .range(['white', '#FF0D0D']);


    const svg1Paths = svg1.selectAll('path').data(gujaratGeojson.features);
    const svg2Paths = svg2.selectAll('path').data(gujaratGeojson.features);
    const svg3Paths = svg3.selectAll('path').data(gujaratGeojson.features);

    svg1Paths
      .enter()
      .append('path')
      .merge(svg1Paths)
      .attr('d', pathGenerator)
      .attr('stroke', 'steelblue')
      .attr('stroke-width', '1')
      .attr('fill', (d) => {
        const value = tableData[d.properties.dt_code] ? tableData[d.properties.dt_code]['Girls_3'] : 0;
        return d.properties.dt_code===districtRowNum ? '#00fbff' : colorScale1(value);
      })
      .on('mouseover', handleMouseOver1)
      .on('mouseout', handleMouseOut1)
      .on('click', handleClick)
      .select('title')
      .text((d) => tableData[d.properties.dt_code]?.Location || "");

    svg2Paths
      .enter()
      .append('path')
      .merge(svg2Paths)
      .attr('d', pathGenerator)
      .attr('stroke', 'steelblue')
      .attr('stroke-width', '1')
      .attr('fill', (d) => {
        const value = tableData[d.properties.dt_code] ? tableData[d.properties.dt_code]['Boys_3'] : 0;
        return d.properties.dt_code===districtRowNum ? '#00fbff' : colorScale2(value);
      })
      .on('mouseover', handleMouseOver2)
      .on('mouseout', handleMouseOut2)
      .on('click', handleClick)
      .select('title')
      .attr('label', (d) => tableData[d.properties.dt_code]?.Location || "")
      .text((d) => tableData[d.properties.dt_code]?.Location || "");

    svg3Paths
      .enter()
      .append('path')
      .merge(svg3Paths)
      .attr('d', pathGenerator)
      .attr('stroke', 'steelblue')
      .attr('stroke-width', '1')
      .attr('fill', (d) => {
        const value = tableData[d.properties.dt_code] ? (Math.abs(tableData[d.properties.dt_code]['Girls_3']-tableData[d.properties.dt_code]['Boys_3'])) : 0;
        return d.properties.dt_code===districtRowNum ? '#00fbff' : colorScale3(value);
      })
      .on('mouseover', handleMouseOver3)
      .on('mouseout', handleMouseOut3)
      .on('click', handleClick)
      .select('title')
      .text((d) => tableData[d.properties.dt_code]?.Location || "");

    function handleMouseOver1(event, d) {
      d3.select(event.target).attr('fill', 'rgba(0, 251, 255, 1');
      setLabel1(tableData[d.properties.dt_code]?.Girls_3.toFixed(2) || "");
      setLabel2(tableData[d.properties.dt_code]?.Boys_3.toFixed(2) || "");
      setLabel3((Math.abs((tableData[d.properties.dt_code]?.Boys_3 || 0) - (tableData[d.properties.dt_code]?.Girls_3 || 0))).toFixed(2) || "");
      setDistrictRowNum(d.properties.dt_code);
      setDistrict(tableData[d.properties.dt_code]?.Location || "Gujarat");
    }
    function handleMouseOver2(event, d) {
      d3.select(event.target).attr('fill', 'rgba(0, 251, 255, 1');
      setLabel1(tableData[d.properties.dt_code]?.Girls_3.toFixed(2) || "");
      setLabel2(tableData[d.properties.dt_code]?.Boys_3.toFixed(2) || "");
      setLabel3((Math.abs((tableData[d.properties.dt_code]?.Boys_3 || 0) - (tableData[d.properties.dt_code]?.Girls_3 || 0))).toFixed(2) || "");
      setDistrictRowNum(d.properties.dt_code);
      setDistrict(tableData[d.properties.dt_code]?.Location || "Gujarat");
    }
    function handleMouseOver3(event, d) {
      d3.select(event.target).attr('fill', 'rgba(0, 251, 255, 1');
      setLabel1(tableData[d.properties.dt_code]?.Girls_3.toFixed(2) || "");
      setLabel3((Math.abs((tableData[d.properties.dt_code]?.Boys_3 || 0) - (tableData[d.properties.dt_code]?.Girls_3 || 0))).toFixed(2) || "");
      setLabel2(tableData[d.properties.dt_code]?.Boys_3.toFixed(2) || "");
      setDistrictRowNum(d.properties.dt_code);
      setDistrict(tableData[d.properties.dt_code]?.Location || "Gujarat");
    }

    function handleMouseOut1(event) {
      const value =
        tableData[event.target.__data__.properties.dt_code]?.['Girls_3'] || 0;
      d3.select(event.target).attr('fill',  colorScale1(value));
      setDistrictRowNum(null);
    }
    function handleMouseOut2(event) {
      const value = tableData[event.target.__data__.properties.dt_code]?.['Boys_3'] || 0;
      d3.select(event.target).attr('fill', colorScale2(value));
      setDistrictRowNum(null);
    }
    function handleMouseOut3(event) {
      // const value = tableData[event.target.__data__.properties.dt_code]?.['Boys_3'] || 0;
      const value = Math.abs((tableData[event.target.__data__.properties.dt_code]?.['Girls_3'] || 0)-(tableData[event.target.__data__.properties.dt_code]?.['Boys_3'] || 0));
      d3.select(event.target).attr('fill', colorScale3(value));
      setDistrictRowNum(null);
    }

    function handleClick(event, d) {
      handleDistrictClick(event, d);
    }


  }, [gujaratGeojson, tableData, districtRowNum]);


  return (
    <div>
      <div className='slider-container'>
        {/* <label htmlFor="yearSlider" className="slider-label">Choose Year</label> */}
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
      <div className='container'>
        <div className='svg-container'>
          <svg 
            ref={svgRef1}
            width="100%"
            height="100%"
            viewBox={`0 0 800 712`}
          ></svg>
          <p className='label'>Girls {label1}</p>
        </div>
        <div className='svg-container'>
          <svg 
            ref={svgRef2}
            width="100%"
            height="100%"
            viewBox={`0 0 800 712`}
          ></svg>
          <p className='label'>Boys {label2}</p>
        </div>
      </div>
      <div className='container'>
        <div className='svg-container2'>
          <p className='label2'>{district}</p>
          <svg 
            ref={svgRef3}
            width="100%"
            height="100%"
            viewBox={`0 0 1200 712`}
          ></svg>
          <p className='label'>Delta {label3}</p>
        </div>
      </div>
      
      
    </div>
  );
};

export default Gender;
