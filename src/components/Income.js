import React from 'react'
import transition from '../Transition'
import ScatterPlot from './ScatterPlot';

const Income = () => {
  return (
    <div className='body_container'>
      <h1 className='PgTitle'>Income</h1>
      <ScatterPlot/>
    </div>
  )
}

export default transition(Income);
