import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
            <img src={blog.image} alt={blog.title} className="w-full h-64 object-cover rounded-lg mb-4" />
            <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
            <p className="text-gray-600 mb-4">By {blog.author} on {blog.date}</p>
            <p>{blog.content}</p>
        </div>
    );
};

export default BlogDetails;