import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FileElementContainer, LoadingIcon, Name } from './fileElement.styles';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function LoadingFileElement() {
    return (
        <>
          <FileElementContainer>
            <LoadingIcon><FontAwesomeIcon size='xl' icon={faSpinner} /></LoadingIcon>
          </FileElementContainer>
        </>
      );
}

export default LoadingFileElement