import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  blogs: [[
    {
        "_id": "1",
        "image": "https://www.weblozy.com/uploads/2023/11/2024-new-web-development-trends-technologies.webp",
        "author": "John Doe",
        "title": "Top Web Development Trends in 2025",
        "date": "2025-03-14",
        "description": "Explore the latest web development trends shaping the industry in 2025, including AI integration, Web3, and performance optimization."
    },
    {
        "_id": "2",
        "image": "https://d2ms8rpfqc4h24.cloudfront.net/React_Vs_Vue_3fa266b582.png",
        "author": "Jane Smith",
        "title": "React vs Vue: Which Framework Should You Choose?",
        "date": "2025-03-10",
        "description": "A detailed comparison of React and Vue.js, discussing performance, ease of use, and community support to help you make the right choice."
    },
    {
        "_id": "3",
        "image": "https://www.shutterstock.com/image-photo/glowing-digital-lock-surrounded-by-600nw-2517566697.jpg",
        "author": "Alice Johnson",
        "title": "Essential Web Security Practices for Developers",
        "date": "2025-03-08",
        "description": "Learn about key security practices such as HTTPS, data encryption, and authentication to keep your web applications safe from threats."
    }
    
]], // JSON blog data will be stored here
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setBlogs: (state, action) => {
      state.blogs = action.payload;
    },
  },
});

export const { setBlogs } = blogSlice.actions;
export default blogSlice.reducer;