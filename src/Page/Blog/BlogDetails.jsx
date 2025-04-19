import { useEffect, useState } from "react";
import { FaEye, FaHeart, FaShareFromSquare } from "react-icons/fa6";
import { FcLike } from "react-icons/fc";
import { IoArrowBackCircle } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";

const BlogDetails = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:3000/blogs/${id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Blog not found");
                }
                return res.json();
            })
            .then(data => {
                setBlog(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching blog:", error);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p className="text-center text-xl">Loading blog...</p>;

    if (!blog) return <p className="text-center text-red-500 text-xl">Blog not found.</p>;

    return (
        <div className="max-w-4xl mx-auto p-4">
            {/* <img src={blog.image} alt={blog.title} className="w-full h-64 object-cover rounded-lg mb-4" />
            <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
            <p className="text-gray-600 mb-4">By {blog.author} on {blog.date}</p>
            <p>{blog.content}</p> */}

            <div>
            <div className=" max-w-7xl mx-auto">
            <div className=' justify-center items-center gap-20  mb-10 '>
                <div className='w-full '>
                    <img src={blog.image} className="rounded-2xl h-96 w-full" alt="" />

                    <div className="flex items-center gap-5 justify-center mt-4">
                        <div className="flex items-center gap-2">
                            <FaEye className="text-xl text-blue-400" />
                            <p>{10}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <FcLike
                                className="text-xl" />
                            <p>{10}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaShareFromSquare
                                className="text-xl text-blue-600" />
                            <p>{110}</p>
                        </div>
                    </div>
                </div>
                <div className='w-full  mt-5'>
                    <h1 className='text-3xl lg:text-5xl p-2  font-bold'>{blog.title}</h1>
                    <p className="text-[#749B3F] p-2  w-60 text-center bg-lime-100 rounded-xl ">by {blog.author}</p>


                    <p className='mt-5 text-justify p-2'>{blog.content}</p>
                    <p className=' text-justify px-2'><b>date:</b> {blog.date}</p>

                    <div className=' flex items-center gap-3'>


                    </div>
                    <div className='mt-5 lg:flex gap-4 justify-center'>
                        <Link className='btn w-full lg:w-1/3   bg-[#C19A6B] text-black p-2 mt-6'> <FaHeart className='text-gray-500' />
                            Love</Link>
                        <Link to={-1}  className='btn w-full lg:w-1/3 bg-orange-500 p-2 hover:bg-orange-500 text-white mt-6'> <IoArrowBackCircle />

                            back</Link>

                    </div>
                </div>
            </div>


        </div>
            </div>
        </div>
    );
};

export default BlogDetails;