import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
  token: string;
}

type InitialState = {
  user: User | null;
}

const initialState: InitialState = {
  user: window.localStorage.getItem("user") ? JSON.parse(window.localStorage.getItem("user") as string) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    loginFailure: (state) => {
      state.user = null;
    },
    logout: (state) => {
      state.user = null;
    },
    userUpdated: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { loginSuccess, loginFailure, logout, userUpdated } =
  authSlice.actions;
