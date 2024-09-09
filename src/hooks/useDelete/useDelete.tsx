import React from "react";
import { useAppDispatch, useAppSelector } from "../../state/store";
import { setLastCommand } from "../../state/features/files/filesSlice";
import axios from "axios";
import { getActualPath, setPathAsync } from "../../state/features/path/pathSlice";
import useAxiosPrivate from "../useAxiosPrivate/useAxiosPrivate";

function useDelete(setIsOpened?: React.Dispatch<React.SetStateAction<boolean>>) {
  const { selectedFiles } = useAppSelector((state) => state.files);
  const actualPath = useAppSelector(state => getActualPath(state.path));
  const axiosPrivate = useAxiosPrivate();

  const dispatch = useAppDispatch();

  const handleDeleteClick = async () => {
    const deletePromises = selectedFiles
      .filter(file => file.fileDetails?.id)  
      .map(file => 
        axiosPrivate.delete(`${process.env.REACT_APP_API_URL}/file/${file.fileDetails?.id}`, {
          withCredentials: true,
        })
      );

    try {
      await Promise.all(deletePromises);
      dispatch(setLastCommand({ files: selectedFiles, command: "delete" }));
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
