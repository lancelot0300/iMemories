import React from 'react'
import { Item } from '../../types';
import { useAppDispatch } from '../stateHook/useStateHook';
import { addFile, removeFile, selectFiles } from '../../state/features/files/filesSlice';

type Props = {
    element: Item,
    selectedFiles: Item[],
    copyFiles: Item[]
}

function useFile({element, selectedFiles, copyFiles}: Props) {

    const isActive = selectedFiles.some((el) => el.id === element.id);
    const isCopy = copyFiles.some((el) => el.id === element.id);
    
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