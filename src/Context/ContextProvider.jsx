import React, { useState } from 'react';
import AuthContext from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import auth from '../Firebase/Firebase';

const ContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const provider = new GoogleAuthProvider()

    const createUserGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const authInfo = {
        createUser, loginUser,createUserGoogle
    }
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {
                    children
                }
            </AuthContext.Provider>
        </div>
    );
};

export default ContextProvider;