import React from 'react'
import useAxiosPrivate from '../useAxiosPrivate/useAxiosPrivate';
import { useAppDispatch } from '../../state/store';
import { setLastCommand } from '../../state/features/files/filesSlice';
import { setPathAsync } from '../../state/features/path/pathSlice';
import { Path, SelectedElements } from '../../types';

type Props = {
    storageFiles: SelectedElements;
    selectedFiles: SelectedElements;
    actialPath: Path;
    setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

function usePaste( { selectedFiles,storageFiles, actialPath, setIsOpened} : Props) {
    const axiosPrivate = useAxiosPrivate();
    const dispatch = useAppDispatch();

    const handlePasteClick = async () => {
        const URL = `${process.env.REACT_APP_API_URL}/copy/foldersandfiles`;
    
        const filesids = storageFiles.map((file) => file.fileDetails?.id).filter((id) => id);
        const foldersids = storageFiles.map((file) => file.folderDetails?.id).filter((id) => id);
    
          console.log(filesids, foldersids, actialPath.path);
         await axiosPrivate.post(
          URL,
          {
            filesids,
            foldersids,
            targetFolderId: actialPath.path,
          },
          {
            withCredentials: true,
          }
        ).then(() => {
          dispatch(setLastCommand({ files: selectedFiles, command: "paste" }));
          dispatch(setPathAsync(actialPath.path));
        })
        .catch((error) => {
          console.error("Error pasting files:", error);
        })
        setIsOpened(false);
      };

      return { handlePasteClick }
}

export default usePaste