import React from "react";
import { useAppDispatch, useAppSelector } from "../../state/store";
import { setLastCommand } from "../../state/features/files/filesSlice";
import { getActualPath, setPathAsync } from "../../state/features/path/pathSlice";
import useAxiosPrivate from "../useAxiosPrivate/useAxiosPrivate";

function useDelete(setIsOpened?: React.Dispatch<React.SetStateAction<boolean>>) {
  const { selectedFiles } = useAppSelector((state) => state.files);
  const actualPath = useAppSelector(state => getActualPath(state.path));
  const axiosPrivate = useAxiosPrivate();

  const dispatch = useAppDispatch();

  const handleDeleteClick = async () => {

    const filesToDelete = selectedFiles.map((file) => file.fileDetails?.id).filter((id) => id);
    // const foldersToDelete = selectedFiles.map((file) => file.folderDetails?.id).filter((id) => id);

    const deleteFilesPromises = filesToDelete.map((id) => {
      const URL = `${process.env.REACT_APP_API_URL}/file/${id}`;
      return axiosPrivate.delete(URL, { withCredentials: true });
    });

    // const deleteFoldersPromises = foldersToDelete.map((id) => {
    //   const URL = `${process.env.REACT_APP_API_URL}/folder/${id}`;
    //   return axiosPrivate.delete(URL, { withCredentials: true });
    // });

    try {
      dispatch(setLastCommand({ files: selectedFiles, command: "delete" }));
      await Promise.all([...deleteFilesPromises]);
    } catch (error) {
      console.error("Error deleting files:", error);
    } finally {
      if (setIsOpened) {
        dispatch(setPathAsync(actualPath.path));
      }
    }
  };

  return { handleDeleteClick };
}

export default useDelete;
