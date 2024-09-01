import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Response } from "../../../types";

type Path = {
  path: string;
  name: string;
};

type InitialState = {
  data: Response;
  actualPath: Path[];
  history: Path[];
  status: "idle" | "loading" | "failed" | "completed";
};

export const setPathAsync = createAsyncThunk('path/setPath', async (path: string) => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/folder/${path}`, { withCredentials: true });
  return response.data;
});



const initialState: InitialState = {
  data: {
    id: "",
    parentFolderId: "",
    folderDetails: "",
    files: [],
    childFolders: []
  },
  actualPath: [{ path: "", name: "Home" }],
  history: [{ path: "", name: "Home" }, { path: "51D45D81-EB86-4453-F301-08DCB7E6C0E9", name: "First" }],
  status: "idle",
};

const pathSlice = createSlice({
  name: "path",
  initialState,
  reducers: {
    setPath: (state, action: PayloadAction<Path>) => {
      state.actualPath = [...state.actualPath, action.payload];
    },
    setNextPath: (state, action: PayloadAction<number>) => {
      if(!state.history) return;
      state.actualPath = state.history?.slice(0, action.payload + 1);
    },
    setPreviousPath: (state) => {
      if(!state.history) return;
      state.actualPath = state.history.slice(0, state.history.length - 1);
    },
    goBackToPath: (state, action: PayloadAction<number>) => {
      if(!state.history) return;
      state.actualPath = state.history.slice(0, action.payload + 1);
    },
    setData: (state, action: PayloadAction<Response>) => {
      state.data = action.payload;
      state.status = "completed";
    }
  },
  extraReducers: (builder) => {
    builder.addCase(setPathAsync.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "completed";
    });
    builder.addCase(setPathAsync.rejected, (state) => {
      state.status = "failed";
    });
    builder.addCase(setPathAsync.pending, (state) => {
      state.status = "loading";
    });
  },
});

export const getActualPath = (state: InitialState) => state.actualPath[state.actualPath.length - 1];

export default pathSlice.reducer;
export const { setNextPath, setPreviousPath, setPath, goBackToPath, setData } = pathSlice.actions;
