import React from 'react';
import './ActionBarI.css';
import BestPerformers from './BestPerformers';
import CriticalDist from './CriticalDist';
import CatModule from './CatModule';

const ActionBarI = () => {
  return (
    <div className='ABIActionBar_container'>
      <div className='ABIstatic-column'>
        

        <div className="ABIaction-items">
          <div className="ABIside-itemA">
             <h1>🧠Action Lab</h1>
          </div>

          <div className="ABITitlePC">
            <h1>Social Insights</h1>
            <CatModule/>
          </div>

          <div className="ABITitleIns">
           
          </div>

          <div className="ABIside-itemA">
           
          </div>

        </div>
      </div>
    </div>
  );
}

export default ActionBarI;