import React, { useEffect } from 'react'
import './preloader.css'
import { preLoaderAnim } from '../Animations/Index';
const Preloader = () => {

   useEffect( () =>{
    preLoaderAnim()
   },[]);

  return (
    <div className='preloader'>
        <div className="text-container">
            <span>Dropout</span>
            <span>Rate</span>
            <span>Analysis</span>

        </div>
      
    </div>
  )
}

export default Preloader
