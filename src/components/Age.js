import React from 'react'
import transition from '../Transition'
import Visuals from './Visuals';
import ActionBarD from './ActionBarD';


const Age = () => {
  return (
    <div>
      <ActionBarD/>
      <Visuals />
      
    </div>
  )
}

export default transition(Age);
