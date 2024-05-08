import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FileStatusState = {
  index: string;
  fileName: string;
  status: string;
};

type InitialState = {
  activeRequests: FileStatusState[];
};

const initialState: InitialState = {
  activeRequests: [],
};

const activeRequests = createSlice({
  name: "activeRequests",
  initialState,
  reducers: {
    addFileStatus: (state, action: PayloadAction<FileStatusState>) => {

      
      const { index, fileName, status } = action.payload;
      state.activeRequests.push({
        index: index,
        fileName,
        status,
      });

      if(state.activeRequests.length > 8 && state.activeRequests[0].status === "100%") {
        state.activeRequests.shift();
      }

    },
    removeFileStatus: (state, action: PayloadAction<string>) => {
      state.activeRequests = state.activeRequests.filter((file) => file.index !== action.payload);
    },
    updateFileStatus: (state, action: PayloadAction<FileStatusState>) => {
      state.activeRequests = state.activeRequests.map((file) => {
        if (file.index === action.payload.index) {
          return {
            index: file.index,
            fileName: action.payload.fileName,
            status: action.payload.status,
          };
        }
        return file;
      });
    },
    clearAllFilesStatus: (state) => {
      state.activeRequests = [];
    }
   
  },
});

export default activeRequests.reducer;
export const { addFileStatus, removeFileStatus, updateFileStatus, clearAllFilesStatus } = activeRequests.actions;
