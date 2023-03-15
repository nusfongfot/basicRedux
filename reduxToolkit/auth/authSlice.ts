import { RootState } from "./../store";
import { createSlice } from "@reduxjs/toolkit";
import { Account } from "./../../app-types/accTypes";
import { getCurrentAccountThunk } from "./authThunk";

export type AuthState = {
  isAuthLoading: boolean;
  account: Account | null;
};

const initialState: AuthState = {
  isAuthLoading: true,
  account: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getCurrentAccountThunk.pending, (state, action) => {
      state.isAuthLoading = true;
    });
    builder.addCase(getCurrentAccountThunk.fulfilled, (state, action) => {
      state.account = action.payload;
      state.isAuthLoading = false;
    });
  },
});

export const selectAuthState = (state: RootState) => state.authState;

export default authSlice.reducer;
