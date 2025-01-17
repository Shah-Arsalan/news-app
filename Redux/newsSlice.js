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
  newcategories: [],
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

export const postCategories = createAsyncThunk(
  "postCategories",
  async ({ token, categories }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://eeb0-2405-201-5510-c070-f0a3-41ae-acd4-52b3.ngrok-free.app/category",
        {
          categories: categories,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getCategories = createAsyncThunk(
  "getCategories",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://eeb0-2405-201-5510-c070-f0a3-41ae-acd4-52b3.ngrok-free.app/category",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      const categories = response?.data?.categories?.map((ele) => ele.category);
      return categories;
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
      })

      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.newcategories = action.payload;
        state.loading = false;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default newsSlice.reducer;
