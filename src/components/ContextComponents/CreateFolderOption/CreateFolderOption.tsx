import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useUpload from "../../../hooks/useUpload/useUpload";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { ContextOption } from "../../FileElement/fileElement.styles";
import useCreateFolder from "../../../hooks/useCreateFolder/useCreateFolder";

type Props = {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

function CreateFolderOption({setIsOpened}: Props) {

  const {createModal, setIsOpenedModal, } = useCreateFolder(setIsOpened);

  const handleOptionClick = () => {
    setIsOpenedModal(true);
  }

  return (
    <>
        <ContextOption onClick={handleOptionClick}><FontAwesomeIcon icon={faFolderPlus} size='1x' /><span>Create Folder</span></ContextOption>
        {createModal()}
    </>
  );
}

export default CreateFolderOption;
