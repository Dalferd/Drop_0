import React from 'react'
import { Link } from 'react-router-dom'
import logo from './DataCloverLogo.png';
import {motion} from 'framer-motion'



const Sidebar = () => {
  return (
    <div>
      
      <div className='sidebar_container'>
       <div className='sidebar'>
        <motion.div 
        // layout
        // whileHover={{
        //     backgroundColor: "rgba(255, 255, 255, 0.3)",
        //     boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        //     backdropFilter: "blur(8.5px)",
        //     WebkitBackdropFilter: "blur(8.5px)",
        //     borderRadius: "3px",
        //     // border: "1px solid rgba(255, 255, 255, 0.38)",
        //     cursor: 'pointer'
        //     }}
        className="profile">
         <Link className="side-logo" to="/" >
          <img src={logo} alt="Data Clover"/> </Link> 
        </motion.div>

        <motion.div className="side-items">

            <motion.div 
            layout
            whileHover={{
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                backdropFilter: "blur(8.5px)",
                WebkitBackdropFilter: "blur(8.5px)",
                borderRadius: "9px",
                border: "1px solid rgba(255, 255, 255, 0.38)",
                cursor: 'pointer'
                }}
                transition={{duration: 0.1}}
            className="side-item">
                <Link className='side-link' to="/">
                    Dashboard
                </Link>
            </motion.div>

            <motion.div 
                 layout
                 whileHover={{
                     backgroundColor: "rgba(255, 255, 255, 0.3)",
                     boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                     backdropFilter: "blur(8.5px)",
                     WebkitBackdropFilter: "blur(8.5px)",
                     borderRadius: "9px",
                     border: "1px solid rgba(255, 255, 255, 0.38)",
                     cursor: 'pointer'
                     }}
                     transition={{duration: 0.1}}
                     className="side-item">
                <Link className='side-link' to="/age">
                    Age
                </Link>
            </motion.div>

            <motion.div 
             layout
             whileHover={{
                 backgroundColor: "rgba(255, 255, 255, 0.3)",
                 boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                 backdropFilter: "blur(8.5px)",
                 WebkitBackdropFilter: "blur(8.5px)",
                 borderRadius: "9px",
                 border: "1px solid rgba(255, 255, 255, 0.38)",
                 cursor: 'pointer'
                 }}
                 transition={{duration: 0.1}}
            className="side-item">
                <Link className='side-link' to="/gender">
                    Gender
                </Link>
            </motion.div>

            <motion.div
             layout
             whileHover={{
                 backgroundColor: "rgba(255, 255, 255, 0.3)",
                 boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                 backdropFilter: "blur(8.5px)",
                 WebkitBackdropFilter: "blur(8.5px)",
                 borderRadius: "9px",
                 border: "1px solid rgba(255, 255, 255, 0.38)",
                 cursor: 'pointer'
                 }}
                 transition={{duration: 0.1}}
            className="side-item">
                <Link className='side-link' to="/school">
                    School
                </Link>
            </motion.div>

            <motion.div
             layout
             whileHover={{
                 backgroundColor: "rgba(255, 255, 255, 0.3)",
                 boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                 backdropFilter: "blur(8.5px)",
                 WebkitBackdropFilter: "blur(8.5px)",
                 borderRadius: "9px",
                 border: "1px solid rgba(255, 255, 255, 0.38)",
                 cursor: 'pointer'
                 }}
                 transition={{duration: 0.1}}
            className="side-item">
                <Link className='side-link' to="/caste">
                    Caste
                </Link>
            </motion.div>

            <motion.div 
             layout
             whileHover={{
                 backgroundColor: "rgba(255, 255, 255, 0.3)",
                 boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                 backdropFilter: "blur(8.5px)",
                 WebkitBackdropFilter: "blur(8.5px)",
                 borderRadius: "9px",
                 border: "1px solid rgba(255, 255, 255, 0.38)",
                 cursor: 'pointer'
                 }}
                 transition={{duration: 0.1}}
            className="side-item">
                <Link className='side-link' to="/region">
                    Region
                </Link>
            </motion.div>

            {/* <motion.div 
             layout
             whileHover={{
                 backgroundColor: "rgba(255, 255, 255, 0.3)",
                 boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                 backdropFilter: "blur(8.5px)",
                 WebkitBackdropFilter: "blur(8.5px)",
                 borderRadius: "9px",
                 border: "1px solid rgba(255, 255, 255, 0.38)",
                 cursor: 'pointer'
                 }}
                 transition={{duration: 0.1}}
            className="side-item">
                <Link className='side-link' to="/income">
                    Income
                </Link>
            </motion.div> */}

        </motion.div>


       </div>
        
      </div>
      
    </div>
    
  )
}

export default Sidebar
