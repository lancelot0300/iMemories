import axios from 'axios';
import React, { useEffect, useState } from 'react'
import useOptionsHook from '../uploadHook/useUploadFiles';

function useDropHook({containerRef}: {containerRef: React.RefObject<HTMLDivElement>}) {

    const {uploadFiles} = useOptionsHook();
    

    const handleDragOver = (e: DragEvent) => {
        e.preventDefault();
        if (containerRef.current) {
            containerRef.current.classList.add("dragging");
        }

    }

    const handleDrop = (e: DragEvent) => {
        e.preventDefault();
        if (containerRef.current) {
            containerRef.current.classList.remove("dragging");
        }
    
        if (!process.env.REACT_APP_API_URL) {
            console.error("REACT_APP_API_URL is not defined.");
            return;
        }
    
        if (!e.dataTransfer) {
            console.error("No dataTransfer");
            return;
        }
    
    
        uploadFiles(e.dataTransfer.files);
    }


    const handleDragLeave = () => {
        if (containerRef.current) {
            containerRef.current.classList.remove("dragging");
        }
    }

   useEffect(() => {
        containerRef.current?.addEventListener("dragover", handleDragOver);
        containerRef.current?.addEventListener("drop", handleDrop);
        containerRef.current?.addEventListener("dragleave", handleDragLeave);

        return () => {
            containerRef.current?.removeEventListener("dragover", handleDragOver);
            containerRef.current?.removeEventListener("drop", handleDrop);
            containerRef.current?.removeEventListener("dragleave", handleDragLeave);
        };
    }
    , []);
}

export default useDropHook