import React from 'react';
import { useParams } from 'react-router-dom';

const PaymentSuccess = () => {
    const { tranID } = useParams();

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-green-500 p-8 rounded-lg shadow-lg max-w-md mx-auto text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white mb-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 11l3 3L22 4"></path>
                </svg>
                <h2 className="text-4xl font-semibold text-white mb-3">Congratulations!</h2>
                <p className="text-lg text-white mb-4">Your payment has been successfully completed.</p>
                <p className="text-lg text-white mb-4">You're all set! Thank you for your payment.</p>
                <p className="text-sm text-white">Transaction ID: <span className="font-semibold">{tranID}</span></p>
            </div>
        </div>
    );
};

export default PaymentSuccess;
