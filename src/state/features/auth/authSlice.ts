import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
}

interface IInitialState {
  user: IUser | null;
}

const initialState: IInitialState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    loginFailure: (state) => {
      state.user = null;
    },
    logout: (state) => {
      state.user = null;
    },
    userUpdated: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { loginSuccess, loginFailure, logout, userUpdated } =
  authSlice.actions;
