import React from 'react'
import { ContextOption } from '../../FileElement/fileElement.styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate/useAxiosPrivate'
import { refreshPathAsync } from '../../../state/features/path/pathSlice'
import { useAppDispatch, useAppSelector } from '../../../state/store'

type Props = {
    setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
}

function AddToFavOption() {

  const { data } = useAppSelector((state) => state.path);
  const { selectedFiles } = useAppSelector((state) => state.files);
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useAppDispatch();
  
    
  const onSubmit = async () => {
    const isFile = "fileDetails" in selectedFiles[0];
    const isFolder = "folderDetails" in selectedFiles[0];

    const url = isFile ? "/file" : isFolder ? "/folder" : "";

    if(!url) return;

      try {
        await axiosPrivate.patch(
          process.env.REACT_APP_API_URL + url + "/star/" + selectedFiles[0].id,
          { withCredentials: true }
        );
      } catch (error) {
        console.error(error);
      }
      dispatch(refreshPathAsync(data.id));
  };

    if(selectedFiles.length > 1) return null;

    return (
      <ContextOption onClick={onSubmit}><FontAwesomeIcon icon={faStar} /><span>Favourite</span></ContextOption>
    )
}

export default AddToFavOption
