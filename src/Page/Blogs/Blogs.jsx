import { useEffect, useState } from "react";
import Blog from "../Blog/Blog";

const Blogs = () => {
    const [blogs, setBlogs] = useState(null)
    useEffect(() => {
        fetch("/blog.json")
            .then(res => res.json())
            .then(data => {
                setBlogs(data)
            })
    }, [])
    return (
        <div className="pt-16 pb-10  max-w-7xl mx-auto">
            <h1 className="text-3xl lg:text-5xl font-bold text-center mb-7">Blogs</h1>

            <div className=" grid lg:grid-cols-3 md:grid-cols-2 gap-4">
                {
                    blogs?.map(blog => <Blog key={blog.id} blog={blog}></Blog>)
                }
            </div>
        </div>
    );
};

export default Blogs;