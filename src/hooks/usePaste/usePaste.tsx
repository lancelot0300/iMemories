import React from "react";
import useAxiosPrivate from "../useAxiosPrivate/useAxiosPrivate";
import { useAppDispatch } from "../../state/store";
import { setLastCommand } from "../../state/features/files/filesSlice";
import { setPathAsync } from "../../state/features/path/pathSlice";
import { Path, SelectedElements } from "../../types";

type Props = {
  storageFiles: SelectedElements;
  selectedFiles: SelectedElements;
  actialPath: Path;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

function usePaste({
  selectedFiles,
  storageFiles,
  actialPath,
  setIsOpened,
}: Props) {
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useAppDispatch();

  const handlePasteClick = async () => {
    const URL = `${process.env.REACT_APP_API_URL}/copy/foldersandfiles`;

    const filesids = storageFiles
      .map((file) => file.fileDetails?.id)
      .filter((id) => id);
    const foldersids = storageFiles
      .map((file) => file.folderDetails?.id)
      .filter((id) => id);

    const requset = axiosPrivate.post(
      URL,
      {
        filesids,
        foldersids,
        targetFolderId: actialPath.path,
      },
      {
        withCredentials: true,
      }
    );
    dispatch(setLastCommand({ files: selectedFiles, command: "paste" }));
    await requset
      .then(() => {
        dispatch(setPathAsync(actialPath.path));
      })
      .catch((error) => {
        console.log(error);
      });
    setIsOpened(false);
  };

  return { handlePasteClick };
}

export default usePaste;
