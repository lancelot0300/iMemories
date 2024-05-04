import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PathHistory = {
  key: number;
  path: string;
  data: {};
};

type InitialState = {
  path: string;
  pathHistory: PathHistory[];
};

const initialState: InitialState = {
  path: "/",
  pathHistory: [],
};

const pathSlice = createSlice({
  name: "path",
  initialState,
  reducers: {
    nextPath: (state, action: PayloadAction<PathHistory>) => {
      state.pathHistory.push(action.payload);
      state.path = action.payload.path;
    },
    previousPath: (state) => {
      state.pathHistory.pop();
      state.path = state.pathHistory[state.pathHistory.length - 1].path;
    },
    setPath: (state, action: PayloadAction<string>) => {
      state.path = action.payload;
    },
  },
});

export default pathSlice.reducer;
export const { nextPath, previousPath, setPath } = pathSlice.actions;
