import React from 'react'
import { useAppDispatch, useAppSelector } from '../stateHook/useStateHook';
import { setLastCommand } from '../../state/features/files/filesSlice';

function useCopy(setIsOpened?: React.Dispatch<React.SetStateAction<boolean>>) {

    const { selectedFiles } = useAppSelector((state) => state.files);
    const dispatch = useAppDispatch();

    const handleCopyClick = () => {
        setIsOpened && setIsOpened(false);
        if(selectedFiles.length === 0) return
        dispatch(setLastCommand({files: selectedFiles, command: "copy"}))
    }

    return {handleCopyClick}
 
}

export default useCopy