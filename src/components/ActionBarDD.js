import React from 'react';
import './ActionBarDD.css';
import BestPerformers from './BestPerformers';
import CriticalDist from './CriticalDist';
import { Link } from 'react-router-dom';
import logo from './plus (1).png';


const ActionBarDD = () => {
  return (
    <div className='ABDDActionBar_container'>
      <div className='ABDDstatic-column'>
        

        <div className="ABDDaction-items">
          <div className="ABDDside-itemA">
             <h1>🧠Action Lab</h1>
          </div>

          

          <div className="ABDDTitleIns">
           <div>
           <Link className="side-logo" to="/school" >
          <img src={logo} style={{width:'45px'}} alt="Data Clover"/> </Link>
          <h1 className='Drop'>
            Add Dropouts</h1>
           </div>
           
          </div>
          <div className="ABDDTitlePC">
            <BestPerformers/>
            <CriticalDist/>
          </div>

          <div className="ABDDside-itemA">
           
          </div>

        </div>
      </div>
    </div>
  );
}

export default ActionBarDD;