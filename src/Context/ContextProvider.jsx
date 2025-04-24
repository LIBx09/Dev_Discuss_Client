import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import auth from '../Firebase/Firebase';
import useAxios from '../MainLayout/Shared/Hooks/useAxios';

const ContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const provider = new GoogleAuthProvider();
    const gitProvider = new GithubAuthProvider();
    const customAxios = useAxios();

    const createUserGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    const createUserGithub = () => {
        setLoading(true)
        return signInWithPopup(auth, gitProvider)
    }

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const updateProfileuser = (updateuserProfile) => {
        setLoading(true)
        return updateProfile(auth.currentUser, updateuserProfile)
    }

    const resetPassword=(email)=>{
        
        return sendPasswordResetEmail(auth,email)
    }

    const logout = async() => {
        setLoading(true)
        return signOut(auth).then(() => {setUser(null)})
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log("currentUser", currentUser);
            if(currentUser){
                const userInfo = {userEmail: currentUser?.email, userName: currentUser?.displayName, photo: currentUser?.photoURL, points:0};
                customAxios.post("/users", userInfo)
                .then(res => {
                    console.log("users post success", res.data);
                })
                .catch(err => {
                    console.log(err);
                })
            }
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    const authInfo = {
        createUser, loginUser, createUserGoogle, user, setUser, logout, createUserGithub, loading, setLoading, updateProfileuser,resetPassword
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