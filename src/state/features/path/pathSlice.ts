import { createSlice, createAsyncThunk, PayloadAction, AsyncThunkAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { LoginResponse, Path, Response } from "../../../types";
import { loginSuccess } from "../auth/authSlice";
import { AsyncThunkConfig } from "@reduxjs/toolkit/dist/createAsyncThunk";

type InitialState = {
  data: Response;
  actualPath: Path[];
  history: Path[];
  status: "idle" | "loading" | "failed" | "completed";
  error: string | null;
};

type PathWithoutName = {
  path: string;
  name?: string;
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
        const { data } = await axios.get<Response>(
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
      } catch (e) {
        const error = e as AxiosError;
        if (error.response?.status === 401) {
          const response = await axios.get<LoginResponse>(
            `${process.env.REACT_APP_API_URL}/token/refresh`,
            {
              withCredentials: true,
            }
          );
          if (response.data) {
            dispatch(loginSuccess(response.data.user));
            return await fetchPath();
          }
          return rejectWithValue("Unauthorized");
        }
        throw error;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || "Something went wrong");
      }
      return rejectWithValue("Something went wrong");
    }
  }
);

export const setNewPathAndFetchAsync = createAsyncThunk(
  "path/setPathAndFetch",
  async (path: Path, { dispatch }) => {
    dispatch(setNewPath(path));
    await dispatch(setPathAsync(path.path));
  }
);

export const setActualPathAndFetchAsync = createAsyncThunk(
  "path/setNextPathAndFetch",
  async (index: number, { dispatch, getState }) => {
    if(index === (getState() as {path: InitialState}).path.actualPath.length - 1) return;
    dispatch(setActualPath(index));
    await dispatch(setPathAsync((getState() as {path: InitialState}).path.actualPath[index].path));
  }
);


export const setUnkownPathAndFetchAsync = createAsyncThunk(
  "path/setUnkownPathAndFetch",
  async (path: PathWithoutName, { dispatch }) => {
     return await dispatch(setPathAsync(path.path));
  }
);



export const refreshPathAsync = createAsyncThunk(
  "path/refreshPath",
  async (pathToRefresh: string, { getState, dispatch }) => {
    const { actualPath } = (getState() as { path: InitialState }).path;
    if (actualPath[actualPath.length - 1].path === pathToRefresh) {
      await dispatch(setPathAsync(actualPath[actualPath.length - 1].path));
    }
  }
);

const initialState: InitialState = {
  data: {
    id: "",
    parentFolderId: "",
    folderDetails: null,
    files: [],
    childFolders: [],
  },
  actualPath: [],
  history: [],
  status: "idle",
  error: null,
};

const pathSlice = createSlice({
  name: "path",
  initialState,
  reducers: {
    setNewPath: (state, action: PayloadAction<Path>) => {
      state.actualPath.push(action.payload);
      state.history = [...state.actualPath];
    },
    setActualPath: (state, action: PayloadAction<number>) => {
      state.actualPath = state.history.slice(0, action.payload + 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        setPathAsync.fulfilled,
        (state, action: PayloadAction<Response>) => {
          state.data = action.payload;
          state.status = "completed";
          state.error = null;
        }
      )
      .addCase(setPathAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Request was aborted";
      })
      .addCase(setPathAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(setUnkownPathAndFetchAsync.fulfilled, (state, action) => {
        const payload = action.payload.payload as Response;
        state.actualPath = [{ path: payload.folderDetails?.id || "", name: payload.folderDetails?.name || "Home" }];
        state.history = [...state.actualPath];
      })
  },
});

export const getActualPath = (state: InitialState) =>
  state.actualPath[state.actualPath.length - 1];

export const isNextPathInHistory = (state: InitialState) =>
  state.history.length > state.actualPath.length;

export const { setActualPath, setNewPath } = pathSlice.actions;

export default pathSlice.reducer;
