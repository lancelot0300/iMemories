import React from "react";
import useAxiosPrivate from "../useAxiosPrivate/useAxiosPrivate";
import { useAppDispatch, useAppSelector } from "../../state/store";
import { setLastCommand } from "../../state/features/files/filesSlice";
import { setPathAsync } from "../../state/features/path/pathSlice";
import { File, Folder, Path, SelectedElements } from "../../types";

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

  const handlePasteClick = async () => {
    const URL = `${process.env.REACT_APP_API_URL}/copy/foldersandfiles`;

    const filesids = storageFiles
      .map((file) => (file as File).fileDetails?.id)
      .filter((id) => id);
    const foldersids = storageFiles
      .map((file) => (file as Folder).folderDetails?.id)
      .filter((id) => id);

    const requset = axiosPrivate.post(
      URL,
      {
        filesids,
        foldersids,
        targetFolderId: data.id,
      },
      {
        withCredentials: true,
      }
    );
    dispatch(setLastCommand({ files: selectedFiles, command: "paste" }));
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
