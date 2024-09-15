import React from "react";
import { useAppDispatch, useAppSelector } from "../../state/store";
import useAxiosPrivate from "../useAxiosPrivate/useAxiosPrivate";
import {
  addFileStatus,
  updateFileStatus,
} from "../../state/features/requests/requestsSlice";
import { FileType } from "../../types";

function useDownload(
  setIsOpened?: React.Dispatch<React.SetStateAction<boolean>>
) {
  const { selectedFiles } = useAppSelector((state) => state.files);
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useAppDispatch();
  const handleDownloadClick = async () => {
    try {
      for (const file of selectedFiles) {
        const fileId = "fileDetails" in file && file.fileDetails.id;
        const folderId = "folderDetails" in file && file.folderDetails.id;
        const fileTyped = file as FileType;

        if (!fileId && !folderId) continue;

        const url = fileId
          ? `${process.env.REACT_APP_API_URL}/file/download/${fileId}`
          : `${process.env.REACT_APP_API_URL}/folder/download/${folderId}`;

        dispatch(
          addFileStatus({
            index: fileTyped.fileDetails.id,
            fileName: fileTyped.fileDetails.name,
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
                    index: fileTyped.fileDetails.id,
                    fileName: fileTyped.fileDetails.name,
                    progress: `${Math.round(progressEvent.progress * 100)}%`,
                    status:
                      progressEvent.progress >= 1 ? "Finished" : "Uploading",
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

          const fileName = fileId
            ? file.fileDetails.name
            : folderId
            ? file.folderDetails.name
            : "";
          link.setAttribute("download", fileName);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          window.URL.revokeObjectURL(downloadUrl);
        } catch (error) {
          dispatch(
            updateFileStatus({
              index: fileTyped.fileDetails.id,
              fileName: fileTyped.fileDetails.name,
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
