import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Path, Response } from "../../../types";
import { loginSuccess } from "../auth/authSlice";


type InitialState = {
  data: Response;
  actualPath: Path[];
  history: Path[];
  status: "idle" | "loading" | "failed" | "completed";
  error: string | null;
};

export const setPathAsync = createAsyncThunk(
  "path/setPath",
  async (path: string, { signal, rejectWithValue, dispatch }) => {
    try {
      const source = axios.CancelToken.source();
      signal.addEventListener("abort", () => {
        source.cancel();
        rejectWithValue("Request was aborted");
      });

      const fetchPath = async () => {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/folder/${path}`,
          {
            withCredentials: true,
            cancelToken: source.token,
          }
        );
        return data;
      };

      try {
        return await fetchPath();
      } catch (error: any) {
        if (error.response?.status === 401) {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/token/refresh`, {
            withCredentials: true,
          });
          if (response.data) {
            dispatch(loginSuccess(response.data));
            return await fetchPath();
          }
          return rejectWithValue("Unauthorized");
        }
        throw error;
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

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

const pathSlice = createSlice({
  name: "path",
  initialState,
  reducers: {
    setPath: (state, action: PayloadAction<Path>) => {
      state.actualPath.push(action.payload);
      state.history = [...state.actualPath];
    },
    setNextPath: (state, action: PayloadAction<number>) => {
      state.actualPath = state.history.slice(0, action.payload + 1);
    },
    setPreviousPath: (state, action: PayloadAction<number>) => {
      state.actualPath = state.history.slice(0, action.payload + 1);
    },
    goBackToPath: (state, action: PayloadAction<number>) => {
      state.actualPath = state.history.slice(0, action.payload + 1);
    },
    setData: (state, action: PayloadAction<Response>) => {
      state.data = action.payload;
      state.status = "completed";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setPathAsync.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "completed";
        state.error = null;
      })
      .addCase(setPathAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Request was aborted";
      })
      .addCase(setPathAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      });
  },
});

export const getActualPath = (state: InitialState) =>
  state.actualPath[state.actualPath.length - 1];

export const { setNextPath, setPreviousPath, setPath, goBackToPath, setData } =
  pathSlice.actions;

export default pathSlice.reducer;
