import React from 'react';
import './ActionBarG.css';
import BestPerformers from './BestPerformers';
import CriticalDist from './CriticalDist';
import CatModule from './CatModule';
import GenderModule from './GenderModule';
const ActionBarG = () => {
  return (
    <div className='ActionBar_container'>
      <div className='static-column'>
        

        <div className="action-items">
          <div className="side-itemA">
             <h1>🧠Action Lab</h1>
          </div>

         

          <div className="TitleIns">
            <h1>Insights</h1>
           <GenderModule/>
          </div>

          <div className="TitlePC">
            <BestPerformers/>
            <CriticalDist/>
          </div>

          <div className="side-itemA">
           
          </div>

        </div>
      </div>
    </div>
  );
}

export default ActionBarG;