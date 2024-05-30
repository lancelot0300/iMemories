import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useUpload from "../../../hooks/useUpload/useUpload";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { ContextOption } from "../../FileElement/fileElement.styles";
import useCreateFolder from "../../../hooks/useCreateFolder/useCreateFolder";

function CreateFolderOption() {

  const {handleCreateClick} = useCreateFolder();

  return (
    <>
        <ContextOption onClick={handleCreateClick}><FontAwesomeIcon icon={faFolderPlus} size='1x' /><span>Create Folder</span></ContextOption>
    </>
  );
}

export default CreateFolderOption;
