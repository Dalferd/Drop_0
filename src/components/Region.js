import React, {useState} from 'react'
import transition from '../Transition'
import GujaratMap from './Gujarat';
import ActionBar from './ActionBar';
import './Region.css';


const Region = () => {

  const [district, setDistrict] = useState("Surat");
    

    const handleRowHover = (dis) => {
        setDistrict(dis);
    };

  return (
    <>
        <ActionBar district={district}/>
      
      <div>
      
      <h1 className='PgTitle'>Gujarat Map</h1>
      <div className="mapcontainer">
              {/* <h3 className='District'>{district}</h3> */}
              <GujaratMap setDistrict={setDistrict} style ={{width : '30%', height :'30%',}} />
      </div>

    </div>

    </>
    
  )
}

export default transition(Region);
