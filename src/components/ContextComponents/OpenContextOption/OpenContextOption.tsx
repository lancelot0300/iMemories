import { useAppDispatch, useAppSelector } from '../../../state/store';
import { isFolderSelected } from '../../../utils/homeUtils';
import { ContextOption } from '../../FileElement/fileElement.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setPath } from '../../../state/features/path/pathSlice';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { clearFiles } from '../../../state/features/files/filesSlice';

function OpenContextOption() {

  const dispatch = useAppDispatch();
  const { selectedFiles } = useAppSelector((state) => state.files);
  console.log(selectedFiles)

  if(isFolderSelected(selectedFiles)) return null

  const handleOpenClick = () => {
    dispatch(setPath({path: selectedFiles[0].id, name: selectedFiles[0].folderDetails?.name || ""}));
    dispatch(clearFiles());
  }

  return (
    <ContextOption onClick={handleOpenClick}><FontAwesomeIcon icon={faDoorOpen} />  <span>Open</span></ContextOption>
  )
}

export default OpenContextOption