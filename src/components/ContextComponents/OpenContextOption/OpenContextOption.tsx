import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../state/store';
import { isFolderSelected } from '../../../utils/homeUtils';
import { ContextOption } from '../../FileElement/fileElement.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faOpenid } from '@fortawesome/free-brands-svg-icons';
import { setPath } from '../../../state/features/path/pathSlice';

type Props = {
    setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
}

function OpenContextOption() {

  const dispatch = useAppDispatch();
  const { selectedFiles } = useAppSelector((state) => state.files);
  console.log(selectedFiles)

  if(isFolderSelected(selectedFiles)) return null

  const handleOpenClick = () => {
    dispatch(setPath({path: selectedFiles[0].id, name: selectedFiles[0].folderDetails?.name || ""}));
  }

  return (
    <ContextOption onClick={handleOpenClick}><FontAwesomeIcon icon={faOpenid} />  <span>Open</span></ContextOption>
  )
}

export default OpenContextOption