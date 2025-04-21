import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Blog from "../Blog/Blog";
import LoadingPage from "../Loading/LoadingPage";
import { useDispatch } from "react-redux";
import { setBlogs } from "../../redux/blogSlice";

const Blogs = () => {
  const [blogs, setBlogsState] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3000/blogs")
      .then((res) => res.json())
      .then((data) => {
        setBlogsState(data);
        dispatch(setBlogs(data)); // Set globally in Redux
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      });
  }, [dispatch]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section className="py-2 px-4 max-w-7xl mx-auto dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl lg:text-4xl font-bold relative inline-block">
          Blogs
          <motion.div
            className="absolute bottom-0 left-1/2 h-1 w-full bg-blue-500 rounded-full"
            initial={{ width: 0, x: "-50%" }}
            animate={{ width: "70%", x: "-50%" }}
            transition={{ delay: 0.3, duration: 0.5 }}
          />
        </h1>
      </motion.div>

      {loading ? (
        <LoadingPage />
      ) : (
        <motion.div
          className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {blogs?.map((blog, index) => (
            <Blog key={blog._id || index} blog={blog} index={index} />
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default Blogs;