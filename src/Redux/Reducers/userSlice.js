import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseURL = "http://localhost:5000";

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${baseURL}/app/user/login`,
        { email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Login Failed"
      );
    }
  }
);

export const register = createAsyncThunk(
  "user/register",
  async ({ firstName, lastName, email, password }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${baseURL}/app/user/register`,
        { firstName, lastName, email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Registration Failed"
      );
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async ({ email }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${baseURL}/app/user/forgotPassword`,
        { email },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "forgotPassword error"
      );
    }
  }
);

export const verifyOTP = createAsyncThunk(
  "user/verifyOTP",
  async ({ otp, email }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${baseURL}/app/user/verifyOTP`,
        { otp, email },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "OTP verification error"
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ email, newPassword, confirmPassword }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${baseURL}/app/user/resetPassword`,
        { email, newPassword, confirmPassword },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Password reset error"
      );
    }
  }
);

export const getUserData = createAsyncThunk(
  "user/getUserData",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${baseURL}/app/user/getUserData`,
        { withCredentials: true }
      );
      return response.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Get user Failed"
      );
    }
  }
);

export const isLogout = createAsyncThunk(
  "user/logout",
  async (_, thunkAPI) => {
    try {
      const response = await axios.post(
        `${baseURL}/app/user/logout`,
        {},
        { withCredentials: true }
      )
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Logout Failed"
      )
    }
  }
)

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    isUserAuth: false,
    user: null,
    error: null,
    message: null,
    forgotPasswordSuccess: false,
    resetPasswordSuccess: false,
    authChecked: false
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.isUserAuth = false;
      state.loading = false;
    },
    clearMessage(state) {
      (state.message = null), (state.error = null);
    },
    resetForgotPassword(state) {
      state.forgotPasswordSuccess = false;
    },
    resetOTPVerified(state) {
      state.otpVerified = false;
    },
    resetPassword(state) {
      state.resetPasswordSuccess = false
    }
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.isUserAuth = false;
        state.user = null;
        state.error = null;
        state.message = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isUserAuth = true;
        state.user = action.payload.user;
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isUserAuth = false;
        state.user = null;
        state.error = action.payload;
        state.message = null
      })

      // register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isUserAuth = false;
        state.user = null;
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.isUserAuth = false;
        state.user = null;
        state.error = action.payload;
        state.message = null;
      })

      // forgotPassword
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.resetEmail = action.meta.arg.email;
        state.forgotPasswordSuccess = true;
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = null;
      })

      // verifyOTP
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.resetEmail = action.payload.email;
        state.message = action.payload.message;
        state.otpVerified = true;
        state.error = null;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = null;
      })

      // resetPassword
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.resetPasswordSuccess = true;
        state.otpVerified = false;
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = null;
      })

      // get user
      .addCase(getUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null
        state.authChecked = false
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.isUserAuth = true;
        state.user = action.payload;
        state.message = null;
        state.error = null;
        state.authChecked = true
      })
      .addCase(getUserData.rejected, (state) => {
        state.loading = false;
        state.isUserAuth = false;
        state.user = null;
        state.message = null;
        state.authChecked = true
      })

      // logout
      .addCase(isLogout.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null
      })
      .addCase(isLogout.fulfilled, (state, action) => {
        state.loading = false;
        state.isUserAuth = false;
        state.user = null;
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(isLogout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = null
      })
  },
});

export const { logout, clearMessage, resetForgotPassword, resetOTPVerified } = userSlice.actions;
export default userSlice.reducer;