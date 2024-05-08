import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActiveFiles, Item, SelectedElements } from "../../../types";


type InitialState = {
    selectedFiles: SelectedElements;
    lastCommand: string;
};


const initialState: InitialState = {
    selectedFiles: [],
    lastCommand: "",
};


const filesSlice = createSlice({
  name: "selectedFiles",
  initialState,
  reducers: {
    selectFiles: (state, action: PayloadAction<SelectedElements>) => {
      state.selectedFiles = action.payload;
    },
    addFile: (state, action: PayloadAction<Item>) => {
      state.selectedFiles = [...state.selectedFiles, action.payload];
    },
    removeFile : (state, action: PayloadAction<Item>) => {
      state.selectedFiles = state.selectedFiles.filter((el) => el.id !== action.payload.id);
    },
    setLastCommand: (state, action: PayloadAction<string>) => {
      state.lastCommand = action.payload;
    },
  },
});

export default filesSlice.reducer;
export const { selectFiles, addFile, removeFile} =
filesSlice.actions;
