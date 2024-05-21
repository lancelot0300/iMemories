import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useUpload from "../../hooks/useUpload/useUpload";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { MenuItem } from "../Menu/menu.styled";

function UploadOption() {

  const { createModal, setIsOpened } = useUpload();

  return (
    <>
      <MenuItem onClick={() => setIsOpened(true)}><FontAwesomeIcon icon={faUpload} /></MenuItem>
      {createModal()}
    </>
  );
}

export default UploadOption;
