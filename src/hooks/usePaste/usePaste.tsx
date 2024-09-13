import React from "react";
import useAxiosPrivate from "../useAxiosPrivate/useAxiosPrivate";
import { useAppDispatch, useAppSelector } from "../../state/store";
import { setLastCommand } from "../../state/features/files/filesSlice";
import { setPathAsync } from "../../state/features/path/pathSlice";
import { FileType, FolderType, SelectedElements } from "../../types";

type Props = {
  storageFiles: SelectedElements;
  selectedFiles: SelectedElements;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

function usePaste({
  selectedFiles,
  storageFiles,
  setIsOpened,
}: Props) {
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.path);
  const selectedElement = selectedFiles.length === 1 && selectedFiles[0].id;

  const handlePasteClick = async () => {
    const URL = `${process.env.REACT_APP_API_URL}/copy/foldersandfiles`;

    const filesids = storageFiles
      .map((file) => (file as FileType).fileDetails?.id)
      .filter((id) => id);
    const foldersids = storageFiles
      .map((file) => (file as FolderType).folderDetails?.id)
      .filter((id) => id);

    const requset = axiosPrivate.post(
      URL,
      {
        filesids,
        foldersids,
        targetFolderId: selectedElement || data.id,
      },
      {
        withCredentials: true,
      }
    );
    dispatch(setLastCommand({ command: "paste" }));
    await requset
      .then(() => {
        dispatch(setPathAsync(data.id));
      })
      .catch((error) => {
        console.log(error);
      });
    setIsOpened(false);
  };

  return { handlePasteClick };
}

export default usePaste;
