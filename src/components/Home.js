import React, {useState} from 'react'
import transition from '../Transition'
import GujMap from './GujMap';
import ActionBarDD from './ActionBarDD';
import myImage from './tdf.png';
import twoImage from './Modi.png';

import './Home.css'

const Home = () => {
  const [district, setDistrict] = useState("Surat");
    

    const handleRowHover = (dis) => {
        setDistrict(dis);
    };
  
  return (
    <div className="home-container" >
      <ActionBarDD/>
      <div className="Tiles">
        <div className="Upper-half">
          <div>
            <div className='Left-half'>
            <div className="Tile1">
              <img className="img"src={myImage} alt=""/>
              <img className="img2" src={twoImage} alt=""/>
                {/* <h1>Tile1</h1> */}
            </div>
            
            </div>
            <div className='Right-half'>
              <div className="Tile2">
              <h1 className='MapName'>Gujarat</h1>
      <div className="mapcontainer">
              {/* <h3 className='District'>{district}</h3> */}
              <GujMap setDistrict={setDistrict} style ={{width : '30%', height :'30%',}} />
      </div>
              </div>
            </div>

          </div>

        </div>
        <div className="Lower-half">
          <div>
            <div>
              <div className="Tile3">
                <h1>Policies</h1>
                <pre className='Policies1'>
                1. Eklavya Model Residential Schools (EMRS): This initiative was launched by the Gujarat government in 2007, with the goal of reducing dropout rates among tribal communities. This program has had a significant impact, reducing the dropout rate among tribal students from 64.5% in 2006-07 to 14.2% in 2012-13.
                </pre>
                <pre className='Policies2'>
                2. Education Guarantee Scheme (EGS): This initiative was launched by the Gujarat government in 2007 to provide educational opportunities to children from economically weaker sections of society. Over the past decade, this program has had a positive impact on the dropout rate, reducing it from 33.4% in 2006-07 to 11.4% in 2011-12.
                </pre>
                <pre className='Policies3'>
                3. Shiksha Setu: This was a digital platform launched by the Gujarat government in 2018 to help improve the education system and reduce dropouts. It provided access to free online educational resources and allowed for greater collaboration between teachers and students. This initiative led to a reduction in the dropout rate by 2.3%.
                </pre>
              </div>
            </div>

          </div>

        </div>
      </div>
      </div>
    
    
  )
}

export default transition(Home);
