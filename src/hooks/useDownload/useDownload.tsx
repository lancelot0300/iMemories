import React from 'react';
import {  useAppSelector } from "../../state/store";
import axios from 'axios';

function useDownload(setIsOpened?: React.Dispatch<React.SetStateAction<boolean>>) {
    const { selectedFiles } = useAppSelector((state) => state.files);

    const handleDownloadClick = async () => {
        try {
            for (const file of selectedFiles) {
                const fileId = file.fileDetails?.id;
                const folderId = file.folderDetails?.id;
                
                if (!fileId && !folderId) continue; 
                
                const url = fileId 
                    ? `${process.env.REACT_APP_API_URL}/file/download/${fileId}`
                    : `${process.env.REACT_APP_API_URL}/folder/download/${folderId}`;

                const response = await axios.get(url, {
                    withCredentials: true,
                    responseType: 'blob',
                });

                const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = downloadUrl;

                const fileName = file.fileDetails?.name || 'downloaded-file';
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                window.URL.revokeObjectURL(downloadUrl);
            }
        } catch (error) {
            console.error('Error downloading file:', error);
        } finally {
            if (setIsOpened) {
                setIsOpened(false);
            }
        }
    };

    return { handleDownloadClick };
}

export default useDownload;
