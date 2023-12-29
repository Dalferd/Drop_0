import React from 'react'
import transition from '../Transition'
import CastAnalysis from './CastAnalysis';
import ActionBarI from './ActionBarI';

const Caste = () => {
  return (
    <div className='body_container'>
      <ActionBarI/>
      <CastAnalysis/>
    </div>
  )
}

export default transition(Caste);
