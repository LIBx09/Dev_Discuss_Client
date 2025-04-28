import React from 'react';
import useCheckAdmin from './MainLayout/Shared/Hooks/useCheckAdmin';
import LoadingPage from './Page/Loading/LoadingPage';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({children}) => {
    const isAdmin = true
    const [,isLoading]=useCheckAdmin()
    if(isLoading){
        return <LoadingPage></LoadingPage>
    }
    if(isAdmin){
        return children
    }
    return (
     <Navigate to={'/login'}></Navigate>
    );
};

export default AdminRoute;