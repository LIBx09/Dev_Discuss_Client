import React from "react";

const Blogs = () => {
  // Sample blog data
  const blogPosts = [
    {
      id: 1,
      title: "Understanding React Virtual DOM",
      description:
        "Learn how the Virtual DOM works in React and why it improves performance.",
      author: "John Doe",
      date: "March 10, 2025",
    },
    {
      id: 2,
      title: "Mastering JavaScript Closures",
      description:
        "A deep dive into closures in JavaScript with real-world examples.",
      author: "Jane Smith",
      date: "March 12, 2025",
    },
    {
      id: 3,
      title: "How to Optimize Performance in React Apps",
      description:
        "Best practices for optimizing React applications for speed and efficiency.",
      author: "Emily Johnson",
      date: "March 15, 2025",
    },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Latest Blogs</h2>

      {blogPosts.length === 0 ? (
        <p className="text-gray-500 text-center">No blogs available.</p>
      ) : (
        <div className="space-y-4">
          {blogPosts.map((blog) => (
            <div key={blog.id} className="border p-4 rounded-lg shadow-md ">
              <h3 className="text-lg font-semibold text-blue-600">
                {blog.title}
              </h3>
              <p className="text-gray-500 mt-2">{blog.description}</p>

              <div className="flex justify-between items-center mt-3 text-gray-500 text-sm">
                <p>
                  ✍️ <span className=" dark:text-white">{blog.author}</span>
                </p>
                <p>
                  📅 <span className=" dark:text-white">{blog.date}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;
