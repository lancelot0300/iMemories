import React from 'react'
import { useAppDispatch, useAppSelector } from "../../state/store"
import { addFile, removeFile, selectFiles } from '../../state/features/files/filesSlice';
import { FileType, FolderType, SelectedElements } from '../../types';

type Props = {
    element: FileType | FolderType,
    selectedFiles: SelectedElements,
    storageFiles: SelectedElements
}

function useFile({element, selectedFiles, storageFiles}: Props) {

  const {lastCommand} = useAppSelector((state) => state.files);

    const isActive = selectedFiles.some((el) => el.id === element.id);
    const isCopy = storageFiles.some((el) => el.id === element.id) && lastCommand === "copy";
    
    const dispatch = useAppDispatch();

    const selectSingleElement = () => {
          dispatch(selectFiles([element]));
      };
  
      const selectMultipleElements = () => {
        if (isActive) {
          dispatch(removeFile(element));
        } else {
          dispatch(addFile(element));
        }
      };
  
      const setActiveElement = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.ctrlKey) {
          selectMultipleElements();
        } else {
          selectSingleElement();
        }
      };

      const setActiveOnRightClick = () => {
        if (!isActive) {
          selectSingleElement();
        }
      };

      return { setActiveElement, isActive, isCopy, setActiveOnRightClick}
}

export default useFile