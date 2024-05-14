import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {  Item, SelectedElements } from "../../../types";


type InitialState = {
    selectedFiles: SelectedElements;
    copyFiles: SelectedElements;  
    lastCommand: string;
};


const initialState: InitialState = {
    selectedFiles: [],
    copyFiles: [],
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
    removeFile : (state, action: PayloadAction<Item>) => {
      state.selectedFiles = state.selectedFiles.filter((el) => el.id !== action.payload.id);
    },
    setLastCommand: (state, action: PayloadAction<LastCommandPayload>) => {
      switch (action.payload.command) {
        case "copy":
          state.copyFiles = action.payload.files || state.selectedFiles;
          break;
        case "cut":
          state.copyFiles = action.payload.files || state.selectedFiles;
          break;
        case "paste":
          state.copyFiles = [];
          break;
        case "delete":
          state.copyFiles = state.copyFiles.filter((stateEl) => {
            return !action.payload.files?.some((actionEl) => actionEl.id === stateEl.id);
          });
          break;
        default:
          state.copyFiles = [];
      }

      state.lastCommand = action.payload.command;
      state.selectedFiles = [];
    },
  },
});

export default filesSlice.reducer;
export const { selectFiles, addFile, addFiles, removeFile, setLastCommand} =
filesSlice.actions;
