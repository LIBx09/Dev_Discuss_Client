import React from 'react';
import loadingGif from '../../assets/loading_lottie/loading_gif.gif'

const LoadingPage = () => {
    return (
        <div className='flex flex-col min-h-screen items-center justify-center'>
            <h3 className='font-semibold text-gray-800 dark:text-gray-300 text-xl '>Loading.....</h3>
            <img className='w-52 h-52' src={loadingGif} alt="loading bar" />
        </div>
    );
};

export default LoadingPage;