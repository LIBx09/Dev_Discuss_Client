import React from 'react';
import { useParams } from 'react-router-dom';

const PaymentSuccess = () => {
    const {tranID} = useParams();
    return (
        <div>
            <h2>Payment successful hoye gese: {tranID}</h2>
        </div>
    );
};

export default PaymentSuccess;