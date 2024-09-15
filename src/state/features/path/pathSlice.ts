import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError, CancelTokenSource } from "axios";
import { LoginResponse, Path, Response, UnknownPathResponse } from "../../../types";
import { loginSuccess } from "../auth/authSlice";

type InitialState = {
  data: Response;
  actualPath: Path[];
  history: Path[];
  status: "idle" | "loading" | "failed" | "completed";
  error: string | null;
};

let cancelSource: CancelTokenSource
export const setPathAsync = createAsyncThunk(
  "path/setPathAsync",
  async (path: string, { signal, rejectWithValue, dispatch }) => {
    try {
      if (cancelSource) {
        cancelSource.cancel("New request initiated");
      }
      cancelSource = axios.CancelToken.source();

      signal.addEventListener("abort", () => {
        cancelSource.cancel("Request was aborted");
        rejectWithValue("Request was aborted");
      });

      const fetchPath = async () => {
        const { data } = await axios.get<Response>(
          `${process.env.REACT_APP_API_URL}/folder/${path}`,
          {
            withCredentials: true,
            cancelToken: cancelSource.token,
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

export const setUnknownPathAsync = createAsyncThunk(
  "path/setUnknownPathAsync",
  async (path: string, { signal, rejectWithValue, dispatch }) => {
    try {
      if (cancelSource) {
        cancelSource.cancel("New request initiated");
      }
      cancelSource = axios.CancelToken.source();

      signal.addEventListener("abort", () => {
        cancelSource.cancel("Request was aborted");
        rejectWithValue("Request was aborted");
      });

      const fetchPath = async () => {
        const url = path
          ? `${process.env.REACT_APP_API_URL}/folder/path/${path}`
          : `${process.env.REACT_APP_API_URL}/folder`;
        const { data } = await axios.get(url, {
          withCredentials: true,
          cancelToken: cancelSource.token,
        });

        const dataIsUnknownPathResponse = "path" in data;

        const newState = {
          folder: (dataIsUnknownPathResponse ? data.folder : data) as Response,
          path: (dataIsUnknownPathResponse ? data.path : [{ id: data.id, name: null }]) as Path[],
        };
        return newState as UnknownPathResponse;
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
  "path/setNewPathAndFetchAsync",
  async (path: Path, { dispatch }) => {
    dispatch(setNewPath(path));
    await dispatch(setPathAsync(path.id));
  }
);

export const setActualPathAndFetchAsync = createAsyncThunk(
  "path/setActualPathAndFetchAsync",
  async (index: number, { dispatch, getState }) => {
    if (index === (getState() as { path: InitialState }).path.actualPath.length - 1) return;
    dispatch(setActualPath(index));
    await dispatch(setPathAsync((getState() as { path: InitialState }).path.actualPath[index].id));
  }
);

export const setUnkownPathAndFetchAsync = createAsyncThunk(
  "path/setUnkownPathAndFetchAsync",
  async (id: string, { dispatch }) => {
    return await dispatch(setUnknownPathAsync(id));
  }
);

export const refreshPathAsync = createAsyncThunk(
  "path/refreshPath",
  async (pathToRefresh: string, { getState, dispatch }) => {
    const { actualPath } = (getState() as { path: InitialState }).path;
    if (actualPath[actualPath.length - 1].id === pathToRefresh) {
      await dispatch(setPathAsync(actualPath[actualPath.length - 1].id));
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
        state.status = action.error.message === "Rejected" ? "loading" : "failed";
        state.error = action.error.message || "Request was aborted";
      })
      .addCase(setPathAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(setUnkownPathAndFetchAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(setUnkownPathAndFetchAsync.fulfilled, (state, action) => {
        const payload = action.payload.payload as UnknownPathResponse;
        state.data = payload.folder;
        state.actualPath = payload.path;
        state.history = payload.path;
        state.error = null;
        state.status = "completed";
      })
      .addCase(setUnkownPathAndFetchAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Request was aborted";
      })
  },
});

export const getActualPath = (state: InitialState) =>
  state.actualPath[state.actualPath.length - 1];

export const isNextPathInHistory = (state: InitialState) =>
  state.history.length > state.actualPath.length;

export const { setActualPath, setNewPath } = pathSlice.actions;

export default pathSlice.reducer;
