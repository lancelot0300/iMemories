import React, { useEffect } from 'react';
import useOptionsHook from '../uploadHook/useUploadFiles';

function useDropHook({ containerRef }: { containerRef: React.RefObject<HTMLDivElement> }) {
    const { uploadFiles } = useOptionsHook();

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleDragOver = (e: DragEvent) => {
            e.preventDefault();
            if (containerRef.current) {
                containerRef.current.classList.add("dragging");
            }
        };

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

            const files = e.dataTransfer.files;
            if (files.length === 0) {
                console.error("No files dropped.");
                return;
            }

            uploadFiles(files);
        };

        const handleDragLeave = () => {
            if (containerRef.current) {
                containerRef.current.classList.remove("dragging");
            }
        };

        container.addEventListener("dragover", handleDragOver);
        container.addEventListener("drop", handleDrop);
        container.addEventListener("dragleave", handleDragLeave);

        return () => {
            container.removeEventListener("dragover", handleDragOver);
            container.removeEventListener("drop", handleDrop);
            container.removeEventListener("dragleave", handleDragLeave);
        };
    }, [containerRef, uploadFiles]);

    return null; 
}

export default useDropHook;
