import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CATEGORY_API, SOURCE_API } from "../constants";
import Constants from "expo-constants";
const KEY = Constants.expoConfig.extra.APIKEY;

const initialState = {
  sources: [],
  categoryNews: [],
  loading: false,
  error: null,
};

export const getSources = createAsyncThunk(
  "getSources",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(SOURCE_API);
      return response?.data?.sources;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getCategoryNews = createAsyncThunk(
  "getCategoryNews",
  async (category, { rejectWithValue }) => {
    try {
      const response = await axios.get(CATEGORY_API + category, {
        params: {
          apiKey: KEY,
        },
      });
      return response?.data?.sources;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getSources.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSources.fulfilled, (state, action) => {
        state.sources = action.payload;
        state.loading = false;
      })
      .addCase(getSources.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getCategoryNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategoryNews.fulfilled, (state, action) => {
        state.categoryNews = action.payload;
        state.loading = false;
      })
      .addCase(getCategoryNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default newsSlice.reducer;
