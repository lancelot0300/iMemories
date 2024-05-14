import React from 'react'
import { useAppDispatch, useAppSelector } from '../stateHook/useStateHook';
import { setLastCommand } from '../../state/features/files/filesSlice';

function useDelete(setIsOpened?: React.Dispatch<React.SetStateAction<boolean>>) {

    const { selectedFiles } = useAppSelector((state) => state.files);
    const dispatch = useAppDispatch();


    const handleDeleteClick = () => {
        console.log("DeleteOption", selectedFiles)
        dispatch(setLastCommand({files: selectedFiles, command: "delete"}))
        setIsOpened && setIsOpened(false);
    }

    return {handleDeleteClick}
}

export default useDelete