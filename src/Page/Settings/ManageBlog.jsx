import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import LoadingPage from '../Loading/LoadingPage';
import Blog from '../Blog/Blog';

const ManageBlog = () => {
    const {data,isLoading}=useQuery({
        queryKey:['manageBlogs'],
        queryFn:async()=>{
            const {data:blogs}= await axios.get(`http://localhost:5000/blogs`)
            return blogs
        }
    })
    console.log(data)
    if(isLoading){
        return <LoadingPage></LoadingPage>
    }
    return (
        <div className='grid grid-cols-2 gap-2'>
     {
        data.map(blog=> <Blog key={blog._id} blog={blog}></Blog>)
     }
        </div>
    );
};

export default ManageBlog;