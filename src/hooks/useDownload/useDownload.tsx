import React from "react";
import { useAppDispatch, useAppSelector } from "../../state/store";
import useAxiosPrivate from "../useAxiosPrivate/useAxiosPrivate";
import {
  addFileStatus,
  updateFileStatus,
} from "../../state/features/requests/requestsSlice";

function useDownload(
  setIsOpened?: React.Dispatch<React.SetStateAction<boolean>>
) {
  const { selectedFiles } = useAppSelector((state) => state.files);
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useAppDispatch();
  const handleDownloadClick = async (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    try {
      for (const file of selectedFiles) {
        const isFile = "fileDetails" in file;
        const isFolder = "folderDetails" in file

        const FiloOrFolder = isFile ? file.fileDetails : isFolder ? file.folderDetails : null;

        if (!FiloOrFolder) continue;

        const fileUrl = `${process.env.REACT_APP_API_URL}/file/download/${FiloOrFolder.id}`
        const folderUrl = `${process.env.REACT_APP_API_URL}/folder/download/${FiloOrFolder.id}`
        const url = isFile ? fileUrl : isFolder ? folderUrl : null
        if (!url) return

        dispatch(
          addFileStatus({
            index: FiloOrFolder.id,
            fileName: FiloOrFolder.name,
            progress: "0%",
            status: "Uploading",
          })
        );

        try {
          const response = await axiosPrivate.get(url, {
            withCredentials: true,
            responseType: "blob",
            onDownloadProgress(progressEvent) {
              if (progressEvent.progress) {
                dispatch(
                  updateFileStatus({
                    index: FiloOrFolder.id,
                    progress: `${(progressEvent.progress * 100).toFixed(0)}%`,
                    status:
                      progressEvent.progress >= 1 ? "Downloaded" : "Downloading",
                  })
                );
              }
            },
          });

          const downloadUrl = window.URL.createObjectURL(
            new Blob([response.data])
          );
          const link = document.createElement("a");
          link.href = downloadUrl;

          const fileName = FiloOrFolder.name
          link.setAttribute("download", fileName);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          window.URL.revokeObjectURL(downloadUrl);
        } catch (error) {
          dispatch(
            updateFileStatus({
              index: FiloOrFolder.id,
              progress: "Failed",
              status: "Error",
            })
          );
        }
      }
    } catch (error) {
      console.error("Error downloading file:", error);
    } finally {
      if (setIsOpened) {
        setIsOpened(false);
      }
    }
  };

  return { handleDownloadClick };
}

export default useDownload;
