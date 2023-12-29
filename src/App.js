
import './App.css';
import Sidebar from './Components/Sidebar';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './Components/Home';
import Age from './Components/Age';
import Gender from './Components/Gender';
import Caste from './Components/Caste';
import School from './Components/School';
import Region from './Components/Region';
import CastAnalysis from './Components/CastAnalysis';

import { AnimatePresence } from 'framer-motion';
import Loader from './Components/loader';

function App() {

  const location = useLocation();

  return (
    <div className="App">

        <Sidebar/>
      {/* <Loader/> */}

        <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route index element={<Home/>}/>
          <Route path="/CastAnalysis" element={<CastAnalysis />} />
          <Route path='/age' element={<Age/>}/>
          <Route path='/gender' element={<Gender/>}/>
          <Route path='/caste' element={<Caste/>}/>
          <Route path='/region' element={<Region/>}/>
          <Route path='/school' element={<School/>}/>
          <Route/>
        </Routes>
        </AnimatePresence>

        
    </div>
  );
}

export default App;

