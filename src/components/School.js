import React from 'react'
import transition from '../Transition'
import { motion } from 'framer-motion'
import SchoolForm from './SchoolForm'
import ActionBarI from './ActionBarI'
import SchoolTable from './SchoolTable'

const School = () => {
  return (
    <motion.div 
    initial ={{opacity:0.5}}
    animate ={{opacity:1}}
    transition={{delay: 0.2}}
    className='body_container'>
      <ActionBarI/>
      <h1 className='PgTitle'>School</h1>
      <SchoolForm/>
      <SchoolTable/>
    </motion.div>
  )
}

export default transition(School);
