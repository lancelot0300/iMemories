import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Path = {
  path: string;
  name: string;
};

type InitialState = {
  actualPath: Path[];
};

const initialState: InitialState = {
  actualPath: [{ path: "", name: "Home" }],
};

const pathSlice = createSlice({
  name: "path",
  initialState,
  reducers: {
    nextPath: (state, action: PayloadAction<Path[]>) => {
      state.actualPath = action.payload;
    },
    previousPath: (state) => {
      state.actualPath.pop();
    },
    setPath: (state, action: PayloadAction<Path[]>) => {
      state.actualPath = action.payload;
    },
    goBackToPath: (state, action: PayloadAction<number>) => {
      state.actualPath = state.actualPath.slice(0, action.payload + 1);
    },
  },
});

export const getActualPath = (state: InitialState) =>
  state.actualPath[state.actualPath.length - 1];

export default pathSlice.reducer;
export const { nextPath, previousPath, setPath } = pathSlice.actions;
