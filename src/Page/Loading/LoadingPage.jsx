import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const LoadingPage = () => {
    const progressAnimation = useAnimation();
    
    useEffect(() => {
        const animateProgress = async () => {
            await progressAnimation.start({
                width: "100%",
                transition: { duration: 2, ease: "easeInOut" }
            });
            
            // Reset and repeat the animation
            await progressAnimation.start({
                width: "0%",
                transition: { duration: 0 }
            });
            
            animateProgress();
        };
        
        animateProgress();
        
        return () => {
            progressAnimation.stop();
        };
    }, [progressAnimation]);
    
    return (
        <div className="fixed inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center z-50">
            <div className="w-full max-w-md px-4">
                {/* Loading text */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-6"
                >
                    <h2 className="text-2xl font-bold text-blue-600 mb-2">Loading...</h2>
                    <p className="text-gray-600">Please wait you're data is on the way</p>
                </motion.div>
                
                {/* Progress bar container */}
                <div className="h-2 bg-blue-100 rounded-full overflow-hidden shadow-inner">
                    <motion.div
                        initial={{ width: "0%" }}
                        animate={progressAnimation}
                        className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                    />
                </div>
                
            
            
            </div>
        </div>
    );
};

export default LoadingPage;