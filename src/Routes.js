// // Routes.js
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
// // import Visuals from './Components/Visuals';
// import Home from './Components/Home';
// import Age from './Components/Age';
// import Gender from './Components/Gender';
// import Caste from './Components/Caste';
// import School from './Components/School';
// import Region from './Components/Region';
// import CastAnalysis from './Components/CastAnalysis';

// const AppRoutes = () => {

//   const location = useLocation();
  
//   return (
//     <Router>
//       <Routes location={location} key={location.pathname}>
//         {/* <Route path="/" exact element={<Visuals />} /> */}
//         <Route path="/CastAnalysis" element={<CastAnalysis />} />

        
//           <Route index element={<Home/>}/>
//           <Route path='/age' element={<Age/>}/>
//           <Route path='/gender' element={<Gender/>}/>
//           <Route path='/caste' element={<Caste/>}/>
//           <Route path='/region' element={<Region/>}/>
//           <Route path='/school' element={<School/>}/>
//       </Routes>
      
//     </Router>
//   );
// };

// export default AppRoutes;