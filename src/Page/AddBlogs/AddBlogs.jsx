import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FaUserEdit, FaImage, FaHeading, FaCalendarAlt, FaPen, FaTags } from 'react-icons/fa';
import "react-datepicker/dist/react-datepicker.css";

const AddBlogs = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);

    // Tech-related tags
    const availableTags = [
        "Web Development", 
        "AI", 
        "Machine Learning", 
        "JavaScript", 
        "Python", 
        "React", 
        "Node.js", 
        "Data Science", 
        "Blockchain", 
        "DevOps", 
        "Cloud Computing", 
        "Mobile Development", 
        "Cybersecurity",
        "UI/UX Design",
        "Database",
        "Frontend",
        "Backend",
        "API Development",
        "Game Development",
        "IoT"
    ];

    const handleTagToggle = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        } else {
            // Limit to 5 tags maximum
            if (selectedTags.length < 5) {
                setSelectedTags([...selectedTags, tag]);
            }
        }
    };

    const handleAddBlog = (e) => {
        e.preventDefault();
        setLoading(true);
        
        const form = e.target;
        const author = form.author.value;
        const image = form.photo.value;
        const title = form.title.value;
        const content = form.content.value;
        const date = form.date.value;

      
        const blogs = { author, image, title, content, date, tags: selectedTags };
        console.log(blogs)
        axios.post("http://localhost:5000/blogs", blogs)

            .then(response => {
                console.log(response.data);
                setLoading(false);
                setSuccess(true);
                form.reset();
                setStartDate(new Date());
                setSelectedTags([]); // Reset selected tags
                
                // Reset success message after 3 seconds
                setTimeout(() => setSuccess(false), 3000);
            })
            .catch(error => {
                console.error("Error adding blog:", error);
                setLoading(false);
            });
    };

    const formVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-10 px-4"
        >
            <Helmet>
                <title>Add Blog | Dev discuss</title>
            </Helmet>
            
            <motion.div 
                className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 py-8 px-6">
                    <motion.h1 
                        className="text-4xl font-bold text-white text-center"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        Create a New Blog
                    </motion.h1>
                    <motion.p 
                        className="text-white/80 text-center mt-2"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        Share your knowledge with the developer community
                    </motion.p>
                </div>

                <motion.form 
                    className="p-6 md:p-10"
                    variants={formVariants}
                    initial="hidden"
                    animate="visible"
                    onSubmit={handleAddBlog}
                >
                    <motion.div variants={itemVariants} className="mb-6">
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                            <FaUserEdit className="mr-2 text-blue-500" />
                            Author
                        </label>
                        <input 
                            type="text" 
                            name="author" 
                            placeholder="Enter your name" 
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none" 
                            required 
                        />
                    </motion.div>

                    <motion.div variants={itemVariants} className="mb-6">
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                            <FaImage className="mr-2 text-blue-500" />
                            Cover Image
                        </label>
                        <input 
                            type="url" 
                            name="photo" 
                            placeholder="Enter image URL" 
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none" 
                            required 
                        />
                    </motion.div>

                    <motion.div variants={itemVariants} className="mb-6">
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                            <FaHeading className="mr-2 text-blue-500" />
                            Title
                        </label>
                        <input 
                            type="text" 
                            name="title" 
                            placeholder="Enter blog title" 
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none" 
                            required 
                        />
                    </motion.div>

                    {/* Tags Selection */}
                    <motion.div variants={itemVariants} className="mb-6">
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                            <FaTags className="mr-2 text-blue-500" />
                            Tags (Select 2-5)
                        </label>
                        <div className="mb-2 text-xs text-gray-500">
                            {selectedTags.length === 0 ? 'No tags selected' : `${selectedTags.length}/5 tags selected`}
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {availableTags.map((tag, index) => (
                                <motion.button
                                    key={index}
                                    type="button"
                                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                                        selectedTags.includes(tag)
                                            ? 'bg-blue-500 text-white' 
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    } ${selectedTags.length >= 5 && !selectedTags.includes(tag) ? 'opacity-40 cursor-not-allowed' : ''}`}
                                    onClick={() => handleTagToggle(tag)}
                                    disabled={selectedTags.length >= 5 && !selectedTags.includes(tag)}
                                    whileHover={selectedTags.length < 5 || selectedTags.includes(tag) ? { scale: 1.03 } : { scale: 1 }}
                                    whileTap={selectedTags.length < 5 || selectedTags.includes(tag) ? { scale: 0.97 } : { scale: 1 }}
                                >
                                    {tag}
                                </motion.button>
                            ))}
                        </div>
                        {selectedTags.length < 2 && (
                            <div className="mt-2 text-xs text-red-500">Please select at least 2 tags</div>
                        )}
                    </motion.div>

                    <motion.div variants={itemVariants} className="mb-6">
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                            <FaPen className="mr-2 text-blue-500" />
                            Content
                        </label>
                        <textarea
                            placeholder="Write your blog content here..."
                            name="content"
                            rows="6"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none resize-none"
                            required
                        ></textarea>
                    </motion.div>

                    <motion.div variants={itemVariants} className="mb-8">
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                            <FaCalendarAlt className="mr-2 text-blue-500" />
                            Publication Date
                        </label>
                        <DatePicker 
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none" 
                            name="date" 
                            selected={startDate} 
                            onChange={(date) => setStartDate(date)} 
                            required 
                        />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <motion.button
                            className={`w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg flex items-center justify-center ${
                                selectedTags.length < 2 ? 'opacity-60 cursor-not-allowed' : ''
                            }`}
                            whileHover={{ scale: selectedTags.length >= 2 ? 1.02 : 1 }}
                            whileTap={{ scale: selectedTags.length >= 2 ? 0.98 : 1 }}
                            type="submit"
                            disabled={loading || selectedTags.length < 2}
                        >
                            {loading ? (
                                <motion.div
                                    className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                />
                            ) : (
                                "Publish Blog"
                            )}
                        </motion.button>
                    </motion.div>

                    {success && (
                        <motion.div 
                            className="mt-4 p-3 bg-blue-50 text-blue-700 rounded-lg text-center"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                        >
                            Blog published successfully!
                        </motion.div>
                    )}
                </motion.form>
            </motion.div>
        </motion.div>
    );
};

export default AddBlogs;