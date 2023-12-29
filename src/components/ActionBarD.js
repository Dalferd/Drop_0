import React from 'react';
import './ActionBarD.css';
import BestPerformers from './BestPerformers';
import CriticalDist from './CriticalDist';

const ActionBarD = () => {
  return (
    <div className='ABDActionBar_container'>
      <div className='ABDstatic-column'>
        

        <div className="ABDaction-items">
          <div className="ABDside-itemA">
             <h1>🧠Action Lab</h1>
          </div>

          <div className="ABDTitlePC">
            <BestPerformers/>
            <CriticalDist/>
          </div>

          <div className="ABDTitleIns">
           
          </div>

          <div className="ABDside-itemA">
           
          </div>

        </div>
      </div>
    </div>
  );
}

export default ActionBarD;