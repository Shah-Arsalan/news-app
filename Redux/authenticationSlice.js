import { createSlice, current } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  token: null,
  loading: false,
  error: null,
};

export const loginHandler = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://eeb0-2405-201-5510-c070-f0a3-41ae-acd4-52b3.ngrok-free.app/login",
        {
          email,
          password,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginHandler.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginHandler.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.loading = false;
      })
      .addCase(loginHandler.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authenticationSlice.reducer;
