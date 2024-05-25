import React from 'react'
import { useAppSelector } from '../stateHook/useStateHook';
import axios from 'axios';

function useDownload (setIsOpened?: React.Dispatch<React.SetStateAction<boolean>>) {

    const { selectedFiles } = useAppSelector((state) => state.files);
    
    const handleDownloadClick = () => {
        
        selectedFiles.forEach((file) => {
            axios.get(`${process.env.REACT_APP_API_URL}/file/download/${file.fileDetails.id}`, {
                withCredentials: true,
                responseType: 'blob',
            }).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', file.fileDetails.name);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
        })

        setIsOpened && setIsOpened(false);
    }
    
    return {handleDownloadClick}
}

export default useDownload