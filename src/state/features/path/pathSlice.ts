import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Response } from "../../../types";

// Typy danych
type Path = {
  path: string;
  name: string;
};

type InitialState = {
  data: Response;
  actualPath: Path[];
  history: Path[];
  status: "idle" | "loading" | "failed" | "completed";
  error: string | null;
};

export const setPathAsync = createAsyncThunk(
  "path/setPath",
  async (path: string, { signal, rejectWithValue }) => {

    const source = axios.CancelToken.source();
    signal.addEventListener("abort", () => {
      source.cancel();
      rejectWithValue("Request was aborted");
    });

      const {data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/folder/${path}`, {
          withCredentials: true,
          cancelToken: source.token,
        });
      return data;
  
  }
);

// Stan początkowy
const initialState: InitialState = {
  data: {
    id: "",
    parentFolderId: "",
    folderDetails: "",
    files: [],
    childFolders: [],
  },
  actualPath: [{ path: "", name: "Home" }],
  history: [],
  status: "idle",
  error: null,
};

// Slice
const pathSlice = createSlice({
  name: "path",
  initialState,
  reducers: {
    setPath: (state, action: PayloadAction<Path>) => {
      state.actualPath = [...state.actualPath, action.payload];
      state.history = [...state.actualPath];
    },
    setNextPath: (state, action: PayloadAction<number>) => {
      if (!state.history) return;
      state.actualPath = state.history?.slice(0, action.payload + 1);
    },
    setPreviousPath: (state, action: PayloadAction<number>) => {
      if (!state.history) return;
      state.actualPath = state.history.slice(0, action.payload + 1);
    },
    goBackToPath: (state, action: PayloadAction<number>) => {
      if (!state.history) return;
      state.actualPath = state.history.slice(0, action.payload + 1);
    },
    setData: (state, action: PayloadAction<Response>) => {
      state.data = action.payload;
      state.status = "completed";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setPathAsync.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "completed";
      state.error = null;
    });
    builder.addCase(setPathAsync.rejected, (state, payload) => {
      state.status = "failed";
      state.error = payload.error.message || "Request was aborted";
    });
    builder.addCase(setPathAsync.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
  },
});

export const getActualPath = (state: InitialState) =>
  state.actualPath[state.actualPath.length - 1];

export const { setNextPath, setPreviousPath, setPath, goBackToPath, setData} =
  pathSlice.actions;

export default pathSlice.reducer;
