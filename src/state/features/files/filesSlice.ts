import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {  Item, SelectedElements } from "../../../types";


type InitialState = {
    selectedFiles: SelectedElements;
    storageFiles: SelectedElements;  
    lastCommand: string;
};


const initialState: InitialState = {
    selectedFiles: [],
    storageFiles: [],
    lastCommand: "",
};

type Commands = "copy" | "cut" | "paste" | "delete";

type LastCommandPayload = {
    command: Commands;
    files?: SelectedElements;
};



const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    selectFiles: (state, action: PayloadAction<SelectedElements>) => {
      if(action.payload.length === 0 && state.selectedFiles.length === 0) return;
      if(JSON.stringify(state.selectedFiles) === JSON.stringify(action.payload)) return;
      state.selectedFiles = action.payload;
    },
    addFiles: (state, action: PayloadAction<SelectedElements>) => {
      const newFiles = action.payload.filter((el) => !state.selectedFiles.some((stateEl) => stateEl.id === el.id));
      if(newFiles.length === 0) return;
      state.selectedFiles = [...state.selectedFiles, ...newFiles];
    },
    addFile: (state, action: PayloadAction<Item>) => {
      state.selectedFiles = [...state.selectedFiles, action.payload];
    },
    removeFile: (state, action: PayloadAction<Item>) => {
      state.selectedFiles = state.selectedFiles.filter((el) => el.id !== action.payload.id);
    },
    clearFiles: (state) => {
      state.selectedFiles = [];
    },
    setLastCommand: (state, action: PayloadAction<LastCommandPayload>) => {
      switch (action.payload.command) {
        case "copy":
          state.storageFiles = action.payload.files || state.selectedFiles;
          break;
        case "cut":
          state.storageFiles = action.payload.files || state.selectedFiles;
          break;
        case "delete":
          state.storageFiles = state.storageFiles.filter((stateEl) => {
            return !action.payload.files?.find((actionEl) => actionEl.id === stateEl.id);
          });
          break;
        default:
          state.storageFiles = [];
      }

      state.lastCommand = action.payload.command;
      state.selectedFiles = [];
    },
  },
});

export const selectActualFiles = (state: { files: InitialState }) => state.files.selectedFiles;

export const selectCopyFiles = (state: { files: InitialState }) => state.files.storageFiles;


export default filesSlice.reducer;
export const { selectFiles, addFile, addFiles, removeFile, setLastCommand, clearFiles} =
filesSlice.actions;
