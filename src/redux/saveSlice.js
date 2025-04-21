// src/redux/saveSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSavedQuestions = createAsyncThunk(
  "saves/fetchByEmail",
  async (email) => {
    const res = await axios.get(`http://localhost:5000//saves?email=${email}`);
    return res.data;
  }
);

const saveSlice = createSlice({
  name: "saves",
  initialState: {
    saveData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSavedQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSavedQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.saveData = action.payload;
      })
      .addCase(fetchSavedQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default saveSlice.reducer;