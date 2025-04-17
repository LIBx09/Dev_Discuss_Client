// src/redux/tagsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch tags
export const fetchTags = createAsyncThunk("tags/fetchTags", async () => {
  const res = await axios.get("http://localhost:3000/tags");
  return res.data;
});

const tagsSlice = createSlice({
  name: "tags",
  initialState: {
    tags: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.tags = action.payload;
        state.loading = false;
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default tagsSlice.reducer;