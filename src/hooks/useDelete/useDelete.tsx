import React from "react";
import { useAppDispatch, useAppSelector } from "../../state/store"
import { setLastCommand } from "../../state/features/files/filesSlice";
import axios from "axios";

function useDelete(
  setIsOpened?: React.Dispatch<React.SetStateAction<boolean>>
) {
  const { selectedFiles } = useAppSelector((state) => state.files);
  const dispatch = useAppDispatch();

  const handleDeleteClick = async () => {
    const deletePromises = selectedFiles.map((file) =>
      axios.delete(
        `${process.env.REACT_APP_API_URL}/file/${file.fileDetails.id}`,
        {
          withCredentials: true,
        }
      )
    );

    try {
      await Promise.all(deletePromises);
      dispatch(setLastCommand({ files: selectedFiles, command: "delete" }));
    } catch (error) {
      console.error("Error deleting files:", error);
    }

    if (setIsOpened) {
        setIsOpened(false);
      }
  };

  return { handleDeleteClick };
}

export default useDelete;
