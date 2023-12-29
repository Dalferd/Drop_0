import {motion} from 'framer-motion';

const transition = (OgComponent) => {
    return () => (
        <>
        
         <OgComponent />
           <motion.div 
           className="slide-in"
           initial ={{scaleX: 0, opacity:1}}
           animate = {{scaleX:0, opacity:1}}
           exit={{scaleX: 1, opacity:0.8}}
           transition={{duration:0.4, ease:[0.22, 0.8, 0.36, 1]}}

           />
           <motion.div
            className="slide-out"
            initial ={{scaleX: 1, opacity:0.8}}
            animate = {{scaleX:0, opacity:0.8}}
            exit={{scaleX: 0, opacity:1}}
            transition={{duration:0.4, ease:[0.22, 0.8, 0.36, 1]}}
           />

          
        </>
    );
};
export default transition;