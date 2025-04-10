import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Blog from "../Blog/Blog";
import LoadingPage from "../Loading/LoadingPage";

const Blogs = () => {
    const [blogs, setBlogs] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch("https://dev-discuss-server-kappa.vercel.app/blogs")
            .then(res => res.json())
            .then(data => {
                setBlogs(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching blogs:", error);
                setLoading(false);
            });
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <section className="py-16 px-4 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
            >
                <h1 className="text-3xl lg:text-5xl font-bold relative inline-block">
                    Blogs
                    <motion.div 
                        className="absolute bottom- left-1/2 h-1 bg-orange-500 rounded-full"
                        initial={{ width: 0, x: "-50%" }}
                        animate={{ width: "70%", x: "-50%" }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    />
                </h1>
            </motion.div>

            {loading ? (
          <LoadingPage></LoadingPage>
            ) : (
                <motion.div 
                    className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {blogs?.map((blog, index) => (
                        <Blog 
                            key={blog.id || index} 
                            blog={blog} 
                            index={index}
                        />
                    ))}
                </motion.div>
            )}
        </section>
    );
};

export default Blogs;