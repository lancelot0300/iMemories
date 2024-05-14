import React from 'react'
import { useAppSelector } from '../stateHook/useStateHook';

function useDownload (setIsOpened?: React.Dispatch<React.SetStateAction<boolean>>) {

    const { selectedFiles } = useAppSelector((state) => state.files);
    
    const handleDownloadClick = () => {
        console.log("DownloadOption", selectedFiles)
        setIsOpened && setIsOpened(false);
    }
    
    return {handleDownloadClick}
}

export default useDownload