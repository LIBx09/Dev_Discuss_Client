// src/redux/questionsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch all questions
export const fetchQuestions = createAsyncThunk(
  "questions/fetchAll",
  async () => {

    const res = await axios.get("https://dev-discuss-server-chi.vercel.app/questions");

    return res.data;
  }
);

// Async thunk to fetch questions by tag
export const fetchQuestionsByTag = createAsyncThunk(
  "questions/fetchByTag",
  async (tag) => {

    const res = await axios.get(`https://dev-discuss-server-chi.vercel.app/questions/tag/${tag}`);

    return res.data;
  }
);

// ✅ Async thunk to add a new question
export const addQuestion = createAsyncThunk(
  "questions/add",
  async ({ data, user }, { rejectWithValue }) => {
    try {

      const res = await axios.post("https://dev-discuss-server-chi.vercel.app/questions", {

        ...data,
        date: new Date().toLocaleDateString(),
        userName: user?.displayName,
        userEmail: user?.email,
        userPhoto: user?.photoURL,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const questionsSlice = createSlice({
  name: "questions",
  initialState: {
    questions: [],         // All questions
    taggedQuestions: [],   // Tag-filtered questions
    loading: false,
    error: null,
    addSuccess: false,
    addLoading: false,
  },
  reducers: {
    clearTaggedQuestions: (state) => {
      state.taggedQuestions = [];
    },
    resetAddStatus: (state) => {
      state.addSuccess = false;
      state.addLoading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    // All questions
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.questions = action.payload;
        state.loading = false;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // Questions by tag
    builder
      .addCase(fetchQuestionsByTag.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestionsByTag.fulfilled, (state, action) => {
        state.taggedQuestions = action.payload;
        state.loading = false;
      })
      .addCase(fetchQuestionsByTag.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // ✅ Add new question
    builder
      .addCase(addQuestion.pending, (state) => {
        state.addLoading = true;
        state.addSuccess = false;
        state.error = null;
      })
      .addCase(addQuestion.fulfilled, (state, action) => {
        state.addLoading = false;
        state.addSuccess = true;

        // Only add to list if backend returned full new question
        if (action.payload.insertedId || action.payload._id) {
          state.questions.unshift(action.payload); // Add new to top
        }
      })
      .addCase(addQuestion.rejected, (state, action) => {
        state.addLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearTaggedQuestions, resetAddStatus } = questionsSlice.actions;
export default questionsSlice.reducer;