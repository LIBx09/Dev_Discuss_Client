import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Blog = ({ blog, index }) => {
    const { _id, image, author, title, date } = blog;

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                duration: 0.5,
                delay: index * 0.1
            }
        },
        hover: {
            y: -10,
            transition: { duration: 0.3 }
        }
    };

    const imageVariants = {
        hover: { 
            scale: 1.05,
            transition: { duration: 0.3 }
        }
    };

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="h-full"
        >
            <div className="card bg-white rounded-xl overflow-hidden shadow-lg h-full flex flex-col transition-all duration-300 hover:shadow-xl">
                <figure className="relative overflow-hidden h-52">
                    <motion.img
                        variants={imageVariants}
                        src={image}
                        className="w-full h-full object-cover"
                        alt={title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </figure>
                
                <div className="card-body p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="text-lg font-bold text-gray-800">{author}</h3>
                        <span className="text-sm text-gray-500">{date}</span>
                    </div>
                    
                    <h2 className="text-xl font-bold mb-4 text-gray-900 line-clamp-2">{title}</h2>
                    
                    <div className="mt-auto">
                        <Link 
                            to={`/blog-details/${_id}`} 
                            className="group flex items-center gap-2 font-medium text-orange-500 hover:text-orange-600 transition-colors duration-300"
                        >
                            Read More 
                            <motion.div
                                whileHover={{ x: 5 }}
                                transition={{ type: "spring", stiffness: 400 }}
                            >
                                <FaArrowRight className="text-orange-500 group-hover:text-orange-600" />
                            </motion.div>
                        </Link>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Blog;