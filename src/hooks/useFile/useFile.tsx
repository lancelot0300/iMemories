import React from 'react'
import { Item } from '../../types';
import { useAppDispatch, useAppSelector } from "../../state/store"
import { addFile, removeFile, selectFiles } from '../../state/features/files/filesSlice';

type Props = {
    element: Item,
    selectedFiles: Item[],
    storageFiles: Item[]
}

function useFile({element, selectedFiles, storageFiles}: Props) {

  const {lastCommand} = useAppSelector((state) => state.files);

    const isActive = selectedFiles.some((el) => el.id === element.id);
    const isCopy = storageFiles.some((el) => el.id === element.id) && lastCommand === "copy";
    
    const dispatch = useAppDispatch();

    const selectSingleElement = () => {
        if (isActive && selectedFiles.length === 1) {
          dispatch(selectFiles([]));
        } else {
          dispatch(selectFiles([element]));
        }
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

      const setActiveOnRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isActive) {
          selectSingleElement();
        }
      };

      return { setActiveElement, isActive, isCopy, setActiveOnRightClick}
}

export default useFile