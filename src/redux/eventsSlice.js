// src/redux/eventsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  eventsList: [
    {
      id: 1,
      title: "React Conference 2025",
      date: "April 15, 2025",
      location: "San Francisco, CA",
      description:
        "Join the biggest React conference with industry experts discussing the future of React and front-end development.",
    },
    {
      id: 2,
      title: "JavaScript Bootcamp",
      date: "May 10, 2025",
      location: "Online",
      description:
        "A free JavaScript bootcamp covering advanced topics like closures, async programming, and best practices.",
    },
    {
      id: 3,
      title: "Web Development Hackathon",
      date: "June 5, 2025",
      location: "New York, NY",
      description:
        "Compete with other developers in building innovative web applications in 24 hours!",
    },
  ],
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    addEvent: (state, action) => {
      state.eventsList.push(action.payload);
    },
  },
});

export const { addEvent } = eventsSlice.actions;
export default eventsSlice.reducer;