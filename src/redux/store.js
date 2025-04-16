import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './blogSlice';
import tagsReducer from './tagsSlice';
import questionsReducer from './questionsSlice';
import saveReducer from './saveSlice';
import eventsReducer from "./eventsSlice";

export const store = configureStore({
  reducer: {
    blog: blogReducer,
    tags: tagsReducer,
    questions: questionsReducer,
    saves: saveReducer,
    question: questionsReducer,
    events: eventsReducer,
  },
});